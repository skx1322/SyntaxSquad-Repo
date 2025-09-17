import { status } from "elysia";
import { DB } from "../config/db.setup";
import { tutor_portfolio_map } from "../types/user.type";
import { DBUtil } from "../utils/DB.query";
import { IDUtil } from "../utils/UUID";

export class TUTOR_DB {
    async becomeTutor(user_id: string, portfolio: tutor_portfolio_map) {
        try {
            await DB.query('BEGIN');

            const roleUpdateResult = await DB.query(DBUtil.roleConfig(), ['Tutor', user_id]);
            if (roleUpdateResult.length === 0) {
                await DB.query('ROLLBACK');
                return status(404, {
                    success: false,
                    message: `User not found`
                });
            };

            const portfolioID = await IDUtil.NewUUID(1, false);
            const portfolioResult = await DB.query(DBUtil.createTutorPortfolio(), [
                portfolioID,
                user_id,
                portfolio.bio,
                portfolio.certifications,
                portfolio.experience,
                portfolio.portfolio_url
            ]);

            await DB.query('COMMIT');
            return status(200, {
                success: true,
                message: `User successfully upgraded to Tutor.`,
                output: {
                    user_id: user_id,
                    new_role: 'Tutor',
                    portfolio: portfolioResult
                }
            })
        } catch (error) {
            await DB.query('ROLLBACK');
            console.error(error);
            return status(500, {
                success: false,
                message: "Failed to become a tutor due to internal server error."
            })
        }
    };

    async updateTutorPortfolio() {

    };

    async getTutor() {

    };

    async getTutorCourse() {

    };

    async demoteTutor(){
        
    }
}