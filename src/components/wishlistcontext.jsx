import React, { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState({}); // wishlist for multiple users

    useEffect(() => {
        const storedwishlist = JSON.parse(localStorage.getItem('wishlist')) || {};
        setWishlist(storedwishlist);
    }, []);

    const addtowishlist = (userId, product) => {
        setWishlist((prevwishlist) => {
            const updatedwishlist = { ...prevwishlist };

            // Initialize the wishlist for the user as an empty array if it doesn't exist
            if (!Array.isArray(updatedwishlist[userId])) {
                updatedwishlist[userId] = [];
            }

            const existingProductIndex = updatedwishlist[userId].findIndex(item => item.id === product.id);
            if (existingProductIndex > -1) {
                updatedwishlist[userId][existingProductIndex].quantity += 1;
            } else {
                updatedwishlist[userId].push({ ...product, quantity: 1 });
            }

            localStorage.setItem('wishlist', JSON.stringify(updatedwishlist));
            return updatedwishlist;
        });
    };


    const removeFromwishlist = (userId, itemid) => {
        console.log("Removing product with ID:", itemid);
        setWishlist((prevwishlist) => {
            const updatedwishlist = { ...prevwishlist };

            if (Array.isArray(updatedwishlist[userId])) {
                updatedwishlist[userId] = updatedwishlist[userId].filter(item => item.id !== itemid);
                console.log("Updated wishlist after removal:", updatedwishlist[userId]); // Ensure `item.id` is compared with `productId`
            }

            localStorage.setItem('wishlist', JSON.stringify(updatedwishlist));  // Update local storage
            return updatedwishlist;
        });
    };


    return (
        <WishlistContext.Provider value={{ wishlist, addtowishlist, removeFromwishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
