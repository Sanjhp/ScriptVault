import React from "react";

const Features = () => {
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
  ];

  return (
    <div className="flex min-[280px]:flex-col max-[639px]:flex-col sm:flex-col md:flex-col lg:flex-col px-8 py-8 justify-center items-center">
      <span className="text-gray-400 italic text-center">
        An award winning platform
      </span>
      <span className="text-3xl mb-20 text-center">
        Why <span className="text-green-800 font-bold underline">choose</span>
        investing with us?
      </span>

      <div className="flex min-[280px]:flex-col max-[639px]:flex-col sm:flex-col md:flex-col lg:flex-row justify-around items-center">
        {list.map((element) => (
          <div className="flex flex-row justify-center items-center">
            <img
              src={element.src}
              width="100"
              className="mr-4 transition ease-in-out delay-50 hover:-translate-y-2 duration-500 rounded-md"
            />
            <div className="flex flex-col w-64 px-2 py-2">
              <span className="text-xl">{element.name}</span>
              <span className="text-sm text-gray-500 mb-8">
                {element.about}
              </span>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Features;
