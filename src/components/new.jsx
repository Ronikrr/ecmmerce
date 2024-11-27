import React from 'react'
import { Link } from 'react-router-dom'
import img1 from '../assets/image/new_1.jpg'
import img2 from '../assets/image/new_2.jpg'
import img3 from '../assets/image/new_3.jpg'
import img4 from '../assets/image/new_4.jpg'

function New() {

    return (
        <div>
            <section className="new text-bg-light py-5 ">
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex flex-column flex-lg-row  align-items-center justify-content-center">
                            <div className="col-12 col-lg-3 flex-column d-flex flex-lg-wrap   d-flex justify-content-center align-content-center">
                                <Link to="" className='new_image_1  mb-2 mb-xl-4 d-flex justify-content-center align-content-center'  >
                                    <img src={img1} alt="" className='img-fluid' />
                                </Link>
                                <Link to="" className='new_image_2 d-flex justify-content-center align-content-center' >
                                    <img src={img2} alt="" className='img-fluid' />
                                </Link>
                            </div>
                            <div className="col-12 col-lg-9 d-flex flex-column flex-lg-row justify-content-center mt-5 mt-lg-0">
                                <div className="cms_bannr2 col-12 col-lg-8 d-flex justify-content-center align-content-center">
                                    <Link to=""  >
                                        <img src={img3} alt=""className='img-fluid' />
                                    </Link>
                                </div>
                                <div className="cms_bannr3 col-12 col-lg-4 d-flex justify-content-center align-content-center">
                                    <Link to="">
                                        <img src={img4} alt=""className='img-fluid' />
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default New