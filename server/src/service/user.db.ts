import { register } from "../types/user.type";
import { HuaUtil } from "../utils/Encrypt";
import { BucektUtil } from "../utils/S3";
import { IDUtil } from "../utils/UUID";

export class USER_DB {
    async createUser(user: register){
        let currentAvatar: File | string = user.avatar;
        if (user.avatar instanceof File) {
            currentAvatar = await BucektUtil.uploadImage(user.avatar, "public-read");
        };
        
        // userid 2 segment without dash
        const userID = await IDUtil.NewUUID(2, false);

        const passwordHash = await HuaUtil.Bcrypt(user.password_hash);
        const payload = {
            userID: userID,
            username: user.username,
            email: user.email,
            password: passwordHash,
            avatar: currentAvatar
        };


    }
}