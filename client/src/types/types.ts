export interface APIResponse<T> {
    success: boolean,
    message: string,
    output?: T
};

export interface commentData {
    courseID: string,
    commentID: string,
    commentUser: string,
    commentProfile: string,
    commentContent: string,
    commentPost: string,
    commentRating: number,
};

export interface replyData {
    commentID: string,
    commentUser: "Fu Hua",
    commentProfile: string,
    commentContent: string,
    commentPost: string,
};

export interface courseData {
    courseID: string,
    courseName: string,
    courseTutor: string,
    courseDescription: string
    courseCategory: string[],
    coursePrice: string,
    courseImage: string,
    courseRelease: string,
    courseStudents: number,
}