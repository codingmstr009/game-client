import { NextResponse } from 'next/server';
import { get_cookie } from "@/public/script/main";

const redirect = ( url, request ) => {

    return NextResponse.redirect(new URL(url, request.url));

}
const check_auth = ( request, path, user ) => {

    if ( user && path.includes('/auth') ) return redirect('/account', request);
    if ( !user && path.includes('/account') ) return redirect('/auth/login', request);
    if ( !user && path.includes('/deposit') ) return redirect('/auth/login', request);
    if ( !user && path.includes('/message') ) return redirect('/auth/login', request);
    if ( !user && path.includes('/checkout') ) return redirect('/auth/login', request);

}
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
export const middleware = async( request ) => {

    const path = request.nextUrl.pathname;
    const user = get_cookie('user', request.cookies);
    if ( /\.(.*)$/.test(path) ) return NextResponse.next();

    const auth_denied = check_auth( request, path, user );
    if ( auth_denied ) return auth_denied;

}
