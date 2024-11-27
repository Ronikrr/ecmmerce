import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartArrowDown, FaRegEye, FaHeart } from 'react-icons/fa';
import { WishlistContext } from './wishlistcontext';
import { Cartcontext } from './cartcontext';

function Product() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const { addtocart } = useContext(Cartcontext);
    const { addtowishlist } = useContext(WishlistContext);
    const navigate = useNavigate();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        // Fetch user data, but allow access to the product page without user login
        const fetchUserData = async () => {
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                // No user is logged in; just proceed without setting user
                return;
            }

            try {
                const res = await fetch(`https://api.escuelajs.co/api/v1/auth/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    }
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.message);
            }
        };
        fetchUserData();
    }, [navigate]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await fetch(`https://api.escuelajs.co/api/v1/products`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const firstFiveProducts = data.slice(-5);
                console.log(firstFiveProducts);
                setProducts(firstFiveProducts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchdata();
    }, []);

    const handleAddToCart = (product) => {
        const { id } = product;
        if (!id) {
            console.error("Product is missing required fields:", product);
            return;
        }
        addtocart(user ? user.id : null, { id }); // Allow adding to cart without user ID
        console.log(product);
    };

    const handleAddToWishlist = (product) => {
        const { id } = product;
        if (!id) {
            console.error("Product is missing required fields:", product);
            return;
        }
        addtowishlist(user ? user.id : null, { id }); // Allow adding to wishlist without user ID
    };

    return (
        <div>
            <section className="product heading p-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-capitalize text-center">
                            <h1>new products</h1>
                        </div>
                        <div className="col-12 d-flex flex-wrap align-items-center justify-content-center mb-5">
                            {products.length === 0 ? (
                                <div className="loader_heads"><div className="loader"></div></div>
                            ) : (
                                products.map((v, i) => {
                                    const rawStringArray = v.images;
                                    const rawString = Array.isArray(rawStringArray) ? rawStringArray[0] : rawStringArray;
                                    const url = rawString
                                        .replace(/&quot;/g, '')
                                        .replace(/[\[\]]/g, '')
                                        .replace(/"/g, '')
                                        .trim();

                                    return (
                                        <Link key={i} to={`/category/${v.category.id}/productpage/${v.id}`} className="card col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 col-xxl-2 m-3 text-decoration-none">
                                            <img src={url} className="card-img-top page_image img-fluid" alt={v.title} />
                                            <div className="card-body">
                                                <h5 className="card-title">{v.title}</h5>
                                                <p className="card-text">${v.price}</p>
                                                <div className="button-group d-flex align-items-center justify-content-center w-100">
                                                    <Link onClick={() => handleAddToCart(v)} className='box border-0 mx-1 text-bg-light'>
                                                        <FaCartArrowDown />
                                                    </Link>
                                                    <Link to={`/category/${v.category.id}/productpage/${v.id}`} className='box border-0 mx-1 text-bg-light'>
                                                        <FaRegEye />
                                                    </Link>
                                                    <Link className='box border-0 mx-1 text-bg-light' onClick={() => handleAddToWishlist(v)}>
                                                        <FaHeart />
                                                    </Link>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })
                            )}
                        </div>
                    </div>
                    <div className="text-center col-12 mb-3">
                        <Link to="/productpage" onClick={scrollToTop} className="btn btn-primary col-12 col-sm-6 col-md-4 col-lg-4 col-xl-2 col-xxl-2 text-capitalize">
                            See More
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Product;
