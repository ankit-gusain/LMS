import Searchbar from "./Searchbar"

const Hero = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center w-full md:pt-24 pt-10 px-7 space-y-7 text-center bg-gradient-to-b from-gray-300 to to-white">
                <h1 className="md:text-home-heading-large text-home-heading-small relative font-bold text-gray-600 max-w-3xl mx-auto">
                    Empower Your Future with Courses <br />
                    <span className="text-green-800">Just for You<br /></span>
                    <span className="text-green-950"> Explore, Choose, and Learn </span>
                </h1>
                <p className="text-gray-700 max-w-2xl mx-auto hidden md:block">
                    Learn from top experts, engage with dynamic content, and thrive in a vibrant community—your success story starts here.
                    Unlock endless possibilities and turn your ambitions into achievements today.
                </p>
                <p className="text-gray-700 max-w-sm mx-auto md:hidden justify-center items-center">
                    Learn from top experts and thrive in a vibrant community, We bring world-class teachers to help you achieve your professional goals.
                </p>

                <Searchbar/>    
            </div>
        </>
    )
}

export default Hero