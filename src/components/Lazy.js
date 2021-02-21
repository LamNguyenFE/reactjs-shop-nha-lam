import React from 'react'
import { Link } from 'react-router-dom'

function Lazy() {
    return (
        <div className="lazys">
            <div className="container ">
                <div className="lazys__inner">
                    <div className="lazy lazy1"><Link to="/">SẢN PHẨM MỚI</Link></div>
                    <div className="lazy lazy2"><Link to="/">KHUYẾN MÃI</Link></div>
                    <div className="lazy lazy3"><Link to="/">SẢN PHẨM BÁN CHẠY</Link></div>
                    <div className="lazy lazy4"><Link to="/">COMBO SẢN PHẨM</Link></div>
                </div>
            </div>
        </div>
    )
}

export default Lazy
