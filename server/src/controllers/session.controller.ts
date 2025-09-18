import Elysia, { status } from "elysia";
import { userSessionDelete } from "../middleware/auth";

const logoutAccount = new Elysia({ name: "logout" })
    logoutAccount.group("", (authApp)=>
        authApp
            .use(userSessionDelete)
            .post("/logout", ({getUser})=>{
                return getUser
            })
    );   


export default logoutAccount;