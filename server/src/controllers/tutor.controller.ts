import Elysia, { status } from "elysia";
import { userModel } from "../model/valid.model";
import { USER_DB } from "../service/user.db";
import { JWT_Login } from "../config/jwt.config";
import { userMidware } from "../middleware/auth";

const tutorAccount = new Elysia({ name: "/tutor" })
    tutorAccount.group("", (authApp)=>
        authApp
            .use(userMidware)
            .get("/register", ({cookie: {clev_session}, getUser})=>{
                return status(200, {
                    success: true,
                    message: `User document retrieved.`,
                    output: getUser
                })
            })
            .put("/user", ()=>{

            })
            .post("/user", ()=>{

            })
            .delete("/user", ()=>{
                
            })
    );   


export default tutorAccount;