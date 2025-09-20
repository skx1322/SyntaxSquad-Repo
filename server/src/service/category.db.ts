import { status } from "elysia";
import { DB } from "../config/db.setup";
import { course_categories, PartialInterface } from "../types/user.type";
import { DBUtil } from "../utils/DB.query";
import { IDUtil } from "../utils/UUID";

export class CATEGORY_DB {
    async createCategory(categoryData: Omit<course_categories, "category_id">) {
        try {
            DB.query(`BEGIN`)
            const { category_name, description } = categoryData;
            const categoryUUID = await IDUtil.FixedID(category_name, 3);

            const result = await DB.query(DBUtil.createCategory(), [categoryUUID, category_name, description])
            if (!result) {
                return status(500, {
                    success: false,
                    message: `Server failed to create a category.`,
                });
            };
            return status(200, {
                success: true,
                message: `Category successfully created.`,
                output: result
            })
        } catch (error) {
            DB.query('ROLLBACK');
            console.error(error);
            return status(500, {
                success: false,
                message: `Failed to create category due to internal server error/Duplication issue.`,
            })
        }
    };

    async updateCategory(category_id: string, categoryData: Omit<PartialInterface<course_categories>, "category_id">) {
        const isExist = await DB.query(DBUtil.findCategoryOne(), [category_id || categoryData.category_name]) as course_categories[];
        if (!isExist[0]) {
            return status(404, {
                success: false,
                message: `Category not found!`
            });
        };

        const payload = {
            category_name: categoryData.category_name ?? isExist[0].category_name,
            description: categoryData.description ?? isExist[0].description,
        };

        const updateData = await DB.query(DBUtil.updateCategory(), [category_id, payload.category_name, payload.description]);
        return status(200, {
            success: true,
            message: `Successfully updated a category.`,
            output: updateData[0]
        });
    };

    async findCategory(category_name: string) {
        try {
            const isExist = await DB.query(DBUtil.findCategoryOne(), [category_name]) as course_categories[];
            if (isExist.length === 0) {
                return status(404, {
                    success: true,
                    message: `Category not found.`,
                });
            }
            return status(200, {
                success: true,
                message: `Successfully retrieve category from system.`,
                output: isExist[0],
            });
        } catch (error) {
            console.error(error);
            return status(500, {
                success: false,
                message: `Unavailble to find category due to internal server error.`
            })
        }
    };

    async deleteCategory(category_id: string) {
        const isDelete = await DB.query(DBUtil.deleteCategoryOne(), [category_id]);
        if (isDelete.length === 0) {
            return status(404, {
                success: false,
                message: `Category not found.`
            });
        }
        return status(200, {
            success: true,
            message: `Categories successfully deleted.`,
            output: isDelete
        })
    };

    async getCategory() {
        const result = await DB.query(DBUtil.findAllCategories());
        return status(200, {
            success: true,
            message: `Categories successfully retrieved.`,
            output: result
        })
    }
}
