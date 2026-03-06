import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCheckout } from '../../context/CheckoutContext';

const InputField = ({ label, id, type = "text", placeholder, formData, handleChange, errors }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-bold text-slate-700 mb-1.5">{label}</label>
        <input
            type={type}
            id={id}
            name={id}
            value={formData[id]}
            onChange={handleChange}
            className={`w-full px-4 py-3.5 rounded-xl border ${errors[id] ? 'border-rose-400 bg-rose-50 placeholder-rose-300' : 'border-slate-200 bg-white/50 focus:bg-white placeholder-slate-400'} focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all duration-200 shadow-sm`}
            placeholder={placeholder}
        />
        {errors[id] && (
            <p className="mt-1.5 text-xs font-semibold text-rose-500 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                {errors[id]}
            </p>
        )}
    </div>
);

export default function Shipping() {
    const { updateShippingAddress, shippingAddress, cartData } = useCheckout();
    const router = useRouter();

    useEffect(() => {
        if (!cartData) {
            // Optional: redirect to cart if no state
            // router.push('/cart');
        }
    }, [cartData, router]);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pinCode: '',
        country: ''
    });

    useEffect(() => {
        if (shippingAddress) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData(shippingAddress);
        }
    }, [shippingAddress]);

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Valid email is required";
        if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = "10 digit phone number required";
        if (!formData.address.trim()) newErrors.address = "Street address is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.state.trim()) newErrors.state = "State is required";
        if (!/^\d{5,6}$/.test(formData.pinCode)) newErrors.pinCode = "Valid PIN code required";
        if (!formData.country.trim()) newErrors.country = "Country is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            updateShippingAddress(formData);
            router.push('/checkout/payment');
        }
    };

    return (
        <div className="animate-fade-in relative z-10 w-full">
            <Head>
                <title>Shipping Address | Ecoyaan Checkout</title>
            </Head>

            <div className="max-w-3xl mx-auto w-full">
                {/* Progress Bar */}
                <div className="relative mb-12 px-4">
                    <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex items-center" aria-hidden="true">
                        <div className="w-full border-t-[3px] border-slate-200"></div>
                    </div>

                    <div className="absolute top-1/2 left-0 w-1/2 -translate-y-1/2 flex items-center" aria-hidden="true">
                        <div className="w-full border-t-[3px] border-emerald-500 transition-all duration-1000 ease-out"></div>
                    </div>

                    <div className="relative flex justify-between">
                        <div className="flex flex-col items-center">
                            <div className="bg-emerald-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold ring-4 ring-white shadow-md z-10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="mt-2 text-xs font-bold text-emerald-600 hidden sm:block">Cart</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="bg-emerald-500 rounded-full w-10 h-10 flex items-center justify-center text-white text-lg font-bold ring-4 ring-white shadow-md z-10 animate-pulse">
                                2
                            </div>
                            <span className="mt-2 text-xs font-bold text-emerald-600 hidden sm:block">Shipping</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="bg-slate-200 rounded-full w-10 h-10 flex items-center justify-center text-slate-500 text-lg font-bold ring-4 ring-white shadow-sm z-10 transition-colors">
                                3
                            </div>
                            <span className="mt-2 text-xs font-bold text-slate-400 hidden sm:block">Payment</span>
                        </div>
                    </div>
                </div>

                <div className="glass-card rounded-3xl p-6 sm:p-10 border-t-4 border-t-emerald-500 w-full bg-white/95">
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Delivery Details</h1>
                        <p className="mt-2 text-slate-500 font-medium text-sm sm:text-base">Where should we send your sustainable goods?</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputField label="Full Name" id="fullName" placeholder="Jane Doe" formData={formData} errors={errors} handleChange={handleChange} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Email Address" id="email" type="email" placeholder="jane@example.com" formData={formData} errors={errors} handleChange={handleChange} />
                            <InputField label="Phone Number" id="phone" type="tel" placeholder="(555) 123-4567" formData={formData} errors={errors} handleChange={handleChange} />
                        </div>

                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <h3 className="text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-200">Address Info</h3>
                            <div className="space-y-6 mb-6">
                                <InputField label="Street Address (House No, Street, Landmark)" id="address" placeholder="123 Eco Way, Appt 4B" formData={formData} errors={errors} handleChange={handleChange} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                <InputField label="City" id="city" placeholder="Seattle" formData={formData} errors={errors} handleChange={handleChange} />
                                <InputField label="State / Province" id="state" placeholder="WA" formData={formData} errors={errors} handleChange={handleChange} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <InputField label="ZIP / PIN Code" id="pinCode" placeholder="98101" formData={formData} errors={errors} handleChange={handleChange} />
                                <InputField label="Country" id="country" placeholder="United States" formData={formData} errors={errors} handleChange={handleChange} />
                            </div>
                        </div>

                        <div className="pt-8 flex flex-col-reverse sm:flex-row gap-4 items-center">
                            <button
                                type="button"
                                onClick={() => router.push('/cart')}
                                className="w-full sm:w-1/3 bg-white hover:bg-slate-50 text-slate-700 py-4 rounded-xl font-bold border border-slate-200 transition-colors shadow-sm flex items-center justify-center gap-2 group"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Return to Cart
                            </button>
                            <button
                                type="submit"
                                className="w-full sm:w-2/3 bg-slate-900 hover:bg-emerald-600 text-white py-4 rounded-xl font-extrabold shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group relative overflow-hidden"
                            >
                                <span className="relative z-10">Proceed to Payment</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
