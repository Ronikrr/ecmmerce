import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaMinus, FaPlus } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { WishlistContext } from './wishlistcontext';
import { Cartcontext } from './cartcontext';
import { useNavigate } from 'react-router-dom';

function ProductPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null); // Change to single product
    const { cart, addtocart, increaseQuantity, decreaseQuantity } = useContext(Cartcontext);
    const { addtowishlist } = useContext(WishlistContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`); // Fetch single product by ID
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchUserData = async () => {
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                navigate("/login");
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
    const handleQuantityChange = (e) => {
        const value = Math.max(1, parseInt(e.target.value, 10));
        setQuantity(value);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) {
        return <div className="loader_head">
            <div className="loader"></div>
        </div>;
    }
    const handleAddToCart = (product) => {
        const { id } = product;
        if (!id) {
            console.error("Product is missing required fields:", product);
            return;
        }
        addtocart(user.id, { id });
        console.log(product)
    };
    const handleAddToWishlist = (product) => {
        const { id } = product;
        if (!id) {
            console.error("Product is missing required fields:", product);
            return;
        }
        addtowishlist(user.id, { id });
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

    const { id: productId, title, images, price, description, category } = product;
    const rowStringArray = images;
    const rowString = Array.isArray(rowStringArray) ? rowStringArray[0] : rowStringArray;

    const url = rowString
        .replace(/&quot;/g, '')  // Removes all occurrences of &quot;
        .replace(/[\[\]]/g, '')
        .replace(/"/g, '')// Removes the square brackets []
        .trim();                 // Removes any extra spaces


    return (
        <div>
            <section style={{ paddingTop: '150px', paddingBottom: '150px' }}>
                <div className="container">
                    <div className="row gx-5">
                        <aside className="col-lg-6">
                            <div className=" rounded-4 mb-3 d-flex justify-content-center">
                                <Link to="#" target="_blank" className=" border rounded-4">
                                    <img
                                        style={{ maxWidth: "100%", maxHeight: "75vh", margin: "auto" }}
                                        className="rounded-4 fit"
                                        src={url} // Use the first image
                                        alt="Main product"
                                    />
                                </Link>
                            </div>
                        </aside>

                        <main className="col-lg-6">
                            <div className="ps-lg-3">
                                <h4 className="title text-dark">{title}</h4>
                                <h6 className='title text-secondary'>{category.name}</h6>
                                <div className="d-flex flex-row my-3">
                                    <div className="text-warning mb-1 me-2">
                                        <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalfAlt />
                                        <span className="ms-1">4.5</span>
                                    </div>
                                    <span className="text-muted">  100 orders</span>
                                    <span className="text-success ms-2">In stock</span>
                                </div>
                                <div className="mb-3">
                                    <span className="h5">${price}</span>
                                    <span className="text-muted"> /per box</span>
                                </div>
                                <p>{description}</p>
                                <hr />
                                <div className="row mb-4">
                                    <div className="col-md-4 col-6">
                                        <label className="mb-2">Size</label>
                                        <select className="form-select border border-secondary" style={{ height: 35 }}>
                                            <option>Small</option>
                                            <option>Medium</option>
                                            <option>Large</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 col-6 mb-3">
                                        <label className="mb-2 d-block">Quantity</label>
                                        <div className="input-group mb-3" style={{ width: 170 }}>
                                            <button className="btn btn-white border border-secondary px-3" type="button" onClick={() => decreaseQuantity(user.id, product.id)}>
                                                <FaMinus />
                                            </button>
                                            <div className="form-control text-center border border-secondary">
                                                {cart?.[user.id]?.find(itemInCart => itemInCart?.id === productId)?.quantity || 1}
                                            </div>
                                            {/* <input
                                                type="text"
                                                className="form-control text-center border border-secondary"
                                                value={quantity}
                                                onChange={handleQuantityChange}
                                                readOnly
                                            /> */}
                                            <button className="btn btn-white border border-secondary px-3" type="button" onClick={() => handleAddToCart(product)}>
                                                <FaPlus />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <Link to={`/checkout/${price}`} className="btn btn-warning border border-warning  p-2 shadow-0 me-2">Buy now</Link>
                                    <button className="btn btn-primary border border-primary shadow-0  p-2 me-2" onClick={() => handleAddToCart(product)} >
                                        Add to cart
                                    </button>

                                    <button onClick={() => handleAddToWishlist(product)} className="btn btn-light border border-secondary p-2 icon-hover">
                                        <CiHeart /> Save
                                    </button>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProductPage;

