import { assets } from '../../assets/assets.js'
import { Link } from 'react-router-dom'

import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext.jsx'

function Navbar() {

    const { navigate, isEducator } = useContext(AppContext)

    const { openSignIn } = useClerk()
    const { user } = useUser()



    return (
        <div className="flex items-center justify-between px-4 bg-gray-300
                        sm:px-10  md:px-14 lg:px-36 border-b border-gray-400 py-4">
            <img src={assets.logo} alt="logo" className="w-28 lg:w-32 cursor-pointer" onClick={() => navigate('/')} />
            <div className='hidden md:flex items-center gap-5 text-gray-900'>
                {
                    // If the user is logged in, show the "Become Educator" button and "My Enrollments" link
                    user &&
                    <>
                        <div className='flex items-center gap-5'>
                            <button onClick={() => { navigate("/educator") }}>
                                {
                                    isEducator ? "Educator Dashboard" : "Become Educator"
                                }
                            </button>
                            
                            <Link to="/my-enrollments"> My Enrollments </Link>
                        </div>
                    </>
                }

                {
                    user ? <UserButton /> :
                        <button onClick={() => openSignIn()} className='bg-green-900 text-white px-5 py-2 rounded-full' > Create Account </button>}

            </div>
            {/* for phone screens */}
            <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
                <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>
                    {
                        // If the user is logged in, show the "Become Educator" button and "My Enrollments" link
                        user &&
                        <>
                            <div className='flex items-center gap-5'>
                                <button onClick={() => { navigate("/educator") }}>
                                    {
                                        isEducator ? "Educator Dashboard" : "Become Educator"
                                    }
                                </button>

                                <Link to="/my-enrollments"> My Enrollments </Link>
                            </div>
                        </>
                    }
                </div>

                {
                    user ? <UserButton /> :
                        <button onClick={() => openSignIn()}><img src={assets.user_icon}></img></button>
                }
            </div>
        </div>
    )
}


export default Navbar