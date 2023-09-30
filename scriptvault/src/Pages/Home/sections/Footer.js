import React from "react";

const Footer = () => {
  const credList = ["email@gmail.com", "7890336778", "700006000"];
  const sList = ["facebook", "instagram", "twitter"];
  const socialsList = ["https://www.facebook.com/", "https://www.instagram.com/", "https://www.twitter.com/"];
  return (
    <div className="bg-black flex min-[280px]:flex-col max-[639px]:flex-col sm:flex-col md:flex-col lg:flex-row justify-between items-center px-20 py-10">
      <div className="flex flex-col">
        <span className="text-white my-8 min-[280px]:text-center max-[639px]:text-center sm:text-center md:text-center lg:text-left transition ease-in-out delay-10 hover:text-gray-300 duration-100">
          Investment Company based in India
        </span>
        <div className="flex flex-row">
          {credList.map((key, element) => (
            <span key={key} className="text-white mr-[5px] min-[280px]:text-center max-[639px]:text-center sm:text-center md:text-center lg:text-left transition ease-in-out delay-10 hover:text-gray-300 duration-100">
               {credList[element] + ""} 
            </span>
          ))}
        </div>

        <span className="text-white my-4 min-[280px]:text-center max-[639px]:text-center sm:text-center md:text-center lg:text-left transition ease-in-out delay-10 hover:text-gray-300 duration-100">New Delhi | India</span>
        <span className="my-12 text-gray-500 min-[280px]:text-center max-[639px]:text-center sm:text-center md:text-center lg:text-left transition ease-in-out delay-10 hover:text-gray-300 duration-100">Copyright 2023 All Rights Reserved</span>
      </div> 
      <div className="flex flex-row">
        {
            socialsList.map((key , element) => (
                <span className="transition ease-in-out delay-50 hover:-translate-y-1 hover:text-gray-300 duration-100"><a className="text-white underline mx-4" key={key} href={socialsList[element]}>{sList[element]}</a></span>
            ))
        }
      </div>
    </div>
  );
};

export default Footer;
