import Elysia, { t } from "elysia";


export const userModel = new Elysia().model({
    login_body: t.Object({
        username: t.String(),
        password: t.String()
    }),
    register: t.Object({
        username: t.String(),
        email_address: t.String(),
        password: t.String()
    })
})