import Elysia, { ElysiaCustomStatusResponse, status } from "elysia";
import { userMidware } from "../middleware/auth";
import { CATEGORY_DB } from "../service/category.db";
import { categoryModel } from "../model/valid.model";

const categoryCall = new Elysia({ name: "/category" })
categoryCall.group("", (authApp) =>
    authApp
        .use(userMidware)
        .use(categoryModel)
        .post("", async ({ getUser, body }) => {
            if (getUser instanceof ElysiaCustomStatusResponse) {
                return getUser;
            };
            if (getUser.role === "Student") {
                return status(401, {
                    success: false,
                    message: `Student are not allowed to create category.`
                });
            };
            return await new CATEGORY_DB().createCategory(body)
        }, {
            body: "category_create"
        })
        .post("/find", async ({ body: { category_id } }) => {
            return await new CATEGORY_DB().findCategory(category_id);
        }, {
            body: "category_search"
        })
        .put("", async ({ getUser, body: { category_id, category_name, description } }) => {
            if (getUser instanceof ElysiaCustomStatusResponse) {
                return getUser;
            };

            return await new CATEGORY_DB().updateCategory(category_id, { category_name, description });
        }, {
            body: "category_update"
        })
        .delete("", async({getUser, body: {category_id}}) => {
            if (getUser instanceof ElysiaCustomStatusResponse) {
                return getUser;
            };

            return await new CATEGORY_DB().deleteCategory(category_id)
        }, {
            body: "category_search"
        })
);


export default categoryCall;