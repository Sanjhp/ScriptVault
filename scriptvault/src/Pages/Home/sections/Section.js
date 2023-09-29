import React from 'react'
import {Link} from "react-router-dom"
import PrimaryButton from './PrimaryButton'

const Section = () => {
  const planInfo=[
    { planName:"Pro Plan" , planCost:"7$" , planTagline:"Per user, pay per month", planFeatures:[
      "Trade from web and app" , "Expert advice" , "Zero commission" , "Trading Tools" , "Expert advice"
    ]},
    { planName:"Pro Plan" , planCost:"7$" , planTagline:"Per user, pay per month", planFeatures:[
      "Trade from web and app" , "Expert advice" , "Zero commission" , "Trading Tools" , "Expert advice"
    ]},
    { planName:"Pro Plan" , planCost:"7$" , planTagline:"Per user, pay per month", planFeatures:[
      "Trade from web and app" , "Expert advice" , "Zero commission" , "Trading Tools" , "Expert advice"
    ]},
  ]
  return (
    <div className="flex flex-col justify-center items-center px-12 py-12">
      <span className="text-3xl my-4 text-center">
        Be a <span className="text-green-700 font-bold underline">smart</span>{" "}
        Investor
      </span>
      <span className="text-gray-500 mx-8 my-4 text-center">
        We are registered as a distributor with AMFI, as an investment advisor
        with SEBI and platform partners with BSE
      </span>

      <div className="grid min-[280px]:grid-row-3 max-[639px]:grid-row-3 sm:grid-row-3 md:grid-row-3 lg:grid-cols-3 justify-center items-center my-12 border-2 border-solid border-green-50 px-4 py-4">
        {
          planInfo.map((element)=>(
            <div className="flex flex-col justify-center items-center bg-white border-2 border-green-50 border-solid px-6 py-6 rounded-md transition ease-in-out delay-50 hover:-translate-y-2 duration-500">

              <span className="flex flex-col justify-center items-center font-semibold my-4">{element.planName}</span>
              <span className="flex flex-col justify-center items-center font-semibold text-4xl my-4">{element.planCost}</span>
              <span className="flex flex-col justify-center items-center w-64 my-4">{element.planTagline}</span>

              <div className="w-32 text-center my-4">
                  <PrimaryButton to="/pro-plan" name="Get Pro"/>
              </div>
              <div className="flex flex-col">
              {
                element.planFeatures.map((key , index)=>(
                        <span className="my-2" key={key}><i className="ri-check-line text-green-600 mr-2"></i> {element.planFeatures[index]} </span>
                ))
              }
               </div>
            </div>
          ))
        }
      </div>
    </div>

  )
}

export default Section