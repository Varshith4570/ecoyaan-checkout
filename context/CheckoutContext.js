import React, { createContext, useContext, useState, useEffect } from 'react';

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
    const [cartData, setCartData] = useState(null);
    const [shippingAddress, setShippingAddress] = useState(null);
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [paymentDetails, setPaymentDetails] = useState(null);

    const updateCart = (data) => {
        setCartData(data);
    };

    const updateShippingAddress = (address) => {
        setShippingAddress(address);
        if (typeof window !== 'undefined') {
            localStorage.setItem('shippingAddress', JSON.stringify(address));
        }
    };

    const saveNewAddress = (address) => {
        const newAddresses = [...savedAddresses, address];
        setSavedAddresses(newAddresses);
        if (typeof window !== 'undefined') {
            localStorage.setItem('savedAddresses', JSON.stringify(newAddresses));
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedAddress = localStorage.getItem('shippingAddress');
            if (savedAddress) {
                try {
                    setShippingAddress(JSON.parse(savedAddress));
                } catch (e) { }
            }

            const storedAddresses = localStorage.getItem('savedAddresses');
            if (storedAddresses) {
                try {
                    setSavedAddresses(JSON.parse(storedAddresses));
                } catch (e) { }
            }
        }
    }, []);

    const clearCheckout = () => {
        setCartData(null);
        setShippingAddress(null);
        setPaymentDetails(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('shippingAddress');
        }
    };

    // derived state
    const subtotal = cartData?.cartItems?.reduce((acc, item) => acc + (item.product_price * item.quantity), 0) || 0;
    const shippingFee = cartData?.shipping_fee || 0;
    const total = subtotal + shippingFee;

    return (
        <CheckoutContext.Provider
            value={{
                cartData,
                updateCart,
                shippingAddress,
                updateShippingAddress,
                savedAddresses,
                saveNewAddress,
                paymentDetails,
                setPaymentDetails,
                clearCheckout,
                subtotal,
                shippingFee,
                total
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
}

export function useCheckout() {
    return useContext(CheckoutContext);
}
