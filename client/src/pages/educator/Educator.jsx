import { Outlet } from "react-router-dom"
import Navbar from "../../components/educator/Navbar"
import Sidebar from "../../components/educator/Sidebar"
import EduFooter from "../../components/educator/EduFooter"



const Educator = () => {
    return (
        <>
            <div className="text-default min-h-screen bg-white " >
                <Navbar />
                <div className="flex">
                    <Sidebar />

                    <div className="flex-1">
                        {<Outlet />}
                    </div>
                </div>


            </div>

            <EduFooter />

        </>
    )
}

export default Educator