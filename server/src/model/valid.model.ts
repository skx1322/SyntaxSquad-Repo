import Elysia, { t } from "elysia";


export const userModel = new Elysia().model({
    login_body: t.Object({
        username: t.String(),
        password_hash: t.String()
    }),
    register: t.Object({
        username: t.String(),
        email: t.String(),
        password_hash: t.String(),
        user_avatar: t.Union([
            t.String(),
            t.File()
        ])
    }),
    update_profile: t.Partial(t.Object({
        username: t.String(),
        user_avatar: t.Union([
            t.String(),
            t.File()
        ])
    })),
    preference: t.Object({
        user_id: t.String(),
        category_id: t.String()
    })
});

export const categoryModel = new Elysia().model({

});

export const tutorModel = new Elysia().model({
    portfolio: t.Object({
        bio: t.String(),
        certifications: t.String(),
        experience: t.Optional(t.Object({
            company: t.String(),
            position: t.String(),
            startDate: t.Date(),
            endDate: t.Nullable(t.Date()),
            description: t.String(),
            isCurrent: t.Boolean(),
        })),
        portfolio_url: t.String()
    }),
    portfolio_update: t.Partial(t.Object({
        bio: t.String(),
        certifications: t.String(),
        experience: t.Optional(t.Object({
            company: t.String(),
            position: t.String(),
            startDate: t.Date(),
            endDate: t.Nullable(t.Date()),
            description: t.String(),
            isCurrent: t.Boolean(),
        })),
        portfolio_url: t.String()
    }))
});

export const courseModel = new Elysia().model({

});

export const utilModel = new Elysia().model({

});