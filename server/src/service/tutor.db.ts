import { status } from "elysia";
import { DB } from "../config/db.setup";
import { tutor_portfolio_map, tutor_portfolios } from "../types/user.type";
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

            const exp = JSON.stringify(portfolio.experience)

            const portfolioID = await IDUtil.NewUUID(1, false);
            const portfolioResult = await DB.query(DBUtil.createTutorPortfolio(), [
                portfolioID,
                user_id,
                portfolio.bio,
                portfolio.certifications,
                exp,
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

    async updateTutorPortfolio(tutor_id: string, portfolio: Partial<tutor_portfolio_map>) {
        try {
            const result = await DB.query(DBUtil.updateTutorPortfolio(), [
                portfolio.bio,
                portfolio.certifications,
                JSON.stringify(portfolio.experience),
                portfolio.portfolio_url,
                tutor_id
            ]);
            if (result.length === 0) {
                return status(404, {
                    success: false,
                    message: `Tutor portfolio not found within system.`
                });
            };

            return status(200, {
                success: true,
                message: `Tutor portfolio updated successfully.`,
                output: result[0]
            })
        } catch (error) {
            console.error(error);
            return status(500, {
                success: false,
                message: `Failed to update portfolio due to internal server error.`
            })
        }
    };

    async getTutor(user_id: string) {
        try {
            const result = await DB.query(DBUtil.getTutor(), [user_id]);
            if (result.length === 0) {
                return status(404, {
                    success: false,
                    message: `Tutor profile not found from the system.`,
                })
            }
            return status(200, {
                success: true,
                message: `Tutor profile successfully retrieved from the system.`,
                output: result[0]
            })
        } catch (error) {
            console.error(error);
            return status(500, {
                success: false,
                message: `Failed to retrieve from tutor data due to interanl server issue.`
            })
        }
    };

    async getTutorCourse(tutor_id: string) {
        try {
            const result = await DB.query(DBUtil.getTutorCourse(), [tutor_id])
            if (result.length === 0) {
                return status(404, {
                    success: false,
                    message: "Tutor does not have any existing course.",
                })
            }
            return status(200, {
                success: true,
                message: "Tutor's courses retrieved successfully.",
                output: result
            })
        } catch (error) {
            console.error(error);
            return status(500, {
                success: false,
                message: `Failed to retrieve courses due to internal server error.`
            })
        }
    };

    async demoteTutor(tutor_id: string) {
        try {
            await DB.query('BEGIN');

            const updateResult = await DB.query(DBUtil.updateUserRoleDemote(), [tutor_id]);

            const deleteResult = await DB.query(DBUtil.deleteTutorPortfolio(), [tutor_id]);

            await DB.query('COMMIT');

            if (updateResult.length === 0) {
                return status(404, {
                    success: false,
                    message: "User not found or already a student."
                });
            }
            return status(200, {

                success: true,
                message: `User successfully demoted to Student.`
            })
        } catch (error) {
            console.error(error);
            await DB.query('ROLLBACK');
            return status(500, {
                success: false,
                message: `Failed to demote user due to internal server error.`,
            })
        }
    }
}