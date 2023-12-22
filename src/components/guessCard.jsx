import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const guessCard = ({active , setActive}) => {

    const modalRef = useRef(null)
    const { t } = useTranslation();

    const handleClickOutside = (e) => {
        if(modalRef.current && !modalRef.current.contains(e.target)) {
            setActive(false)
            console.log('outside')
        }
    }

    useEffect(() => {

      if(active) {
        document.addEventListener('mousedown', handleClickOutside);
  
        return () => {
          document.removeEventListener('mousedown', handleClickOutside)
        }
      }
  
    }, [active])

    return (
    
        <div>
            <div className='w-screen h-screen fixed top-0 left-0 z-40 backdrop-filter backdrop-blur-sm'></div>
            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50  rounded-lg overflow-hidden'>
                    <div className="w-[452px] h-[488px] bg-[white] flex flex-col justify-center items-center  rounded-lg" ref={modalRef}>
                        <div className="flex flex-col gap-10">
                            <div className="flex justify-center relative">
                                <div className=" ">
                                    <div className="flex absolute left-0 text-[#8C8C8C] text-base text-center items-center"><div className="text-xl">1</div>/20</div>
                                    <div className=" font-extrabold text-[20px]">გამოიცანით ქარდი</div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center px-4 ">
                                <div className="flex justify-center text-2xl items-center bg-green w-[265px] h-[80px] rounded-[7.61px] text-[#FFFFFF] font-extrabold">teacher</div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex justify-center items-center h-[65px] w-[193px] rounded-[7px] text-[white] bg-green">მასწავლებელი</div>
                                <div className="flex justify-center items-center h-[65px] w-[193px] rounded-[7px] text-[#282A35] bg-[#E7E7E7]" >სტუდენტი</div>
                                <div className="flex justify-center items-center h-[65px] w-[193px] rounded-[7px] text-[#282A35] bg-[#E7E7E7]" >უნივერსიტეტი</div>
                                <div className="flex justify-center items-center h-[65px] w-[193px] rounded-[7px] text-[#282A35] bg-[#E7E7E7]" >ტელეფონი</div>
                            </div>
                            <div className="flex justify-around">
                                <button onClick={() => back()} className="text-[white] bg-[#B9B9B9] p-2.5 rounded-[30px] w-[193px] h-[44px] ">
                                    {t("back")}
                                </button>
                                <button onClick={() => confirm()} className="text-[white] bg-green p-2.5 rounded-[30px] w-[193px] h-[44px] ">
                                    {t("confirm")}
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>

      )
}

export default guessCard