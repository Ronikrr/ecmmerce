import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Alertmessage from "./alertmessage";

const ProductList = () => {
    // Initialize state to hold product data and new product details
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        title: "",
        price: "",
        image: "",
        categoryId: "", // Assuming you have categories
    });
    const [updateProduct, setUpdateProduct] = useState(null);
    const [categories, setCategories] = useState([]);

    // Fetch products and categories on component mount
    useEffect(() => {
        fetch("https://api.escuelajs.co/api/v1/products")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));

        // Fetch categories for the select dropdown
        fetch("https://api.escuelajs.co/api/v1/categories")
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);

    // Function to delete product via API
    const deleteProduct = async (id) => {
        try {
            const response = await fetch(
                `https://api.escuelajs.co/api/v1/products/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (response.ok) {
                const updatedProducts = products.filter((product) => product.id !== id);
                setProducts(updatedProducts);
                alert("Product deleted successfully");
            } else {
                alert("Failed to delete the product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (updateProduct) {
            setUpdateProduct((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        } else {
            setNewProduct((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    // Function to handle adding a new product
    const handleAddProduct = async (e) => {
        e.preventDefault(); // Prevent page refresh
        try {
            const response = await fetch("https://api.escuelajs.co/api/v1/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: newProduct.title,
                    price: parseFloat(newProduct.price),
                    images: [newProduct.image],
                    categoryId: parseInt(newProduct.categoryId),
                    description: newProduct.description || "No description provided", // Add this line
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("add error:", errorData);
                alert(
                    `Failed to add the product: ${errorData.message || "Unknown error"
                    }`
                );
                return;
            } else {
                const createdProduct = await response.json();
                setProducts((prevProducts) => [...prevProducts, createdProduct]);
                alert("Product added successfully");
                setNewProduct({ title: "", price: "", image: "", categoryId: "", description: "" }); // Reset the form
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const handleUpdateproduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `https://api.escuelajs.co/api/v1/products/${updateProduct.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: updateProduct.title,
                        price: parseFloat(updateProduct.price),
                        images: [updateProduct.image],
                        categoryId: parseInt(updateProduct.categoryId),
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Update error:", errorData);
                alert(
                    `Failed to update the product: ${errorData.message || "Unknown error"
                    }`
                );
                return;
            }

            const updatedProduct = await response.json();
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === updatedProduct.id ? updatedProduct : product
                )
            );
            alert("Product updated successfully");
            setUpdateProduct(null); // Reset update form
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update the product");
        }
    };

    const openUpdateForm = (product) => {
        setUpdateProduct({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0] || "",
            categoryId: product.category.id,
        });
    };
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scrolls to top smoothly
    };

    return (
        <div>
            <section className="product_page">
                <div className="col-12 pro_heading text-capitalize d-flex align-vs-center justify-content-center mb-5">
                    <div className="overlay"></div>
                    <h1 style={{ position: "relative", zIndex: 1 }}>Product List</h1>
                </div>
                {/* <h2>Product List</h2> */}
                <div className="container">
                    <Link
                        to={`/editcategory`}
                        className="btn btn-info text-capitalize"
                    >
                        add update delete Category
                    </Link>
                    <div className="col-12 d-flex align-vs-center justify-content-center">

                        <form onSubmit={handleAddProduct} className="mb-4 col-12 col-lg-6">
                            <h3>Add New Product</h3>
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    value={newProduct.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    className="form-control"
                                    value={newProduct.price}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Image URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    className="form-control"
                                    value={newProduct.image}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    name="categoryId"
                                    className="form-control"
                                    value={newProduct.categoryId}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">
                                Add Product
                            </button>
                        </form>
                    </div>
                    {/* Form to add a new product */}
                    {updateProduct && (
                        <form onSubmit={handleUpdateproduct} className="mb-4">
                            <h3>Update Product</h3>
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    value={updateProduct.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    className="form-control"
                                    value={updateProduct.price}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Image URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    className="form-control"
                                    value={updateProduct.image}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    name="categoryId"
                                    className="form-control"
                                    value={updateProduct.categoryId}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-success">
                                Update Product
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setUpdateProduct(null)}
                            >
                                Cancel
                            </button>
                        </form>
                    )}

                    {/* Table to display products */}

                            <div className="table-responsive d-flex justify-content-center">
                                <div className="product-cards d-none d-lg-block  ">
                                    {products.slice(0,100).map((v, i) => {
                                        const rawStringArray = v.images;
                                        const rawString = Array.isArray(rawStringArray)
                                            ? rawStringArray[0]
                                            : rawStringArray;
                                        const url = rawString
                                            .replace(/&quot;/g, "")
                                            .replace(/[\[\]]/g, "")
                                            .replace(/"/g, "")
                                            .trim();

                                        return (
                                            <div className="product-card p-5 d-flex " key={v.id}>
                                                <div className="product_detail_box col-6">
                                                    <div><strong>ID:</strong> {v.id}</div>
                                                    <div><strong>Product Name:</strong> {v.title}</div>
                                                
                                                    <div><strong>Price:</strong> ${v.price.toFixed(2)} x {v.quantity}</div>
                                                    <div>
                                                        <Link to={`/category/${v.category.id}/productpage/${v.id}`} onClick={scrollToTop} className="text-primary">
                                                            View Product
                                                        </Link>
                                                    </div>
                                                    <div className="">
                                                        <button
                                                            className="btn btn-warning mx-2"
                                                            onClick={() => openUpdateForm(v)}
                                                        >
                                                            Edit
                                                        </button>

                                                        <button className="btn btn-danger my-3  mx-2 text-capitalize" onClick={() => deleteProduct(v.id)}>
                                                            delete
                                                        </button>

                                                    </div>
                                                </div>
                                                <div className="product_detail_image col-6 d-flex justify-content-center">
                                                    <img src={url} alt={v.title} className='img-fluid col-6 ' />
                                                </div>
                                            </div>
                                        );
                                    })}
                        </div>
                        <div className="product-cards d-block d-md-none">
                            {products.slice(0,100).map((item) => {
                                const rawStringArray = item.images;
                                const rawString = Array.isArray(rawStringArray)
                                    ? rawStringArray[0]
                                    : rawStringArray;
                                const url = rawString
                                    .replace(/&quot;/g, "")
                                    .replace(/[\[\]]/g, "")
                                    .replace(/"/g, "")
                                    .trim();
                                return (
                                    <div className="product-card" key={item?.id}>
                                        <div><strong>ID:</strong> {item?.id}</div>
                                        <div><strong>Product Name:</strong> {item?.title}</div>
                                     
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
                                            <img src={url} alt={item.title} />
                                        </div>
                                        <div className=" d-flex justify-content-around">
                                            <button
                                                className="btn btn-warning my-3  mx-2"
                                                onClick={() => openUpdateForm(item)}
                                            >
                                                Edit
                                            </button>

                                            <button className="btn btn-danger my-3  mx-2 text-capitalize" onClick={() => deleteProduct(item.id)}>
                                                delete
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

export default ProductList;
