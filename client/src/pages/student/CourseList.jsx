import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import Searchbar from "../../components/student/Searchbar";
import { useParams } from "react-router-dom";
import CourseCard from "../../components/student/CourseCard";
import { useState } from "react";
import { assets } from "../../assets/assets";


const CourseList = () => {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();
  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice()

      input ?
        setFilteredCourse(tempCourses.filter(item => item.courseTitle.toLowerCase().includes(input.toLowerCase()))) :
        setFilteredCourse(tempCourses)
    }
  }, [allCourses, input]);

  return (
    <div className="relative md:px-36 px-8 pt-20 text-left bg-gradient-to-b from-gray-300 to-white">
      <div className="flex md:flex-row flex-col justify-between items-start w-full">
        <div>
          <h1 className="text-4xl font-bold text-green-800">Course list</h1>
          <p className="text-black">
            <span className="text-green-800 cursor-pointer" onClick={() => navigate("/")}>Home</span> /
            <span className="text-gray-900"> Course List</span>
          </p>
        </div>
        <Searchbar data={input} />
      </div>

      {
        input &&
        <div className="inline-flex items-center gap-4 px-4 py-2 border border-green-950 mt-8 mb-8 text-gray-800">
          <p>{input}</p>
          <img src={assets.cross_icon} alt="" className="cursor-pointer" onClick={() => navigate("/course-list")} />
        </div>

      }
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-2 md:px-0 my-16 mt-8">
        {filteredCourse.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
