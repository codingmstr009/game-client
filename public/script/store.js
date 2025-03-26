import { createSlice } from '@reduxjs/toolkit';
import { set_cookie, remove_cookie } from './main';

const initialState = {
    side: false,
    setting: false,
    loader: false,
    lang: 'ar',
    theme: 'light',
    menu: 'vertical',
    layout: 'boxed-layout',
    dir: 'rtl',
    animation: 'animate__zoomIn',
    nav: 'navbar-sticky',
    text: {},
    user: {},
    image: null,
    location: null,
    langs_list: [
        { code: 'en', name: 'English'},
        { code: 'ar', name: 'Arabic' },
        { code: 'fr', name: 'French' },
        { code: 'zh', name: 'Chinese' },
        { code: 'da', name: 'Danish' },
        { code: 'de', name: 'German' },
        { code: 'el', name: 'Greek' },
        { code: 'it', name: 'Italian' },
        { code: 'ja', name: 'Japanese' },
        { code: 'pl', name: 'Polish' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ru', name: 'Russian' },
        { code: 'es', name: 'Spanish' },
        { code: 'sv', name: 'Swedish' },
        { code: 'tr', name: 'Turkish' },
    ],
};
const themeConfigSlice = createSlice({

    name: 'auth',
    initialState: initialState,
    reducers: {
        toggle_theme(state, { payload }) {
            payload = payload || state.theme;
            localStorage.setItem('theme', payload);
            state.theme = payload;
            if ( payload === 'dark' ) document.querySelector('body')?.classList.add('dark');
            else document.querySelector('body')?.classList.remove('dark');
        },
        toggle_menu(state, { payload }) {
            payload = payload || state.menu;
            state.side = false;
            localStorage.setItem('menu', payload);
            state.menu = payload;
        },
        toggle_layout(state, { payload }) {
            payload = payload || state.layout;
            localStorage.setItem('layout', payload);
            state.layout = payload;
        },
        toggle_dir(state, { payload }) {
            payload = payload || state.dir;
            state.dir = payload;
            localStorage.setItem('dir', payload);
            document.querySelector('html')?.setAttribute('dir', payload);
            if ( payload === 'rtl' ) document.querySelector('html').classList.add('ar');
            else document.querySelector('html').classList.remove('ar');
        },
        toggle_animation(state, { payload }) {
            payload = payload || state.animation;
            payload = payload?.trim();
            localStorage.setItem('animation', payload);
            state.animation = payload;
        },
        toggle_nav(state, { payload }) {
            payload = payload || state.nav;
            localStorage.setItem('nav', payload);
            state.nav = payload;
        },
        toggle_lang(state, { payload }) {
            payload = payload || state.lang;
            localStorage.setItem('lang', payload);
            state.lang = payload;
        },
        toggle_side(state) {
            state.side = !state.side;
        },
        toggle_setting(state) {
            state.setting = !state.setting;
        },
        toggle_loader(state, { payload }) {
            state.loader = payload;
        },
        toggle_user(state, { payload }) {
            if ( payload ) set_cookie('user', payload);
            else remove_cookie('user');
            state.user = payload || {};
        },
        toggle_image(state, { payload }) {
            state.image = payload;
        },
        toggle_text(state, { payload }) {
            state.text = payload || state.text;
            localStorage.setItem('text', JSON.stringify(payload));
        },
        toggle_location(state, { payload }) {
            payload = payload || state.location;
            localStorage.setItem('location', JSON.stringify(payload));
            state.location = payload;
        },
    }

});

export const actions = themeConfigSlice.actions;
export default themeConfigSlice.reducer;
