"use client";
import { date, print } from '@/public/script/main';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay, isAfter, isBefore } from 'date-fns';

export default function Calendar ({ data, onChange, className }) {

    const config = useSelector((state) => state.config);
    const [currentMonth, setCurrentMonth] = useState(data || new Date());
    const [selectedDate, setSelectedDate] = useState(data || new Date());

    const render_cells = () => {

        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {

            for (let i = 0; i < 7; i++) {

                const formattedDate = format(day, 'd');
                const cloneDay = day;
                const isBeforeToday = isBefore(day, new Date()) && isSameMonth(day, new Date());

                days.push(
                    <div key={day} onClick={() => !isBeforeToday && setSelectedDate(cloneDay)} 
                        className={`min-w-[2.7rem] min-h-[2.7rem] text-[1rem] flex justify-center items-center cursor-pointer rounded-full transition-colors duration-100 
                            ${
                                !isSameMonth(day, monthStart) ? 'invisible' : 
                                isSameDay(day, selectedDate) ? 'bg-primary text-white shadow-lg' : 
                                isBeforeToday ? 'text-gray-300 !cursor-default' : 'text-gray-700 hover:bg-primary-light hover:text-gray-950'}`
                            }
                        >
                        {formattedDate}
                    </div>
                );

                day = addDays(day, 1);

            }

            rows.push(<div key={day} className="w-full flex justify-between items-center">{days}</div>);

            days = [];

        }

        return rows;

    }
    const increase = () => {
        
        const newMonth = addMonths(currentMonth, 1);
        setCurrentMonth(newMonth);

    }
    const decrease = () => {
        
        const newMonth = subMonths(currentMonth, 1);
        if (isAfter(new Date(), startOfMonth(newMonth))) setCurrentMonth(new Date());
        else setCurrentMonth(newMonth);

    }
    useEffect(() => {

        if ( !data ) return;
        // onChange(selectedDate);

    }, [selectedDate]);

    return (

        <div className={`panel !rounded-lg w-full p-6 ${className}`} onClick={(e) => { e.target.nodeName !== 'BUTTON' && e.stopPropagation() }}>
            
            <div className="flex justify-between items-center gap-8 cursor-default">

                <button onClick={decrease} className="w-[2.5rem] h-[2.5rem] bg-primary-light text-gray-500 rounded-full flex justify-center items-center border border-gray-200 hover:border-primary hover:text-primary">
                    <span className='material-symbols-outlined text-[1.8rem]' translate='no'>arrow_left</span>
                </button>

                <div className='w-full bg-primary-light py-2.5 px-8 rounded-[2rem] flex flex-1 justify-center items-center border border-gray-200'>
                    <span className="text-[1.1rem]">
                        {format(currentMonth, 'MMMM yyyy')}
                    </span>
                </div>

                <button onClick={increase} className="w-[2.5rem] h-[2.5rem] bg-primary-light text-gray-500 rounded-full flex justify-center items-center border border-gray-200 hover:border-primary hover:text-primary">
                    <span className='material-symbols-outlined text-[2rem]' translate='no'>arrow_right</span>
                </button>

            </div>

            <div className='w-full flex justify-between items-center select-none mt-6 mb-3'>
                {
                    date('d_list').map((item, index) => 
                        <div key={index} className="w-[2.2rem] h-[2.2rem] flex justify-center items-center">
                            <span className='text-gray-950 text-[.92rem]'>{item}</span>
                        </div>
                    )
                }
            </div>

            <div className='w-full flex flex-col gap-3 select-none'>
                { render_cells() }
            </div>

            <div className='buttons w-full grid grid-cols-2 gap-3 border-t border-gray-300 pt-5 mt-5'>

                <button onClick={() => onChange(selectedDate)} className='p-2.5 bg-primary text-white text-[1rem] rounded-md duration-300 cursor-pointer hover:opacity-[.8]'>
                    {config.text.apply}
                </button>
                <button onClick={() => {}} className='p-2.5 bg-danger text-white text-[1rem] rounded-md duration-300 cursor-pointer hover:opacity-[.8]'>
                    {config.text.cancel}
                </button>

            </div>

        </div>

    )

}
