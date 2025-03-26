"use client";
import 'react-toastify/dist/ReactToastify.css';
import "@/public/sass/layout/tailwind.css";
import "@/public/sass/main.scss";
import { ToastContainer } from 'react-toastify';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Layout from "@/components/layout";
import config from '@/public/script/store';

export default function RootLayout ({ children }) {

    const store = configureStore({ reducer: combineReducers({ config: config }) });

    return (
        <html>
             <head>
                <meta charSet="UTF-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Bookinzy</title>
                <link rel="icon" href="/media/layout/favicon.png"/>
                <link rel="manifest" href="/script/manifest.json"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@100..900&display=swap"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;500;600;700;800&display=swap"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;600;700;800&display=swap"/>
            </head>
            <body>
                <Provider store={store}>
                    <Layout>{children}</Layout>
                    <ToastContainer />
                </Provider>
            </body>
        </html>
    )

}
