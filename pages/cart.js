import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCheckout } from '../context/CheckoutContext';
import Image from 'next/image';

export default function Cart({ initialCartData }) {
    const { cartData, updateCart, subtotal, shippingFee, total } = useCheckout();
    const router = useRouter();

    useEffect(() => {
        if (initialCartData) {
            updateCart(initialCartData);
        }
    }, [initialCartData, updateCart]);

    const displayData = cartData || initialCartData;

    if (!displayData) {
        return <div className="text-center py-20 text-slate-500 font-medium">Loading cart insights...</div>;
    }

    const localSubtotal = displayData.cartItems.reduce((acc, item) => acc + (item.product_price * item.quantity), 0);
    const localShipping = displayData.shipping_fee;
    const localTotal = localSubtotal + localShipping;

    const finalSubtotal = cartData ? subtotal : localSubtotal;
    const finalShipping = cartData ? shippingFee : localShipping;
    const finalTotal = cartData ? total : localTotal;

    return (
        <div className="animate-fade-in">
            <Head>
                <title>Your Cart | Ecoyaan</title>
            </Head>

            <div className="relative mb-8 pb-4 border-b border-slate-200">
                <h1 className="text-3xl font-extrabold text-slate-900">Your Basket</h1>
                <p className="mt-2 text-slate-500">Review your eco-friendly choices before proceeding.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3 glass-card rounded-2xl p-2 sm:p-6 pb-2">
                    <ul className="divide-y divide-slate-100/60">
                        {displayData.cartItems.map((item) => (
                            <li key={item.product_id} className="py-6 flex gap-6 hover:bg-slate-50/50 rounded-xl transition-colors px-4 group">
                                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-white">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={item.image}
                                        alt={item.product_name}
                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <h3 className="text-lg sm:text-xl font-bold text-slate-800 line-clamp-2">{item.product_name}</h3>
                                        <p className="mt-1 text-sm text-slate-500 flex items-center gap-1">
                                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-xs font-semibold">Qty: {item.quantity}</span>
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-end mt-4">
                                        <span className="text-xl font-extrabold text-emerald-600">₹{item.product_price.toFixed(2)}</span>
                                        <button className="text-sm text-slate-400 hover:text-rose-500 transition-colors font-medium flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lg:w-1/3">
                    <div className="glass-card rounded-2xl p-6 sticky top-24 border-t-4 border-t-emerald-500">
                        <h2 className="text-xl font-bold text-slate-800 mb-6">Order Summary</h2>

                        <div className="space-y-4 text-slate-600">
                            <div className="flex justify-between items-center group">
                                <span className="group-hover:text-slate-800 transition-colors">Subtotal</span>
                                <span className="font-semibold text-slate-800">₹{finalSubtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center group">
                                <span className="group-hover:text-slate-800 transition-colors">Shipping</span>
                                <span className="font-semibold text-slate-800">₹{finalShipping.toFixed(2)}</span>
                            </div>

                            <div className="pt-4 mt-4 border-t border-slate-100 flex justify-between items-center">
                                <span className="text-lg font-bold text-slate-800">Total</span>
                                <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                                    ₹{finalTotal.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => router.push('/checkout/shipping')}
                            className="mt-8 w-full bg-slate-900 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Secure Checkout
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>

                        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 bg-slate-50 rounded-lg p-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            Standard SSL Encrypted Checkout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const protocol = context.req.headers['x-forwarded-proto'] || 'http';
    const host = context.req.headers.host || 'localhost:3000';
    const res = await fetch(`${protocol}://${host}/api/cart`);
    const data = await res.json();

    return {
        props: {
            initialCartData: data
        }
    };
}
