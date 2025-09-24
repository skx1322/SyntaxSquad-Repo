import type { commentData } from "../types/types";

export const courseData = [
  {
    courseID: "ND-1322",
    courseName: "NodeJS + ExpressJS Course",
    courseTutor: "Kai Xing",
    courseDescription:
      "A course that briefly teaches to use NodeJS a JavaScript Runtime and ExpressJS a simple backend framework.",
    courseCategory: ["NodeJS", "JavaScript", "Express"],
    coursePrice: "9.99",
    courseImage:
      "https://nerdantabucket0.sgp1.cdn.digitaloceanspaces.com/test/FuHua27.png",
    courseRelease: "5-9-2025",
    courseStudents: 20,
  },
  {
    courseID: "TS-54",
    courseName: "BunSH + ElysiaJS",
    courseTutor: "Kai Xing",
    courseDescription:
      "Learn about BunSH, a powerful alternative of NodeJS with full TypeScript integration along with ElysiaJS, end-to-end and fast backend framewor.",
    courseCategory: ["Bun", "TypeScript", "ElysiaJS"],
    coursePrice: "3.99",
    courseImage:
      "https://nerdantabucket0.sgp1.cdn.digitaloceanspaces.com/test/FuHua30.png",
    courseRelease: "7-9-2025",
    courseStudents: 53,
  },
  {
    courseID: "ND-1322",
    courseName: "Vite ReactJS + TypeScript",
    courseTutor: "Kai Xing",
    courseDescription:
      "Preparing you to develop a robust and scalable frontend using ReactJS framework and TypeScript.",
    courseCategory: ["Vite", "React", "TypeScript"],
    coursePrice: "6.99",
    courseImage:
      "https://nerdantabucket0.sgp1.cdn.digitaloceanspaces.com/test/Sakura1.png",
    courseRelease: "2-10-2025",
    courseStudents: 30,
  },
];

export const developerData = [
  {
    developerName: "Sin Kai Xing",
    role: "Development Lead",
    image:
      "https://nerdantabucket0.sgp1.cdn.digitaloceanspaces.com/test/FuHua34.png",
    media: [
      {
        github: "https://github.com/skx1322/",
      },
    ],
  },
];

export const courseDetailBrief = [
  {
    courseID: "ND-1322",
    courseName: "NodeJS + ExpressJS Course",
    courseTutor: "Kai Xing",
    courseDescription:
      "A course that briefly teaches to use NodeJS a JavaScript Runtime and ExpressJS a simple backend framework.",
    courseCategory: ["NodeJS", "JavaScript", "Express"],
    coursePrice: "9.99",
    courseImage:
      "https://nerdantabucket0.sgp1.cdn.digitaloceanspaces.com/test/FuHua27.png",
    courseRelease: "5-9-2025",
    courseStudents: 20,
  },
];

export const courseStrucutre = [
  {
    structureOrder: 1,
    strucureID: "ND-1322-1",
    structureName: "Essential JavaScript",
  },
  {
    structureOrder: 2,
    strucureID: "ND-1322-2",
    structureName: "NodeJS + NPM",
  },
  {
    structureOrder: 3,
    strucureID: "ND-1322-3",
    structureName: "ExpressJS",
  },
  {
    structureOrder: 4,
    strucureID: "ND-1322-4",
    structureName: "EJS",
  },
  {
    structureOrder: 5,
    strucureID: "ND-1322-5",
    structureName: "QnA",
  },
];

export const courseComment: commentData[] = [
  {
    courseID: "ND-1322",
    commentID: "ND-1322-CC-1",
    commentUser: "Senti",
    commentProfile:
      "https://nerdantabucket0.sgp1.cdn.digitaloceanspaces.com/test/Senti3.png",
    commentContent: "C# is better!",
    commentPost: "6-9-2025",
    commentRating: 1,
  },
];

export const commentReplies = [
  {
    commentID: "ND-1322-CC-1",
    commentUser: "Fu Hua",
    commentProfile:
      "https://nerdantabucket0.sgp1.cdn.digitaloceanspaces.com/test/FuHua34.png",
    commentContent: "Whatever float your boat.",
    commentPost: "7-9-2025",
  },
];
