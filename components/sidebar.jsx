"use client";
import { api } from '@/public/script/main';
import { actions } from '@/public/script/store';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icons from './icons';
import Elements from './elements';

export default function Sidebar () {
    
    const config = useSelector((state) => state.config);
    const router = useRouter();
    const dispatch = useDispatch();

    const logout = async() => {

        dispatch( actions.toggle_loader(true) );
        const response = await api('auth/logout');
        dispatch(actions.toggle_user(null));
        location.href = '/auth/login';

    }
    return (

        <div>

            <div className={`${config.side ? 'fixed' : 'hidden'} top-0 left-0 w-full h-full z-[99] bg-[black]/60 `} onClick={() => dispatch(actions.toggle_side())}></div>

            <nav className={`${config.side ? 'translate-0' : 'ltr:-translate-x-[260px] rtl:translate-x-[260px]'} sidebar fixed top-0 bottom-0 z-[99] h-full min-h-screen w-[260px] shadow-[1px_0_4px_0_rgba(94,92,154,0.1)] transition-all duration-300`}>
                
                <div className="h-full bg-white dark:bg-black select-none">

                    <div className="flex items-center justify-between px-4 py-4">

                        <Link href="/" className="flex justify-start flex-col">
                            <span className="text-[1.3rem] align-middle lg:inline font-semibold">
                                <span className='text-primary'>{config.text.logo1}</span>
                                <span className='text-[#c55858]'>{config.text.logo2}</span>
                            </span>
                        </Link>

                        <button type="button" onClick={() => dispatch(actions.toggle_side())} className="collapse-icon flex h-9 w-9 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-[180deg] dark:text-white-light dark:hover:bg-dark-light/10">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-auto h-6 w-6">
                                <path d="M13 19L7 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                    </div>

                    <div className='overflow-y-auto relative h-[calc(100vh_-_220px)] lg:h-[calc(100vh_-_160px)]'>

                        <ul className="relative space-y-1 px-3 py-0 transition-all duration-300">
                        
                            <li className="nav-item">
                                <Link href="/" className="group hover:!bg-primary-light border border-white hover:border-primary transition-all duration-300">
                                    <div className="flex items-center gap-3 px-1">
                                        <Icons icon='chart' className="group-hover:!text-primary !text-gray-950"/>
                                        <span className="text-black text-[1rem] group-hover:!text-gray-950">{config.text.home_page}</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/categories" className="group hover:!bg-primary-light border border-white hover:border-primary transition-all duration-300">
                                    <div className="flex items-center gap-3 px-1">
                                        <Icons icon='apps' className="group-hover:!text-primary !text-gray-950"/>
                                        <span className="text-black text-[1rem] group-hover:!text-gray-950">{config.text.categories}</span>
                                    </div>
                                </Link>
                            </li>
                            <div className='w-full py-2'><div className='w-full h-[1px] bg-gray-300'></div></div>
                            <li className="nav-item">
                                <Link href="/account" className="group hover:!bg-primary-light border border-white hover:border-primary transition-all duration-300">
                                    <div className="flex items-center gap-3 px-1">
                                        <Icons icon='user' className="group-hover:!text-primary !text-gray-950"/>
                                        <span className="text-black text-[1rem] group-hover:!text-gray-950">{config.text.account}</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/account" className="group hover:!bg-primary-light border border-white hover:border-primary transition-all duration-300">
                                    <div className="flex items-center gap-3 px-1">
                                        <Icons icon='message' className="group-hover:!text-primary !text-gray-950"/>
                                        <span className="text-black text-[1rem] group-hover:!text-gray-950">{config.text.messages}</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/account/order" className="group hover:!bg-primary-light border border-white hover:border-primary transition-all duration-300">
                                    <div className="flex items-center gap-3 px-1">
                                        <Icons icon='order' className="group-hover:!text-primary !text-gray-950"/>
                                        <span className="text-black text-[1rem] group-hover:!text-gray-950">{config.text.bookings}</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/" className="group hover:!bg-primary-light border border-white hover:border-primary transition-all duration-300">
                                    <div className="flex items-center gap-3 px-1">
                                        <Icons icon='setting' className="group-hover:!text-primary !text-gray-950"/>
                                        <span className="text-black text-[1rem] group-hover:!text-gray-950">{config.text.settings}</span>
                                    </div>
                                </Link>
                            </li>
                            <div className='w-full py-2'><div className='w-full h-[1px] bg-gray-300'></div></div>
                            <li className="nav-item">
                                <Link href="/about" className="group hover:!bg-primary-light border border-white hover:border-primary transition-all duration-300">
                                    <div className="flex items-center gap-3 px-1">
                                        <Icons icon='privacy' className="group-hover:!text-primary !text-gray-950"/>
                                        <span className="text-black text-[1rem] group-hover:!text-gray-950">{config.text.about_us}</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/contact" className="group hover:!bg-primary-light border border-white hover:border-primary transition-all duration-300">
                                    <div className="flex items-center gap-3 px-1">
                                        <Icons icon='users' className="group-hover:!text-primary !text-gray-950"/>
                                        <span className="text-black text-[1rem] group-hover:!text-gray-950">{config.text.support}</span>
                                    </div>
                                </Link>
                            </li>
                            {
                                config.user?.id ?
                                <li className="nav-item">
                                    <a onClick={logout} className="cursor-pointer group hover:!bg-danger-light border border-white hover:border-danger transition-all duration-300">
                                        <div className="flex items-center gap-3 px-1">
                                            <Icons icon='logout' className="group-hover:!text-danger !text-gray-950"/>
                                            <span className="text-black text-[1rem] group-hover:!text-gray-950">{config.text.logout}</span>
                                        </div>
                                    </a>
                                </li> :
                                <li className="nav-item">
                                    <Link href="/auth/login" className="group hover:!bg-primary-light border border-white hover:border-primary transition-all duration-300">
                                        <div className="flex items-center gap-3 px-1">
                                            <Icons icon='logout' className="group-hover:!text-primary !text-gray-950"/>
                                            <span className="text-black text-[1rem] group-hover:!text-gray-950">{config.text.login}</span>
                                        </div>
                                    </Link>
                                </li>
                            }
                        </ul>

                    </div>

                    {
                        config.user?.id &&
                        <div className='p-4 overflow-hidden'>

                            <div className='flex justify-between items-center rounded-md bg-primary/10 dark:bg-[#1b3c48]/50 p-3 border border-primary'>
                                
                                <div className='flex items-center gap-3'>

                                    <Elements element='image' value={config.user.image} className='w-10 h-10'/>

                                    <div className='flex flex-col flex-1 gap-0.5'>
                                        <p className='w-full text-[1rem]'>{config.user.name || '--'}</p>
                                        <p className='text-primary text-[.9rem]'>{config.text.available}</p>
                                    </div>

                                </div>

                                <div onClick={() => logout(true)} className='w-[2rem] h-[2rem] rounded-full text-danger flex justify-center items-center cursor-pointer duration-300 hover:!bg-danger hover:text-white'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M7 6a7.75 7.75 0 1 0 10 0"></path><path d="M12 4l0 8"></path>
                                    </svg>
                                </div>

                            </div>

                        </div>
                    }

                </div>

            </nav>

        </div>

    )

}
