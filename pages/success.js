import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Success() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        // Generate a beautiful fake order number
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOrderNumber(`ECO-${Math.floor(100000 + Math.random() * 900000)}`);

        // Confetti effect could go here
    }, []);

    if (!mounted) return null;

    return (
        <div className="animate-fade-in flex flex-col items-center justify-center py-10 px-4 min-h-[60vh]">
            <Head>
                <title>Order Successful | Ecoyaan</title>
            </Head>

            <div className="glass-card rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center relative overflow-hidden border-t-8 border-t-emerald-500">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-50/50 to-transparent -z-10 pointer-events-none"></div>

                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner relative">
                    <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-600 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
                    Order Confirmed!
                </h1>

                <p className="text-slate-600 mb-8 max-w-sm mx-auto">
                    Thank you for choosing eco-friendly options. We&apos;re processing your order and will email you updates soon.
                </p>

                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-8 text-left inline-block w-full">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-slate-500 font-medium">Order Number</span>
                        <span className="font-bold text-slate-900 font-mono">{orderNumber}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-medium">Estimated Delivery</span>
                        <span className="font-bold text-slate-900">3-5 Business Days</span>
                    </div>
                </div>

                <Link href="/" className="inline-block w-full bg-slate-900 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1">
                    Return to Store
                </Link>
            </div>
        </div>
    );
}
