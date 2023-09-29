import React from "react";

const BeforeFooter = () => {
  return (
    <div className="relative overflow-visible py-24 sm:py-32 flex flex-col justify-center items-center">
      <img
        src="https://images.unsplash.com/photo-1664575602276-acd073f104c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1c2luZXNzfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
        className="absolute inset-0 h-full w-full object-cover object-right md:object-center z-0"
        alt="Background Image"
      />

      <div className="bg-gray-700 opacity-50 absolute inset-0 z-10"></div>

      <div className="flex flex-col mx-auto max-w-7xl px-6 lg:px-8 relative z-20">
        <span className="min-[280px]:text-5xl  max-[639px]:text-5xl sm:text-5xl md:text-5xl lg:text-7xl text-white w-128 text-center">
          LET'S MAKE WISE DECISIONS
        </span>
      </div>
    </div>
  );
};

export default BeforeFooter;
