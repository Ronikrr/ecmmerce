import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleLogout = () => {
        const accessToken = localStorage.removeItem('access_token');
        if (!accessToken) {
            navigate("/login");
            return;
        }
    };



    useEffect(() => {
        const fetchuserdata = async () => {
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
                    throw new Error('failed to fetch user data');
                }
                const data = await res.json();
                setUser(data);
                setLoading(false)

            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error.message);
                setLoading(false);
            }
        }
        fetchuserdata()
    }, [navigate])
    if (loading) return <div className="loader_head">
        <div className="loader"></div>
    </div>;


    if (error) return <p>Error loading user data: {error.message}</p>;
    if (!user) return <p>No user data available.</p>;

    return (
        <div>
            <section className="product">
                <div className="col-12 pro_heading text-capitalize d-flex align-items-center justify-content-center">
                    <div className='overlay' ></div>
                    <h1 style={{ position: "relative", zIndex: 1 }}>wishlist page</h1>
                </div>
                <div className="container">
                    <div className="row p-5 justify-content-center ">
                        <div className="col-12 col-md-8 col-lg-6 ">
                            <form action="">


                                <div className="mb-3">
                                    <img src={user.avatar} width={100} height={100} alt="" className=' rounded-circle' />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name='name'
                                        className="form-control"
                                        id="exampleFormControlInput1"
                                        value={user.name}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput2" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleFormControlInput2"
                                        value={user.email}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput3" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleFormControlInput3"
                                        value={user.password}
                                    />
                                </div>


                                {(user.addresses || []).map(address => (
                                    <div key={address.id} className="mb-3">
                                        <h2>Addresses</h2>
                                        <label htmlFor={`address-${address.id}`} className="form-label">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={`address-${address.id}`}
                                            value={`${address.addressLine1}, ${address.addressLine2}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.country}`}
                                            readOnly
                                        />
                                    </div>
                                ))}
                                <div className="mb-3">
                                    <input
                                        type="submit"
                                        className="btn btn-primary"
                                        id="exampleFormControlInput3"
                                    />
                                </div>
                                <div className="mb-3">
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        aria-label="Logout"
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to logout?")) {
                                                handleLogout();
                                            }
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>


                            </form>

                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}

export default UserProfile;
