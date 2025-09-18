import Elysia, { status } from "elysia";
import { userMidware } from "../middleware/auth";

const publicCall = new Elysia({ name: "/public" })
    publicCall.group("", (publicContent)=>
        publicContent
            .post("/course", ()=>{

            })
            .get("/course", ()=>{

            })
            .get("/course-tutor", ()=>{

            })
            .get("/course-detail", ()=>{
                
            })
    );   


export default publicCall;