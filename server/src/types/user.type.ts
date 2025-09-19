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

export interface tutor_portfolios {
    portfolio_id: string,
    tutor_id: string,
    bio: string,
    certifications: string,
    experience?: experiences,
    portfolio_url: string,
    created_at: Date
    updated_at: Date
}

export interface experiences {
    company: string,
    position: string,
    startDate: Date,
    endDate: Date | null,
    description: string,
    isCurrent: boolean
}

export type login = Pick<user, "username" | "password_hash">;
export type register = Pick<user, "username" | "email" | "password_hash" | "user_avatar">;
export type profile = Partial<Pick<user, "username" | "user_avatar">>
export type studentID = Pick<user, "user_id">;
export type studentDocument = Omit<user, "password_hash">;

export interface studentCourse extends studentDocument, user_preferences { };
export interface userTransaction extends studentDocument, transactions { };

export type tutor_portfolio_map = Omit<tutor_portfolios, "tutor_id" | "portfolio_id" | "created_at" | "updated_at">

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
    course_thumbnail: string
}

export interface course_items {
    item_id: string,
    course_id: string,
    title: string,
    content: string,
    content_type: "Video" | "Image" | "Slide" | "Link",
    created_at: Date,
}

export interface course_categories {
    category_id: string,
    category_name: string,
    description: string,
}

export type PartialInterface<T> = {
    [P in keyof T]: T[P] | undefined;
};
