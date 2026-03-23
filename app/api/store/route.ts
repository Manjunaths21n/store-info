// // app/api/store/route.ts
// import { NextResponse } from 'next/server';



// export async function GET() {
//     const storeConfig = {
//         name: "The Corner Store",
//         tagline: "Fresh finds, every day.",
//         address: "42 Maple Street, Downtown",
//         phone: "+1 (555) 012-3456",
//         hours: {
//             0: null,
//             1: { open: "09:00", close: "21:00" },
//             2: { open: "09:00", close: "21:00" },
//             3: { open: "09:00", close: "21:00" },
//             4: { open: "09:00", close: "21:00" },
//             5: { open: "09:00", close: "22:00" },
//             6: { open: "10:00", close: "22:00" },
//         }
//     };
//     return NextResponse.json(storeConfig);
// }

// export async function PUT(req: Request) {
//     const body = await req.json();
//     // save to DB here
//     return NextResponse.json({ success: true });
// }

// app/api/store/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        // Step 1 — test without DB first
        console.log('ENV:', process.env.DATABASE_URL);

        // Step 2 — test DB import
        const { db } = await import('@/lib/db');
        console.log('DB imported:', !!db);

        // Step 3 — test query
        const storeStatus = await db.storeInfoStatus.findFirst();
        console.log('Result:', storeStatus);

        return NextResponse.json(storeStatus ?? { status: false });
    } catch (error) {
        console.error('FULL ERROR:', error);
        return NextResponse.json(
            { error: String(error) },
            { status: 500 }
        );
    }
}
export async function PUT(req: Request) {
    const body = await req.json();
    const updated = await db.storeInfoStatus.update({
        where: { id: body.id },
        data: { status: body.status },
    });
    return NextResponse.json(updated);
}