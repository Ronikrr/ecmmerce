import React, { useContext, useEffect, useState } from 'react';
import { Cartcontext } from './cartcontext';
import { useNavigate, Link } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/fa';

const CartSection = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]); // To store fetched products
    const navigate = useNavigate();
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(Cartcontext);

    useEffect(() => {
        const fetchUserData = async () => {
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                navigate('/login');
                return;
            }

            try {
                const res = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) throw new Error('Failed to fetch user data');

                const data = await res.json();
                setUser(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!user) return; // Wait until user data is available

            const userCart = cart[user.id] || [];
            console.log(userCart)
            const productPromises = userCart.map(item => fetchProduct(item.id)); // Fetch products for each item in cart
            console.log(productPromises)

            try {
                const products = await Promise.all(productPromises);
                setProducts(products.filter(product => product));
                setError(null)
            } catch (error) {
                setError('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [user, cart]);

    const fetchProduct = async (id) => {

        try {
            const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const product = await response.json();
            console.log('Fetched product:', product);
            setError(null)
            return product || null;
        } catch (error) {
            setError('Error fetching product:', error);
            return null;
        }
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    if (loading) return <div className="loader_head"><div className="loader"></div></div>;
    if (error) return <div className="alert alert-danger" role="alert">Error loading user data: {error}</div>;
    if (!user) return <div className="alert alert-danger" role="alert">No user data available.</div>;


    return (
        <div>
            <section className="product">
                <div className="col-12 pro_heading text-capitalize d-flex align-items-center justify-content-center">
                    <div className='overlay'></div>
                    <h1 style={{ position: "relative", zIndex: 1 }}>Wishlist Page</h1>
                </div>
                <div className="container py-5">
                    {user && <h2 className='text-center text-md-start'>Welcome, {user.name}</h2>}
                    <div className="row p-0 p-md-5">
                        {products.length === 0 ? (
                            <div className="col-12 d-flex justify-content-center p-5">
                                <td colSpan="5" className='text-center'>No products in cart</td>
                            </div>
                        ) : (
                            <div className="table-responsive d-flex justify-content-center">
                                <div className="product-cards d-block d-md-none">
                                    {products.map((item) => {
                                        return (
                                            <div className="product-card" key={item?.id}>
                                                <div><strong>ID:</strong> {item?.id}</div>
                                                <div><strong>Product Name:</strong> {item?.title}</div>
                                                <div><strong>Quantity:</strong>
                                                    <div className="col-md-4 col-6 mb-3">
                                                        <div className="input-group mb-3" style={{ width: 170 }}>
                                                            <button
                                                                className="btn btn-white border border-secondary px-3"
                                                                type="button"
                                                                onClick={() => decreaseQuantity(user.id, item.id)}
                                                            >
                                                                <FaMinus />
                                                            </button>
                                                            <input
                                                                type="text"
                                                                className="form-control text-center border border-secondary"
                                                                value={cart[user.id]?.find(itemInCart => itemInCart?.id === item?.id)?.quantity || 1}
                                                                readOnly
                                                            />
                                                            <button
                                                                className="btn btn-white border border-secondary px-3"
                                                                type="button"
                                                                onClick={() => increaseQuantity(user.id, item.id)}
                                                            >
                                                                <FaPlus />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <strong>Price:</strong> ${item?.price} x {
                                                        cart[user.id]?.find(cartItem => cartItem.id === item.id)?.quantity || 1
                                                    }
                                                </div>
                                                <div>
                                                    <strong>View Product:</strong>
                                                    <Link to={`/category/${item.category?.id}/productpage/${item.id}`} className="text-primary">
                                                        View Product
                                                    </Link>
                                                </div>
                                                <div>
                                                    <img src={item?.images[0]} alt={item?.title} />
                                                </div>
                                                <div className="text-center">
                                                    <button className="btn btn-danger my-3 text-capitalize" onClick={() => removeFromCart(user.id, item?.id)}>
                                                        Remove Cart
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="product-cards d-none d-md-block">
                                    {products.map((item) => {
                                        return (
                                            <div className="product-card p-5 d-flex" key={item?.id}>
                                                <div className="product_detail_box col-6">
                                                    <div><strong>ID:</strong> {item?.id}</div>
                                                    <div><strong>Product Name:</strong> {item?.title}</div>
                                                    <div><strong>Quantity:</strong>
                                                        <div className="col-md-4 col-6 mb-3">
                                                            <div className="input-group mb-3" style={{ width: 170 }}>
                                                                <button
                                                                    className="btn btn-white border border-secondary px-3"
                                                                    type="button"
                                                                    onClick={() => decreaseQuantity(user.id, item.id)}
                                                                >
                                                                    <FaMinus />
                                                                </button>
                                                                <input
                                                                    type="text"
                                                                    className="form-control text-center border border-secondary"
                                                                    value={cart[user.id]?.find(itemInCart => itemInCart?.id === item?.id)?.quantity || 1}
                                                                    readOnly
                                                                />
                                                                <button
                                                                    className="btn btn-white border border-secondary px-3"
                                                                    type="button"
                                                                    onClick={() => increaseQuantity(user.id, item.id)}
                                                                >
                                                                    <FaPlus />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <strong>Price:</strong> ${item?.price} x {
                                                            cart[user.id]?.find(cartItem => cartItem.id === item.id)?.quantity || 1
                                                        }
                                                    </div>
                                                    <div>
                                                        <Link to={`/category/${item.category?.id}/productpage/${item.id}`} onClick={scrollToTop} className="text-primary">
                                                            View Product
                                                        </Link>
                                                    </div>
                                                    <div className="">
                                                        <button className="btn btn-danger my-3" onClick={() => removeFromCart(user.id, item?.id)}>
                                                            Remove Cart
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="product_detail_image col-6 d-flex justify-content-center">
                                                    <img src={item?.images[0]} alt={item?.title} className='img-fluid col-6 col-lg-8 col-md-12' />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            {products.length === 0 ? (
                                <div className="col-12 col-md-6 d-flex align-items-center justify-content-around">
                                    <Link
                                        to={`/productpage`}
                                        className="btn btn-warning shadow-0 me-2 text-capitalize"
                                        onClick={scrollToTop}
                                    >
                                        Buy product now
                                    </Link>
                                </div>
                            ) : (
                                <div className="col-12 col-md-6 d-flex align-items-center justify-content-around">
                                    Total Amount : ${products.reduce((total, item) => total + item?.price * (cart[user.id]?.find(cartItem => cartItem.id === item.id)?.quantity || 1), 0)}
                                    <Link
                                        to={`/checkout/${products.reduce((total, item) => total + item?.price * (cart[user.id]?.find(cartItem => cartItem.id === item.id)?.quantity || 1), 0)}`}
                                        className="btn btn-warning shadow-0 me-2 text-capitalize"
                                        onClick={scrollToTop}
                                    >
                                        Buy now
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CartSection;
