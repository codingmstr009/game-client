"use client";
import { useSelector } from 'react-redux';
import Icons from "./icons";

export default function Loader ({ className='' }) {
    
    const config = useSelector((state) => state.config);

    return (

        <div className={`screen_loader animate__animated w-full ${className.includes('fixed') ? 'fixed h-screen z-[999]' : className.includes('container') ? 'absolute h-screen z-40' : 'absolute h-full z-40'} ${className.includes('bg') ? 'bg-panel' : 'bg-body'} ${className} inset-0 grid place-content-center`}>

            <Icons icon='loader' className={`${className.includes('small') ? 'w-[32px] h-[32px]' : className.includes('medium') ? 'w-[50px] h-[50px]' : 'w-[65px] h-[65px]'}`}/>
       
        </div>

    )

}
