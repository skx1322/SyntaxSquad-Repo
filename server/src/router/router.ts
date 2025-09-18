import Elysia from "elysia";
import userAccount from "../controllers/user.controller";
import { CorsDefault, CorsLogout } from "../config/cors.config";
import logoutAccount from "../controllers/session.controller";
import tutorAccount from "../controllers/tutor.controller";
import categoryCall from "../controllers/category.controller";
import courseCall from "../controllers/course.controller";
import publicCall from "../controllers/public.controller";

const router = new Elysia({ prefix: "/api", name: "main-router" });

router.group("/user", (user)=>
    user
        .use(CorsLogout)
        .use(logoutAccount)
);

router.group("/user", (user) =>
    user
        .use(CorsDefault)
        .use(userAccount)
);

router.group("/tutor", (tutor)=>
    tutor
        .use(CorsDefault)
        .use(tutorAccount)
);

router.group("/category", (category)=>
    category
        .use(CorsDefault)
        .use(categoryCall)
);

router.group("/course", (course)=>
    course
        .use(CorsDefault)
        .use(courseCall)
);

router.group("/public-api", (user)=>
    user
        .use(CorsDefault)
        .use(publicCall)
);



export default router;
