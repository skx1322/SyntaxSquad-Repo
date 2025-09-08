export type user_role =
    "Student" |
    "Tutor" |
    "Admin";
export interface user {
    user_id: string,
    username: string,
    email: string,
    password_hash: string,
    avatar: File | string,
    role: user_role,
    created_at: Date,
};

export type login = Pick<user, "username" | "password_hash">;
export type register = Pick<user, "username" | "email" | "password_hash" | "avatar">;
export type studentID = Pick<user, "user_id">;
export type studentDocument = Omit<user, "password_hash">;

export interface studentCourse extends studentDocument, user_preferences{};
export interface userTransaction extends studentDocument, transactions{};

export interface user_preferences {
    preference_id: string,
    user_id: string,
    category_id: string,
};

export interface transactions {
    transaction_id: string,
    user_id: string,
    course_id: string,
    amount: number,
    transaction_date: Date,
};

export interface courses {
    course_id: string,
    title: string,
    description: string,
    tutor_id: string,
    category_id: string,
    created_at: string,
    user: studentID[],
}

export interface course_items {
    item_id: string,
    course_id: string,
    title: string,
    content: string,
    content_type: "Video" | "Image" | "Slides",
    created_at: Date,
}

export interface course_categories {
    category_id: string,
    category_name: string,
    description: string,
}