import Elysia, { status } from "elysia";
import { userSessionDelete } from "../middleware/auth";

const logoutAccount = new Elysia({ prefix: "/exit" })
    logoutAccount.group("", (authApp)=>
        authApp
            .use(userSessionDelete)
            .post("/account", ({getUser})=>{
                return getUser
            })
    );   


export default logoutAccount;