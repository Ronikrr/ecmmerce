import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';



function Product() {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await fetch(`https://api.escuelajs.co/api/v1/categories`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const firstFiveProducts = data.slice(0, 5); // Fetch only the first 5 products
                setProducts(firstFiveProducts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchdata();
    }, []);

    return (
        <div>
            <section className="product_ heading p-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12  text-capitalize text-center">
                            <h1>categories</h1>
                        </div>
                        <div className="col-12 d-flex flex-wrap align-items-center justify-content-center mb-5 h-auto">
                            {products.length === 0 ? (
                                <p>loading products</p>
                            ) : (
                                products.map((v, i) => (
                                    <Link key={i} to={`/category/${v.id}`} className="card col-12 col-sm-6 col-md-4 col-lg-2  m-3 text-decoration-none" >
                                        <img src={v.image} className="card-img-top page_image img-fluid" alt={v.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{v.name}</h5>
                                        </div>
                                    </Link>

                                ))
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