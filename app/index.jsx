"use client";
import { api, print } from '@/public/script/main';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Hero from '@/components/hero';
import Features from '@/components/features';
import Categories from "@/components/cards/categories";
import Services from "@/components/cards/services";
import Recently from '@/components/cards/recently';
import Link from 'next/link';
import Icons from "@/components/icons";

export default function Home () {

    const config = useSelector((state) => state.config);
    const [data, setData] = useState({});
    const [tab, setTab] = useState('1');

    const _get_ = async() => {

        const response = await api('home', {...config.location || {}});

        setData({
            categories: response.categories,
            recently: response.recently,
            recommended: response.recommended,
            based_location: response.based_location,
            near_by: response.near_by,
        });
        
    }
    useEffect(() => {

        _get_();

    }, []);

    return (

        <div className='w-full space-y-9'>
            
            <Hero />

            <main className='space-y-10 lg:space-y-12'>

                <div className='w-full space-y-7'>

                    <div className='w-full flex justify-between items-center lg:gap-6 cursor-default'>

                        <div className='flex items-center gap-4'>
                            <Icons icon='categories' className='!w-7 !h-7 lg:!w-8 lg:!h-8 text-primary -mt-1 lg:-mt-0.5'/>
                            <span className='text-[1.4rem] lg:text-[1.6rem]'>{config.text.top_categories}</span>
                        </div>

                        <Link href='/categories' className='panel !rounded-md py-2.5 px-6 cursor-pointer flex justify-center items-center gap-3 select-none duration-300 !bg-primary-light !border-primary hover:!bg-primary hover:!text-white'>
                            <span className='text-[1.05rem] lg:text-[1.1rem]'>{config.text.view_all}</span>
                            <span className='!hidden lg:!block material-symbols-outlined !text-[1.3rem] rtl:rotate-[180deg]' translate='no'>arrow_forward</span>
                        </Link>

                    </div>

                    <div className='w-full flex justify-start items-center gap-2 select-none overflow-x-auto whitespace-nowrap'>

                        <div onClick={() => setTab('1')} className={`border border-primary bg-primary-light py-2 px-4 lg:px-5 text-[1rem] cursor-pointer duration-300 rounded-md flex justify-center items-center gap-2 hover:border-primary hover:text-primary ${tab === '1' && 'border-primary !bg-primary !text-white'}`}>
                            <span>{config.text.development}</span>
                        </div>
                        <div onClick={() => setTab('2')} className={`border border-primary bg-primary-light py-2 px-4 lg:px-5 text-[1rem] cursor-pointer duration-300 rounded-md flex justify-center items-center gap-2 hover:border-primary hover:text-primary ${tab === '2' && 'border-primary !bg-primary !text-white'}`}>
                            <span>{config.text.desgining}</span>
                        </div>
                        <div onClick={() => setTab('3')} className={`border border-primary bg-primary-light py-2 px-4 lg:px-5 text-[1rem] cursor-pointer duration-300 rounded-md flex justify-center items-center gap-2 hover:border-primary hover:text-primary ${tab === '3' && 'border-primary !bg-primary !text-white'}`}>
                            <span>{config.text.maintenance}</span>
                        </div>
                        <div onClick={() => setTab('4')} className={`border border-primary bg-primary-light py-2 px-4 lg:px-5 text-[1rem] cursor-pointer duration-300 rounded-md flex justify-center items-center gap-2 hover:border-primary hover:text-primary ${tab === '4' && 'border-primary !bg-primary !text-white'}`}>
                            <span>{config.text.markting}</span>
                        </div>
                        <div onClick={() => setTab('5')} className={`border border-primary bg-primary-light py-2 px-4 lg:px-5 text-[1rem] cursor-pointer duration-300 rounded-md flex justify-center items-center gap-2 hover:border-primary hover:text-primary ${tab === '5' && 'border-primary !bg-primary !text-white'}`}>
                            <span>{config.text.writting}</span>
                        </div>

                    </div>

                    <Categories data={data.categories} slider/>

                </div>

                <div className='w-full space-y-6'>

                    <div className='w-full flex items-center gap-3 lg:pb-3 cursor-default'>
                        <Icons icon='percent' className='!w-8 !h-8 lg:!w-9 lg:!h-9 -mt-1'/>
                        <span className='text-[1.4rem] lg:text-[1.5rem] bg-primary-light py-2.5 px-12 rounded-tl-md rounded-br-md border border-primary/50'>{config.text.recently_services}</span>
                    </div>

                    <Services data={data.recently} slider/>

                </div>

                <div className='w-full space-y-6'>

                    <div className='w-full flex items-center gap-3 lg:pb-3 cursor-default'>
                        <Icons icon='nearby' className='!w-10 !h-10 lg:!w-11 lg:!h-11 -mt-1.5'/>
                        <span className='text-[1.4rem] lg:text-[1.5rem] bg-primary-light py-2.5 px-12 rounded-tl-md rounded-br-md border border-primary/50'>{config.text.services_near_you}</span>
                    </div>

                    <Services data={data.near_by} slider/>

                </div>

                <div className='w-full space-y-6'>

                    <div className='w-full flex items-center gap-5 lg:pb-3 cursor-default'>
                        <Icons icon='recommend' className='!w-9 !h-9 -mt-0.5'/>
                        <span className='text-[1.4rem] lg:text-[1.5rem] bg-primary-light py-2.5 px-12 rounded-tl-md rounded-br-md border border-primary/50'>{config.text.based_location}</span>
                    </div>

                    <Services data={data.based_location} slider/>

                </div>

                <Recently data={data.recommended}/>

            </main>

            <Features style={3} title={config.text.free_cancellation} text={config.text.free_cancellation_text}/>

        </div>

    )

}
