import { developerData } from "../common/static.data";
import {
  FaDollarSign,
  FaGithub,
  FaGraduationCap,
  FaUserCheck,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="min-h-screen bg-color-background py-12 px-6 lg:px-24">
      <section className="text-center my-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-color-primary mb-4">
          Our Philosophy
        </h1>
        <p className="text-lg text-color-text max-w-3xl mx-auto mb-12">
          We believe that quality education should be accessible to everyone.
          Our mission is to provide an affordable, flexible, and personalized
          learning experience that empowers students to succeed.
        </p>
        <div className="grid grid-cols-1 gap-8 md:px-36 px-4">
          <div className="flex items-start justify-start gap-16 bg-white p-8 rounded-xl shadow-md transform transition-transform duration-300 hover:-translate-y-2">
            <span className="">
              <FaDollarSign className="text-5xl text-color-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-color-text mb-2">
                Affordable
              </h2>
            </span>
            <p className="text-gray-600">
              We offer competitive pricing models and flexible payment plans to
              ensure that every student can get the help they need without
              breaking the bank.
            </p>
          </div>
          <div className="flex items-start justify-start gap-16 bg-white p-8 rounded-xl shadow-md transform transition-transform duration-300 hover:-translate-y-2">
            <p className="text-gray-600">
              Our platform matches students with tutors based on their unique
              needs, learning styles, and goals, creating a truly personalized
              learning journey.
            </p>
            <span>
              <FaGraduationCap className="text-5xl text-color-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-color-text mb-2">
                Personalized
              </h2>
            </span>
          </div>
          <div className="flex items-start justify-start gap-16 bg-white p-8 rounded-xl shadow-md transform transition-transform duration-300 hover:-translate-y-2">
            <span>
              <FaUserCheck className="text-5xl text-color-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-color-text mb-2">
                Flexible
              </h2>
            </span>
            <p className="text-gray-600">
              Learn on your own schedule with our wide range of course times and
              tutors, giving you the freedom to fit education into your busy
              life.
            </p>
          </div>
        </div>
      </section>

      <section className="pt-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-color-primary mb-12">
          Our Contributors
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {developerData.map((data, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105"
            >
              <img
                src={data.image}
                alt={data.developerName}
                className="w-32 h-32 rounded-full object-cover mb-4 shadow-sm"
              />
              <h2 className="text-xl font-bold text-color-text">
                {data.developerName}
              </h2>
              <p className="text-gray-500 mb-4">{data.role}</p>
              {data.media.map((social, mediaIndex) => (
                <div key={mediaIndex}>
                  {social.github && (
                    <Link
                      href={social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-color-primary hover:text-color-accent transition-colors duration-300"
                    >
                      <FaGithub className="text-3xl" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default About;
