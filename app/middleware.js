// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
    const path = request.nextUrl.pathname;

    // Protect the new /workout route
    if (path.startsWith('/workout')) {

        // GEOFENCING CHECK: Look for the QR Code Session Cookie
        const locationPass = request.cookies.get('gym-location-pass');

        if (!locationPass) {
            // If they didn't scan the QR code, kick them out
            return NextResponse.redirect(new URL('/not-at-gym', request.url));
        }
    }

    return NextResponse.next();
}

// Tell middleware to only run on the workout page
export const config = {
    matcher: ['/workout'],
}