import React, { useContext, useEffect, useState } from 'react'
import { FaUser, FaCartPlus, FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { Cartcontext } from './cartcontext';
import { WishlistContext } from './wishlistcontext';

function Header() {
    const token = localStorage.getItem('access_token');
    const { cart } = useContext(Cartcontext);
    const { wishlist } = useContext(WishlistContext)
    const [user, setUser] = useState(null); 
    const [headerStyle, setHeaderStyle] = useState({
        height: '100px',
        backgroundColor: 'transparent',
        color: '#000',
        boxShadow: 'none',
        justifyContent: 'center',
    });

    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setHeaderStyle({
                    height: "60px",
                    backgroundColor: "#fff",
                    color: "#000",
                    boxShadow: "0px 4px 2px -2px gray",
                    // justifyContent: "center",
                });
            } else {
                setHeaderStyle({
                    height: "100px",
                    backgroundColor: "transparent",
                    color: "#000",
                    boxShadow: "none",
                    // justifyContent: "center",
                });
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    useEffect(() => {
        const fetchProfile = async () => {
            if (token) {
                try {
                    const res = await fetch(`https://api.escuelajs.co/api/v1/auth/profile`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (res.ok) {
                        const data = await res.json();
                        setUser(data);
                    } else {
                        console.error('Failed to fetch profile');
                    }
                } catch (error) {
                    console.error('Error fetching profile:', error);
                }
            }
        };

        fetchProfile();
    }, [token]);
    const isLoggedIn = () => {
        const token = localStorage.getItem('access_token');
        return token !== null;
    };

    const userCart = user ? cart[user.id] || [] : [];
    const userWishlist = user ? wishlist[user.id] || [] : [];

    return (
        <header style={{ ...headerStyle, zIndex: "10000", width: "100%" }} className="header d-flex position-fixed">
            <div className="container">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <Link className="navbar-brand" onClick={scrollToTop} to="/">
                            Navbar
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse overflow-auto" id="navbarNav" style={{ maxHeight: '100%' }}>
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-capitalize">
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={scrollToTop} aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={scrollToTop} to="/productpage">Product</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" onClick={scrollToTop} to="/category">Categories</Link>
                                </li>

                            </ul>
                            <div className="d-flex icons">
                                {isLoggedIn() ? (
                                    <>
                                        <Link className="nav-link mx-3" onClick={scrollToTop} to="/account">
                                            <FaUser />
                                        </Link>
                                        <Link className="nav-link mx-3 position-relative" onClick={scrollToTop} to="/cart">
                                            <FaCartPlus />
                                            {/* {userCart.length > 0 && ( */}
                                                <span className="text-bg-primary position-absolute start-100 translate-middle border border-light rounded-circle"
                                                    style={{ top: '8px', padding: '0px 6px', fontSize: '12px' }}>
                                                <span>{userCart?.length || 0}</span>
                                                </span>
                                            {/* )} */}
                                        </Link>
                                        <Link className="nav-link mx-3 position-relative" onClick={scrollToTop} to="/wishlistpage">
                                            <FaHeart />
                                            {/* {userWishlist.length > 0 && ( */}
                                                <span className="text-bg-primary position-absolute start-100 translate-middle border border-light rounded-circle"
                                                    style={{ top: '8px', padding: '0px 6px', fontSize: '12px' }}>
                                                <span>{userWishlist?.length || 0}</span>
                                                </span>
                                            {/* )} */}
                                        </Link>
                                        <Link to={`/deleteproduct`} className="nav-link mx-3 position-relative">admin </Link>
                                    </>
                                ) : (
                                    <>
                                        <div className="btn-group  " role="group" aria-label="Basic example">
                                            <Link type="button" className="btn btn-primary text-bg-primary " onClick={scrollToTop} to="/login" >
                                                Login
                                            </Link>
                                            <Link type="button" className="btn btn-secondary text-bg-primary " onClick={scrollToTop} to="/register" >
                                                Register
                                                </Link>

                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

            </div>
        </header>
    );
}

export default Header;
