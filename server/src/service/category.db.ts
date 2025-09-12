import { status } from "elysia";
import { DB } from "../config/db.setup";
import { course_categories, PartialInterface } from "../types/user.type";
import { DBUtil } from "../utils/DB.query";
import { IDUtil } from "../utils/UUID";

export class CATEGORY_DB {
    async createCategory(categoryData: Omit<course_categories, "category_id">) {
        const { category_name, description } = categoryData;
        const categoryUUID = IDUtil.FixedID(category_name, 3);
        await DB.query(DBUtil.createCategory(), [categoryUUID, category_name, description])

        const isExist = await DB.query(DBUtil.findCategoryOne(), [categoryUUID]) as course_categories[];
        if (!isExist[0]) {
            return status(500, {
                success: false,
                message: `Server failed to create/upload category.`
            });
        };

        return isExist[0];
    };

    async updateCategory(categoryData: PartialInterface<course_categories>) {
        const isExist = await DB.query(DBUtil.findCategoryOne(), [categoryData.category_id || categoryData.category_name]) as course_categories[];
        if (!isExist[0]) {
            return status(404, {
                success: false,
                message: `Category not found!`
            });
        };

        const payload = {
            category_id: categoryData.category_id ?? isExist[0].category_id,
            category_name: categoryData.category_name ?? isExist[0].category_name,
            description: categoryData.description ?? isExist[0].description,
        };

        const updateData = await DB.query(DBUtil.updateCategory(), [payload.category_id, payload.category_name, payload.description]);
        return updateData;
    };

    async getCategory() {
        const isExist = await DB.query(DBUtil.findCategoryOne()) as course_categories[];
        return isExist;
    };

    async deleteCategory(category_id: string) {
        const isDelete = await DB.query(DBUtil.deleteCategoryOne(), [category_id]);
        return isDelete;
    };
}
