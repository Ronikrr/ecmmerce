import React, { useState } from 'react'

const Alertmessage = () => {
    const [alert, setallert] = useState([
        { id: 1, message: "Product deleted successfully.", type: "success" },
        { id: 2, message: "Error deleting product.", type: "danger" },
        { id: 3, message: "Product added to cart.", type: "info" }
    ])
    const handleClose = (id) => {
        setallert(alert.filter(alert => alert.id !== id));
    }
    return (
        <div className="container m-5">
            {alert.map((alert) => (
                <div
                    key={alert.id}
                    className={`alert alert-${alert.type} alert-dismissible fade show`}
                    role="alert"
                >
                    <strong>{alert.type === "success" ? "Success!" : ""}</strong> {alert.message}
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => handleClose(alert.id)}
                        aria-label="Close"
                    ></button>
                </div>
            ))}
        </div>
    );
};
export default Alertmessage;