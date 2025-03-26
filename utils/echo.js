import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { get_cookie, api_url } from '@/public/script/main';

let echo;

if ( typeof window !== 'undefined' ) {

    window.Pusher = Pusher;

    if ( process.env.NEXT_PUBLIC_BROADCAST_CONNECTION === 'reverb' ) {

        echo = new Echo({
            broadcaster: 'reverb',
            key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
            wsHost: process.env.NEXT_PUBLIC_REVERB_WS_HOST,
            wsPort: process.env.NEXT_PUBLIC_REVERB_WS_PORT,
            wssPort: process.env.NEXT_PUBLIC_REVERB_WS_PORT,
            enabledTransports: ['ws', 'wss'],
            forceTLS: false,
            authEndpoint: `${api_url}/api/broadcasting/auth`,
            auth: {
                headers: {
                    Authorization: `Bearer ${get_cookie('user')?.token}`
                },
                withCredentials: true,
            },
        });

    }
    else {

        echo = new Echo({
            broadcaster: 'pusher',
            key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
            encrypted: true,
            forceTLS: false,
            authEndpoint: `${api_url}/api/broadcasting/auth`,
            auth: {
                headers: {
                    Authorization: `Bearer ${get_cookie('user')?.token}`
                },
                withCredentials: true,
            },
        });

    }

}

export default echo;
