"use client";
import { fix_date, fix_number, matching } from '@/public/script/main';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Elements from "./elements";
import Stars from './stars';

export default function Select ({ data, onChange, className, title, type }) {

    const config = useSelector((state) => state.config);
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {

        let result = data?.filter((item) => 
            matching(`--${item.id}`, search) ||
            matching(item.name, search) ||
            matching(item.reviews, search) ||
            matching(item.services, search) ||
            matching(item.rate, search) ||
            matching(item.email, search) ||
            matching(item.created_at, search) ||
            matching(fix_date(item.created_at), search) ||
            matching(item.online ? config.text.online : config.text.offline, search)
        );

        setItems(result || []);

    }, [search]);
    useEffect(() => {

        setItems(data || []);

    }, [data]);

    return (

        <div className={`w-full panel !rounded-lg p-0 overflow-hidden ${className}`}>

            <div onClick={(e) => e.stopPropagation()} className="py-3 px-6 text-[1rem] border-b border-gray-300 select-none font-semibold tracking-wide flex justify-start items-center gap-2 bg-primary-light/50 text-gray-800">
                <span>{title}</span>
            </div>

            <div onClick={(e) => e.stopPropagation()} className="relative p-4">
                <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} placeholder={config.text.search} className='form-input text-[.95rem] tracking-wide font-semibold'/>
            </div>

            <div className='min-h-[15rem] max-h-[23.5rem] overflow-y-auto p-4 pt-0'>
                {
                    items.map((item, index) => 
                        <div key={index} onClick={() => onChange(item)} className="flex items-start gap-3 border-t border-gray-300 hover:bg-primary-light cursor-pointer py-3 px-4 select-none">
                
                            <Elements element='image' value={item.image} type={type !== 'user' && 'md'} className="w-11 h-11 mt-[3px] flex justify-center items-center"/>

                            <div className="flex-1 space-y-0.5 font-semibold max-w[80%]">
                                
                                <h6 className="text-base name text-[.9rem]">
                                    <p className='line-clamp-2 text-ellipsis'>{item.name}</p>
                                </h6>

                                {
                                    type === 'user' ?
                                    <div className='flex justify-start items-center gap-2'>
                                        <Stars count={item.rate} className='text-[.95rem]'/>
                                        <span className='font-semibold mt-[1px] text-[.8rem]'>( {fix_number(item.reviews)} )</span>
                                    </div> :
                                    <div className='flex justify-start items-center gap-2'>
                                        <span className='font-semibold mt-[1px] text-[.8rem]'>( {fix_number(item.services)} ) Services</span>
                                    </div>
                                }

                            </div>

                        </div>
                    )
                }
            </div>

        </div>

    )

}
