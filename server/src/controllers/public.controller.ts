import Elysia, { status } from "elysia";
import { userMidware } from "../middleware/auth";
import { CATEGORY_DB } from "../service/category.db";

const publicCall = new Elysia({ name: "/public" })
publicCall.group("", (publicContent) =>
    publicContent
        .post("/course", () => {

        })
        .get("/course", async () => {
            
        })
        .get("/category", async () => {
            return await new CATEGORY_DB().getCategory();

        })
        .get("/course-tutor", () => {

        })
        .get("/course-detail", () => {

        })
);


export default publicCall;