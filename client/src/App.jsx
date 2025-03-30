import { Routes, Route, useMatch } from "react-router-dom"
import Home from "./pages/student/Home"
import CourseDetails from "./pages/student/CourseDetails"
import CourseList from "./pages/student/CourseList"
import MyEnrollment from "./pages/student/MyEnrollment"
import Player from "./pages/student/Player"
import Loading from "./pages/student/Loading"


import Educator from "./pages/educator/Educator"
import AddCourse from "./pages/educator/AddCourse"
import MyCourses from "./pages/educator/MyCourses"
import StudentsEnrolled from "./pages/educator/StudentsEnrolled"
import Dashboard from "./pages/educator/Dashboard"

import "quill/dist/quill.snow.css"


import Navbar from "./components/student/Navbar"


function App() {

  const isEducatorRoute = useMatch("/educator/*")

  return (
    <>
      <div className="text-default min-h-screen bg-white">
        {!isEducatorRoute && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course-list" element={<CourseList />} />
          <Route path="/course-list/:input" element={<CourseList />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/my-enrollments" element={<MyEnrollment />} />
          <Route path="/player/:courseId" element={<Player />} />
          <Route path="/loading/:path" element={<Loading />} />

          {/* route for the educator */}
          <Route path="/educator" element={<Educator />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-courses" element={<AddCourse />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="students-enrolled" element={<StudentsEnrolled />} />


          </Route>
        </Routes>
      </div >
    </>
  )
}

export default App