import React from 'react'
// import { Link } from 'react-router-dom'
import subimg1 from '../assets/image/sub-banner1-383x152.jpg'
import subimg2 from '../assets/image/sub-banner2-384x152.jpg'
import subimg3 from '../assets/image/sub-banner3-383x152.jpg'

const typeimg = [
    { id: 1, src: subimg1 },
    { id: 2, src: subimg2 },
    { id: 3, src: subimg3 },
]

function Type() {
    const style = {
        main: {
            paddingTop: "30px",
            paddingBottom: "30px",
        }
    }
    return (
        <div>
            <section style={style.main} className='type'>
                <div className="container">
                    <div className="row d-flex  justify-content-center">
                        {
                            typeimg.map((item, index) => (
                                <div
                                    key={index}
                                    className="col-12 col-sm-6 col-md-4 col-lg-4 d-flex justify-content-center mb-4 "
                                >
                                    <img src={item.src} alt={item.id} className="img-fluid" />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Type