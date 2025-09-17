import { ElysiaCustomStatusResponse, status } from "elysia";
import { DB } from "../config/db.setup";
import { login, PartialInterface, profile, register, user } from "../types/user.type";
import { DBUtil } from "../utils/DB.query";
import { HuaUtil } from "../utils/Encrypt";
import { BucektUtil } from "../utils/S3";
import { IDUtil } from "../utils/UUID";

export class USER_DB {
    async createUser(user: register) {
        try {
            let currentAvatar: File | string = user.user_avatar;
            if (user.user_avatar instanceof File) {
                currentAvatar = await BucektUtil.uploadImage(user.user_avatar, "public-read");
            };

            const userID = await IDUtil.NewUUID(2, false);

            const passwordHash = await HuaUtil.Bcrypt(user.password_hash);
            const map = {
                user_id: userID,
                username: user.username,
                email: user.email,
                role: "Student",
                password_hash: passwordHash,
                user_avatar: currentAvatar
            };

            await DB.query(DBUtil.registerUser(), [
                map.user_id,
                map.username,
                map.email,
                map.role,
                map.password_hash,
                map.user_avatar
            ]);

            const findUser = await this.getUser(userID);
            if (!findUser) {
                return status(500, {
                    success: false,
                    message: `Server failed to create user account. Please try again.`
                });
            };
            return status(200, {
                success: true,
                message: `Successfully created an user account.`,
                output: findUser
            });
        } catch (error) {
            console.log(error);
            return status(500, {
                success: false,
                message: `Internal server error. Please try again later.`
            })
        }
    };

    async loginUser(user: login) {
        const isExist = await DB.query(DBUtil.findUserOne(true), [user.username]);
        const verifyPassword = await HuaUtil.VerifyBcrypt(user.password_hash, isExist[0].password_hash);
        if (!verifyPassword) {
            return status(401, {
                success: false,
                message: `Password did not match.`
            });
        };

        return isExist[0].user_id;
    }

    async getUser(user_id: string, all?: boolean) {
        if (all) {
            const userData = await DB.query(DBUtil.findUserOne(all), [user_id]) as unknown as user[];
            if (!userData[0]) {
                return status(404, {
                    success: false,
                    message: `User not found.`
                })
            }
            return userData[0]
        }
        const userData = await DB.query(DBUtil.findUserOne(), [user_id]) as unknown as Omit<user, "password_hash">[];
        if (!userData[0]) {
            return status(404, {
                success: false,
                message: `User not found.`
            })
        }
        return userData[0]
    };

    async profileUpdate(user_id: string, user: profile) {
        const findUser = await this.getUser(user_id);
        if (findUser instanceof ElysiaCustomStatusResponse) {
            return findUser
        };

        let currentAvatar: string | File | null = findUser.user_avatar;
        if (user.user_avatar instanceof File) {
            currentAvatar = await BucektUtil.uploadImage(user.user_avatar, "public-read");
        } else if (user.user_avatar === null) {
            currentAvatar = null;
        }

        const map = {
            username: user.username ?? findUser.username,
            user_avatar: currentAvatar,
            user_id: user_id,
        };

        const result = await DB.query(DBUtil.userProfile(), [
            map.username,
            map.user_avatar,
            map.user_id
        ]) as unknown as Pick<user, "user_id" | "username" | "user_avatar">[];

        if (result.length === 0) {
            return status(404, {
                success: false,
                message: `User not found or nothing to update.`
            });
        };

        const updatedUser = result[0];
        return status(200, {
            success: true,
            message: `User profile successfully updated!`,
            output: updatedUser
        })
    }

    async preferenceCreate(user_id: string, category_id: string) {
        const newPreID = await IDUtil.NewUUID(4, true);
    };

    async getPreCourse() {

    };

    async getUserCourse() {

    };

    async assignUserCourse() {

    };

}