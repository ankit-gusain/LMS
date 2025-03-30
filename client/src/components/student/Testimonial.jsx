import { assets, dummyTestimonial } from "../../assets/assets";

const Testimonial = () => {
  return (
    <div className="pb-14 px-14 md:px-0 mx-40 ">
      <h2 className="text-3xl text-green-800 font-medium mb-6">Testimonial</h2>
      <p className="md:text-base text-gray-500 mb-8">
        Hear from our learners as they share their journeys of transformation, success,
        and how our platform has made a difference in their lives.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="text-sm text-left border border-gray-300 rounded-lg bg-white shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <div className="flex items-center gap-5 px-5 py-4 bg-gray-100">
              <img className="h-12 w-12 rounded-full" src={testimonial.image} alt="" />
              <div>
                <h1 className="text-lg font-medium text-gray-800">{testimonial.name}</h1>
                <p className="text-gray-500">{testimonial.role}</p>
              </div>
            </div>
            <div className="p-5">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <img
                    className="h-5"
                    key={i}
                    src={i < testimonial.rating ? assets.star : assets.star_blank}
                    alt="star"
                  />
                ))}
              </div>
              <p className="text-gray-700 pb-5 pe-10 ">{testimonial.feedback}</p>

              <a href="#" className="text-blue-500 underline "> Read more ...</a>
            </div>


          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;