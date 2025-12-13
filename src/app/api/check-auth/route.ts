import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password } = body;

        // ANTI-BRUTE FORCE: Artificial Delay (500ms - 1000ms)
        // This makes "guessing" millions of passwords take DECADES instead of hours.
        const delay = Math.floor(Math.random() * 500) + 500;
        await new Promise(resolve => setTimeout(resolve, delay));

        // Check against the hidden server environment variable
        // If exact match
        if (password === process.env.ADMIN_PASSWORD) {
            // Return a "Session Token" (simple success for now)
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
        }
    } catch {
        return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
    }
}
