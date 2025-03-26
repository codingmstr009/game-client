"use client";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Card from "./service";
import Loader from './loader';
import Pagination from '@/components/pagination';
import Title from '@/components/title';

export default function Cards ({ data, slider, style, cols, pagination, read, total, title, text, loader, vendor }) {

    const config = useSelector((state) => state.config);
    const [limit, setLimit] = useState(12);
    const [page, setPage] = useState(1);
    const [items, setItems] = useState([]);

    useEffect(() => {

        if ( page === 1 && pagination ) read(page, limit);
        else setPage(1);

    }, [limit]);
    useEffect(() => {

        if ( pagination ) read(page, limit);

    }, [page]);
    useEffect(() => {

        setItems(data || []);

    }, [data]);

    return (

        <div className="w-full space-y-8">

            { title && <Title head={title} text={text}/> }

            {
                slider ?
                <div className='w-full'>
                    {
                        !items.length ? <Loader count={5} cols={4} slider/> :
                        <Swiper key={config.dir} modules={[Navigation, Autoplay]} spaceBetween={15} slidesPerView={4} autoplay={{delay: 5000}} speed={500} loop={false} navigation={true}
                            breakpoints={{ 0: {slidesPerView: 1.2}, 500: {slidesPerView: 2.5}, 748: {slidesPerView: 3.5}, 1200: {slidesPerView: 4} }}>

                            { items.map((item, index) => <SwiperSlide key={index}><Card data={item} style={style} vendor={vendor}/></SwiperSlide>) }

                        </Swiper>
                    }
                </div> :
                <div className="w-full">
                    {
                        loader ? <Loader count={limit} cols={cols || 4}/> :
                        <div className={`w-full grid grid-cols-1 md:grid-cols-2 ${cols === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-5`}>
                            { items.map((item, index) => <Card key={index} data={item} style={style} vendor={vendor}/>) }
                        </div>
                    }
                </div>
            }

            { items.length && pagination ? <Pagination limit={limit} setLimit={setLimit} total={total} page={page} setPage={setPage}/> : '' }

        </div>

    )

}
