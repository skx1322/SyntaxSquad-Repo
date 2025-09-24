import * as React from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import {
  commentReplies,
  courseComment,
  courseDetailBrief,
  courseStrucutre,
} from "../data/static.data";
import type { commentData, courseData } from "../types/types";

const Detail = () => {
  const [courseDetail, setCourseDetail] = React.useState<courseData>();
  const [commentData, setCommentData] = React.useState<commentData[]>([]);

  const courseID = useParams().courseID;
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = () => {
      const course = courseDetailBrief.find(
        (data) => data.courseID === courseID
      );
      if (!course) {
        navigate("/catalog");
        toast.error("Course Not Found!");
        return;
      }
      setCourseDetail(course);

      const comments = courseComment.filter(
        (data) => data.courseID === courseID
      );
      setCommentData(comments);
    };

    fetchData();
  }, [courseID, navigate]);

  if (!courseID) {
    navigate("/catalog");
    toast.error("Course Not Found!");
  }

  if (!courseDetail) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-color-background py-12 px-6 lg:px-24">
      <section className="flex flex-col md:flex-row gap-8 items-center bg-white p-6 rounded-xl shadow-md mb-12">
        <img
          src={courseDetail.courseImage}
          alt={courseDetail.courseName}
          className="w-full md:w-1/4 rounded-xl object-cover"
        />
        <article className="flex flex-col gap-4 text-start w-full md:w-1/1">
          <h1 className="text-3xl sm:text-4xl font-bold text-color-primary">
            {courseDetail.courseName}
          </h1>
          <p className="text-color-text">{courseDetail.courseDescription}</p>
          <div className="flex flex-wrap gap-2">
            {courseDetail.courseCategory.map((category, index) => (
              <span
                key={index}
                className="bg-secondary/80 text-white text-xs font-semibold px-3 py-1 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
          <p className="text-gray-600 font-semibold">
            From:{" "}
            <span className="text-color-primary">
              {courseDetail.courseTutor}
            </span>
          </p>
        </article>
      </section>

      <section className="flex flex-col lg:flex-row gap-8 mb-12">
        <div className="flex-1 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-color-text mb-4">
            Course Structure
          </h2>
          <div className="flex flex-col gap-4">
            {courseStrucutre.map((data, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg bg-gray-100"
              >
                <span className="text-color-primary text-xl font-bold w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                  {data.structureOrder}
                </span>
                <h1 className="text-lg font-medium text-color-text">
                  {data.structureName}
                </h1>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/3 bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center">
          <h2 className="text-3xl font-extrabold text-color-primary mb-2">
            ${courseDetail.coursePrice}
          </h2>
          <p className="text-sm text-gray-500 mb-4">One-time payment</p>
          <div className="w-full flex flex-col gap-2 mb-6">
            <div className="flex justify-between items-center text-color-text font-medium">
              <span>Students</span>
              <span>{courseDetail.courseStudents}</span>
            </div>
            <div className="flex justify-between items-center text-color-text font-medium">
              <span>Released On</span>
              <span>{courseDetail.courseRelease}</span>
            </div>
          </div>
          <button className="w-full py-3 rounded-lg bg-color-accent text-white font-bold text-lg hover:bg-color-primary transition-colors duration-300">
            Register for {courseDetail.courseName}
          </button>
        </div>
      </section>

      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-color-text mb-6">Comments</h2>
        {commentData?.length > 0 ? (
          <div className="space-y-6">
            {commentData?.map((data, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-gray-100 rounded-lg shadow-sm"
              >
                <img
                  src={data.commentProfile}
                  alt={data.commentUser}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-color-text">
                      {data.commentUser}
                    </h3>
                    <div className="flex text-yellow-500">
                      {[...Array(data.commentRating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {data.commentContent}
                  </p>
                  <div className="pl-6 border-l-2 border-color-secondary mt-4">
                    {commentReplies?.map((reply, replyIndex) => (
                      <div
                        key={replyIndex}
                        className="flex items-start gap-4 mb-2"
                      >
                        <img
                          src={reply.commentProfile}
                          alt={reply.commentUser}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-color-primary">
                            {reply.commentUser}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {reply.commentContent}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 italic">
            No comments yet. Be the first to leave one!
          </p>
        )}
      </section>
    </main>
  );
};

export default Detail;
