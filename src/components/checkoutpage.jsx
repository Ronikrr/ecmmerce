import React, { useState } from 'react';
import { useParams } from 'react-router-dom';



function Checkoutpage() {
    const { id, price } = useParams();
    const [formdata, setformdata] = useState({
        name: '',
        email: '',
        address: '',
        paymentmethod: 'credit',
    });

    const handlechange = (e) => {
        const { name, value } = e.target;
        setformdata({ ...formdata, [name]: value });
    };

    const handlepayment = async (e) => {
        e.preventDefault();

        console.log('Form submitted:', formdata);
    };

    const style = {
        container: {
            width: "800px",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "15px",
            paddingRight: "15px",
        },
        checkoutpage: {
            paddingTop: "100px",
            paddingBottom: "100px",
        }
    };

    return (
        <div>
            <div style={style.checkoutpage} className="checkoutpage">
                <div style={style.container}>
                    <div className="col-md-8 offset-md-2">
                        <h2 className="text-center mb-4">Checkout</h2>
                        <form onSubmit={handlepayment}>
                            <div className="mb-3 d-flex flex-column">
                                <label htmlFor="id">Product id: {id}</label>
                                <label htmlFor="id">Price: {price}</label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    value={formdata.name}
                                    onChange={handlechange}
                                    className='form-control'
                                    id="name"
                                    name='name'
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    value={formdata.email}
                                    onChange={handlechange}
                                    className='form-control'
                                    id="email"
                                    name='email'
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <textarea
                                    className='form-control'
                                    value={formdata.address}
                                    onChange={handlechange}
                                    id="address"
                                    name='address'
                                    placeholder="Enter your address"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="paymentmethod">Payment Method</label>
                                <select
                                    name="paymentmethod"
                                    value={formdata.paymentmethod}
                                    onChange={handlechange}
                                    className="form-select"
                                    id="paymentmethod"
                                    required
                                >
                                    <option value="" disabled>Select payment method</option>
                                    <option value="creditcard">Credit Card</option>
                                    <option value="paypal">Paypal</option>
                                </select>
                            </div>
                            <button type='submit' className="btn btn-primary">Complete Purchase</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkoutpage;

// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';

// function Checkoutpage() {
//     const {  price } = useParams();
//     const [formdata, setformdata] = useState({
//         name: '',
//         email: '',
//         address: '',
//         contact: '',
//     });

//     const handlechange = (e) => {
//         const { name, value } = e.target;
//         setformdata({ ...formdata, [name]: value });
//     };

//     const loadRazorpayScript = () => {
//         return new Promise((resolve) => {
//             const script = document.createElement('script');
//             script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//             script.onload = () => resolve(true);
//             script.onerror = () => resolve(false);
//             document.body.appendChild(script);
//         });
//     };


//     const handlepayment = async (e) => {
//         e.preventDefault();

//         console.log('Form submitted:', formdata);

//         const res = await loadRazorpayScript();

//         if (!res) {
//             alert('Razorpay SDK failed to load. Are you online?');
//             return;
//         }

//         // Make an API call to your backend to create the order and get the order ID
//         const data = await fetch('http://localhost:3000/razorpay', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 amount: price * 100, // Razorpay expects the amount in paise (multiply by 100)
//                 currency: 'INR',
//                 receipt: 'receipt#1', // Optional
//             }),
//         }).then((t) => t.json());

//         // Handling the payment with Razorpay
//         const options = {
//             key: 'rzp_test_S67cSvXjwEhtgi',  // Replace with your Razorpay test key
//             amount: data.amount.toString(),
//             currency: data.currency,
//             order_id: data.id,
//             name: formdata.name,
//             description: 'Test Transaction',
//             image: 'https://your_logo_url',
//             handler: function (response) {
//                 alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
//             },
//             prefill: {
//                 name: formdata.name,
//                 email: formdata.email,
//                 contact: formdata.contact,
//             },
//             notes: {
//                 address: formdata.address,
//             },
//             theme: {
//                 color: '#F37254',
//             },
//         };

//         const paymentObject = new window.Razorpay(options);
//         paymentObject.open();
//     };



//     const style = {
//         container: {
//             width: '800px',
//             marginLeft: 'auto',
//             marginRight: 'auto',
//             paddingLeft: '15px',
//             paddingRight: '15px',
//         },
//         checkoutpage: {
//             paddingTop: '100px',
//             paddingBottom: '100px',
//         },
//     };

//     return (
//         <div>
//             <div style={style.checkoutpage} className="checkoutpage">
//                 <div style={style.container}>
//                     <div className="col-md-8 offset-md-2">
//                         <h2 className="text-center mb-4">Checkout</h2>
//                         <form onSubmit={handlepayment}>
//                             <div className="mb-3 d-flex flex-column">
//                                 <label htmlFor="id">Product id: </label>
//                                 <label htmlFor="id">Price: ₹{price}</label>
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="name" className="form-label">
//                                     Name
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={formdata.name}
//                                     onChange={handlechange}
//                                     className="form-control"
//                                     id="name"
//                                     name="name"
//                                     placeholder="Enter your name"
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="email" className="form-label">
//                                     Email
//                                 </label>
//                                 <input
//                                     type="email"
//                                     value={formdata.email}
//                                     onChange={handlechange}
//                                     className="form-control"
//                                     id="email"
//                                     name="email"
//                                     placeholder="Enter your email"
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="address" className="form-label">
//                                     Address
//                                 </label>
//                                 <textarea
//                                     className="form-control"
//                                     value={formdata.address}
//                                     onChange={handlechange}
//                                     id="address"
//                                     name="address"
//                                     placeholder="Enter your address"
//                                     required
//                                 ></textarea>
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="email" className="form-label">
//                                     Email
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={formdata.contact}
//                                     onChange={handlechange}
//                                     className="form-control"
//                                     id="contact"
//                                     name="contact"
//                                     placeholder="Enter your contact number"
//                                     required
//                                 />
//                             </div>
//                             <button type="submit" className="btn btn-primary">
//                                 Complete Purchase
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Checkoutpage;

