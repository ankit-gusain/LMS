import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import CourseCard from "./CourseCard";

function CoursesSection() {

    const { allCourses } = useContext(AppContext)

    return (
        <div className="py-24 md:px-40 px-8">
            <h2 className="text-3xl font-medium text-green-800">Learn from the best</h2>
            <p className="text-sm md:text-base text-gray-600 mt-3">
                Explore our top-rated courses across diverse categories. Whether it's coding, <br />
                design, business, or wellness, our expertly crafted courses ensure real results.
            </p>

            <div className="grid grid-cols-auto px-4 md:px-0 md:my-16 gap-4">
                {
                    allCourses.slice(0, 4).map(
                        (course, index) => <CourseCard key={index} course={course} />
                    )
                }
            </div>

            <div className="flex justify-center">
                <Link
                    to={"/course-list"}
                    onClick={() => scrollTo(0, 0)}
                    className="text-gray-800 border border-gray-300 px-6 py-3 mt-4 md:mt-16 rounded"
                >
                    Show all Courses
                </Link>
            </div>
        </div>
    );
}

export default CoursesSection;