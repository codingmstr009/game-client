"use client";
import { fix_number, storage } from '@/public/script/main';
import { useSelector } from 'react-redux';
import { Countries } from '@/utils/countries';
import Stars from '@/components/stars';
import Link from 'next/link';

export default function Card ({ data, style, vendor }) {

    const config = useSelector((state) => state.config);

    return (

        <div className='w-full bg-white rounded-sm lg:rounded-md'>
            {
                style === 2 ?
                <Link href={`/service/${data.id}/${data.name}`} className='panel !bg-primary-light/50 py-5 px-7 border !border-primary/75 flex items-center gap-5 hover:border-primary hover:shadow-lg hover:!bg-primary-light duration-300 cursor-pointer'>
                                    
                    <div className='w-[5rem] h-[5rem] border border-gray-300 flex justify-center items-center rounded-sm lg:rounded-[.7rem] overflow-hidden layer'>
                        <img src={`${storage}/${data.image}`} className="w-full h-full object-cover" />
                    </div>

                    <div className='flex flex-col flex-1 gap-1.5'>

                        <p className='text-[1.05rem] leading-7 line-clamp-2 h-[3.5rem]'>
                            {data.name}
                        </p>

                        <p className='text-[1rem] flex items-center gap-2'>
                            <span className='text-danger'>{config.text.reviews}</span> : 
                            <span>{fix_number(data.reviews)}</span>
                        </p>

                    </div>

                </Link> :
                <div className="panel p-4 overflow-hidden">

                    <div className='w-full h-[12rem] rounded-sm lg:rounded-md overflow-hidden relative'>

                        <Link href={`/service/${data.id}/${data.name}`} className='w-full h-full'>
                            <img className="w-full h-full object-cover object-center duration-300 hover:scale-[1.2]" src={`${storage}/${data.image}`}/>
                        </Link>

                        {
                            data.vendor && !vendor ?
                            <Link href={`/profile/${data.vendor.id}`} className='absolute bottom-3 ltr:left-4 rtl:right-4'>
                                <div className='w-[2.8rem] h-[2.8rem] rounded-full !shadow-lg border-2 border-white-light cursor-pointer bg-black duration-300 hover:scale-[1.05]'>
                                    <img className="w-full h-full rounded-full object-cover object-center" src={`${storage}/${data.vendor.image}`}/>
                                </div>
                            </Link> : ''
                        }

                    </div>
                
                    <div className="px-1 pt-5 flex justify-start flex-col gap-3.5 cursor-default">

                        <Link href={`/service/${data.id}/${data.name}`} className='group w-full flex'>
                            <h2 className="text-[1.1rem] leading-7 line-clamp-2 h-[3.5rem] duration-300 group-hover:text-primary">
                                {data.name}
                            </h2>
                        </Link>

                        <div className='flex items-center gap-2'>

                            <Stars count={data.rate || 5}/>

                            <span className='text-[.9rem]'>
                                ( {fix_number(data.reviews)} )
                            </span>

                        </div>

                        {
                            !vendor &&
                            <p className="w-[95%] text-[1rem] flex items-center gap-2">
                                <span className='material-symbols-outlined text-[1.2rem] text-primary' translate='no'>pin_drop</span>
                                {Countries.find(_ => _.code === data.country)?.ar_name || 'السعودية'}, {data.city}
                            </p>
                        }

                        <div className="w-full grid grid-cols-2 gap-3 pt-2 pb-1">

                            <div className='flex justify-start items-center bg-primary-light/50 rounded-md py-2 px-6 border border-gray-300'>
                                <span className="text-[1.1rem]">{fix_number(data.new_price, true)}</span>
                                <span className='px-1'>{config.text.curr}</span>
                            </div>

                            <Link href={`/service/${data.id}/${data.name}`} className='w-full'>
                                <button className="w-full py-2 bg-primary text-white text-[1.1rem] rounded-md hover:bg-primary/75">
                                    {config.text.book_now}
                                </button>
                            </Link>

                        </div>

                    </div>

                </div>
            }
        </div>

    )

}
