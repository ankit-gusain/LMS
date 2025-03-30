import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/AppContext"
import Loading from "../../components/student/Loading"
import { assets } from "../../assets/assets"
import humanizeDuration from "humanize-duration"
import Footer from "../../components/student/Footer" 
import YouTube from "react-youtube"

const CourseDetails = () => {
    const { id } = useParams()
    const [courseData, setCourseData] = useState(null)
    const [openSections, setOpenSections] = useState({})
    const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)
    const [playerData, setPlayerData] = useState(null)


    const { allCourses, calculateRating, currency, calculateNoOfLectures } = useContext(AppContext)

    // Helper to calculate total duration for a chapter
    const calculateChapterDuration = (chapter) => {
        const totalMinutes = chapter.chapterContent.reduce((sum, lecture) => sum + lecture.lectureDuration, 0)
        return humanizeDuration(totalMinutes * 60 * 1000, {
            units: ['h', 'm'],
            round: true,
            delimiter: ' ',
        })
    }

    // Helper to calculate total duration for full course
    const calculateCourseDuration = (course) => {
        const totalMinutes = course.courseContent.reduce((total, chapter) => {
            return total + chapter.chapterContent.reduce((sum, lecture) => sum + lecture.lectureDuration, 0)
        }, 0)

        return humanizeDuration(totalMinutes * 60 * 1000, {
            units: ['h', 'm'],
            round: true,
            delimiter: ' ',
        })
    }

    // Fetch course data based on ID
    useEffect(() => {
        const findCourse = allCourses.find(course => course._id === id)
        if (findCourse) {
            setCourseData(findCourse)
        } else {
            console.warn("Course not found.")
        }
    }, [allCourses, id])

    if (!courseData) {
        return <Loading />
    }

    const toggleSection = (index) => {
        setOpenSections((prev) => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    return (


        <>
        
        <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">
            <div className="absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-gray-300"></div>

            {/* Left Column */}
            <div className="max-w-xl z-10 text-gray-800">
                <h1 className="md:text-course-details-heading-large text-course-details-heading-small font-gray-800">
                    {courseData.courseTitle}
                </h1>
                <p
                    dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}
                    className="pt-4 md:text-base text-sm"
                />

                {/* Review and Rating */}
                <div className="flex items-center space-x-2 pt-3 pb-2 text-sm">
                    <p>{calculateRating(courseData)}</p>

                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <img
                                key={i}
                                src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank}
                                alt="rating star"
                                className="w-3.5 h-3.5"
                            />
                        ))}
                    </div>

                    <p className="text-gray-600">
                        ({courseData.courseRatings.length} {courseData.courseRatings.length > 1 ? "ratings" : "rating"})
                    </p>

                    <p>
                        {courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? "students" : "student"}
                    </p>
                </div>

                <div>
                    Course By <span className="text-sm">EducatorX</span>
                </div>

                {/* Course Structure */}
                <div className="pt-8 text-gray-800">
                    <h2 className="text-xl font-semibold">Course Structure</h2>
                    <div className="pt-5">
                        {courseData.courseContent.map((chapter, index) => (
                            <div key={index} className="border border-gray-300 bg-white mb-4 rounded p-2">

                                <div className="flex justify-between items-center px-4 cursor-pointer select-none py-3" onClick={() => toggleSection(index)}>
                                    <div className="flex items-center gap-2">
                                        <img src={assets.down_arrow_icon} alt="arrow icon"
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
                                                <img src={assets.play_icon} alt="play icon" className="w-4 h-4 mt-1" />
                                                <div className="flex items-center justify-between w-full text-gray-900 text-xs md:text-default">
                                                    <p className="font-medium">{lecture.lectureTitle}</p>
                                                    <div className="flex gap-2">
                                                        {lecture.isPreviewFree && (
                                                            <span onClick={()=>{setPlayerData({
                                                                videoId: lecture.lectureUrl.split("/").pop(),
                                                            })}}
                                                            className="text-blue-700 cursor-pointer">Preview</span>
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
                </div>

                <div className="py-20 text-sm md:text-default">
                    <h3 className="text-xl font-semibold text-gray-800">Course Description</h3>
                    <p
                        dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
                        className="pt-3 rich-text"
                    />
                </div>
            </div>

            {/* Right Column (Course Price & Info) */}
            <div className="max-w-course-card z-10 shadow-custom-card rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]">
                {
                    playerData ? 
                    <YouTube videoId={playerData.videoId} opts={{playerVars:{autoplay:1}}} iframeClassName="w-full aspect-video" />: 
                    <img src={courseData.courseThumbnail} alt="Course Thumbnail" />

                }
                <div className="p-5">
                    <div className="flex items-center gap-3">
                        <img className="w-3.5" src={assets.time_left_clock_icon} alt="time left icon" />
                        <p className="text-red-700">
                            <span className="font-medium">5 days</span> left at this price!
                        </p>
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                        <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
                            {currency} {(courseData.coursePrice - (courseData.discount * courseData.coursePrice / 100)).toFixed(2)}
                        </p>
                        <p className="md:text-lg text-green-800 line-through">{currency} {courseData.coursePrice}</p>
                        <p className="md:text-lg text-green-900">{courseData.discount}% off</p>
                    </div>

                    <div className="flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500">
                        <div className="flex items-center gap-2">
                            <img src={assets.star} alt="star icon" />
                            <p>{calculateRating(courseData)}</p>
                        </div>

                        <div className="h-4 w-px bg-gray-600/40"></div>

                        <div className="flex items-center gap-2">
                            <img src={assets.time_clock_icon} alt="clock icon" />
                            <p>{calculateCourseDuration(courseData)}</p>
                        </div>

                        <div className="h-4 w-px bg-gray-600/40"></div>

                        <div className="flex items-center gap-2">
                            <img src={assets.lesson_icon} alt="lesson icon" />
                            <p>{calculateNoOfLectures(courseData)} lessons</p>
                        </div>

                    </div>

                    <button className="w-full bg-green-700 text-white py-2 mt-4 rounded hover:bg-green-900">
                        {
                            isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"
                        }
                    </button>

                    <div className="pt-6 ">
                        <p className="md:text-xl text-lg font-medium text-gray-800">What's in the course?</p>
                        <ul className="ml-4 pt-2 text-sm md:text-default list-disc text-gray-500">
                            <li>Lifetime access with free updates.</li>
                            <li>Step-by-step, hands-on project guidance.</li>
                            <li>Downloadable resources and source code</li>
                            <li>Quizzes to test your knowledge.</li>
                            <li>Certificate of completion.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <Footer />

        </>
    )
}

export default CourseDetails
