"use client";

export default function Model ({ children, model, setModel, className, onClick, scale }) {

    return (

        <div onClick={onClick} className={`fixed inset-0 top-0 left-0 w-full h-full z-[9999] bg-[#000]/60 backdrop-blur-[30px] ${model ? `opacity-[1] scale-1 ${scale && 'transition-opacity duration-0'}` : `${scale ? 'opacity-0 scale-0 duration-0 transition-none' : 'opacity-0 scale-0 rotate-[360deg]'}`} duration-500 ease-in-out overflow-y-auto flex justify-center items-center ${className}`}>
           
            <div className={`w-full h-full overflow-y-auto flex justify-center items-center shadow-xl duration-300 ${scale && `${model ? 'opacity-[1] scale-1' : 'scale-0 opacity-0'}`}`}>
                {children}
            </div>

        </div>

    )

}
