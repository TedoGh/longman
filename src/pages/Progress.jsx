import { useState } from "react";
import Pagination from "../components/Pagination";
import ProgressHistoryLists from "../components/ProgressHistoryLists";
import ProgressHistory from "../components/ProgressHistory";

export default function Progress() {
  return (
    <div>
      <div className="max-w-[1200px] mx-auto">
        <div>
          <h1 className="mt-8 text-darkBlue text-3xl font-bold">
            ჩემი პროგრესი
          </h1>
          <div className="flex">
            <div className="w-full">
              <div className="mt-14 h-[350px] p-12 border-2 border-[#DEE2E6] rounded-md">
                <h1 className="text-2xl mb-5">გამარჯობა, მომხარებელო</h1>
                <p className="mb-3 text-lg text-[#AFAFAF] w-[690px]">
                  ამ გვერდზე ნაჩვენებია მომხმარებლის პროგრესი,რომელიც ნახლდება
                  ყოველი გავლილი ვარჯიშის შემდეგ.
                </p>
                <p className="mb-4 text-lg text-[#AFAFAF] w-[690px]">
                  ამ გვერდზე ნაჩვენებია მომხმარებლის პროგრესი,რომელიც ნახლდება
                  ყოველი გავლილი ვარჯიშის შემდეგ.
                </p>
                <button className="bg-[#1ACD81] hover:bg-[#0fa968] text-darkBlue font-bold rounded-[30px] w-[294px] h-[47px]  p-[10px] gap-[10px]">
                  ვარჯიშის დაწყება
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="h-[600px] w-96 p-7 text-center rounded-md absolute left-[-470px] top-[-35px] bg-lightBlue">
                <h1 className="text-darkBlue text-2xl mb-4">მოგესალმებით!</h1>
                <p className="text-[#A2A2A2] text-lg text-center mb-5">
                  თქვენი ქულა!
                </p>

                <div className="flex justify-center">
                  <div className="relative m-1">
                    <div className="relative w-[180px] h-[90px] overflow-hidden">
                      <div className="absolute rotate-[-223deg] top-0 left-0 w-[180px] h-[180px] rounded-[50%] border-[10px] border-[#f7f7f7] border-b-green border-r-green"></div>
                    </div>
                    <h1 className="mt-[-60px] text-darkBlue text-4xl font-bold">
                      20<span className="text-lg font-normal">/40</span>
                    </h1>
                    <p className="text-[#A2A2A2] text-base text-center mb-5">
                      ქულები
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProgressHistory />
        </div>
      </div>
    </div>
  );
}
