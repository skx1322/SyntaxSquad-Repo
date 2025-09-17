import { DB } from "../config/db.setup";
import { tutor_portfolio_map } from "../types/user.type";
import { DBUtil } from "../utils/DB.query";

export class TUTOR_DB {
    async becomeTutor(user_id: string, portfolio: tutor_portfolio_map){
        await DB.query('BEGIN');

        const roleUpdateResult = await DB.query(DBUtil.roleConfig(), ['Tutor', user_id]);
        
    };

    async updateTutorPortfolio(){

    };  

    async getTutor(){

    };

    async getTutorCourse(){

    };
}