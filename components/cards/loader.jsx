"use client";
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Loader ({ count, className, cols, slider }) {

    const config = useSelector((state) => state.config);

    return (

        <div className="w-full">
            {
                slider ?
                <Swiper key={config.dir} modules={[Navigation, Autoplay]} spaceBetween={15} slidesPerView={cols || 4} autoplay={{delay: 5000}} speed={500} loop={false} navigation={true} breakpoints={{ 0: {slidesPerView: 1.4}, 500: {slidesPerView: 2.5}, 748: {slidesPerView: 3.5}, 1200: {slidesPerView: cols || 4} }}>
                    {
                        Array.from({length: count || 0}, (_, index) => index + 1).map(_ => 
                            <SwiperSlide key={_}>
                                <div className="w-full space-y-2">

                                    <div className='w-full bg-primary/20 h-[12rem] border border-primary/50 rounded-md overflow-hidden relative'>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer"></div>
                                    </div>

                                    <div className='w-[100%] bg-primary/20 h-[4rem] border border-primary/50 rounded-md overflow-hidden relative'>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer"></div>
                                    </div>

                                    <div className='w-[70%] bg-primary/20 h-[2.5rem] border border-primary/50 rounded-md overflow-hidden relative'>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer"></div>
                                    </div>

                                </div>
                            </SwiperSlide>
                        )
                    }
                </Swiper> :
                <div className={`w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 ${cols == 5 ? 'lg:grid-cols-5' : cols == 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} ${className}`}>
                    {
                        Array.from({length: count || 0}, (_, index) => index + 1).map(_ => 
                            <div key={_} className="w-full space-y-2">

                                <div className='w-full bg-primary/20 h-[12rem] border border-primary/50 rounded-md overflow-hidden relative'>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer"></div>
                                </div>

                                <div className='w-[100%] bg-primary/20 h-[4rem] border border-primary/50 rounded-md overflow-hidden relative'>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer"></div>
                                </div>

                                <div className='w-[70%] bg-primary/20 h-[2.5rem] border border-primary/50 rounded-md overflow-hidden relative'>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer"></div>
                                </div>

                            </div>
                        )
                    }
                </div>
            }
        </div>

    )

}
