import { status } from "elysia";
import { DB } from "../config/db.setup";
import { content_type, course_items, courses } from "../types/user.type";
import { DBUtil } from "../utils/DB.query";
import { IDUtil } from "../utils/UUID";
import { BucektUtil } from "../utils/S3";
import { bucket_config } from "../config/S3";

export class ITEM_DB {
    async structureCreate(tutor_id: string, course_id: string, itemData: Omit<course_items, "item_id" | "course_id" | "created_at">) {
        const course = await DB.query(DBUtil.courseOwnerCheck(), [course_id]) as Pick<courses, "tutor_id">[];
        if (course[0].tutor_id !== tutor_id) {
            return status(403, {
                success: false,
                message: `You are not authorized to add items into this course.`
            });
        };

        try {
            const item_id = await IDUtil.NewUUID(3, false);
            const { title, content, content_type } = itemData;

            const result = await DB.query(DBUtil.createStructure(), [
                item_id,
                course_id,
                title,
                content,
                content_type
            ]);

            return status(201, {
                success: true,
                message: `Course item created successfully.`,
                output: result[0]
            })
        } catch (error) {
            console.error(error);
            return status(500, {
                success: false,
                message: `Unable to add items into course due to internal server error.`
            })
        }
    };

    async createCourseItemLarge(tutor_id: string, itemData: { course_id: string, title: string, content_type: content_type, filename: string }) {
        const course = await DB.query(DBUtil.courseOwnerCheck(), [itemData.course_id]) as Pick<courses, "tutor_id">[];
        if (course[0].tutor_id !== tutor_id) {
            return status(403, {
                success: false,
                message: `You are not authorized to add items into this course.`
            });
        };

        const fileKey = `${await IDUtil.NewUUID(2, false)}_${itemData.filename}`;
        const presignedURL = bucket_config.S3().presign(fileKey, {
            method: "PUT"
        });

        return status(200, {
            success: true,
            message: `Presigned URL generated successfully.`,
            output: {
                uploadURL: presignedURL,
                fileKey: fileKey
            }
        })
    };

    async finalizeCourseItem(tutor_id: string, finalizeData: { course_id: string, fileKey: string, title: string, content_type: content_type }) {
        const course = await DB.query(DBUtil.courseOwnerCheck(), [finalizeData.course_id]) as Pick<courses, "tutor_id">[];
        if (course[0].tutor_id !== tutor_id) {
            return status(403, {
                success: false,
                message: `You are not authorized to add items into this course.`
            });
        };

        const contentURL = `${bucket_config.endpoint}/${finalizeData.fileKey}`;
        return await this.structureCreate(tutor_id, finalizeData.course_id, {
            title: finalizeData.title,
            content: contentURL,
            content_type: finalizeData.content_type
        })
    };

    async structureUpdate(tutor_id: string, itemData: Partial<Omit<course_items, "item_id" | "course_id" | "created_at">> & { course_id: string, item_id: string }) {
        const { course_id, item_id, title, content, content_type } = itemData;
        const course = await DB.query(DBUtil.courseOwnerCheck(), [course_id]) as Pick<courses, "tutor_id">[];
        if (course[0].tutor_id !== tutor_id) {
            return status(403, {
                success: false,
                message: `You are not authorized to update items into this course.`
            });
        };

        try {
            const isExist = await DB.query(DBUtil.readStructureOne(), [
                course_id,
                item_id
            ]) as course_items[];
            if (isExist.length === 0) {
                return status(404, {
                    success: false,
                    message: `Course item does not exist.`
                });
            };

            const result = await DB.query(DBUtil.updateStructure(), [
                title ?? isExist[0].title,
                content ?? isExist[0].content,
                content_type ?? isExist[0].content_type,
                item_id,
                course_id,
            ]);

            if (result.length === 0) {
                return status(404, {
                    success: false,
                    message: `Course item is not found or nothing to update.`
                });
            };

            return status(200, {
                success: true,
                message: `Course item updated successfully.`,
                output: result[0]
            })
        } catch (error) {
            console.error(error);
            return status(500, {
                success: false,
                message: `Failed to update course item due to internal server error.`
            })
        }
    };

    async finalizeUpdate(tutor_id: string, finalizeData: { item_id: string, course_id: string, fileKey: string, title: string, content_type: content_type }) {
        const course = await DB.query(DBUtil.courseOwnerCheck(), [finalizeData.course_id]) as Pick<courses, "tutor_id">[];
        if (course[0].tutor_id !== tutor_id) {
            return status(403, {
                success: false,
                message: `You are not authorized to add items into this course.`
            });
        };

        const contentURL = `${bucket_config.endpoint}/${finalizeData.fileKey}`;
        return await this.structureUpdate(
            tutor_id,
            {
                course_id: finalizeData.course_id,
                item_id: finalizeData.item_id,
                title: finalizeData.title,
                content: contentURL,
                content_type: finalizeData.content_type
            }
        )
    };

    async structureGet(tutor_id: string, item_id: string, course_id: string) {
        const course = await DB.query(DBUtil.courseOwnerCheck(), [course_id]) as Pick<courses, "tutor_id">[];
        if (course[0].tutor_id !== tutor_id) {
            return status(403, {
                success: false,
                message: `You are not authorized to read items from this course.`
            });
        };

        console.log(course_id);
        console.log(item_id)
        try {
            const readCourse = await DB.query(DBUtil.readStructureOne(), [
                item_id,
                course_id
            ]);

            if (readCourse.length === 0) {
                return status(404, {
                    success: false,
                    message: `Items ${item_id} does not exist.`
                });
            };

            return status(200, {
                success: true,
                message: `Successfully retrieved course ${item_id}`,
                output: readCourse
            })
        } catch (error) {
            console.error(error);
            return status(500, {
                success: false,
                message: `Failed to read course item due to internal server error.`
            })
        }
    };

    async structureDelete(tutor_id: string, item_id: string, course_id: string) {
        const course = await DB.query(DBUtil.courseOwnerCheck(), [course_id]) as Pick<courses, "tutor_id">[];
        if (course[0].tutor_id !== tutor_id) {
            return status(403, {
                success: false,
                message: `You are not authorized to delete items from this course.`
            });
        };

        try {
            const deleteItem = await DB.query(DBUtil.deleteStructure(), [
                item_id,
                course_id
            ]);

            if (deleteItem.length === 0) {
                return status(404, {
                    success: false,
                    message: `Items ${item_id} does not exist.`
                });
            };

            return status(200, {
                success: true,
                message: `Successfully deleted item ${item_id} from the system.`,
                output: deleteItem
            })
        } catch (error) {
            console.error(error);
            return status(500, {
                success: false,
                message: `Failed to delete item from course due to internal server error.`
            })
        }
    };
}