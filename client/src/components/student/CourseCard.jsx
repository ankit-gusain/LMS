import { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

function CourseCard({ course }) {
    const { currency, calculateRating } = useContext(AppContext);

    return (
        <Link
            to={"/courses/" + course._id}
            onClick={() => { scrollTo(0, 0) }}
            className="border border-gray-300 rounded-lg pb-6 mt-6 overflow-hidden">
            <div>
                <img src={course.courseThumbnail} alt="" className="w-full" />
                <div className="p-3 text-left">
                    <h3 className="text-base font-semibold">{course.courseTitle}</h3>
                    <p className="text-gray-600">{course.educator.name}</p>
                    <div className="flex items-center space-x-2">
                        <p>{calculateRating(course)}</p>

                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <img key={i}
                                    src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank}
                                    alt=""
                                    className="w-3.5 h-3.5" />
                            ))}
                        </div>

                        <p className="text-gray-600 ">
                            {Math.floor(calculateRating(course))} 
                        </p>

                    </div>
                    <p className="text-base font-semibold text-gray-700">{currency}{(course.coursePrice - (course.discount * course.coursePrice / 100)).toFixed(2)}</p>
                </div>
            </div>
        </Link>
    );
}

export default CourseCard;
