import { assets } from "../../assets/assets"

const CallToAction = () => {
    return (
        <>
            <div className="flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0 ">
                <h1 className="text-xl md:text-4xl text-gray-800 font-semibold">Learn anything, anytime, anywhere </h1>
                <p className="text-green-800 sm:text-sm">
                    Gain knowledge on the go! Access diverse topics, master new skills,
                    and learn flexibly—anytime, anywhere, with ease and convenience.
                </p>
                <div className="flex gap-4 pt-10">
                    <button className="px-10 py-3 rounded-md text-white bg-green-800">Get Started</button>
                    <button className="flex items-center gap-2 px-10 py-3 rounded-md text-green-900 bg-white border-2 ">Learn More <img src={assets.arrow_icon} alt="" /></button>
                </div>
            </div>
        </>
    )
}

export default CallToAction