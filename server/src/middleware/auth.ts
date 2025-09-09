import {ElysiaCustomStatusResponse, status, type Elysia} from "elysia";
import { JWT_Login } from "../config/jwt.config";
import { USER_DB } from "../service/user.db";

export const userMidware = (app: Elysia) => 
    app
        .use(JWT_Login)
        .derive(async function handler({JWT_Login, cookie: {clev_session}}){
            const payload = await JWT_Login.verify(clev_session.value);
            if (!payload) {
                return status(401, {
                    success: false,
                    message: `Missing access token.`
                });
            }

            const { sessionID } = payload;
            const getUser = await new USER_DB().getUser(sessionID);
            return {getUser};
        });

export const userSessionDelete = (app: Elysia) => 
    app
        .use(JWT_Login)
        .derive(async function handler({JWT_Login, cookie: {clev_session}}){
            const payload = await JWT_Login.verify(clev_session.value);
            if (!payload) {
                return status(401, {
                    success: false,
                    message: `Missing access token.`
                });
            }

            const { sessionID } = payload;
            const getUser = await new USER_DB().getUser(sessionID);
            if (getUser instanceof ElysiaCustomStatusResponse) {
                return getUser;
            };
            
            delete clev_session.value;
            clev_session.remove();
            return status(200, {
                success: true,
                message: `Successfully logout.`,
                output: getUser.username
            })
        })