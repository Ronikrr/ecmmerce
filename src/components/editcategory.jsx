
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Editcategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setname] = useState('');
    const [image, setimage] = useState('');
    const [response, setresponce] = useState(null);
    const [error, seterror] = useState(null);
    const [editingId, seteditingId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []); // Added dependency array to avoid infinite loop

    const fetchCategories = async () => {
        try {
            const res = await fetch('https://api.escuelajs.co/api/v1/categories/');
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            } else {
                seterror("Failed to fetch categories");
            }
        } catch (err) {
            seterror(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId ? `https://api.escuelajs.co/api/v1/categories/${editingId}` : 'https://api.escuelajs.co/api/v1/categories/';

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, image }),
            });

            if (res.ok) {
                const data = await res.json();
                if (editingId) {
                    setresponce(`Category updated successfully: ${JSON.stringify(data)}`);
                    setCategories(categories.map(categorie => categorie.id === editingId ? data : categorie));
                } else {
                    setresponce(`Category created successfully: ${JSON.stringify(data)}`);
                    setCategories([...categories, data]);
                }
                seterror(null);
            } else {
                seterror('Failed to create/update category');
            }
        } catch (error) {
            seterror(error.message);
            setresponce(null);
        } finally {
            setname('');
            setimage(''); // Clear input fields
            seteditingId(null); // Reset editing state
        }
    };

    const handleEdit = (categorie) => {
        setname(categorie.name);
        setimage(categorie.image);
        seteditingId(categorie.id);
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (res.ok) {
                setCategories(prevCategories =>
                    prevCategories.filter(category => category.id !== id)
                );
                setresponce('Category deleted successfully');
                seterror(null); // Clear previous error

            } else {
                console.error('Error response:', data); // Log the response for debugging
                seterror(data.message || 'Failed to delete category'); // Use specific error message if available
            }
        } catch (error) {
            seterror(error.message);
            setresponce(null);
        }

    };
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scrolls to top smoothly
    };

    return (
        <div>
            <section className="product_page">
                <div className="col-12 pro_heading text-capitalize d-flex align-items-center justify-content-center mb-5">
                    <div className="overlay"></div>
                    <h1 style={{ position: "relative", zIndex: 1 }}>admin categorypage</h1>
                </div>
                <div className="container">
                    <Link to={`/deleteproduct`} className="btn btn-info text-capitalize">
                        add update delete product
                    </Link>
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <form className="mb-4 col-12 col-lg-6" onSubmit={handleSubmit}>
                            <h1>{editingId ? 'Edit Category' : 'Create New Category'}</h1>
                            <div className="form-group">
                                <label htmlFor="name" className='form-label'>Category Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setname(e.target.value)}
                                    placeholder="Enter category name"
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="image" className='form-label'>Image URL:</label>
                                <input
                                    type="url"
                                    id="image"
                                    value={image}
                                    onChange={(e) => setimage(e.target.value)}
                                    placeholder="Enter image URL"
                                    className="form-control"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">
                                {editingId ? 'Update Category' : 'Create Category'}
                            </button>
                        </form>

                    </div>
                    {response && (
                        <div className="mt-3 p-3 border rounded bg-info">
                            <strong>Response:</strong> {response}
                        </div>
                    )}

                    {error && (
                        <div className="mt-3 p-3 border border-danger rounded bg-danger text-white">
                            <strong>Error:</strong> {error}
                        </div>
                    )}

                    <h2>Categories</h2>
                  
      
                    <div className="table-responsive d-flex justify-content-center">
                        <div className="product-cards d-none d-lg-block  ">
                            {categories.map((cat) => (
                                <div className="product-card p-5 d-flex " key={cat.id}>
                                        <div className="product_detail_box col-6">
                                            <div><strong>ID:</strong> {cat.id}</div>
                                            <div><strong>Product Name:</strong> {cat.name}</div>

                                            <div><strong>Price:</strong> ${cat.price}</div>
                                            <div>
                                                <Link to={`/category/${cat.category?.id}/productpage/${cat.id}`} onClick={scrollToTop} className="text-primary">
                                                    View Product
                                                </Link>
                                            </div>
                                            <div className="d-flex justify-content-between col-6">
                                                <button onClick={() => handleEdit(cat)} className="btn btn-warning col-12 col-lg-6 m-1">
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDelete(cat.id)} className="btn btn-danger col-12 col-lg-6 m-1">
                                                    Delete
                                                </button>

                                            </div>
                                        </div>
                                        <div className="product_detail_image col-6 d-flex justify-content-center">
                                            <img src={cat.image} alt={cat.title} className='img-fluid col-6 ' />
                                        </div>
                                    </div>
                            ))}
                          
                        </div>
                        <div className="product-cards d-block d-md-none">
                            {categories.map((item) => {
                                return (
                                    <div className="product-card" key={item?.id}>
                                        <div><strong>ID:</strong> {item?.id}</div>
                                        <div><strong>Product Name:</strong> {item?.name}</div>

                                        <div>
                                            <strong>Price:</strong> ${item?.price}
                                        </div>
                                        <div>
                                            <strong>View Product:</strong>
                                            <Link to={`/category/${item.category?.id}/productpage/${item.id}`} className="text-primary">
                                                View Product
                                            </Link>
                                        </div>
                                        <div>
                                            <img src={item.image} alt={item.title} />
                                        </div>
                                        <div className=" d-flex justify-content-around">
                                            <button onClick={() => handleEdit(item)} className="btn btn-warning col-12 col-lg-6 m-1">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(item.id)} className="btn btn-danger col-12 col-lg-6 m-1">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Editcategory;





