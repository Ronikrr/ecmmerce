import React, { createContext, useState, useEffect } from 'react';
export const Cartcontext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({});
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || {};
        setCart(savedCart);
        calculateCartTotal(savedCart);
        
    }, []);


    const calculateCartTotal = (cart) => {
        const total = Object.values(cart).flat().reduce((acc, item) => acc + item.price * item.quantity, 0);
        setCartTotal(total);
    };

    const addtocart = (userId, product) => {
        const updatedCart = { ...cart };
        if (!Array.isArray(updatedCart[userId])) {
            updatedCart[userId] = [];
        }

        const existingProductIndex = updatedCart[userId].findIndex(item => item.id === product.id);
        if (existingProductIndex > -1) {
            updatedCart[userId][existingProductIndex].quantity += 1;
        } else {
            updatedCart[userId].push({ ...product, quantity: 1 });
        }

        calculateCartTotal(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
    };
    const increaseQuantity = (userId, productId) => {
        setCart((prevCart) => {
            // Clone the previous cart to prevent mutating the state directly
            const updatedCart = { ...prevCart };

            // Get the user's cart or initialize it as an empty array if undefined
            const userCart = updatedCart[userId] || [];

            // Find the product in the user's cart
            const productIndex = userCart.findIndex(item => item.id === productId);

            if (productIndex > -1) {
                const updateProduct = { ...userCart[productIndex], quantity: userCart[productIndex].quantity + 1 };

                const updatedUserCart = [...userCart];
                updatedUserCart[productIndex] = updateProduct;

                updatedCart[userId] = updatedUserCart;

                localStorage.setItem('cart', JSON.stringify(updatedCart));
                calculateCartTotal(updatedCart);
            }
            else {
                console.error('Product not found in cart for user:', userId);
            }

            return updatedCart;
        });
    };

    const decreaseQuantity = (userId, productId) => {
        setCart((prevCart) => {
            const updatedCart = { ...prevCart };

            // Get the user's cart or initialize it as an empty array if undefined
            const userCart = updatedCart[userId] || [];

            // Find the product in the user's cart
            const productIndex = userCart.findIndex(item => item.id === productId);

            if (productIndex > -1 && userCart[productIndex].quantity > 1) {
                // Decrease the quantity by 1
                const updateProduct = { ...userCart[productIndex], quantity: userCart[productIndex].quantity - 1 };

                const updatedUserCart = [...userCart];
                updatedUserCart[productIndex] = updateProduct;

                updatedCart[userId] = updatedUserCart;

                localStorage.setItem('cart', JSON.stringify(updatedCart));
                calculateCartTotal(updatedCart);
            }

            return updatedCart;
        });
    };

    const removeFromCart = (userId, productId) => {
        setCart((prevCart) => {
            const updatedCart = { ...prevCart };

            if (Array.isArray(updatedCart[userId])) {
                updatedCart[userId] = updatedCart[userId].filter(item => item.id !== productId);
            }

            localStorage.setItem('cart', JSON.stringify(updatedCart));
            calculateCartTotal(updatedCart); // Add this to update the total after removal
            return updatedCart;
        });
    };


    return (
        <Cartcontext.Provider value={{ cart, cartTotal, removeFromCart, addtocart, increaseQuantity, decreaseQuantity }}>
            {children}
        </Cartcontext.Provider>
    );
};

