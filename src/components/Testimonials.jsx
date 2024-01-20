import { useTranslation } from "react-i18next";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";

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
              <SwiperSlide>
                <div className="max-w-[340px] mx-auto bg-[#F5F5F5] rounded-xl">
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="flex justify-center items-center gap-3">
                        <div className="w-[60px] h-[60px] flex justify-center items-center">
                          <img
                            src="https://bootstrapmade.com/demo/templates/Arsha/assets/img/team/team-2.jpg"
                            className="rounded-[50%] "
                          />
                        </div>
                        <div>
                          <h1 className="text-lg font-bold">ნინო კ.</h1>
                        </div>
                      </div>
                    </div>
                    <p className="mt-[28px] max-w-[294px] mx-auto">
                      Incredible progress! flashcards made learning French a
                      breeze. Engaging and effective—highly recommended!
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="max-w-[340px] mx-auto bg-[#F5F5F5] rounded-xl">
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="flex justify-center items-center gap-3">
                        <div className="w-[60px] h-[60px] flex justify-center items-center">
                          <img
                            src="https://bootstrapmade.com/demo/templates/Arsha/assets/img/team/team-1.jpg"
                            className="rounded-[50%] "
                          />
                        </div>
                        <div>
                          <h1 className="text-lg font-bold">Alex P.</h1>
                        </div>
                      </div>
                    </div>
                    <p className="mt-[28px] max-w-[294px] mx-auto">
                      Life-changing! Your Website fits into my busy schedule
                      perfectly. Mobile-friendly and customizable
                      lessons—exactly what I needed!
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="max-w-[340px] mx-auto bg-[#F5F5F5] rounded-xl">
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="flex justify-center items-center gap-3">
                        <div className="w-[60px] h-[60px] flex justify-center items-center">
                          <img
                            src="https://bootstrapmade.com/demo/templates/Arsha/assets/img/team/team-3.jpg"
                            className="rounded-[50%] "
                          />
                        </div>
                        <div>
                          <h1 className="text-lg font-bold">William A.</h1>
                        </div>
                      </div>
                    </div>
                    <p className="mt-[28px] max-w-[294px] mx-auto">
                      Versatile and effective. Your Website covers everything
                      from basics to advanced. Progress tracking keeps me
                      motivated. A game-changer!
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="max-w-[340px] mx-auto bg-[#F5F5F5] rounded-xl">
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="flex justify-center items-center gap-3">
                        <div className="w-[60px] h-[60px] flex justify-center items-center">
                          <img
                            src="https://bootstrapmade.com/demo/templates/Arsha/assets/img/team/team-4.jpg"
                            className="rounded-[50%] "
                          />
                        </div>
                        <div>
                          <h1 className="text-lg font-bold">Emily L.</h1>
                        </div>
                      </div>
                    </div>
                    <p className="mt-[28px] max-w-[294px] mx-auto">
                      Fun learning! Your Website's quizzes and games turned
                      language learning into an enjoyable experience. My skills
                      improved significantly!
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="max-w-[340px] mx-auto bg-[#F5F5F5] rounded-xl">
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="flex justify-center items-center gap-3">
                        <div className="w-[60px] h-[60px] flex justify-center items-center">
                          <img
                            src="https://i.imgur.com/w2CKRB9.jpg"
                            className="rounded-[50%] "
                          />
                        </div>
                        <div>
                          <h1 className="text-lg font-bold">Carlos G.</h1>
                        </div>
                      </div>
                    </div>
                    <p className="mt-[28px] max-w-[294px] mx-auto">
                      Your Website offers a variety of languages with a
                      user-friendly interface. Learning is accessible and
                      enjoyable—recommended to all language enthusiasts!"
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
