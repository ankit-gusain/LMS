import { NavLink } from "react-router-dom"
import { assets } from "../../assets/assets"
import { AppContext } from "../../context/AppContext"
import { useContext } from "react"

const Sidebar = () => {

  const { isEducator } = useContext(AppContext)

  const menuItems = [
    { name: "Dashboard", icon: assets.home_icon, path: "/educator/dashboard" },
    { name: "Add Courses", icon: assets.add_icon, path: "/educator/add-courses" },
    { name: "My Courses", icon: assets.my_course_icon, path: "/educator/my-courses" },
    { name: "Student Enrolled", icon: assets.person_tick_icon, path: "/educator/students-enrolled" },

  ]

  return isEducator && (
    <>
      <div className="md:w-64 w-16 border-r min-h-screen text-base border-gray-600 py-2 flex flex-col">
        {
          menuItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/educator"}
              className={({ isActive }) => `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 ${isActive ? "bg-green-100 border-r-[4px] border-green-400/90" : "hover-bg-gray-100/90 border-r-[4px] border-white hoverborder-gray-200/90"}`}>
              <img src={item.icon} alt="" className="w-6 h-6 " />
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>

          ))
        }
      </div>


    </>
  )
}

export default Sidebar