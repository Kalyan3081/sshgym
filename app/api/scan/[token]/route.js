import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const host = request.headers.get('host') || '192.168.1.XX:3000'; // Fallback to your dev IP

    const response = NextResponse.redirect(new URL('/login', `http://${host}`));
    response.cookies.set('gym-location-pass', 'active-inside-gym', {
        maxAge: 7200,
        path: '/',
        // Change httpOnly to FALSE if you want to check it in useEffect
        // OR keep it TRUE and use Middleware to protect the route (Recommended)
        httpOnly: true,
        secure: false, // Must be false for local HTTP testing
        sameSite: 'lax'
    });

    return response;
}