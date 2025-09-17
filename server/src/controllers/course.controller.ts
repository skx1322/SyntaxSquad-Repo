import Elysia, { status } from "elysia";
import { userMidware } from "../middleware/auth";

const categoryCall = new Elysia({ prefix: "/category" })
    categoryCall.group("", (courseApp)=>
        courseApp
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

    categoryCall.group("", (itemApp)=>
        itemApp
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