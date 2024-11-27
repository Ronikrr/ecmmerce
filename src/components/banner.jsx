import React from 'react';
import img1 from '../assets/image/Main-Banner-1-1903x600.jpg';
import img2 from '../assets/image/Main-Banner-2-1903x600.jpg';
import img3 from '../assets/image/Main-Banner-3-1903x600.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const banner = [
    {
        id: 1,
        title: "Banner 1",
        src: img1,
    }, {
        id: 2,
        title: "Banner 2",
        src: img2,
    }, {
        id: 3,
        title: "Banner 3",
        src: img3,
    }
];

function Banner() {

    return (
        <div>
            <section className="banner">

                <div className="row">
                    <div className="banner_box col-12 p-0 align-items-center">
                        <div id="carouselExampleIndicators" className="carousel slide">
                            <div className="carousel-indicators">
                                <button
                                    type="button"
                                    data-bs-target="#carouselExampleIndicators"
                                    data-bs-slide-to={0}
                                    className="active"
                                    aria-current="true"
                                    aria-label="Slide 1"
                                />
                                <button
                                    type="button"
                                    data-bs-target="#carouselExampleIndicators"
                                    data-bs-slide-to={1}
                                    aria-label="Slide 2"
                                />
                                <button
                                    type="button"
                                    data-bs-target="#carouselExampleIndicators"
                                    data-bs-slide-to={2}
                                    aria-label="Slide 3"
                                />
                            </div>
                            <div className="carousel-inner">
                                {
                                    banner.map((banner, i) => (
                                        <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}
                                            data-bs-interval="3000"
                                        >
                                            <img src={banner.src} className="d-block w-100 img-fluid slide_box" alt={banner.title} />
                                        </div>
                                    ))
                                }
                            </div>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true" />
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true" />
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                    </div>
                </div>

            </section>
        </div>
    );
}

export default Banner;
