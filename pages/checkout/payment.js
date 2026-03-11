import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCheckout } from '../../context/CheckoutContext';

export default function Payment() {
    const { cartData, shippingAddress, subtotal, shippingFee, total, clearCheckout } = useCheckout();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    // Fallbacks for UI preview
    const displayTotal = cartData ? total : 0;
    const addressFallback = {
        fullName: "Jane Doe",
        email: "jane@example.com",
        address: "123 Eco Way",
        city: "Seattle",
        state: "WA",
        pinCode: "98101",
        country: "United States"
    };

    const displayAddress = shippingAddress || addressFallback;

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulate verification/payment API
        setTimeout(() => {
            setIsProcessing(false);
            clearCheckout();
            router.push('/success');
        }, 2000);
    };

    return (
        <div className="animate-fade-in relative w-full pb-32">
            <Head>
                <title>Payment | Ecoyaan Checkout</title>
            </Head>

            <div className="max-w-4xl mx-auto w-full px-4 sm:px-0">
                {/* Progress Bar */}
                <div className="relative mb-8 sm:mb-12 mt-6">
                    <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex items-center" aria-hidden="true">
                        <div className="w-full border-t-[3px] border-emerald-500"></div>
                    </div>

                    <div className="relative flex justify-between">
                        <div className="flex flex-col items-center">
                            <div className="bg-emerald-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold ring-4 ring-white shadow-md z-10 cursor-pointer transition-transform hover:scale-105" onClick={() => router.push('/cart')}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="mt-2 text-xs font-bold text-emerald-600 hidden sm:block">Cart</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="bg-emerald-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold ring-4 ring-white shadow-md z-10 cursor-pointer transition-transform hover:scale-105" onClick={() => router.push('/checkout/shipping')}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="mt-2 text-xs font-bold text-emerald-600 hidden sm:block">Shipping</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="bg-emerald-500 rounded-full w-10 h-10 flex items-center justify-center text-white text-lg font-bold ring-4 ring-white shadow-md z-10 animate-pulse">
                                3
                            </div>
                            <span className="mt-2 text-xs font-bold text-emerald-600 hidden sm:block">Payment</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3 space-y-6">
                        <div className="glass-card rounded-2xl p-5 sm:p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-extrabold text-slate-900">Shipping Details</h2>
                                <button onClick={() => router.push('/checkout/shipping')} className="text-sm text-emerald-600 font-bold hover:text-emerald-700 hover:underline">Edit</button>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex gap-4 break-words">
                                <div className="mt-1 hidden sm:block">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div className="w-full">
                                    <p className="font-bold text-slate-800">{displayAddress.fullName}</p>
                                    <p className="text-slate-500 text-sm mt-1 mb-2 break-all sm:break-normal">{displayAddress.email} &bull; {shippingAddress?.phone || addressFallback.phone}</p>
                                    <div className="space-y-0.5">
                                        <p className="text-slate-600 text-sm font-medium">
                                            {displayAddress.address}
                                        </p>
                                        <p className="text-slate-600 text-sm">
                                            {displayAddress.city}, {displayAddress.state} {displayAddress.pinCode}
                                        </p>
                                        <p className="text-slate-500 text-sm">
                                            {displayAddress.country}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card rounded-2xl p-5 sm:p-8 border-t-4 border-t-emerald-500">
                            <h2 className="text-xl font-extrabold text-slate-900 mb-6">Payment Method</h2>

                            <div className="border-2 border-emerald-500 bg-emerald-50/50 rounded-xl p-4 flex items-center gap-4 cursor-pointer relative overflow-hidden">
                                <div className="w-5 h-5 rounded-full border-4 border-emerald-500 bg-white flex-shrink-0"></div>
                                <div>
                                    <h3 className="font-bold text-emerald-900 text-sm sm:text-base">Credit / Debit Card</h3>
                                    <p className="text-emerald-700/70 text-xs sm:text-sm">Secure encrypted payment</p>
                                </div>
                                <div className="ml-auto flex gap-2 opacity-60">
                                    <div className="w-8 h-5 sm:w-10 sm:h-6 bg-slate-200 rounded"></div>
                                    <div className="w-8 h-5 sm:w-10 sm:h-6 bg-slate-200 rounded"></div>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Card Number</label>
                                    <div className="relative">
                                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-200 font-mono text-sm sm:text-base" />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Expiry Date</label>
                                        <input type="text" placeholder="MM/YY" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-200 font-mono text-sm sm:text-base" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1.5">CVC</label>
                                        <input type="text" placeholder="123" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-200 font-mono text-sm sm:text-base" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/3">
                        <div className="glass-card rounded-2xl p-5 sm:p-6 lg:sticky lg:top-24 mb-6">
                            <h2 className="text-xl font-bold text-slate-800 mb-6">Final Review</h2>

                            <div className="space-y-4 text-slate-600">
                                <div className="flex justify-between items-center text-sm">
                                    <span>Items ({cartData?.cartItems?.length || 0})</span>
                                    <span className="font-semibold text-slate-800">₹{(cartData ? subtotal : 0).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span>Shipping</span>
                                    <span className="font-semibold text-slate-800">₹{(cartData ? shippingFee : 0).toFixed(2)}</span>
                                </div>

                                <div className="pt-4 border-t border-slate-100 mb-4 sm:mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-slate-800">Total to Pay</span>
                                        <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                                            ₹{displayTotal.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 w-full border-t border-slate-200 z-50 bg-white/90 backdrop-blur-md pb-safe">
                <div className="max-w-4xl mx-auto px-4 py-4 sm:p-4 flex flex-row gap-3 items-center justify-between">
                    <button
                        type="button"
                        onClick={() => router.push('/checkout/shipping')}
                        className="basis-1/3 sm:basis-1/4 bg-white hover:bg-slate-50 text-slate-700 py-3.5 sm:py-4 rounded-xl font-bold border border-slate-200 transition-colors shadow-sm flex items-center justify-center gap-2 group text-sm sm:text-base whitespace-nowrap"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span className="hidden sm:inline">Back to Shipping</span>
                        <span className="sm:hidden">Back</span>
                    </button>
                    <button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className={`basis-2/3 sm:basis-3/4 w-full py-3.5 sm:py-4 rounded-xl font-extrabold text-white transition-all duration-300 md:hover:-translate-y-1 flex justify-center items-center gap-2 shadow-lg relative overflow-hidden text-sm sm:text-base ${isProcessing ? 'bg-emerald-400 cursor-not-allowed shadow-emerald-400/20' : 'bg-slate-900 hover:bg-emerald-600 shadow-emerald-500/10 hover:shadow-emerald-500/40'}`}
                    >
                        {isProcessing ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white relative z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span className="relative z-10">Processing...</span>
                            </>
                        ) : (
                            <>
                                <span className="relative z-10">Pay ₹{displayTotal.toFixed(2)} Securely</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
