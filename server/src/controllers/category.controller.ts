import Elysia, { status } from "elysia";
import { userMidware } from "../middleware/auth";

const categoryCall = new Elysia({ name: "/category" })
    categoryCall.group("", (authApp)=>
        authApp
            .use(userMidware)
            .post("", ()=>{

            })
            .get("", ()=>{

            })
            .put("", ()=>{

            })
            .delete("", ()=>{
                
            })
    );   


export default categoryCall;