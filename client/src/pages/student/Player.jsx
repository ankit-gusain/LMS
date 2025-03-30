import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "../../components/student/Footer";
import Rating from "../../components/student/Rating";

const Player = () => {

  const { enrolledCourses } = useContext(AppContext);
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);

  // Function to calculate chapter duration
  const calculateChapterDuration = (chapter) => {
    const totalMinutes = chapter.chapterContent.reduce((total, lecture) => total + lecture.lectureDuration, 0);
    return humanizeDuration(totalMinutes * 60 * 1000, {
      units: ['h', 'm'],
      round: true,
      delimiter: ' ',
    });
  };

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getCourseData = () => {
    const foundCourse = enrolledCourses.find((course) => course._id === courseId);
    if (foundCourse) {
      setCourseData(foundCourse);
    }
  };

  useEffect(() => {
    getCourseData();
  }, [enrolledCourses]);

  return (
    <>
      <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">
        {/* Left side column */}
        <div className="pt-8 text-gray-800">
          <h2 className="text-xl font-semibold">Course Structure</h2>
          <div className="pt-5">
            {courseData && courseData.courseContent.map((chapter, index) => (
              <div key={index} className="border border-gray-300 bg-white mb-4 rounded p-2">
                <div
                  className="flex justify-between items-center px-4 cursor-pointer select-none py-3"
                  onClick={() => toggleSection(index)}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={assets.down_arrow_icon}
                      alt="arrow icon"
                      className={`transform transition-transform ${openSections[index] ? "rotate-180" : ""}`}
                    />
                    <p className="font-medium md:text-base text-sm">{chapter.chapterTitle}</p>
                  </div>
                  <p className="text-sm md:text-default">
                    {chapter.chapterContent.length} lectures - {calculateChapterDuration(chapter)}
                  </p>
                </div>

                <div className={`overflow-hidden transition-all duration-300 mr-2 ${openSections[index] ? "max-h-96" : "max-h-0"}`}>
                  <ul className="list-disc md:pl-10 pl-4 py-2 text-gray-600 border-t border-gray-300 pr-4">
                    {chapter.chapterContent.map((lecture, idx) => (
                      <li key={idx} className="flex items-start gap-2 py-1">
                        <img
                          src={false ? assets.blue_tick_icon : assets.play_icon}
                          alt="play icon"
                          className="w-4 h-4 mt-1"
                        />
                        <div className="flex items-center justify-between w-full text-gray-900 text-xs md:text-default">
                          <p className="font-medium">{lecture.lectureTitle}</p>
                          <div className="flex gap-2">
                            {lecture.lectureUrl && (
                              <span
                                onClick={() => {
                                  setPlayerData({
                                    ...lecture,
                                    chapter: index + 1,
                                    lecture: idx + 1,
                                  });
                                }}
                                className="text-blue-700 cursor-pointer"
                              >
                                Watch
                              </span>
                            )}
                            <span className="text-gray-600">
                              {humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                                units: ['h', 'm'],
                                round: true,
                                delimiter: ' ',
                              })}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="items-center gap-2 py-5 mt-10 ">
            <h1 className="text-xl font-bold">Rate this course: </h1>
            <Rating initialRating={0}/>
          </div>
        </div>


        {/* Right side column (you can add video player or other content here if needed) */}
        <div className="md:mt-10">
          {
            playerData ? (
              <div className="">
                <YouTube videoId={playerData.lectureUrl.split('/').pop()} iframeClassName="w-full aspect-video" />
                <div className="flex justify-between items-center mt-1">
                  <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
                  <button className="text-green-700 bg-slate-500">{false ? "completed" : "Mark Completed"}</button>
                </div>
              </div>
            ) :
              <img src={courseData ? courseData.courseThumbnail : " "} alt="" />

          }
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Player;
