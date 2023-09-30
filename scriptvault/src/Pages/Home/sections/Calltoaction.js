import React from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "./PrimaryButton";

const Calltoaction = () => {
  return (
    <div className="flex min-[280px]:flex-col max-[639px]:flex-col sm:flex-col md:flex-col lg:flex-row justify-center items-center px-20 py-20">
      <div className="flex flex-col">
        <img
          src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFua2luZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
          className="min-[280px]:rounded-[100px] min-[280px]:w-[200px] min-[280px]:h-[200px] max-[639px]:rounded-[100px] max-[639px]:w-[200px] max-[639px]:h-[200px] sm:rounded-[100px] sm:w-[200px] sm:h-[200px] md:rounded-[100px]  md:w-[200px] md:h-[200px] lg:rounded-[200px] lg:w-[400px] lg:h-[400px] lg:mx-8 transition ease-in-out delay-50 hover:-translate-y-2 duration-500"
        />
      </div>
      <div className="flex flex-col justify-center items-center min-[280px]:w-128 max-[639px]:w-128 sm:w-128 md:w-128 lg:w-64 my-8 mx-8">
        <span className="text-3xl mb-8 text-center">
          Investing made
          <span className="text-green-800 font-bold underline">Easy</span> for
          you
        </span>
        <span className="text-sm text-gray-500 mb-8 text-center">
          India's fastest growing investment platform with
          <span className="text-black font-bold">20+ Lac</span> users. We use
          edge-cutting technology to ensure that your personal information is
          fully encrypted and securely stored
        </span>
        <div className="text-center">
          <PrimaryButton to="/get-started" name="Get Started"/>
        </div>
      </div>
    </div>
  );
};

export default Calltoaction;
