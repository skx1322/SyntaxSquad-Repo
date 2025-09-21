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
    category_create: t.Object({
        category_name: t.String(),
        description: t.String()
    }),
    category_update: t.Object({
        category_id: t.String(),
        category_name: t.Optional(t.String()),
        description: t.Optional(t.String())
    }),
    category_search: t.Object({
        category_id: t.String(),
    })
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
    course_create: t.Object({
        title: t.String(),
        description: t.String(),
        course_thumbnail: t.Union([
            t.File(),
            t.String()
        ]),
        category_id: t.ArrayString(t.String()),
    }),
    course_update: t.Object({
        title: t.Optional(t.String()),
        description: t.Optional(t.String()),
        course_thumbnail: t.Optional(t.Union([
            t.File(),
            t.String()
        ])),
        course_id: t.String(),
        category_id: t.Optional(t.ArrayString(t.String())),
    }),
    course_partial_one: t.Object({
        course_id: t.String()
    })
});

export const courseItem = new Elysia().model({
    item_initialize: t.Object({
        course_id: t.String(),
        title: t.String(),
        content_type: t.UnionEnum(["Video", "Image", "Slide", "Link"]),
        filename: t.String()
    }),
    item_finalize: t.Object({
        course_id: t.String(),
        fileKey: t.String(),
        title: t.String(),
        content_type: t.UnionEnum(["Video", "Image", "Slide", "Link"]),
    })
})

export const utilModel = new Elysia().model({

});