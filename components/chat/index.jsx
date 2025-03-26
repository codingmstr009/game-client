"use client";
import { api, date, storage, fix_date, sound, scroll_down, scroll_to, fix_time, is_down, print } from '@/public/script/main';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Elements from '@/components/elements';
import Link from 'next/link';
import Icons from '@/components/icons';
import Loader from '@/components/loader';
import Broadcast from './broadcast';

export default function Chatbox () {

    const config = useSelector((state) => state.config);
    const ref = useRef(null);
    const [model, setModel] = useState(false);
    const [tab, setTab] = useState(1);
    const [messages, setMessages] = useState([]);
    const [last, setLast] = useState('');
    const [content, setContent] = useState('');
    const [scroller, setScroller] = useState(false);
    const [loader, setLoader] = useState(false);
    const [opened, setOpened] = useState(false);
    const [unreaden, setUnreaden] = useState(0);

    const _start_room_ = ( messages ) => {

        let new_messages = messages.filter(_ => _.sender_id !== 'system');
        let last_date = '', unread = 0, unreadIndex = 0;

        messages.forEach((message) => {

            if ( message.created_at?.split(' ')[0] !== last_date ) {

                let new_msg = {sender_id: 'system', created_at: date(), content: fix_date(message.created_at)};
                last_date = message.created_at?.split(' ')[0];
                new_messages.splice(new_messages.indexOf(message), 0, new_msg);
                setLast(last_date);

            }
            if ( !message.readen && message.sender_id !== config.user?.id ){

                unread++;
                unreadIndex = unreadIndex || new_messages.indexOf(message);

            }

        });
       
        let unread_msg = {id: 'unread-message', sender_id: 'system', created_at: date(), content: `${unread} Unread Messages`};
        if ( unread ) new_messages.splice(unreadIndex, 0, unread_msg);
        
        if ( config.user?.id ) setUnreaden(messages.filter(_ => _.sender_id !== config.user?.id && !_.readen).length);
        setMessages(new_messages);
        if ( unread ) scroll_to('unread-message');
        else scroll_down('.display-content');

    }
    const _update_room_ = ( message ) => {

        if ( date('date') !== last ) {
            setMessages([...messages, {sender_id: 'system', created_at: date(), content: fix_date(message.created_at)}, message]);
            setLast(date('date'));
        }
        else setMessages([...messages, message]);

        setContent('');
        scroll_down('.display-content');
        sound('send');

    }
    const _send_ = async( file ) => {

        let message = {
            id: date(),
            created_at: date(),
            sender_id: config.user?.id,
            receiver_id: 1,
            type: file ? 'file' : 'text',
            content: ref.current?.value || '',
            file: file,
            local: true,
        }

        _update_room_(message);
        let request = {content: message.content, type: message.type, file: message.file?.file}
        const response = await api('chat/send', request);

    }
    const _active_ = async() => {

        if ( unreaden ) api('chat/active');
        setUnreaden(0);
        // setTimeout(() => ref.current?.focus(), 500);

    }
    const _get_ = async() => {

        setLoader(true);
        const response = await api('chat');
        _start_room_(response.messages || []);
        setTimeout(() => setLoader(false), 500);
        setOpened(true);

    }
    useEffect(() => {

        if ( !unreaden ) return;
        sound('notify', 1);
        setTimeout(() => document.querySelector('.notification-svg')?.classList.add('active'));
        setTimeout(() => document.querySelector('.notification-svg')?.classList.remove('active'), 1000);

    }, [unreaden]);
    useEffect(() => {

        if ( tab === 2 ) _active_();

    }, [tab]);
    useEffect(() => {

        if ( config.user?.token && !opened ) _get_();

    }, [config.user]);

    return (

        <div>

            <div onClick={() => { setTab(1); setModel(!model); }} className='w-[3.7rem] h-[3.7rem] z-50 fixed bottom-[6rem] lg:bottom-6 right-7 lg:right-9 group'>
                
                <div className='w-full h-full relative text-center flex justify-center items-center rounded-full shadow-xl cursor-pointer text-white bg-primary group-hover:bg-secondary duration-300'>
                    
                    {
                        unreaden > 0 && !model &&
                        <div className="absolute -top-3 -right-1 w-[1.8rem] h-[1.8rem] select-none z-50 flex justify-center items-center rounded-full bg-danger notification-svg">
                            <span className='text-white text-[.9rem]'>{unreaden}</span>
                        </div>
                    }

                    <div className="hidden lg:block absolute top-[-.9rem] left-[-1.2rem]">
                        { !model && <img src="/media/layout/chat.svg" className="w-[5rem] scale-[1.4]"/> }
                    </div>

                    {
                        model ?
                        <Icons icon='arrow_down' className='!w-7 !h-7'/> :
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='min-w-8 min-h-8'>
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.4036 22.4797L10.6787 22.015C11.1195 21.2703 11.3399 20.8979 11.691 20.6902C12.0422 20.4825 12.5001 20.4678 13.4161 20.4385C14.275 20.4111 14.8523 20.3361 15.3458 20.1317C16.385 19.7012 17.2106 18.8756 17.641 17.8365C17.9639 17.0571 17.9639 16.0691 17.9639 14.093V13.2448C17.9639 10.4683 17.9639 9.08006 17.3389 8.06023C16.9892 7.48958 16.5094 7.0098 15.9388 6.66011C14.919 6.03516 13.5307 6.03516 10.7542 6.03516H8.20964C5.43314 6.03516 4.04489 6.03516 3.02507 6.66011C2.45442 7.0098 1.97464 7.48958 1.62495 8.06023C1 9.08006 1 10.4683 1 13.2448V14.093C1 16.0691 1 17.0571 1.32282 17.8365C1.75326 18.8756 2.57886 19.7012 3.61802 20.1317C4.11158 20.3361 4.68882 20.4111 5.5477 20.4385C6.46368 20.4678 6.92167 20.4825 7.27278 20.6902C7.6239 20.8979 7.84431 21.2703 8.28514 22.015L8.5602 22.4797C8.97002 23.1721 9.9938 23.1721 10.4036 22.4797ZM13.1928 14.5171C13.7783 14.5171 14.253 14.0424 14.253 13.4568C14.253 12.8713 13.7783 12.3966 13.1928 12.3966C12.6072 12.3966 12.1325 12.8713 12.1325 13.4568C12.1325 14.0424 12.6072 14.5171 13.1928 14.5171ZM10.5422 13.4568C10.5422 14.0424 10.0675 14.5171 9.48193 14.5171C8.89637 14.5171 8.42169 14.0424 8.42169 13.4568C8.42169 12.8713 8.89637 12.3966 9.48193 12.3966C10.0675 12.3966 10.5422 12.8713 10.5422 13.4568ZM5.77108 14.5171C6.35664 14.5171 6.83133 14.0424 6.83133 13.4568C6.83133 12.8713 6.35664 12.3966 5.77108 12.3966C5.18553 12.3966 4.71084 12.8713 4.71084 13.4568C4.71084 14.0424 5.18553 14.5171 5.77108 14.5171Z" fill="currentColor"></path>
                            <path opacity="0.8" d="M15.486 1C16.7529 0.999992 17.7603 0.999986 18.5683 1.07681C19.3967 1.15558 20.0972 1.32069 20.7212 1.70307C21.3632 2.09648 21.9029 2.63623 22.2963 3.27821C22.6787 3.90219 22.8438 4.60265 22.9226 5.43112C22.9994 6.23907 22.9994 7.24658 22.9994 8.51343V9.37869C22.9994 10.2803 22.9994 10.9975 22.9597 11.579C22.9191 12.174 22.8344 12.6848 22.6362 13.1632C22.152 14.3323 21.2232 15.2611 20.0541 15.7453C20.0249 15.7574 19.9955 15.7691 19.966 15.7804C19.8249 15.8343 19.7039 15.8806 19.5978 15.915H17.9477C17.9639 15.416 17.9639 14.8217 17.9639 14.093V13.2448C17.9639 10.4683 17.9639 9.08006 17.3389 8.06023C16.9892 7.48958 16.5094 7.0098 15.9388 6.66011C14.919 6.03516 13.5307 6.03516 10.7542 6.03516H8.20964C7.22423 6.03516 6.41369 6.03516 5.73242 6.06309V4.4127C5.76513 4.29934 5.80995 4.16941 5.86255 4.0169C5.95202 3.75751 6.06509 3.51219 6.20848 3.27821C6.60188 2.63623 7.14163 2.09648 7.78361 1.70307C8.40759 1.32069 9.10805 1.15558 9.93651 1.07681C10.7445 0.999986 11.7519 0.999992 13.0188 1H15.486Z" fill="currentColor"></path>
                        </svg>
                    }

                </div>

            </div>

            <div className={`fixed bottom-0 right-0 lg:bottom-[6rem] lg:right-9 bg-white z-[60] lg:rounded-lg shadow-lg overflow-hidden cursor-default transition-all duration-300 ${model ? 'opactiy-1 w-full h-full lg:w-[27rem] lg:h-[calc(100%_-_160px)] lg:max-h-[43rem]' : 'opacity-0 w-0 h-0'}`}>
                
                <div className={`absolute top-0 left-0 w-full h-full transition-all duration-300 ${tab === 1 ? 'opacity-1 translate-x-0' : 'opacity-0 -translate-x-[100%]'}`}>

                    <div className='bg-primary p-6 pt-8 bg-gradient-to-t from-white via-primary to-transparent'>
                        
                        <div className='w-full flex justify-between items-center'>

                            <div className='w-full flex flex-1 items-center'>

                                <div className='w-[2.8rem] h-[2.8rem] rounded-full overflow-hidden layer shadow-lg'>
                                    <img src="/media/user/2.png" className="w-full h-full rounded-full object-cover"/>
                                </div>
                                <div className='w-[2.8rem] h-[2.8rem] rounded-full overflow-hidden layer ltr:-ml-1 rtl:-mr-1 shadow-lg'>
                                    <img src="/media/user/4.png" className="w-full h-full rounded-full object-cover"/>
                                </div>
                                <div className='w-[2.8rem] h-[2.8rem] rounded-full overflow-hidden layer ltr:-ml-1 rtl:-mr-1 shadow-lg'>
                                    <img src="/media/user/1.png" className="w-full h-full rounded-full object-cover"/>
                                </div>

                            </div>

                            <div onClick={() => setModel(false)} className="w-[2.7rem] h-[2.7rem] flex lg:hidden justify-center items-center bg-primary-light rounded-md cursor-pointer shadow-lg hover:text-white hover:bg-black/50">
                                <span className='material-symbols-outlined text-[1.7rem]'>close</span>
                            </div>

                        </div>

                        <div className='w-full mt-[4rem] lg:mt-[2rem] text-[1.6rem] text-white leading-[180%]'>

                            <div className='flex gap-3'>{config.text.hi_there} <p className='-rotate-[45deg]'>✋</p> </div>

                            <div>{config.text.how_help}</div>

                        </div>

                        <div className='w-full flex justify-center items-center mt-8 lg:mt-6 -mb-12'>

                            <div onClick={() => setTab(2)} className='w-full bg-white p-5 py-6 relative rounded-sm lg:rounded-md cursor-pointer border border-gray-300 duration-300 hover:shadow-md hover:border-gray-300 group'>

                                <div className='w-full flex mb-3'>
                                    <p className='text-[1rem] duration-300 tracking-wide group-hover:text-primary'>{config.text.recent_message}</p>
                                </div>

                                <div className='w-full flex justify-between items-center'>

                                    <div className='flex items-center gap-3'>

                                        <div className='w-[2.7rem] h-[2.7rem] rounded-full overflow-hidden layer p-[1px] border-2 border-gray-300'>
                                            <img src="/media/user/4.png" className='w-full h-full rounded-full object-cover'/>
                                        </div>

                                        <div className='flex flex-col gap-1.5 text-[1rem]'>

                                            <p>مرحبا بك كيف حالك الان ؟</p>

                                            <p className='text-[.85rem] opacity-[.8]'>أدمن • منذ 3 أيام</p>

                                        </div>

                                    </div>

                                    <div className='flex justify-center items-center'>
                                        <Icons icon='arrow_right' className='group-hover:text-primary'/>
                                    </div>

                                </div>

                                {
                                    unreaden > 0 &&
                                    <div className="absolute top-4 ltr:right-3 rtl:left-3 w-[1.6rem] h-[1.6rem] shadow-md select-none z-50 flex justify-center items-center rounded-full bg-danger notification-svg">
                                        <span className='text-white text-[.9rem]'>{unreaden}</span>
                                    </div>
                                }

                            </div>

                        </div>

                    </div>

                    <div className='w-full flex justify-center items-center px-6 mt-10'>

                        <div onClick={() => setTab(2)} className='w-full bg-white p-5 py-6 rounded-sm lg:rounded-md border border-gray-300 duration-300 group hover:shadow-md hover:border-gray-300 flex justify-between items-center cursor-pointer'>

                            <div className='flex flex-col gap-2'>
                                <p className='text-[1rem] duration-300 group-hover:text-primary'>{config.text.send_a_message}</p>
                                <p className='text-[.9rem] opacity-[.8]'>{config.text.will_back_later}</p>
                            </div>

                            <div className='flex justify-center items-center'>
                                <span className='material-symbols-outlined text-primary text-[1.6rem] ltr:rotate-[-45deg] rtl:rotate-[-135deg]' translate='no'>send</span>
                            </div>

                        </div>

                    </div>

                    <div className="absolute bottom-0 left-0 w-full grid grid-cols-2 h-[5.5rem] border-t border-gray-200 select-none cursor-pointer bg-white">

                        <div className='flex justify-center items-center flex-col gap-1 h-full duration-300 text-primary hover:bg-primary-light hover:text-primary'>
                            <span className='material-symbols-outlined text-[1.7rem]' translate='no'>home</span>
                            <span className='text-[.95rem]'>{config.text.home}</span>
                        </div>

                        <div onClick={() => setTab(2)} className='flex justify-center items-center duration-300 flex-col gap-1 opacity-[.7] h-full hover:bg-primary-light hover:text-primary'>
                            <span className='material-symbols-outlined text-[1.5rem]' translate='no'>chat</span>
                            <span className='text-[.95rem]'>{config.text.messages}</span>
                        </div>
                        
                    </div>

                </div>

                <div className={`absolute top-0 left-0 w-full h-full transition-all duration-300 ${tab === 2 ? 'opacity-1 translate-x-0' : 'opacity-1 translate-x-[100%]'}`}>

                    <div className='w-full flex justify-center items-center bg-primary py-5 relative'>

                        <div onClick={() => setTab(1)} className='absolute top-[50%] left-4 -translate-y-[50%] w-[2.5rem] h-[2.5rem] flex justify-center items-center rounded-full cursor-pointer text-white'>
                            <span className='material-symbols-outlined !text-[2.2rem]' translate='no'>chevron_left</span>
                        </div>

                        <p className='text-white text-[1.3rem] font-semibold'>
                            <span className='text-primary-light'>{config.text.logo1}</span>
                            <span className='text-danger-light'>{config.text.logo2}</span>
                        </p>

                    </div>
                    
                    {
                        messages.length ?
                        <div onScroll={(e) => setScroller( is_down(e) )} className='w-full h-[calc(100%_-_135px)] overflow-y-auto display-content'>

                            <div className="px-2 py-3 pt-1 cursor-default chat-conversation-box">
                                {
                                    messages?.map((message, index) => {
                                        
                                        let sender = message.sender_id === config.user?.id;
                                        let image = sender ? config.user?.image : 'user/1.png';
                                        let file_url = message.local ? message.file?.url : `${storage}/${message.file?.url}`;

                                        return (

                                            <div key={index} id={message.id} className='pt-3 pb-0'>
                                                {
                                                    message.sender_id === 'system' ?
                                                    <div className="flex justify-center items-center">

                                                        <div className="rounded-md py-1 px-4 bg-[#888] text-white text-[.9rem]">
                                                            <span>{message.content}</span>
                                                        </div>

                                                    </div> :
                                                    <div className={`flex items-start ${sender && 'justify-end'}`}>

                                                        {/* <div className={`${sender && 'order-2'} ${messages[index-1]?.sender_id === message.sender_id && 'invisible'}`}>
                                                            <Elements element='image' value={image} className='w-10 h-10'/>
                                                        </div> */}

                                                        <div className="space-y-1.5 w-[60%] mx-[.6rem] -mt-[1px]" title={fix_time(message.created_at)}>

                                                            <div className={`flex items-center ${sender && 'justify-end'}`}>

                                                                <div className={`rounded-sm relative tracking-wide ${sender ? 'bg-primary/30' : 'bg-primary text-white'}`}>
                                                                    {
                                                                        message.type === 'file' ?
                                                                        <Link href={file_url} target='_blank' download className='select-none hover:opacity-[.8]'>
                                                                            {
                                                                                message.file.type === 'image' ?
                                                                                <div className='rounded-md p-1.5'>
                                                                                    <img src={file_url} className='w-auto max-w-[15rem] max-h-[12rem] rounded-sm'/>
                                                                                </div> :
                                                                                message.file.type === 'video' ?
                                                                                <div className='rounded-md p-1.5'>
                                                                                    <video src={file_url} className='w-auto max-w-[15rem] max-h-[12rem] rounded-sm'></video>
                                                                                </div> :
                                                                                <div className='p-2 w-[18rem] rounded-sm'>
                                                                                    <div className={`p-3 rounded-sm flex justify-between items-center ${sender ? 'bg-primary/20' : 'bg-black/30'}`}>
                                                                                        <div className="flex justify-start items-center gap-1">
                                                                                            <span className="material-symbols-outlined text-[1.7rem] opacity-[.7]" translate='no'>description</span>
                                                                                            <div className="flex justify-start items-center flex-col flex-1 mx-[.5rem] gap-1 overflow-hidden">
                                                                                                <span className="w-full flex justify-start items-center text-[.9rem]">{message.file.name.slice(0, 22)}..</span>
                                                                                                <span className="w-full flex justify-start items-center text-[.8rem] opacity-[.8]">{message.file.size}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                        <span className="material-symbols-outlined text-[1.7rem] opacity-[.7]" translate='no'>download</span>
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                        </Link> :
                                                                        <div className='px-6 py-3 text-[1rem]'>{message.content}</div>
                                                                    }
                                                                </div>

                                                            </div>

                                                            {
                                                                messages[index+1]?.sender_id !== message.sender_id &&
                                                                <div className={`text-[.85rem] tracking-wide px-1 ${sender && 'ltr:text-right rtl:text-left'}`}>
                                                                    { fix_time(message.created_at) }
                                                                </div>
                                                            }

                                                        </div>

                                                    </div>
                                                }
                                            </div>

                                        );

                                    })
                                }
                            </div>

                            { scroller && <Elements element='scroll_down' className='!bottom-[6rem]' onClick={() => scroll_down('.display-content', true)}/> }

                        </div> :
                        <div className='w-full h-[85%] flex justify-center items-center'>

                            <Icons icon='chat' className='text-white'/>

                        </div>
                    }

                    <div className="absolute bottom-0 left-0 w-full">

                        <form  onSubmit={(e) => { e.preventDefault(); _send_(); }} className='w-full px-6 py-6 relative'>

                            <input type="text" value={content} onChange={(e) => setContent(e.target.value)} ref={ref} placeholder={config.text.write_message} required className='form-input !rounded-lg !px-5 !py-3 w-full ltr:!pr-[5rem] rtl:!pl-[5rem]' autoComplete='off'/>

                            <div className='absolute top-[50%] ltr:right-0 rtl:left-0 -translate-y-[50%] flex justify-center items-center gap-1 px-9'>

                                <div className='w-[2rem] h-[2rem] flex justify-center items-center cursor-pointer duration-300 hover:text-primary'>
                                    <span className='material-symbols-outlined !text-[1.6rem]' translate='no'>mood</span>
                                </div>

                                <Elements element='upload' multiple={true} onChange={_send_}>
                                    <div className='w-[2rem] h-[2rem] flex justify-center items-center cursor-pointer duration-300 hover:text-primary'>
                                        <span className='material-symbols-outlined !text-[1.6rem] -rotate-[45deg]' translate='no'>attachment</span>
                                    </div>
                                </Elements>

                            </div>

                        </form>

                    </div>

                </div>

                <Loader className={`bg ${loader && tab ? 'scale-1 opacity-1' : 'transition-all duration-500 scale-0 opacity-0'}`}/>

            </div>

            <Broadcast 
                user={config.user || {}} messages={messages} setMessages={setMessages} 
                unreaden={unreaden} setUnreaden={setUnreaden} model={model} tab={tab}
            />

        </div>

    )

}
