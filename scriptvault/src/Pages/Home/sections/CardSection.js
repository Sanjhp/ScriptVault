import React from "react";

const CardSection = () => {
  const list = [
    {
      src: "https://i.ibb.co/5BJfv0b/coin.png",
      name: "Zero Commission",
      about:
        "India's fastest growing investment platform with 20+ Lac users. We use edge-cutting technology to ensure that your personal information is fully encrypted and securely stored",
    },
    {
      src: "https://i.ibb.co/5BJfv0b/coin.png",
      name: "Zero Commission",
      about:
        "India's fastest growing investment platform with 20+ Lac users. We use edge-cutting technology to ensure that your personal information is fully encrypted and securely stored",
    },
    {
      src: "https://i.ibb.co/5BJfv0b/coin.png",
      name: "Zero Commission",
      about:
        "India's fastest growing investment platform with 20+ Lac users. We use edge-cutting technology to ensure that your personal information is fully encrypted and securely stored",
    },
    {
      src: "https://i.ibb.co/5BJfv0b/coin.png",
      name: "Zero Commission",
      about:
        "India's fastest growing investment platform with 20+ Lac users. We use edge-cutting technology to ensure that your personal information is fully encrypted and securely stored",
    },
    {
      src: "https://i.ibb.co/5BJfv0b/coin.png",
      name: "Zero Commission",
      about:
        "India's fastest growing investment platform with 20+ Lac users. We use edge-cutting technology to ensure that your personal information is fully encrypted and securely stored",
    },
    {
      src: "https://i.ibb.co/5BJfv0b/coin.png",
      name: "Zero Commission",
      about:
        "India's fastest growing investment platform with 20+ Lac users. We use edge-cutting technology to ensure that your personal information is fully encrypted and securely stored",
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-t from-green-100 to-green-200 px-12 py-12">
      <span className="text-3xl my-4">
        Be a <span className="text-green-700 font-bold underline">smart</span>{" "}
        Investor
      </span>
      <span className="text-gray-500 mx-8 my-4">
        We are registered as a distributor with AMFI, as an investment advisor
        with SEBI and platform partners with BSE
      </span>

      <div className="grid min-[280px]:grid-row-9 max-[639px]:grid-row-9 sm:grid-row-9 md:grid-row-9 lg:grid-cols-3 gap-3 justify-center items-center my-12 border-2 border-solid border-gray px-4 py-4">
        {list.map((element) => (
          <div className="flex flex-col justify-center items-center bg-white border-2 border-green-50 border-solid px-6 py-6 rounded-md transition ease-in-out delay-50 hover:-translate-y-2 duration-500">
            <img 
            src={element.src} 
            width="100"
            className="transition ease-in-out delay-50 hover:-translate-y-2 duration-500 rounded-md"
            />
            <div className="flex flex-col justify-center items-center">
              <span className="text-xl mb-8 mt-8">{element.name}</span>
              <span className="text-sm text-gray-700 mb-8 text-center w-64">
                {element.about}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSection;
