import CallToAction from "../../components/student/CallToAction"
import Companies from "../../components/student/Companies"
import CoursesSection from "../../components/student/CoursesSection"
import Footer from "../../components/student/Footer"
import Hero from "../../components/student/Hero"
import Testimonial from "../../components/student/Testimonial"


const Home = () => {
  return (
    <div className="flex flex-col items-center space-y-8 text-center ">
      <Hero />
      <Companies />
      <CoursesSection />
      <Testimonial />
      <CallToAction />
      <Footer />
    </div>

  )
}

export default Home