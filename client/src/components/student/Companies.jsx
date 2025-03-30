import { assets } from "../../assets/assets"



const Companies = () => {
  return (

    <div className="pt-24">
      <p className="text-base text-gray-700">Trusted by Learners from </p>
      <div className="flex flex-wrap items-center  justify-center gap-6 md:gap-16 md:mt-10 mt-5 ">
        <img src={assets.microsoft_logo} alt="microsoft_logo" className="w-20 md:w-28" />
        <img src={assets.accenture_logo} alt="accenture_logo" className="w-20 md:w-28" />
        <img src={assets.adobe_logo} alt="adobe_logo" className="w-20 md:w-28" />
        <img src={assets.paypal_logo} alt="paypal_logo" className="w-20 md:w-28" />
        <img src={assets.walmart_logo} alt="walmart_logo" className="w-20 md:w-28" />
      </div>
    </div>
  )
}

export default Companies