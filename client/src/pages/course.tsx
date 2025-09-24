import * as React from "react";
import { courseData } from "../data/static.data";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const Course = () => {
  const paginationSize = 5;
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalPages = Math.ceil(courseData.length / paginationSize);

  const indexOfLastItem = currentPage * paginationSize;
  const indexOfFirstItem = indexOfLastItem - paginationSize;
  const currentCourses = courseData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <main className="min-h-screen bg-background py-12 px-6 lg:px-24">
      <section className="pb-12">
        <h1 className="text-3xl font-bold text-start text-primary mb-8">
          Most Popular Choice!
        </h1>
        <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courseData
            .filter((course) => course.courseStudents > 10)
            .sort((x, y) => y.courseStudents - x.courseStudents)
            .slice(0, 3)
            .map((data, index) => (
              <div
                key={index}
                className="relative group flex flex-col items-center justify-center max-w-xl shadow-lg rounded-xl overflow-hidden"
              >
                <img
                  src={data.courseImage}
                  alt={data.courseName}
                  className="w-full sm:w-64 md:w-80 transition-opacity duration-500 group-hover:opacity-100 opacity-80"
                />
                <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t rounded-xl from-black/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <h3 className="text-white text-lg font-bold">
                    {data.courseName}
                  </h3>
                </div>
              </div>
            ))}
        </div>
      </section>

      <hr className="my-12 border-secondary" />

      <section>
        <div className="flex flex-col sm:flex-row justify-between items-center border-b-2 border-gray-300 pb-4 mb-8">
          <h1 className="text-3xl font-bold text-primary mb-4 sm:mb-0">
            All Courses
          </h1>
          <form className="w-full sm:w-auto">
            <input
              type="search"
              placeholder="Search for courses..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </form>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <section className="md:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-text">
                Filter Options
              </h2>
              <p className="text-gray-500">filt here, work in progress lol</p>
            </div>
          </section>

          <section className="md:w-3/4">
            <div className="grid grid-cols-1 gap-6">
              {currentCourses.map((data, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-xl shadow-md transform transition-all duration-300 hover:shadow-xl"
                >
                  <img
                    src={data.courseImage}
                    alt={data.courseName}
                    className="w-full sm:w-48 h-auto sm:h-36 object-cover"
                  />
                  <article className="flex-1 flex flex-col justify-between text-start">
                    <h1 className="text-xl font-bold text-text">
                      {data.courseName} from <b className="cursor-pointer text-accent underline">{data.courseTutor}</b>
                    </h1>
                    <p className="text-sm text-gray-600 my-2">
                      {data.courseDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 my-2">
                      {data.courseCategory.map((category, catIndex) => (
                        <span
                          key={catIndex}
                          className="bg-secondary/80 text-white text-xs px-3 py-1 rounded-full transition-all duration-300 hover:bg-accent hover:scale-105"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <span className="bg-gray-200 text-gray-800 text-sm font-semibold px-3 py-1 rounded">
                          Price: RM {data.coursePrice}
                        </span>
                        <span className="bg-gray-200 text-gray-800 text-sm font-semibold px-3 py-1 rounded">
                          Released: {data.courseRelease}
                        </span>
                        <span className="bg-gray-200 text-gray-800 text-sm font-semibold px-3 py-1 rounded">
                          Participant: {data.courseStudents}
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/course/${data.courseID}`}
                      className="mt-2 bg-accent w-fit text-center text-white font-semibold px-4 py-2 rounded-lg transition-normal duration-300 hover:bg-primary"
                    >
                      Detail Here
                    </Link>
                  </article>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center space-x-2 mt-12">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="p-3 rounded-full bg-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-normal duration-200"
              >
                <FaArrowLeft />
              </button>
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 rounded-full font-semibold transition-normal duration-500
                    ${
                      currentPage === number
                        ? "bg-primary/80 text-white"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="p-3 rounded-full bg-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-normal duration-500"
              >
                <FaArrowRight />
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Course;
