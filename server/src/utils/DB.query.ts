export namespace DBUtil {
    export function registerUser() {
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

    export function checkUserMulti() {
        return `SELECT (user_id, username, email, role, avatar) FROM users WHERE user_id = $1 OR username = $1 OR email = $1`;
    };

    export function findUserOne(all?: boolean) {
        if (all) {
            return `SELECT * FROM users WHERE user_id = $1 OR email = $1 OR username = $1 LIMIT 1`;
        }
        else {
            return `SELECT (user_id, username, email, role, avatar) FROM users WHERE user_id = $1 OR email = $1 LIMIT 1`;
        }
    };

    export function findUserMulti() {

    };

    export function createCategory() {
        return `INSERT INTO course_categories (category_id, category_name, description) VALUES ($1, $2, $3)`;
    };

    export function updateCategory() {
        return `UPDATE course_categories (category_id, category_name, description) VALUES ($1, $2, $3)`;
    }

    export function findCategoryOne() {
        return `SELECT * FROM course_categories WHERE category_id = $1 OR category_name = $1 LIMIT 1`;
    };

    export function deleteCategoryOne() {
        return `DELETE FROM course_categories WHERE category_id = $1`
    }

    export function createUserPreference() {
        return `
            insert into
            user_preferences (
                "preference_id",
                "user_id",
                "category_id",
            )
            values
            ($1, $2, $3)
        `
    };

    export function updateUserPreferecen() {
        return `
            UPDATE  
            user_preferences SET
            category_id = $1
            WHERE preference_id = $2 AND user_id = $3
        `
    };

    export function getUserPreference() {
        return `
            SELECT * FROM user_preferences WHERE user_id = $1
        `
    };

    export function createCourse() {
        return `
            INSERT INTO
            courses (
                "courses_id",
                "course_thumbnail",
                "title",
                "description",
                "tutor_id",
                "category_id",
            )
            VALUES
            ($1, $2, $3, $4, $5, $6)
        `
    };

    export function readCourse(detail: boolean = false) {
        return `
            SELECT * FROM courses WHERE courses_id = $1 OR title = $1 LIMIT 1
        `
    };

    export function updateCourse() {
        return `UPDATE courses (course_thumbnail, title, description, category_id) VALUES ($1, $2, $3, $4)
                WHERE courses_id = $1
        `;
    };

    export function deleteCourse() {
        return `DELETE FROM courses WHERE category_id = $1`
    };

    export function createStructure() {
        return `INSERT INTO
        course_items(
            "item_id",
            "courses_id",
            "title",
            "content",
            "content_type",
        )
        VALUES
            ($1, $2, $3, $4, $5)
        `
    };

    export function readStructure() {
        return `
            SELECT * FROM course_items WHERE courses_id = $1 
        `
    };

    export function updateStructure() {
        return `UPDATE course_items (title, content, content_type) VALUES ($1, $2, $3) WHERE item_id = $1 AND courses_id = $2`;
    };

    export function deleteStructure(multi: boolean = false) {
        return `DELETE FROM course_items WHERE item_id = $1 AND courses_id = $2`
    };

    export function createTransaction() {

    };

    export function readTransaction(all: boolean = false) {

    };

    export function updateTransaction() {

    };


};
