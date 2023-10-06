/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navList = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Explore", to: "/explore" },
    { name: "Analytics", to: "/analytics" },
    { name: "Profile", to: "/update-profile" },
  ];
  return (
    <div className="bg-white flex flex-row min-[200px]:justify-between max-[639px]:justify-between sm:justify-between md:justify-between lg:justify-around sticky top:0 left:0 px-2 py-2 min-[200px]:border-b-[0px] max-[639px]:border-b-[0px] sm:border-b-[0px] md:border-b-[2px] md: border-gray-200 md:border-solid mb-20 inset-x-0 top-0 z-50">
      <img
        src="https://i.ibb.co/BGTKjCQ/Script-Vault.png"
        className="w-[200px]"
      />
      <div className="grid grid-cols-4 gap-1 min-[200px]:hidden max-[639px]:hidden sm:hidden lg:grid">
        {navList.map((item) => (
          <div key={item.name} className="grid justify-center items-center">
            <Link to={item.to} className="text-gray-900 hover:bg-gray-50 p-2">
              {item.name}
            </Link>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1 min-[200px]:grid max-[639px]:grid lg:hidden">
        <div
          className="flex flex-row justify-center items-center"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Bars3Icon className="h-10 w-10 text-gray" />
        </div>
      </div>

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="w-[200px]"
                src="https://i.ibb.co/BGTKjCQ/Script-Vault.png"
                alt=""
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navList.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="ml-8 block px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 border-b-2 border-gray-100 border-solid"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default Navbar;
