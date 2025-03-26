"use client";
import { active_link, get_cookie, print } from '@/public/script/main';
import { actions } from '@/public/script/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { English } from '@/public/langs/en';
import { Arabic } from '@/public/langs/ar';
import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar';
import Chat from './chat/index';
import Loader from './loader';

export default function Layout ({ children }) {

    const config = useSelector((state) => state.config);
    const dispatch = useDispatch();
    const pathname = usePathname();
    const [animation, setAnimation] = useState(false);
    const [loader, setLoader] = useState(true);
    const [auth, setAuth] = useState(false);
    
    useEffect(() => {

        setAuth(config.user?.logged);

    }, [config.user]);
    useEffect(() => {

        setAnimation(false);
        setTimeout(() => setAnimation(config.animation));
        setTimeout(() => { setLoader(false); dispatch(actions.toggle_loader(false)); }, 500);
        setTimeout(() => active_link(pathname), 200);
        setTimeout(() => active_link(pathname), 1000);
        document.querySelector('.main-content')?.scrollTo(0, 0);

    }, [pathname, config.animation]);
    useEffect(() => {

        let current_text = Arabic;
        dispatch(actions.toggle_dir(config.lang === 'ar' ? 'rtl' : 'ltr'));

        if ( config.lang === 'ar' ) current_text = Arabic;
        if ( config.lang === 'en' ) current_text = English;
        dispatch(actions.toggle_text(current_text));

    }, [dispatch, config.lang, pathname]);
    useEffect(() => {

        dispatch( actions.toggle_theme( localStorage.getItem('theme') ) );
        dispatch( actions.toggle_menu( localStorage.getItem('menu') ) );
        dispatch( actions.toggle_layout( localStorage.getItem('layout') ) );
        dispatch( actions.toggle_dir( localStorage.getItem('dir') ) );
        dispatch( actions.toggle_animation( localStorage.getItem('animation') ) );
        dispatch( actions.toggle_nav( localStorage.getItem('nav') ) );
        dispatch( actions.toggle_lang( localStorage.getItem('lang') ) );
        dispatch( actions.toggle_location( JSON.parse(localStorage.getItem('location')) ) );
        dispatch( actions.toggle_user( get_cookie('user') ) );
        setAnimation(config.animation);

    }, [dispatch]);
    useEffect(() => {

        if ( !config.location ) {
            navigator.geolocation?.getCurrentPosition(
                ( position ) => dispatch(actions.toggle_location({latitude: position.coords.latitude, longitude: position.coords.longitude})),
                ( error ) => {}
            );
        }

    }, []);

    return (

        <div className='w-full flex justify-center items-center'>
            
            {children}

        </div>

    )

}
