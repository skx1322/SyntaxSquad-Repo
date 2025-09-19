import Elysia, { ElysiaCustomStatusResponse, status } from "elysia";
import { userMidware } from "../middleware/auth";
import { user } from "../types/user.type";
import { TUTOR_DB } from "../service/tutor.db";
import { tutorModel } from "../model/valid.model";

const tutorAccount = new Elysia({ name: "/tutor" })
tutorAccount.group("", (authApp) =>
    authApp
        .use(userMidware)
        .use(tutorModel)
        .post("/register", async ({ getUser, body }) => {
            if (getUser instanceof ElysiaCustomStatusResponse) {
                return getUser;
            };

            return await new TUTOR_DB().becomeTutor(getUser.user_id, body);
        }, {
            body: "portfolio"
        })
        .get("/", async ({ getUser }) => {
            if (getUser instanceof ElysiaCustomStatusResponse) {
                return getUser;
            };
            return await new TUTOR_DB().getTutor(getUser.user_id)
        })
        .put("/", async ({ getUser, body }) => {
            if (getUser instanceof ElysiaCustomStatusResponse) {
                return getUser;
            };

            return await new TUTOR_DB().updateTutorPortfolio(getUser.user_id, body);
        }, {
            body: "portfolio_update"
        })
        .get("/course", async ({ getUser }) => {
            if (getUser instanceof ElysiaCustomStatusResponse) {
                return getUser;
            };

            return await new TUTOR_DB().getTutorCourse(getUser.user_id);
        })
        .delete("/change", async({ getUser }) => {
            if (getUser instanceof ElysiaCustomStatusResponse) {
                return getUser;
            };

            return await new TUTOR_DB().demoteTutor(getUser.user_id);
        })
);


export default tutorAccount;