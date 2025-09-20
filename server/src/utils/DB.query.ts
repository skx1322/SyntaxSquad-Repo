export namespace DBUtil {
    export function registerUser() {
        return `
            INSERT INTO
            users (
                user_id,
                username,
                email,
                role,
                password_hash,
                user_avatar
            )
            VALUES
            ($1, $2, $3, $4, $5, $6)
        `;
    };

    export function userProfile() {
        return `
            UPDATE users
            SET
                username = COALESCE($1, username),
                user_avatar = COALESCE($2, user_avatar)
                WHERE user_id = $3
            RETURNING user_id, username, email, user_avatar;
    `;
    }

    export function checkUserMulti() {
        return `
            SELECT user_id, username, email, role, user_avatar FROM users WHERE user_id = $1 OR username = $1 OR email = $1;
        `;
    };

    export function findUserOne(all?: boolean) {
        if (all) {
            return `SELECT * FROM users WHERE user_id = $1 OR email = $1 OR username = $1 LIMIT 1`;
        }
        else {
            return `SELECT user_id, username, email, role, user_avatar FROM users WHERE user_id = $1 OR email = $1 LIMIT 1`;
        }
    };

    export function findUserMulti() {
        return `SELECT user_id, username, email, role, user_avatar FROM users;`;
    };

    export function findAllCategories() {
        return `SELECT * FROM categories;`;
    }

    export function createCategory() {
        return `INSERT INTO categories (category_id, category_name, description) VALUES ($1, $2, $3) RETURNING category_id;`;
    };

    export function updateCategory() {
        return `UPDATE categories SET category_name = $2, description = $3 WHERE category_id = $1 RETURNING category_name;`;
    }

    export function findCategoryOne() {
        return `SELECT * FROM categories WHERE category_id = $1 OR category_name = $1 LIMIT 1;`;
    };

    export function deleteCategoryOne() {
        return `DELETE FROM categories WHERE category_id = $1 RETURNING category_id;`;
    }

    export function createUserPreference() {
        return `
            INSERT INTO
            user_preferences (
                preference_id,
                user_id,
                category_id
            )
            VALUES
            ($1, $2, $3)
            RETURNING preference_id;
        `;
    };

    export function updateUserPreferecen() {
        return `
            UPDATE user_preferences 
            SET category_id = $1
            WHERE preference_id = $2 AND user_id = $3;
        `;
    };

    export function getUserPreference() {
        return `
            SELECT * FROM user_preferences WHERE user_id = $1;
        `
    };

    export function createCourse() {
        return `
           INSERT INTO
            courses (
                course_id,
                title,
                description,
                tutor_id,
                category_id
            )
            VALUES
            ($1, $2, $3, $4, $5)
            RETURNING course_id;
        `
    };

    export function readCourse(detail: boolean = false) {
        return `
            SELECT * FROM courses WHERE course_id = $1 OR title = $1 LIMIT 1;
        `
    };

    export function updateCourse() {
        return `
            UPDATE courses 
            SET title = $2, description = $3, category_id = $4
            WHERE course_id = $1;
        `;
    };

    export function deleteCourse() {
        return `DELETE FROM courses WHERE course_id = $1;`;
    };

    export function createStructure() {
        return `
            INSERT INTO
            course_items (
                item_id,
                course_id,
                title,
                content,
                content_type
            )
            VALUES
            ($1, $2, $3, $4, $5)
            RETURNING item_id;
        `;
    };

    export function readStructure() {
        return `
            SELECT * FROM course_items WHERE course_id = $1;
        `
    };

    export function updateStructure() {
        return `UPDATE course_items SET title = $1, content = $2, content_type = $3 WHERE item_id = $4 AND course_id = $5;`;
    };

    export function deleteStructure(multi?: boolean) {
        if (multi) {
            return `DELETE FROM course_items WHERE course_id = $1;`;
        } else {
            return `DELETE FROM course_items WHERE item_id = $1 AND course_id = $2;`;
        }
    };

    export function createTransaction() {
        return `
            INSERT INTO transactions (transaction_id, user_id, course_id, amount, status)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING transaction_id;
        `;
    };

    export function readTransaction(all: boolean = false) {
        if (all) {
            return `SELECT * FROM transactions;`;
        } else {
            return `SELECT * FROM transactions WHERE user_id = $1;`;
        }
    };

    export function updateTransaction() {
        return `
            UPDATE transactions
            SET status = $2
            WHERE transaction_id = $1;
        `;
    };

    export function roleConfig() {
        return `
                UPDATE users
                SET role = $1
                WHERE user_id = $2
                RETURNING user_id, role;
            `;
    };

    export function updateUserRoleDemote() {
        return `UPDATE users SET role = 'Student' WHERE user_id = $1;`;
    }

    export function deleteTutorPortfolio() {
        return `DELETE FROM tutor_portfolios WHERE tutor_id = $1;`;
    }


    export function createTutorPortfolio() {
        return `
            INSERT INTO tutor_portfolios (
                portfolio_id,
                tutor_id,
                bio,
                certifications,
                experience,
                portfolio_url
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING portfolio_id;
        `;
    };

    export function updateTutorPortfolio() {
        return `
            UPDATE tutor_portfolios
            SET 
                bio = COALESCE($1, bio),
                certifications = COALESCE($2, certifications),
                experience = COALESCE($3::jsonb, experience),
                portfolio_url = COALESCE($4, portfolio_url),
                updated_at = CURRENT_TIMESTAMP
            WHERE tutor_id = $5
            RETURNING *;
        `;
    };

    export function getTutor() {
        return `
            SELECT
                u.user_id,
                u.username,
                u.email,
                u.user_avatar,
                u.role,
                p.bio,
                p.certifications,
                p.experience,
                p.portfolio_url
            FROM users u
            LEFT JOIN tutor_portfolios p ON u.user_id = p.tutor_id
            WHERE u.user_id = $1 AND u.role = 'Tutor'
            LIMIT 1;
        `;
    };

    export function getTutorCourse() {
        return `
            SELECT
                course_id,
                title,
                description,
                created_at,
                course_thumbnail
            FROM courses
            WHERE tutor_id = $1;
        `;
    }
};
