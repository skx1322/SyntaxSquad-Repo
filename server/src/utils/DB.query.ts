export namespace DBUtil { 
    export function registerUser(){
        return `
            insert into
            users (
                "user_id",
                "username",
                "email",
                "password_hash",
                "role",
                "user_avatar",
                "created_at"
            )
            values
            ($1, $2, $3, $4, $5, $6, default)
        `
    };

    export function checkNameMulti(){

    };

    export function checkEmailMulti(){

    };

    export function findUserOne(all?: boolean){
        if (all) {
            return `SELECT * FROM users WHERE user_id = $1 OR email = $1 OR username = $1 LIMIT 1`;
        }
        else {
            return `SELECT (user_id, username, email, role, avatar) WHERE user_id = $1 OR email = $1 LIMIT 1`;
        }
    };

    export function findUserMulti(){

    };

    export function createUserPreference(){

    };
};
