import React, { useContext, useEffect, useState } from 'react';
import { WishlistContext } from './wishlistcontext';
import { useNavigate, Link } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/fa';

const Wishsection = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]); // To store fetched products
    const navigate = useNavigate();
    const { wishlist, removeFromwishlist } = useContext(WishlistContext);


    useEffect(() => {
        const fetchUserData = async () => {
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                setError('No access token found.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`https://api.escuelajs.co/api/v1/auth/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUser(data); // Set user data
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    useEffect(() => {
        const fetchProducts = async (id) => {
            if (!user) return

            const userCart = wishlist[user.id] || [];
            const productPromises = userCart.map(item => fetchProduct(item.id));

            try {
                const products = await Promise.all(productPromises);
                setProducts(products.filter(product => product));
                setError(null)
            } catch (error) {
                setError('Error fetching product:',error)
            }
        }
        fetchProducts();
    },[user ,wishlist])

    const fetchProduct = async (id) => {
        try {
            const rs = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
            if (!rs.ok) {
                throw new Error(`HTTP error! status: ${rs.status}`);
            }
            const product = await rs.json();
            console.log(`Fetched product: ${product} `);
            setError(null)
            return product || null;
            
        } catch (error) {
            setError('error fetching product', error);
        }
    };

    if (loading) return <div className="loader_head">
        <div className="loader"></div>
    </div>;
    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                <strong>Error loading user data:</strong> {error.message || error}. Please try again later or contact support.
            </div>
        );
    }

    if (!user) return (<div className="alert alert-danger" role="alert">
        <strong>No user data available.</strong>
    </div>);

    // const userCart = wishlist[user?.id] || [];
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scrolls to top smoothly
    };

    // Parsing the stored string into an array or object
    return (
        <div>
            <section className="product">
                <div className="col-12 pro_heading text-capitalize d-flex align-items-center justify-content-center">
                    <div className='overlay'></div>
                    <h1 style={{ position: "relative", zIndex: 1 }}>Wishlist Page</h1>
                </div>
                <div className="container py-5">
                    {user && <h2>Welcome, {user.name}</h2>} {/* Displaying user name */}
                    <div className="row p-5">
                        {products.length === 0 ? (
                            <div className="col-12 d-flex justify-content-center p-5">

                                <td colSpan="5" className='text-center'>No products in cart</td>

                            </div>
                        ) : (
                            <div className="table-responsive d-flex justify-content-center">

                                <div className="product-cards d-block d-md-none ">
                                        {products.map((item) => {
                                        
                                        return (

                                            <div className="product-card" key={item.id}>
                                                <div><strong>ID:</strong> {item?.id}</div>
                                                <div><strong>Product Name:</strong> {item?.title}</div>

                                                <div><strong>Price:</strong>
                                                    ${item?.price.toFixed(2)}</div>
                                                <div>
                                                    <strong>View Product:</strong>
                                                    <Link to={`/category/${item.category.id}/productpage/${item.id}`} className="text-primary">
                                                        View Product
                                                    </Link>
                                                </div>
                                                <div>
                                                    <img src={item?.images[0]} alt={item.title} />
                                                </div>
                                                <div className="text-center">

                                                    <button className="btn btn-danger my-3" onClick={() => removeFromwishlist(user.id, item?.id)}>
                                                        remove wishlist
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    }
                                    )}
                                </div>
                                <div className="product-cards d-none d-md-block   ">
                                        {products.map((item) => {
                                        return (
                                            <div className="product-card p-5 d-flex " key={item.id}>
                                                <div className="product_detail_box col-6">
                                                    <div>
                                                        <strong>ID:</strong> {item?.id}
                                                    </div>
                                                    <div>
                                                        <strong>Product Name:</strong> {item?.title}
                                                    </div>
                                                    <div><strong>Price:</strong>
                                                        ${item?.price.toFixed(2)}
                                                    </div>
                                                    <div>
                                                        <Link to={`/category/${item.category.id}/productpage/${item.id}`} onClick={scrollToTop} className="text-primary">
                                                            View Product
                                                        </Link>
                                                    </div>
                                                    <div className="">
                                                        <button className="btn btn-danger my-3 text-capitalize" onClick={() => removeFromwishlist(user.id, item.id)}>
                                                            remove wishlist
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="product_detail_image col-6 d-flex justify-content-center">
                                                    <img src={item?.images[0]} alt={item?.title} className='img-fluid col-6 ' />
                                                </div>
                                            </div>
                                        )
                                    }
                                    )}
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Wishsection;
