// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// function Register() {
//     const navigate = useNavigate();
//     const [form, setformdata] = useState({
//         name: '',
//         email: '',
//         password: '',
//         avatar: 'null'
//     })
//     const [alertmessage, setalertmessage] = useState(null);
//     const [alerttype, setaleatype] = useState(null);

//     const handlechange = (e) => {
//         const { name, value, files } = e.target;

//         if (name === 'avatar') {
//             if (files && files.length > 0) {
//             // Handle file selection only if files are available
//                 setformdata({
//                     ...form,
//                     avatar: files[0], // Store the selected file
//                 });
//             } else {
//                 // If no file is selected, you might want to clear the avatar
//                 setformdata({
//                     ...form,
//                     avatar: null,
//                 });
//             }
//         } else {
//             setformdata({
//                 ...form,
//                 [name]: value,
//             })
//         }
//     }
//     const generateId = () => {
//         return 'user-' + Math.random().toString(36).substr(2, 9); // Simple ID generator
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Validation checks
//         if (!form.name || typeof form.name !== 'string') {
//             setalertmessage('Name is required and must be a string.');
//             setaleatype('danger');
//             return;
//         }

//         if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
//             setalertmessage('Email is required and must be a valid email address.');
//             setaleatype('danger');
//             return;
//         }

//         if (!form.password || form.password.length < 4 || !/^[a-zA-Z0-9]+$/.test(form.password)) {
//             setalertmessage('Password is required, must be at least 4 characters long, and contain only letters and numbers.');
//             setaleatype('danger');
//             return;
//         }

//         if (!form.avatar) {
//             setalertmessage('Avatar file is required.');
//             setaleatype('danger');
//             return;
//         }

//         const id = generateId();
//         const payload = new FormData();
//         payload.append('id', id);
//         payload.append('name', form.name);
//         payload.append('email', form.email);
//         payload.append('password', form.password);
//         payload.append('role', 'customer');
//         payload.append('avatar', form.avatar); // Append the file directly

//         try {
//             const res = await fetch('https://api.escuelajs.co/api/v1/users/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },

//                 body: JSON.stringify(payload),
//             });

//             if (res.ok) {
//                 const result = await res.json();
//                 setalertmessage('User created successfully!');
//                 setaleatype('success');
//                 console.log(result);
//                 // Optionally navigate to another page
//             } else {
//                 const errorData = await res.json();
//                 setalertmessage(`Failed to create user: ${errorData.message || 'Unknown error'}`);
//                 setaleatype('danger');
//                 console.error('Error details:', errorData);
//             }
//         } catch (error) {
//             setalertmessage(`An error occurred: ${error.message}`);
//             setaleatype('danger');
//             console.error('Error:', error);
//         }
//     };

//     useEffect(() => {
//         if (alerttype === 'success') {
//             const timer = setTimeout(() => {
//                 navigate('/login');
//             }, 5000); // 5000 milliseconds = 5 seconds

//             // Cleanup timer on component unmount
//             return () => clearTimeout(timer);
//         }
//     }, [alerttype, navigate]);

//     return (
//         <div>
//             <div className="container d-flex justify-content-center align-items-center vh-100">
//                 <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
//                     <h2 className="text-center mb-4">Register</h2>
//                     <form onSubmit={handleSubmit} >
//                         {alertmessage && (
//                             <div className={`alert alert-${alerttype}`} role="alert">
//                                 {alertmessage}
//                             </div>
//                         )}


//                         <div className="form-group my-3">
//                             <label htmlFor="email">Name</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="name"
//                                 name='name'
//                                 value={form.name}
//                                 onChange={handlechange}
//                                 required
//                             />
//                         </div>

//                         <div className="form-group my-3">
//                             <label htmlFor="email">Email</label>
//                             <input
//                                 type="email"
//                                 className="form-control"
//                                 id="email"
//                                 name='email'
//                                 value={form.email}
//                                 onChange={handlechange}
//                                 required
//                             />
//                         </div>

//                         <div className="form-group my-3">
//                             <label htmlFor="password">Password:</label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 name="password"
//                                 className='form-control'
//                                 value={form.password}
//                                 onChange={handlechange}
//                                 required
//                             />
//                         </div>
//                         <div className="form-group my-3">
//                             <label htmlFor="avatar">Avatar URL:</label>
//                             <input
//                                 type="file"
//                                 id="avatar"
//                                 name="avatar"
//                                 className='form-control'
//                                 // value={form.avatar}
//                                 accept='image/*'
//                                 onChange={handlechange}
//                                 required
//                             />

//                         </div>


//                         <button type="submit" className="btn btn-primary w-100" >
//                             Register
//                         </button>
//                         <div className="form-group text-center my-3">

//                             <label htmlFor="" className='text-center' >if you registered alreday <Link to='/login'>Login</Link> </label>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Register
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const CreateUser = () => {
    // State variables for user inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('https://picsum.photos/800');
    const [message, setMessage] = useState('');
    const navigate = useNavigate()
    const [isEmailAvailable, setIsEmailAvailable] = useState(null); // null, true, or false
    const [emailCheckMessage, setEmailCheckMessage] = useState('');
    const checkEmailAvailability = async (email) => {
        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/users/is-available', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data.available) {
                setIsEmailAvailable(true);
                setEmailCheckMessage('Email is available!');
            } else {
                setIsEmailAvailable(false);
                setEmailCheckMessage('Email is already in use.');
            }
        } catch (error) {
            console.error('Error checking email availability:', error);
            setEmailCheckMessage('Error checking email availability. Please try again.');
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        if (isEmailAvailable === false) {
            setMessage('Cannot create user, email is already in use.');
            return;
        }
        const userData = {
            name,
            email,
            password,
            avatar,
        };

        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Get the response body
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message || 'Unknown error'}`);
            }

            const data = await response.json();
            console.log('User created:', data);
            setMessage(`User created successfully: ${data.name}`);
            navigate('/login')
        } catch (error) {
            console.error('Error:', error);
            setMessage(`Error creating user: ${error.message}`);
        }
    };

    return (
        <div>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                {message && <p>{message}</p>}
                <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
                    <h2 className="text-center ">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div classname='form-group my-3' >
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                className='form-control'
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div classname='form-group my-3' >
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                className='form-control'
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); checkEmailAvailability(e.target.value)}}
                                required
                            />
                            {emailCheckMessage && <p>{emailCheckMessage}</p>}
                        </div>
                        <div classname='form-group my-3' >
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                className='form-control'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div classname='form-group my-3' >
                            <label htmlFor="avatar">Avatar URL:</label>
                            <input
                                type="url"
                                id="avatar"
                                className='form-control'
                                value={avatar}
                                onChange={(e) => setAvatar(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className='btn btn-primary w-100 mt-3' >Sign Up</button>
                    </form>
 {/* Display message after form submission */}
                </div></div>
        </div>
    );
};

export default CreateUser;
