import Elysia, { status } from "elysia";
import { userMidware } from "../middleware/auth";

const courseCall = new Elysia({ name: "/category" })
    courseCall.group("", (courseApp)=>
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

    courseCall.group("", (itemApp)=>
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

export default courseCall;