import { assets, dummyEducatorData } from "../../assets/assets"
import { useUser, UserButton } from "@clerk/clerk-react"
import { Link } from "react-router-dom"

const Navbar = () => {
    const educatorData = dummyEducatorData
    const { user } = useUser()

    return (
        <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-200 py-4">
            <Link to="/" >
                <img src={assets.logo} alt="" className="w-28 lg:w-32" />
            </Link>

            <div className="flex items-center gap-5 text-gray-500 relative">
                <p>Hii, {user ? user.fullName : "developers"}</p>

                {user ? (
                    <UserButton />
                ) : (
                    <img className="w-8" src={assets.profile_img} alt="Profile" />
                )}
            </div>
        </div>
    )
}

export default Navbar
