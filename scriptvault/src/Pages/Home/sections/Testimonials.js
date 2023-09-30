import React from "react";

const Testimonials = () => {
  const list = [
    {
      profile:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      name: "DIANNA KIMWEALTH",
      designation: "Financial Analyst",
      opinion:
        "Commodo cupidatat elit elit qui mollit laborum commodo sunt reprehenderit cupidatat aute.",
    },
    {
      profile:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      name: "DIANNA KIMWEALTH",
      designation: "Financial Analyst",
      opinion:
        "Commodo cupidatat elit elit qui mollit laborum commodo sunt reprehenderit cupidatat aute.",
    },
    {
      profile:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      name: "DIANNA KIMWEALTH",
      designation: "Financial Analyst",
      opinion:
        "Commodo cupidatat elit elit qui mollit laborum commodo sunt reprehenderit cupidatat aute.",
    },
  ];
  return (
    <div className="flex flex-col bg-gradient-to-t from-green-50 to-green-100 justify-center items-center px-20 py-20">
      <span className="text-sm text-gray-500 italic text-center">
        {" "}
        testimonials{" "}
      </span>
      <span className="text-3xl my-2 text-center">What clients say?</span>
      <span className="text-gray-600 text-sm my-2 text-center">
        We are registered as a distributor with AMFI, as an investment advisor
        with SEBI and platform partners with BSE
      </span>

      <div className="grid min-[280px]:grid-row-3 max-[639px]:grid-row-3 sm:grid-row-3 md:grid-row-3 lg:grid-cols-3 gap-6 my-4">
        {list.map((element) => (
          <div className="flex flex-col justify-center items-center bg-green-50 px-8 py-8 border-x-2 border-solid border-green-50 rounded-[10px] transition ease-in-out delay-50 hover:-translate-y-2 duration-500">
            <img
              src={element.profile}
              className="w-[128px] h-[128px] rounded-[64px] my-4 transition ease-in-out delay-50 hover:-translate-y-2 duration-500"
            />
            <span className="font-[1000] capitalize my-4 text-center">{element.name}</span>
            <span className="text-gray-500 my-4 text-center">{element.designation}</span>

            <i class="ri-double-quotes-l text-6xl text-center text-green-300"></i>

            <span className="text-center">{element.opinion}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
