import Elysia, { ElysiaCustomStatusResponse, status, t } from "elysia";
import { userMidware } from "../middleware/auth";
import { courseModel } from "../model/valid.model";
import { COURSE_DB } from "../service/course.db";

const courseCall = new Elysia({ name: "/course" })
courseCall.group("/config", (courseApp) =>
    courseApp
        .use(userMidware)
        .use(courseModel)
        .post("", async ({ body, getUser }) => {
            if (getUser instanceof ElysiaCustomStatusResponse) {
                return getUser;
            };
            if (getUser.role === "Student") {
                return status(401, {
                    success: false,
                    message: `Student are not allowed to create course.`
                });
            };

            return await new COURSE_DB().createCourse(body, getUser.user_id);
        }, {
            body: "course_create"
        })
        .get("/partial-one/:course_id", async ({ params: { course_id }, getUser }) => {
            if (getUser instanceof ElysiaCustomStatusResponse) {
                return getUser;
            };
            if (getUser.role === "Student") {
                return status(401, {
                    success: false,
                    message: `Student are not allowed to create course.`
                });
            };

            return await new COURSE_DB().getCoursePartialOne(course_id, getUser.user_id);
        }, {
            params: "course_partial_one"
        })
        .get("/full/:course_id", async ({ params: { course_id }, getUser }) => {
            if (getUser instanceof ElysiaCustomStatusResponse) {
                return getUser;
            };
            if (getUser.role === "Student") {
                return status(401, {
                    success: false,
                    message: `Student are not allowed to create course.`
                });
            };

            return await new COURSE_DB().getCourseFull(course_id, getUser.user_id);
        }, {
            params: "course_partial_one"
        })
        .put("", async ({ body: { course_id, title, description, course_thumbnail, category_id }, getUser }) => {
            if (getUser instanceof ElysiaCustomStatusResponse) {
                return getUser;
            };
            if (getUser.role === "Student") {
                return status(401, {
                    success: false,
                    message: `Student are not allowed to create course.`
                });
            };

            return await new COURSE_DB().updateCourse(getUser.user_id, course_id, { title, description, course_thumbnail, category_id });
        }, {
            body: "course_update"
        })
        .delete("", async ({ body: { course_id }, getUser }) => {
            if (getUser instanceof ElysiaCustomStatusResponse) {
                return getUser;
            };
            if (getUser.role === "Student") {
                return status(401, {
                    success: false,
                    message: `Student are not allowed to create course.`
                });
            };

            return await new COURSE_DB().deleteCourse(getUser.user_id, course_id);
        }, {
            body: "course_partial_one"
        })
);

courseCall.group("/items", (itemApp) =>
    itemApp
        .use(userMidware)
        .post("", () => {

        })
        .get("", () => {

        })
        .put("", () => {

        })
        .delete("", () => {

        })
);

export default courseCall;