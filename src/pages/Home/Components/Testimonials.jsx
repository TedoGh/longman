import { useTranslation } from "react-i18next";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";

import TestimonialsData from "../../../data/TestimonialsData";

const Testimonials = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="py-[50px] animate__animated animate__fadeInDown">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-darkBlue text-2xl font-bold text-center font-case">
            {t("testimonialsText")}
          </h1>
          <div className="my-16">
            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              pagination={{
                el: ".swiper-pagination",
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
            >
              {TestimonialsData().map((item) => {
                return (
                  <SwiperSlide key={item.id}>
                    <div className="max-w-[340px] mx-auto bg-[#F5F5F5] rounded-xl">
                      <div className="p-4">
                        <div className="flex items-center">
                          <div className="flex justify-center items-center gap-3">
                            <div className="w-[60px] h-[60px] flex justify-center items-center">
                              <img
                                src={item.userImg}
                                className="rounded-[50%]"
                              />
                            </div>
                            <div>
                              <h1 className="text-lg font-bold">
                                {item.UserName}
                              </h1>
                            </div>
                          </div>
                        </div>
                        <p className="mt-[28px] max-w-[294px] mx-auto">
                          {item.UserRate}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
