import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartArrowDown, FaRegEye, FaHeart } from 'react-icons/fa';
import { WishlistContext } from './wishlistcontext'
import { Cartcontext } from './cartcontext';



function Product() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const { addtocart } = useContext(Cartcontext)
    const { addtowishlist } = useContext(WishlistContext);
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); // Empty dependency array ensures this runs only on mount

    // Function to scroll to top on button click
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling
        });
    };
    useEffect(() => {
        const fetchUserData = async () => {
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                // navigate("/login");
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
            } finally {
                setLoading(false);
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
                const firstFiveProducts = data.slice(0, 100);
                console.log(firstFiveProducts);
                setProducts(firstFiveProducts);



            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchdata();
    }, []);
    const handleAddToCart = (product) => {
        const { id} = product;
        if (!id ) {
            console.error("Product is missing required fields:", product);
            return;
        }
        addtocart(user.id, { id});
        console.log(product)
    };
    const handleAddToWishlist = (product) => {
        const { id } = product;
        if (!id ) {
            console.error("Product is missing required fields:", product);
            return;
        }
        addtowishlist(user.id, { id});
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
    
    return (
        <div>
            <section className="product_page">
                <div className="col-12 pro_heading text-capitalize d-flex align-items-center justify-content-center">
                    <div className='overlay' ></div>
                    <h1 style={{ position: "relative", zIndex: 1 }}>Product</h1>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex flex-wrap align-items-center justify-content-center mb-5">
                            {products.length === 0 ? (
                                <div className="loader_head">
                                    <div className="loader"></div>
                                </div>
                            ) : (
                                products.map((v, i) => {
                                    const rawStringArray = v.images;

                                    // Step 2: Convert the array to a string if necessary
                                    const rawString = Array.isArray(rawStringArray) ? rawStringArray[0] : rawStringArray;

                                    // Step 3: Clean the string by removing &quot; and []
                                    const url = rawString
                                        .replace(/&quot;/g, '')  // Removes all occurrences of &quot;
                                        .replace(/[\[\]]/g, '')
                                        .replace(/"/g, '')// Removes the square brackets []
                                        .trim();                 // Removes any extra spaces

                                    return (
                                        <Link key={i} to={`/category/${v.category.id}/productpage/${v.id}`} className="card col-12 col-sm-6 col-md-4 col-lg-2  m-3 text-decoration-none">
                                            <img src={url} className="card-img-top page_image img-fluid" alt="..." />
                                            {/* console.log(v.images[0]) */}
                                            <div className="card-body">
                                                <h5 className="card-title " > {v.title} </h5>
                                                <p className="card-text">
                                                    ${v.price}
                                                </p>
                                                <div className="button-group d-flex align-items-center justify-content-center w-100">
                                                    <Link onClick={() => handleAddToCart(v)} className='box border-0 mx-1 text-bg-light' >
                                                        <FaCartArrowDown />
                                                    </Link>
                                                    <Link to={`/category/${v.category.id}/productpage/${v.id}`} onClick={scrollToTop} className='box border-0 mx-1 text-bg-light' >
                                                        <FaRegEye />
                                                    </Link>
                                                    <Link className='box border-0 mx-1 text-bg-light' onClick={() => handleAddToWishlist(v)}  >
                                                        <FaHeart />
                                                    </Link>

                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })
                            )
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Product