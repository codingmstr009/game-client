"use client";
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Icons from "./icons";

export default function Hero () {

    const config = useSelector((state) => state.config);

    return (

        <main className='space-y-5 lg:space-y-6'>

            <div className="w-full flex items-center gap-4">

                <Icons icon='global' className='!w-12 !h-12 drop-shadow-lg'/>

                <div className="text-[1.05rem] lg:text-[1.2rem] cursor-default drop-shadow-xl leading-8">
                    {config.text.header_welcome_text}
                </div>

            </div>

            <div className='panel overflow-hidden'>

                <div className='py-6 px-5 lg:py-3 lg:px-7 bg-[#2b383d] flex justify-between items-center flex-wrap lg:flex-nowrap gap-4 lg:gap-0'>

                    <div className='flex items-center gap-6'>

                        <div className='w-[5.5rem] layer'>
                            <img src="/media/layout/orders-logo.png" className='w-full h-full object-cover'/>
                        </div>

                        <div className='flex flex-1 flex-col gap-2.5 cursor-default text-white -mt-1'>

                            <p className='text-[1.1rem] lg:text-[1.3rem]'>
                                {config.text.ready_to_publish}
                            </p>

                            <p className='text-[.87rem] lg:text-[1rem] text-[#27fff1]'>
                                {config.text.we_offers_text} .
                            </p>

                        </div>

                    </div>

                    <div className='w-full lg:w-auto flex items-center gap-8 px-2'>
                        
                        <div className='hidden lg:block mt-1.5 text-white-light cursor-pointer duration-300 hover:text-white'>
                            <span className='material-symbols-outlined !text-[3rem]' translate='no'>play_circle</span>
                        </div>

                        <Link href='/' className='w-full lg:w-auto py-3 px-8 rounded-md text-white text-[1.1rem] bg-primary duration-300 hover:opacity-[.8] flex justify-center items-center'>
                            {config.text.start_now}
                        </Link>

                    </div>

                </div>

            </div>

            <div className='panel !border-primary overflow-hidden'>

                <div className='relative flex justify-between items-start flex-wrap lg:flex-nowrap bg-primary/30 p-6 py-8 lg:p-12'>

                    <div className='order-2 lg:order-1 w-full lg:flex-1 flex justify-start items-start flex-col gap-4 lg:gap-6 mt-[2rem] lg:mt-[4rem] cursor-default'>

                        <div className='w-full lg:w-[70%]'>

                            <h1 className='text-[1.4rem] lg:text-[2.2rem] lg:leading-[140%]'>
                                {config.text.header_title}
                            </h1>

                        </div>

                        <div className='w-full lg:w-[62%]'>
                        
                            <p className='text-[1rem] lg:text-[1.2rem] leading-[190%]'>
                                {config.text.header_text} .
                            </p>

                        </div>

                        <div className='w-full lg:w-[18rem] grid grid-cols-2 gap-3 pt-4 lg:pt-5'>

                            <button className='border border-primary text-white duration-300 bg-primary hover:opacity-[.8] py-2.5 px-0 w-full text-[1.1rem] rounded-md'>
                                {config.text.start_now}
                            </button>
                            <button className='border border-primary text-primary duration-300 bg-primary-light hover:bg-primary hover:text-white hover:border-primary py-2.5 px-0 w-full text-[1.1rem] rounded-md'>
                                {config.text.contact_us}
                            </button>
                            
                        </div>

                    </div>

                    <div className='hidden lg:block !absolute !bottom-[3rem] ltr:!left-[50%] rtl:!left-[38%] rtl:scale-x-[-1] opacity-[.7] layer'>
                        <img src="/media/layout/arrow.png" className='w-[10rem]' style={{ filter: "hue-rotate(130deg) saturate(150%) brightness(30%)" }}/>
                    </div>

                    <div className='order-1 lg:order-2 w-full lg:w-[40%] flex justify-center items-center gap-4 lg:gap-8 pt-10 lg:pt-0 relative'>

                        <div className="absolute top-0 ltr:right-0 rtl:left-0 lg:ltr:left-[13.5rem] lg:rtl:right-[13.5rem] select-none">

                            <div className='panel shadow-md lg:shadow-lg bg-panel/80 px-4 py-3 !rounded-lg flex justify-start items-center gap-2'>

                                <div className='w-[1.8rem] h-[1.8rem] rounded-full flex justify-center items-center layer p-[1px] border-2 border-gray-400'>
                                    <img src="/media/user/1.png" className="w-full h-full object-cover rounded-full" />
                                </div>

                                <div className='text-[.9rem]'>
                                    <span>🔥 {config.text.header_mark_text} .</span>
                                </div>

                            </div>

                        </div>

                        <div className='w-[14rem] h-[18rem] lg:h-[23rem] border-4 border-[#2b383d]/60 p-2 rounded-[10rem] layer -mt-[1rem]'>
                            <img src="/media/service/18.gif" className="w-full h-full object-cover rounded-[10rem]"/>
                        </div>

                        <div className='w-[14rem] h-[18rem] lg:h-[23rem] border-4 border-[#2b383d]/60 p-2 rounded-[10rem] layer mt-[5rem]'>
                            <img src="/media/service/15.gif" className="w-full h-full object-cover rounded-[10rem]"/>
                        </div>

                    </div>

                </div>

            </div>

            <div className='pt-1'>

                <div className='hidden lg:block rounded-lg overflow-hidden border border-primary'>
                    <Link href='/' className='w-full layer cursor-pointer hover:opacity-[.8] duration-500 group'>
                        <img src={`/media/layout/${config.lang}-banner.png`} className='w-full h-[10rem] duration-500'/>
                    </Link>
                </div>

                <div className='lg:hidden'>
                    <Link href='/' className='w-full layer cursor-pointer hover:opacity-[.8] duration-500 group'>
                        <img src={`/media/layout/${config.lang}-banner-small.png`} className='w-full duration-500'/>
                    </Link>
                </div>

            </div>

        </main>

    )

}
