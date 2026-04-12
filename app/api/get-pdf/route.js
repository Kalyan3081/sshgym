// app/api/get-pdf/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request) {
    try {
        // Use service role key — this runs server-side only, never exposed to client
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        // Get the user's session from the Authorization header
        const authHeader = request.headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const token = authHeader.replace('Bearer ', '');

        // Verify the user token
        const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get member data
        const { data: member, error: memberError } = await supabaseAdmin
            .from('members')
            .select('assigned_stage, assigned_part, expiry_date')
            .eq('user_id', user.id)
            .maybeSingle();

        if (memberError || !member) {
            return NextResponse.json({ error: 'Member not found' }, { status: 404 });
        }

        // Check expiry
        if (new Date() > new Date(member.expiry_date)) {
            return NextResponse.json({ error: 'Membership expired' }, { status: 403 });
        }

        // Get the storage path from workout_plans
        // app/api/get-pdf/route.js

        // ... inside the plan query ...
        // Get the storage path from workout_plans
        const { data: plan, error: planError } = await supabaseAdmin
            .from('workout_plans')
            .select('pdf_url')
            .eq('stage', String(member.assigned_stage)) // Added String() here
            .eq('part', String(member.assigned_part))   // Added String() here
            .maybeSingle();

        if (planError || !plan) {
            return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
        }

        // Generate signed URL — expires in 2 hours (7200 seconds)
        const { data: signedData, error: signedError } = await supabaseAdmin
            .storage
            .from('workout-pdfs')
            .createSignedUrl(plan.pdf_url, 7200);

        if (signedError || !signedData) {
            return NextResponse.json({ error: 'Could not generate URL' }, { status: 500 });
        }

        return NextResponse.json({ url: signedData.signedUrl });

    } catch (err) {
        console.error("🔥 ACTUAL SERVER ERROR:", err); // <--- ADD THIS LINE
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }

}