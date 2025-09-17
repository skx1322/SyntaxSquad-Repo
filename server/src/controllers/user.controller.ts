import Elysia, { ElysiaCustomStatusResponse, status } from "elysia";
import { userModel } from "../model/valid.model";
import { USER_DB } from "../service/user.db";
import { JWT_Login } from "../config/jwt.config";
import { userMidware } from "../middleware/auth";

const userAccount = new Elysia({ prefix: "" }).use(userModel)

userAccount.group("", (access) =>
    access
        .use(JWT_Login)
        .post("/register", async ({ body }) => {
            return await new USER_DB().createUser(body);
        }, {
            body: "register"
        })
        .post("/login", async ({ body, cookie: { clev_session }, JWT_Login }) => {
            const sessionID = await new USER_DB().loginUser(body);
            if (typeof sessionID === "string") {
                const cookieToken = await JWT_Login.sign({ sessionID });
                clev_session.set({
                    value: cookieToken,
                    httpOnly: true,
                    secure: Bun.env.NODE_ENV ? true : false,
                    maxAge: 86400,
                    sameSite: Bun.env.NODE_ENV ? "none" : "lax",
                    path: "/"
                })
                return status(200, {
                    success: true,
                    message: `Successfully login to account.`,
                    output: cookieToken,
                })
            };
            return sessionID;
        }, {
            body: "login_body"
        })
);

userAccount.group("", (authApp) =>
    authApp
        .use(userMidware)
        .get("/account", ({ getUser }) => {
            if (getUser instanceof ElysiaCustomStatusResponse) {
                return getUser
            };
            return status(200, {
                success: true,
                message: `User document retrieved.`,
                output: getUser
            })
        })
        .put("/account", async ({ getUser, body }) => {
            if (getUser instanceof ElysiaCustomStatusResponse) {
                return getUser
            };
            return await new USER_DB().profileUpdate(getUser.user_id, body);
        }, {
            body: "update_profile"
        })
        .post("/account-preference", () => {

        })
        .put("/preference", () => {

        })
        .delete("/account", () => {

        })
);


userAccount.group("", (authApp) =>
    authApp
        .use(userMidware)
        .post("/course-account", () => {

        })
        .get("/course-account", () => {

        })
        .put("/course-account", () => {

        })
        .delete("/course-account", () => {

        })
);


export default userAccount;