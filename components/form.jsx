"use client";
import { api, date, print } from '@/public/script/main';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Dropdown from '@/components/menu';
import Elements from '@/components/elements';
import Calendar from '@/components/calendar';
import Select from '@/components/select';

export default function Form ({ filters={}, setFilters, className, scrollTop }) {

    const config = useSelector((state) => state.config);
    const routers = useRouter();
    const [categories, setCategories] = useState([]);
    const [vendors, setVendors] = useState([]);

    const _get_ =  async() => {

        // const response = await api('search/form');
        const response = {
            status: true,
            categories: [
                {id: 1, name: 'Pro Tech Programming', image: 'service/1.png', rate: 5, services: 23},
                {id: 2, name: 'Mohamed Ibrahim', image: 'service/2.png', rate: 4, services: 19},
                {id: 3, name: 'Islam Saaid', image: 'service/3.png', rate: 5, services: 20},
                {id: 4, name: 'Yossef Yasieen', image: 'service/4.png', rate: 2, services: 14},
                {id: 5, name: 'Programmer Prof', image: 'service/5.png', rate: 1, services: 24},
                {id: 6, name: 'Enouph Money', image: 'service/6.png', rate: 5, services: 50},
                {id: 7, name: 'Thourting buyer', image: 'service/7.png', rate: 4, services: 33},
                {id: 8, name: 'Asmaas Mohamed', image: 'service/8.png', rate: 3, services: 10},
                {id: 9, name: 'Esraa Salem Ahmed', image: 'service/4.png', rate: 5, services: 13},
                {id: 10, name: 'Abdulrahman yasser', image: 'service/5.png', rate: 3, services: 28},
            ],
            vendors: [
                {id: 1, name: 'Dr. Coding Master', image: 'user/1.png', rate: 5, reviews: 2399},
                {id: 2, name: 'Mohamed Ibrahim', image: 'user/2.png', rate: 4, reviews: 129},
                {id: 3, name: 'Islam Saaid', image: 'user/3.png', rate: 5, reviews: 2180},
                {id: 4, name: 'Yossef Yasieen', image: 'user/4.png', rate: 2, reviews: 144},
                {id: 5, name: 'Programmer Prof', image: 'user/5.png', rate: 1, reviews: 284},
                {id: 6, name: 'Enouph Money', image: 'user/1.png', rate: 5, reviews: 560},
                {id: 7, name: 'Thourting buyer', image: 'user/2.png', rate: 4, reviews: 139},
                {id: 8, name: 'Asmaas Mohamed', image: 'user/3.png', rate: 3, reviews: 120},
                {id: 9, name: 'Esraa Salem Ahmed', image: 'user/4.png', rate: 5, reviews: 1293},
                {id: 10, name: 'Abdulrahman yasser', image: 'user/5.png', rate: 3, reviews: 238},
            ],
        };

        setCategories(response.categories || []);
        setVendors(response.vendors || []);

    }
    const _search_ = () => {

        routers.push(`/search/?query=Many services near you&category=${filters.category || ''}&vendor=${filters.vendor || ''}&date=${filters.date || ''}`);

    }
    useEffect(() => {

       _get_();

    }, []);

    return (

        <div className={`panel w-full !rounded-md m-auto p-4 cursor-default ${className}`}>

            <div className='w-full flex justify-between items-center gap-4'>
                
                <div onClick={() => window.scrollTo(0, scrollTop || 0)} className='w-full flex-1 grid grid-cols-3 gap-4'>

                    {/* <div className="dropdown w-full">

                        <Dropdown placement='reverse' btnClassName='w-full relative group block'
                            button={
                                <div className='relative w-full'>
                                    <input type="search" value={filters.query || ''} onChange={(e) => setFilters({...filters, query: e.target.value})} className='w-full h-full px-5 py-[1.2rem] text-[1rem] rounded-md font-semibold text-gray-950 tracking-wide border border-gray-300 focus:border-primary' placeholder='Search ...'/>
                                </div>
                            }
                            >

                            <div></div>

                        </Dropdown>

                    </div> */}

                    <div className="dropdown w-full">

                        <Dropdown placement='reverse' btnClassName='w-full relative group block'
                            button={
                                <div className='relative w-full py-1.5 px-4 rounded-md border border-gray-300 hover:bg-primary-light/50 flex items-center gap-3.5'>
                                    <div className='flex justify-center items-center text-primary'>
                                        {
                                            filters.category ?
                                            <Elements element='image' value={categories.find(_ => _.id == filters.category)?.image} type='md' className="w-9 h-9 flex justify-center items-center"/> :
                                            <span className='material-symbols-outlined text-[1.7rem]' translate='no'>dataset</span>
                                        }
                                    </div>
                                    <div className='w-full ltr:text-left rtl:text-right font-semibold text-gray-900'>
                                        <span className='text-[.85rem] select-none tracking-wide opacity-[.9]'>Category</span>
                                        <p className='text-[1rem] line-clamp-1 tracking-wide'>{categories.find(_ => _.id == filters.category)?.name || 'Select Category'}</p>
                                    </div>
                                    {
                                        filters.category ?
                                        <div onClick={(e) => { setFilters({...filters, category: 0}); e.stopPropagation(); }} className="absolute top-[50%] right-4 translate-y-[-50%] w-[2.1rem] h-[2.1rem] border border-gray-300 rounded-full bg-white-light/30 flex justify-center items-center cursor-pointer hover:bg-white-light">
                                            <span className='material-symbols-outlined text-[1.1rem] text-gray-600' translate='no'>close</span>
                                        </div> : ''
                                    }
                                </div>
                            }
                            >

                            <Select data={categories} onChange={(e) => setFilters({...filters, category: e.id})} title='Select Category' className='min-w-[27rem] shadow-lg'/>

                        </Dropdown>

                    </div>

                    <div className="dropdown w-full">

                        <Dropdown placement='reverse' btnClassName='w-full relative group block'
                            button={
                                <div className='relative w-full py-1.5 px-4 rounded-md border border-gray-300 hover:bg-primary-light/50 flex items-center gap-3.5'>
                                    <div className='flex justify-center items-center text-primary'>
                                        {
                                            filters.vendor ?
                                            <Elements element='image' value={vendors.find(_ => _.id == filters.vendor)?.image} className="w-9 h-9 flex justify-center items-center"/> :
                                            <span className='material-symbols-outlined text-[1.7rem]' translate='no'>group</span>
                                        }
                                    </div>
                                    <div className='w-full ltr:text-left rtl:text-right font-semibold text-gray-900'>
                                        <span className='text-[.85rem] select-none tracking-wide opacity-[.9]'>Vendor</span>
                                        <p className='text-[1rem] line-clamp-1 tracking-wide'>{vendors.find(_ => _.id == filters.vendor)?.name || 'Select Vendor'}</p>
                                    </div>
                                    {
                                        filters.vendor ?
                                        <div onClick={(e) => { setFilters({...filters, vendor: 0}); e.stopPropagation(); }} className="absolute top-[50%] right-4 translate-y-[-50%] w-[2.1rem] h-[2.1rem] border border-gray-300 rounded-full bg-white-light/30 flex justify-center items-center cursor-pointer hover:bg-white-light">
                                            <span className='material-symbols-outlined text-[1.1rem] text-gray-600' translate='no'>close</span>
                                        </div> : ''
                                    }
                                </div>
                            }
                            >

                            <Select data={vendors} onChange={(e) => setFilters({...filters, vendor: e.id})} type='user' title='Select Vendor' className='min-w-[27rem] shadow-lg'/>

                        </Dropdown>

                    </div>

                    <div className="dropdown w-full">

                        <Dropdown placement='reverse' btnClassName='w-full relative group block'
                            button={
                                <div className='relative w-full py-1.5 px-4 rounded-md border border-gray-300 hover:bg-primary-light/50 flex justify-start items-center gap-3.5'>
                                    <div className='flex justify-center items-center text-primary'>
                                        <span className='material-symbols-outlined text-[1.6rem]' translate='no'>calendar_month</span>
                                    </div>
                                    <div className='w-full ltr:text-left rtl:text-right font-semibold text-gray-900'>
                                        <span className='text-[.85rem] select-none tracking-wide opacity-[.9]'>Check In</span>
                                        {
                                            filters.date ?
                                            <p className='text-[1rem] line-clamp-1 tracking-wide'>
                                                {date('year', filters.date)}, {date('month_name', filters.date)} {date('day', filters.date)}
                                            </p> :
                                            <p className='text-[1rem] line-clamp-1 tracking-wide'>
                                                Select Date
                                            </p>
                                        }
                                    </div>
                                    {
                                        filters.date &&
                                        <div onClick={(e) => { setFilters({...filters, date: ''}); e.stopPropagation(); }} className="absolute top-[50%] right-4 translate-y-[-50%] w-[2.1rem] h-[2.1rem] border border-gray-300 rounded-full bg-white-light/30 flex justify-center items-center cursor-pointer hover:bg-white-light">
                                            <span className='material-symbols-outlined text-[1.1rem] text-gray-600' translate='no'>close</span>
                                        </div>
                                    }
                                </div>
                            }
                            >

                            <Calendar data={filters.date ? new Date(filters.date) : ''} onChange={(e) => setFilters({...filters, date: date('date', e)})} className='min-w-[28rem] shadow-lg'/>

                        </Dropdown>

                    </div>

                </div>

                <div onClick={_search_} className='w-[3.2rem] h-[3.2rem] rounded-full bg-primary text-white flex justify-center items-center cursor-pointer hover:opacity-[.8]'>
                    <span className='material-symbols-outlined' translate='no'>search</span>
                </div>

            </div>

        </div>

    )

}
