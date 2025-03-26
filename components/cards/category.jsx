"use client";
import { fix_number, storage } from '@/public/script/main';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Stars from '@/components/stars';

export default function Card ({ data, big }) {

    const config = useSelector((state) => state.config);

    return (

        <div className='w-full'>
            {
                big ?
                <div className='panel overflow-hidden !border-primary/50'>
                    
                    <div className='w-full group cursor-default space-y-5 p-4 overflow-hidden bg-primary-light/50'>

                        <div className="w-full h-[12rem] overflow-hidden rounded-sm lg:rounded-md border border-primary/50">
                            <img src={`${storage}/${data.image}`} className="w-full h-full object-cover duration-300"/>
                        </div>

                        <div className="w-full flex flex-col ltr:text-left rtl:text-right gap-2.5 p-1">

                            <h1 className='text-[1.1rem] tracking-wide'>
                                {data.name}
                            </h1>

                            <p className='text-[1rem]'>
                                <span className='text-danger'>{config.text.services}</span> :
                                <span className='px-2'>{fix_number(data.products)}</span>
                            </p>

                            <div className='flex items-center gap-2'>

                                <Stars count={data.rate || 5}/>

                                <span className='text-[.95rem] mt-[2px]'>
                                    ( {fix_number(data.reviews)} )
                                </span>

                            </div>

                            <div className='w-full pt-4'>
                                <Link href={`/category/${data.id}/${data.slug}`} className='w-full p-2.5 text-[1.1rem] bg-primary text-white border border-primary duration-300 hover:opacity-[.8] rounded-md flex justify-center items-center'>
                                    {config.text.explore}
                                </Link>
                            </div>

                        </div>

                    </div>

                </div> :
                <div className='panel overflow-hidden !border-primary/50'>
                        
                    <div className='w-full group cursor-default space-y-5 p-4 overflow-hidden bg-primary-light/50'>

                        <div className="w-full h-[10rem] overflow-hidden rounded-sm lg:rounded-md border border-primary/50">
                            <img src={`${storage}/${data.image}`} className="w-full h-full object-cover duration-300"/>
                        </div>

                        <div className="w-full flex flex-col ltr:text-left rtl:text-right gap-2.5 p-1">

                            <h1 className='text-[1.1rem] tracking-wide'>
                                {data.name}
                            </h1>

                            <p className='text-[1rem]'>
                                <span className='text-danger'>{config.text.services}</span> :
                                <span className='px-2'>{fix_number(data.products)}</span>
                            </p>

                            <div className='w-full pt-4'>
                                <Link href={`/category/${data.id}/${data.slug}`} className='w-full p-2.5 text-[1.05rem] bg-primary text-white border border-primary duration-300 hover:opacity-[.8] rounded-md flex justify-center items-center'>
                                    {config.text.explore}
                                </Link>
                            </div>

                        </div>

                    </div>

                </div>
            }
        </div>

    )

}
