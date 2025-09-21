import { status } from "elysia";
import { DB } from "../config/db.setup";
import { courses } from "../types/user.type";
import { BucektUtil } from "../utils/S3";
import { IDUtil } from "../utils/UUID";
import { DBUtil } from "../utils/DB.query";

export class COURSE_DB {
    async createCourse(courseData: Omit<courses, "tutor_id" | "course_id" | "created_at"> & { category_id: string[] }, tutor_id: string) {
        const { title, description, course_thumbnail, category_id } = courseData;
        const course_id = await IDUtil.NewUUID(1, false);

        try {
            let thumbnail = course_thumbnail;
            if (course_thumbnail instanceof File) {
                thumbnail = await BucektUtil.uploadImage(course_thumbnail, "public-read") as string;
            }

            await DB.query("BEGIN");
            const courseResult = await DB.query(DBUtil.createCourse(), [
                course_id,
                title,
                description,
                tutor_id,
                thumbnail
            ]);

            for (const category of category_id) {
                await DB.query(DBUtil.createCourseCategory(), [course_id, category]);
            };

            await DB.query(`COMMIT`);
            return status(201, {
                success: true,
                message: `Successfully created course ${title}.`,
                output: courseResult,
            });
        } catch (error) {
            DB.query('ROLLBACK');
            console.error(error);
            return status(500, {
                success: false,
                message: `Unable to create course due to internal server error.`
            })
        }
    };

    async updateCourse(course_id: string, courseData: Partial<Omit<courses, "course_id" | "tutor_id" | "created_at">> & { category_id?: string[] }) {
        const { title, description, course_thumbnail, category_id } = courseData;
        try {
            const isExist = await DB.query(DBUtil.readCourse(), [course_id]) as courses[];
            if (isExist.length === 0) {
                return status(404, {
                    success: false,
                    message: `Course ${course_id} does not exist.`
                });
            };
            await DB.query('BEGIN');

            let currentThumbnail = course_thumbnail ?? isExist[0].course_thumbnail as string;
            if (course_thumbnail instanceof File) {
                await BucektUtil.deleteImage(isExist[0].course_thumbnail as string);
                currentThumbnail = await BucektUtil.uploadImage(course_thumbnail, "public-read");
            }

            const result = await DB.query(DBUtil.updateCourse(), [
                title, description, currentThumbnail, course_id
            ]);
            if (category_id) {
                await DB.query(DBUtil.deleteCourseCategories(), [course_id])
                for (const category of category_id) {
                    await DB.query(DBUtil.createCourseCategory(), [course_id, category]);
                };
            };

            await DB.query('COMMIT');
            return status(200, {
                success: true,
                message: `Course ${title} successfully updated.`,
                ouput: result
            })

        } catch (error) {
            DB.query('ROLLBACK');
            console.error(error);
            return status(500, {
                success: false,
                message: `Unable to update course due to internal server error.`
            })
        }
    };

    async getCoursePartialOne(course_id: string) {
        try {
            const result = await DB.query(DBUtil.readCourseWithCategories(), [course_id]);
            if (result.length === 0) {
                return status(404, {
                    success: false,
                    message: `Course does not exist.`
                });
            };

            return status(200, {
                success: true,
                message: `Course retrieved successfully.`,
                output: result[0]
            })
        } catch (error) {
            console.error(error);
            return status(500, {
                success: false,
                message: `Unable to retrieve course due to internal server error.`
            })
        }
    };

    async getCourseFull() {

    };

    async deleteCourse(course_id: string) {
        try {
            const result = await DB.query(DBUtil.readCourse(), [course_id]) as courses[];
            if (result.length === 0) {
                return status(404, {
                    success: false,
                    message: `Course does not exist.`
                });
            };

            const deleteThumbnail = await BucektUtil.deleteImage(result[0].course_thumbnail as string)
            const deleteCourse = await DB.query(DBUtil.deleteCourse(), [course_id]);

            return status(200, {
                success: true,
                message: `Course retrieved successfully.`,
                output: deleteCourse
            })
        } catch (error) {
            console.error(error);
            return status(500, {
                success: false,
                message: `Unable to delete course due to internal server error.`
            })
        }
    };
}