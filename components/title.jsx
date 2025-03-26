"use client";
import { useSelector } from 'react-redux';

export default function Title ({ head, text, style }) {

    const config = useSelector((state) => state.config);
 
    return (

        <div className='w-full'>
            {
                style === 2 ?
                <div className='w-full bg-primary/10 py-12 px-4'>

                    <main className='flex justify-center items-center flex-col gap-5 cursor-default'>

                        <h1 className='text-center text-[1.9rem] w-[20rem] leading-[140%]'>{head}</h1>

                        <p className='text-center text-[1.1rem] w-[25rem]'>{text}</p>

                    </main>

                </div> :
                <main className='w-full flex flex-col gap-3 pb-2'>

                    <div className='flex justify-start items-center text-[1.5rem] cursor-default'>{head}</div>

                    { text && <div className='flex justify-start items-center text-[1rem] cursor-default'>{text}</div> }

                </main>
            }
        </div>

    )

}
