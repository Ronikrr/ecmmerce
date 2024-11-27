import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartArrowDown, FaRegEye, FaHeart } from 'react-icons/fa';
import { WishlistContext } from './wishlistcontext';
import { Cartcontext } from './cartcontext';
const Catagourylist = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [product, setProducts] = useState([])
    const [user, setUser] = useState(null);
    const [catagoury, setcatagoury] = useState([])
    const [error, seterror] = useState(null);
    const [loading, setloading] = useState(true);
    const { addtocart } = useContext(Cartcontext);
    const { addtowishlist } = useContext(WishlistContext);
    const navigate = useNavigate();
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
                seterror(error.message);
            } finally {
                setloading(false);
            }
        };
        fetchUserData();
    }, [navigate]);
    useEffect(() => {
        const fetchCategouries = async () => {
            try {
                const res = await fetch(`https://api.escuelajs.co/api/v1/categories`);
                if (!res.ok) {
                    seterror(`Failed to fetch categories : ${res.message} `);
                }
                const data = await res.json();
                setcatagoury(data);
                seterror(null)
            } catch (error) {
                seterror(`Failed to fetch categories : ${error} `);
            }
        }
        fetchCategouries();
    }, []);

    const fetchDataByCategory = async (categoryId) => {
        setloading(true);
        try {
            const url = categoryId ? 
                `https://api.escuelajs.co/api/v1/products?categoryId=${categoryId}`
                : `https://api.escuelajs.co/api/v1/products`;
            
            const res = await fetch(url);
            if (!res.ok) {
                seterror(`Network response was not ok : ${res.message}`);
            }
            const data = await res.json();
            const firstFiveProducts = data.slice(0, 100);
            console.log(firstFiveProducts);
            setProducts(firstFiveProducts);
            // setProducts(data);
            seterror(null)
        } catch (error) {
            seterror('Failed to fetch products.');
        } finally {
            setloading(false);
        }
    }
    useEffect(() => {
        const selectedCategoryId = catagoury.find(cat => cat.name === selectedCategory)?.id || '';
        fetchDataByCategory(selectedCategoryId);
    }, [selectedCategory, catagoury]);
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
  return (
      <div>
          <section className="Categories product">
              <div className="col-12 pro_heading text-capitalize d-flex align-items-center justify-content-center">
                  <div className='overlay'></div>
                  <h1 style={{ position: "relative", zIndex: 1 }}>Categories</h1>
              </div>
              <div className="container">
                  <div className="row col-12 flex-column flex-md-row flex-sm-row flex-xs-row">
                      <div className="col-12 col-md-4 col-sm-6 col-xs-12 text-decoration-none pt-5">
                          <div className="border col-9 m-2">
                              <h3 className='text-bg-secondary text-center'>Categories</h3>
                              <ul>
                                  <li className="list_data">
                                      <Link
                                          onClick={() => setSelectedCategory('All')}
                                          style={{ textDecoration: "none", color: "black" }}
                                      >
                                          All
                                      </Link>
                                  </li>
                                  {catagoury.map((cat, i) => (
                                      <li className="list_data" key={i}>
                                          <Link
                                              onClick={() => setSelectedCategory(cat.name)}
                                              style={{ textDecoration: "none", color: "black" }}
                                          >
                                              {cat.name}
                                          </Link>
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      </div>

                      <div className="col-12 col-md-8 d-flex flex-wrap align-items-center flex-wrap mb-5 pt-5">
                          {loading ? (
                              <div className="loader_head"><div className="loader"></div></div>
                          ) : error ? (
                              <p className="error-message">{error}</p>
                          ) : product.length === 0 ? (
                              <p>No products found.</p>
                          ) : (
                              product.map((v, i) => {
                                   const rawStringArray = v.images;
                                        const rawString = Array.isArray(rawStringArray) ? rawStringArray[0] : rawStringArray;
                                        const url = rawString
                                            .replace(/&quot;/g, '')
                                            .replace(/[\[\]]/g, '')
                                            .replace(/"/g, '')
                                            .trim();

                                  return (
                                      <Link key={i} to={`/category/${v.category.id}/productpage/${v.id}`} className="card col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 m-3 text-decoration-none ">
                                          <img src={url} className="card-img-top" alt={v.title || 'Product Image'} />
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
              </div>
          </section>
    </div>
  )
}

export default Catagourylist

