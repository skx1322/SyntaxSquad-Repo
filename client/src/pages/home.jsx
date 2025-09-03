import * as React from "react";
import { Link } from "react-router-dom";
import {
  categoryData,
  commentData,
  heroData,
  orgData,
} from "../common/component.data";

const Home = () => {
  return (
    <main className="flex flex-col">
      <section className="bg-background py-12 lg:py-24 px-6 md:px-12 lg:px-24 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary">
          Affordable, Personalized and Active!
        </h1>
        <p className="text-text mt-4 max-w-2xl mx-auto">
          Learn any skill today! Personalize your skills and prepare you for a
          brighter future.
        </p>
        <div className="mt-8 space-x-4">
          <Link
            to="/get-started"
            className="bg-primary border-accent/70 border-2 text-background font-bold py-3 px-6 rounded-full hover:border-0 hover:bg-secondary transition-normal duration-300"
          >
            Get Started
          </Link>
          <Link
            to="/browse"
            className="border-2 border-accent/70 text-primary/60 font-bold py-3 px-6 rounded-full hover:border-0 hover:bg-primary hover:text-white transition-normal duration-300"
          >
            Browse
          </Link>
        </div>
      </section>

      <section className="py-12 md:py-20 px-6 md:px-36 text-center bg-white">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-text max-w-4xl mx-auto">
          Be recognized by people who have work experience across these
          organizations!
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-8 mt-10 items-center justify-items-center">
          {orgData.map((data, index) => (
            <span
              key={index}
              className="flex flex-col items-center text-center gap-2"
            >
              <img
                src={data.img}
                alt={data.orgName}
                className="h-16 w-auto object-contain"
              />
              <p className="text-text text-sm md:text-base font-medium mt-2">
                {data.orgName}
              </p>
            </span>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-20 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 bg-background">
        <div className="text-center md:text-left md:flex-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text">
            Top Courses in Site!
          </h1>
          <p className="mt-4 text-text max-w-lg">
            A lot of available courses! Qualified for various fields and
            affordable!
          </p>
        </div>
        <div className="w-full md:w-auto md:flex-1">
          <div className="grid grid-cols-2 gap-4">
            {heroData.map((data, index) => (
              <article
                key={index}
                className="flex flex-col text-center items-center"
              >
                <img
                  src={data.courseImg}
                  alt={data.courseName}
                  className="w-32 md:w-40 lg:w-48 rounded-lg shadow-md"
                />
                <h3 className="mt-2 text-base font-semibold text-text">
                  {data.courseName}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-6 md:px-36 bg-white">
        <div className="w-full overflow-x-auto mb-6">
          <div className="flex justify-between items-center text-center py-4 rounded-xl bg-accent/20 gap-x-4 min-w-[768px] md:px-24 px-4">
            {categoryData.map((data, index) => (
              <h1
                key={index}
                className="text-base font-semibold text-text whitespace-nowrap px-2 transform transistion-normal duration-500 py-2 rounded-2xl hover:bg-accent"
              >
                {data.category}
              </h1>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
          {heroData.slice(0, 3).map((data, index) => (
            <div key={index} className="relative group">
              <img
                src={data.courseImg}
                alt={data.courseName}
                className="w-full sm:w-64 md:w-80 rounded-2xl shadow-lg transition-opacity duration-500 group-hover:opacity-100 opacity-80"
              />
              <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/60 to-transparent rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h3 className="text-white text-lg font-bold">
                  {data.courseName}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-20 px-6 md:px-36 bg-background">
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text">
            What Our Users Say
          </h1>
          <p className="mt-2 text-text">
            Your feedback is our main driver for improvement!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {commentData.slice(0, 8).map((data, index) => (
            <div
              key={index}
              className="flex flex-col bg-white p-6 rounded-lg shadow-sm"
            >
              <p className="text-text text-sm italic">
                "{data.commentContent}"
              </p>
              <div className="flex items-center mt-4">
                <img
                  src={data.commentProfile}
                  alt={data.commentUser}
                  className="w-10 h-10 rounded-full object-cover mr-4"
                />
                <span className="flex flex-col">
                  <h3 className="text-primary font-bold">
                    {data.commentUser}
                  </h3>
                  <p className="text-xs text-gray-500">Learner</p>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
