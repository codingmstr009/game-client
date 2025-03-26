"use client";
import { api, scroll_down, sound, print } from '@/public/script/main';
import { useEffect, useState } from 'react';
import Echo from "@/utils/echo";

export default function Broadcast ({ user, messages, setMessages, unreaden, setUnreaden, model, tab }) {

    const [channel, setChannel] = useState(null);
    const [message, setMessage] = useState(null);

    const _add_ = ( e ) => {

        setMessages([...messages, e.message]);

        if ( model && tab === 2 ) {
            
            scroll_down('.display-content');
            sound('receive');
            api('chat/active');

        }
        else setUnreaden(unreaden+1);

    }
    const _active_ = ( e ) => {
        
        setMessages(messages.map(_ => {_.readen = true; return _}));

    }
    useEffect(() => {
        
        if ( !message || message.sender === user.id ) return;
        if ( message.action === 'message' )  _add_(message);
        if ( message.action === 'active' )  _active_(message);

    }, [message]);
    useEffect(() => {

        if ( !channel ) return;
        channel.listen('.chat.box', setMessage);

    }, [channel]);
    useEffect(() => {

        if ( user.id ) setChannel(Echo.private(`chat.${user.id}`));

    }, [user]);

}
