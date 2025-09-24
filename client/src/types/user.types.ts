export type user_role =
    "Student" |
    "Tutor" |
    "Admin";

export interface user {
    user_id: string,
    username: string,
    email: string,
    password_hash: string,
    user_avatar: File | string,
    role: user_role,
    created_at: Date,
};

export type login = Pick<user, "username" | "password_hash">;
export type register = Pick<user, "username" | "email" | "password_hash" | "user_avatar">;
export type profile = Partial<Pick<user, "username" | "user_avatar">>
export type studentID = Pick<user, "user_id">;
export type studentDocument = Omit<user, "password_hash">;