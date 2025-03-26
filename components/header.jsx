"use client";
import { actions } from '@/public/script/store';
import { api, trim } from '@/public/script/main';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Dropdown from './menu';
import Elements from "./elements";
import Icons from "./icons";
import Notification from './notification';
import Model from './model';

export default function Header () {

    const config = useSelector((state) => state.config);
    const router = useRouter();
    const pathname = usePathname();
    const ref = useRef();
    const dispatch = useDispatch();
    const [lang, setLang] = useState(config.lang);
    const [query, setQuery] = useState('');
    const [searchBar, SetSearchBar] = useState(false);

    const logout = async() => {

        dispatch( actions.toggle_loader(true) );
        const response = await api('auth/logout');
        dispatch(actions.toggle_user(null));
        location.href = '/auth/login';

    }
    const search = () => {

        if ( !trim(query) ) return;
        router.push(`/search/?query=${trim(query)}`);

    }
    useEffect(() => {
        
        setQuery('');

    }, [searchBar]);
    useEffect(() => {

        if ( config.side ) dispatch(actions.toggle_side(false));
        SetSearchBar(false);

    }, [pathname]);

    return (

        <div>

            <header className="bg-white border-b border-gray-300 w-full h-[60px] z-50 sticky top-0 shadow-md lg:shadow-sm">

                <main className="h-full flex justify-between items-center">

                    <div className="h-full flex items-center gap-2">
                        
                        <div onClick={() => dispatch(actions.toggle_side())} className="hidden lg:flex ltr:pr-2 rtl:pl-2 justify-center items-center cursor-pointer hover:text-primary">
                            <span className="material-symbols-outlined text-[2rem]" translate='no'>menu</span>
                        </div>

                        <Link href='/' className='h-full flex items-center gap-1 text-[1.5rem] font-semibold hover:opacity-[.8]'>
                            <span className='text-primary'>{config.text.logo1}</span>
                            <span className='text-danger'>{config.text.logo2}</span>
                        </Link>

                        <div className='w-full px-6 hidden lg:flex lg:flex-1'>

                            <main className='w-[25rem] relative bg-white rounded-md overflow-hidden'>

                                <input type="text" onKeyUp={(e) => e.key === 'Enter' ? search() : ''} value={query} onChange={(e) => setQuery(e.target.value)} placeholder={config.text.search_any_service} className='form-input w-full !bg-primary-light/50 px-6'/>

                                <div onClick={search} className='absolute top-[50%] -translate-y-[50%] ltr:right-2 rtl:left-2 lg:w-[2.2rem] lg:h-[2.2rem] flex justify-center items-center cursor-pointer bg-primary text-white rounded-full duration-300 hover:opacity-[.8]'>
                                    <span className='material-symbols-outlined text-[1.3rem]' translate='no'>search</span>
                                </div>

                            </main>

                        </div>

                    </div>

                    <div className="flex justify-end items-center gap-4 lg:min-w-[15rem] select-none">

                        <Notification />

                        <div className="dropdown">

                            <Dropdown offset={[0, 10]} btnClassName="relative block p-[.45rem] rounded-full bg-primary/5 border border-primary/50 hover:border-primary hover:text-primary"
                                button={config.lang && <img className="h-[1.6rem] w-[1.6rem] rounded-full object-cover" src={`/media/flags/${config.lang.toUpperCase()}.svg`} alt="flag" />}>
                                
                                <ul className="langs-list grid w-[280px] grid-cols-2 gap-2 !px-3 !py-3 !shadow-lg border border-gray-200 !rounded-sm overflow-hidden">
                                    {
                                        config.langs_list.map((item) =>

                                            <li key={item.code}>

                                                <button type="button" className={`flex w-full rounded-md hover:text-primary ${config.lang === item.code ? 'bg-primary/10 text-primary' : ''}`}
                                                    onClick={() => { dispatch(actions.toggle_lang(item.code)); setLang(item.code); }}>
                                                    <img src={`/media/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="h-5 w-5 rounded-full object-cover" />
                                                    <span className="ltr:ml-3 rtl:mr-3">{config.text[item.code]}</span>
                                                </button>

                                            </li>

                                        )
                                    }
                                </ul>

                            </Dropdown>

                        </div>

                        {
                            config.user?.id ?
                            <div className='flex justify-end items-center gap-4'>

                                <div className="dropdown">

                                    <Dropdown offset={[0, 10]} btnClassName="relative group block"
                                        button={<Elements element='image' value={config.user.image} className='w-[2.6rem] h-[2.6rem]'/>}>
                                        
                                        <ul className="w-[230px] !py-0 !shadow-lg border border-gray-200 !rounded-sm overflow-hidden">
                                            
                                            <li>

                                                <div className="flex items-center px-4 py-3 border-b border-gray-300">
                                                    
                                                    <Elements element='image' value={config.user.image} className='w-[2rem] h-[2rem] !p-0 !border-0'/>
                                                    
                                                    <div className="ltr:pl-4 rtl:pr-4 w-[10rem]">

                                                        <h4 className="text-[1.1rem] truncate w-full">
                                                            {config.user.name}
                                                        </h4>

                                                    </div>

                                                </div>

                                            </li>
                                            <li className='py-2 px-3'>
                                                <button onClick={() => router.push('/account')} className='rounded-md group duration-300 border border-white hover:border-primary'>
                                                    <Icons icon='user' className='group-hover:!text-primary'/>
                                                    <span className='px-3 text-[1rem] mt-[1px]'>{config.text.account}</span>
                                                </button>
                                                <button onClick={() => router.push('/account/wallet')} className='rounded-md group duration-300 border border-white hover:border-primary'>
                                                    <Icons icon='wallet' className='group-hover:!text-primary'/>
                                                    <span className='px-3 text-[1rem] mt-[1px]'>{config.text.wallet}</span>
                                                </button>
                                                <button onClick={() => router.push('/account/order')} className='rounded-md group duration-300 border border-white hover:border-primary'>
                                                    {/* <Icons icon='cart' className='group-hover:!text-primary'/> */}
                                                    <span className='material-symbols-outlined text-[1.4rem]'>shopping_cart</span>
                                                    <span className='px-3 text-[1rem] mt-[1px]'>{config.text.bookings}</span>
                                                </button>
                                                <button onClick={() => router.push('/account')} className='rounded-md group duration-300 border border-white hover:border-primary'>
                                                    <Icons icon='setting' className='group-hover:!text-primary'/>
                                                    <span className='px-3 text-[1rem] mt-[1px]'>{config.text.settings}</span>
                                                </button>
                                            </li>
                                            <li className="border-t border-gray-300 p-3 px-4">
                                                <button onClick={logout} className='rounded-md group duration-300 border border-white hover:!bg-danger-light hover:border-danger'>
                                                    <Icons icon='logout' className='group-hover:text-danger'/>
                                                    <span className='px-3 text-[1rem] group-hover:!text-danger'>{config.text.logout}</span>
                                                </button>
                                            </li>

                                        </ul>

                                    </Dropdown>

                                </div>

                                <div className='hidden lg:flex justify-end items-center gap-2 ltr:pl-2 rtl:pr-2'>
                                    <Link href='/account' className='py-2.5 px-6 bg-primary text-white text-[1.1rem] duration-300 hover:opacity-[.8] cursor-pointer rounded-md flex justify-center items-center gap-2.5'>
                                        <span className='material-symbols-outlined text-[1.4rem]' translate='no'>add_circle</span>
                                        {config.text.my_account}
                                    </Link>
                                </div>

                            </div> :
                            <div className='flex justify-end items-center gap-3 lg:ltr:pl-2 lg:rtl:pr-2'>
                                <Link href='/auth/login' className='hidden lg:block py-2.5 px-7 border border-primary bg-primary text-white text-[1rem] duration-300 hover:opacity-[.8] cursor-pointer rounded-md'>
                                    {config.text.login}
                                </Link>
                                <Link href='/auth/register' className='hidden lg:block py-2.5 px-6 border border-primary bg-white text-primary text-[1rem] duration-300 hover:bg-primary hover:text-white hover:border-primary cursor-pointer rounded-md'>
                                    {config.text.register}
                                </Link>
                                <Link href='/auth/login' className='lg:hidden py-1.5 px-5 border border-primary bg-primary text-white text-[1.1rem] duration-300 hover:opacity-[.8] cursor-pointer rounded-md'>
                                    {config.text.log}
                                </Link>
                            </div>
                        }

                    </div>

                </main>

                <Model model={searchBar} onClick={() => SetSearchBar(false)} scale className='!bg-black/50 !backdrop-blur-0'>

                    <div className='w-full absolute left-0 top-[30%]'>

                        <main onClick={(e) => e.stopPropagation()} className='relative bg-white rounded-md overflow-hidden shadow-lg'>

                            <input ref={ref} type="text" onKeyUp={(e) => e.key === 'Enter' ? search() : ''} value={query} onChange={(e) => setQuery(e.target.value)} placeholder={config.text.search_any_service} className='form-input w-full !bg-primary-light/50 px-6 !py-3.5'/>

                            <div onClick={search} className='absolute top-[50%] -translate-y-[50%] ltr:right-2 rtl:left-2 w-[2.5rem] h-[2.5rem] flex justify-center items-center cursor-pointer bg-primary text-white rounded-full duration-300 hover:opacity-[.8]'>
                                <span className='material-symbols-outlined text-[1.4rem]' translate='no'>search</span>
                            </div>

                        </main>

                    </div>

                </Model>

            </header>

            <div className='lg:hidden small-header fixed bottom-0 left-0 z-50 w-full h-[72px] bg-white border-t border-gray-300 shadow-md'>
                
                <div className='w-full h-full grid grid-cols-5 px-2'>

                    <Link href='/' className='flex justify-center items-center flex-col gap-1.5 h-full opacity-[.7] active'>
                        <div className='h-8 flex justify-center items-end'>
                            <svg viewBox="0 0 16 16" fill="none" className='w-6 h-6' xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z" stroke="currentColor"/>
                            </svg>
                        </div>
                        <span className='text-[.95rem]'>{config.text.home}</span>
                    </Link>
                    <Link href='/categories' className='flex justify-center items-center flex-col gap-1.5 h-full opacity-[.7]'>
                        <div className='h-8 overflow-hidden flex justify-center items-end'>
                            <svg viewBox="0 0 24 24" fill="none" className='w-6 h-6' xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path opacity="1" d="M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                <path opacity="1" d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className='text-[.95rem]'>{config.text.categories}</span>
                    </Link>
                    <a onClick={() =>  { SetSearchBar(!searchBar); setTimeout(() => ref.current?.focus(), 200); }} className='flex justify-center items-center flex-col gap-1.5 h-full opacity-[.7]'>
                        <div className='h-8 overflow-hidden flex justify-center items-end'>
                            <svg viewBox="0 0 24 24" fill="none" className='w-6 h-6' xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className='text-[.95rem]'>{config.text.make_explore}</span>
                    </a>
                    <Link href='/account/order' className='hidden justify-center items-center flex-col gap-1.5 h-full opacity-[.7]'>
                        <div className='h-8 overflow-hidden flex justify-center items-end'>
                            <svg viewBox="0 0 24 24" fill="none" className='w-6 h-6' xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3H3.21922L6.78345 17.2569C5.73276 17.7236 5 18.7762 5 20C5 21.6569 6.34315 23 8 23C9.65685 23 11 21.6569 11 20C11 19.6494 10.9398 19.3128 10.8293 19H15.1707C15.0602 19.3128 15 19.6494 15 20C15 21.6569 16.3431 23 18 23C19.6569 23 21 21.6569 21 20C21 18.3431 19.6569 17 18 17H8.78078L8.28078 15H18C20.0642 15 21.3019 13.6959 21.9887 12.2559C22.6599 10.8487 22.8935 9.16692 22.975 7.94368C23.0884 6.24014 21.6803 5 20.1211 5H5.78078L5.15951 2.51493C4.93692 1.62459 4.13696 1 3.21922 1H2ZM18 13H7.78078L6.28078 7H20.1211C20.6742 7 21.0063 7.40675 20.9794 7.81078C20.9034 8.9522 20.6906 10.3318 20.1836 11.3949C19.6922 12.4251 19.0201 13 18 13ZM18 20.9938C17.4511 20.9938 17.0062 20.5489 17.0062 20C17.0062 19.4511 17.4511 19.0062 18 19.0062C18.5489 19.0062 18.9938 19.4511 18.9938 20C18.9938 20.5489 18.5489 20.9938 18 20.9938ZM7.00617 20C7.00617 20.5489 7.45112 20.9938 8 20.9938C8.54888 20.9938 8.99383 20.5489 8.99383 20C8.99383 19.4511 8.54888 19.0062 8 19.0062C7.45112 19.0062 7.00617 19.4511 7.00617 20Z" fill="#0F0F0F"/>
                            </svg>
                        </div>
                        <span className='text-[.95rem]'>{config.text.bookings}</span>
                    </Link>
                    <Link href='/account' className='flex justify-center items-center flex-col gap-1.5 h-full opacity-[.7]'>
                        <div className='h-8 overflow-hidden flex justify-center items-end'>
                            <svg viewBox="0 0 16 16" fill="none" className='w-6 h-6' xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z" stroke="currentColor"/>
                                <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z" stroke="currentColor"/>
                            </svg>
                        </div>
                        <span className='text-[.95rem]'>{config.text.my_account}</span>
                    </Link>
                    <a onClick={() => dispatch(actions.toggle_side())} className='flex justify-center items-center flex-col gap-1.5 h-full opacity-[.7]'>
                        <div className='h-8 overflow-hidden flex justify-center items-end'>
                            <svg viewBox="0 0 24 24" fill="none" className='w-7 h-7 -mb-[2px]' xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className='text-[.95rem]'>{config.text.menu}</span>
                    </a>

                </div>

            </div>

        </div>

    )

}
