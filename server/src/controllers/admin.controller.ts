import Elysia, { status } from "elysia";
import { userModel } from "../model/valid.model";
import { USER_DB } from "../service/user.db";
import { JWT_Login } from "../config/jwt.config";
import { userMidware } from "../middleware/auth";

const adminAccount = new Elysia({ prefix: "/admin" })
adminAccount.group("", (adminAcc) =>
    adminAcc
        .use(userMidware)
        .get("/admin", ({ cookie: { clev_session }, getUser }) => {
            return status(200, {
                success: true,
                message: `User document retrieved.`,
                output: getUser
            })
        })
        .put("/admin", () => {

        })
        .post("/admin", () => {

        })
        .delete("/admin", () => {

        })
);

adminAccount.group("", (controlApp) =>
    controlApp
        .use(userMidware)
        .get("/admin", ({ cookie: { clev_session }, getUser }) => {
            return status(200, {
                success: true,
                message: `User document retrieved.`,
                output: getUser
            })
        })
        .put("/admin", () => {

        })
        .post("/admin", () => {

        })
        .delete("/admin", () => {

        })
);


export default adminAccount;