"use client";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Card from "./category";
import Loader from './loader';

export default function Cards ({ data, slider, big }) {

    const config = useSelector((state) => state.config);
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {

        setItems(data || []);
        setTotal(data?.length || 0);

    }, [data]);

    return (

        <div className="w-full space-y-8">
            {
                slider ?
                <div className='w-full'>
                    {
                        !items.length ? <Loader count={6} cols={5} slider/> :
                        <Swiper key={config.dir} modules={[Navigation, Autoplay]} spaceBetween={15} slidesPerView={5} autoplay={{delay: 5000}} speed={500} loop={false} navigation={true}
                            breakpoints={{ 0: {slidesPerView: 1.4}, 500: {slidesPerView: 2.3}, 748: {slidesPerView: 4.3}, 1200: {slidesPerView: 5} }}>

                            { items.map((item, index) => <SwiperSlide key={index}><Card data={item}/></SwiperSlide>) }

                        </Swiper>
                    }
                </div> :
                <div className="w-full">
                    {
                        !items.length ? <Loader count={10} cols={5}/> :
                        <div className={`w-full grid grid-cols-1 md:grid-cols-3 ${big ? 'lg:grid-cols-4 gap-5' : 'lg:grid-cols-5 gap4'}`}>

                            { items.map((item, index) => <Card key={index} data={item} big={big}/>) }

                        </div>
                    }
                </div>
            }
        </div>

    )

}
