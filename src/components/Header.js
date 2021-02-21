import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { cartSelector } from 'slice/cartSlice';

import { signout, userSelector } from '../slice/userSlice'
import Hover from './Hover';

function Header() {


    const { userInfo } = useSelector(userSelector);
    const { cartItems } = useSelector(cartSelector);


    const dispatch = useDispatch();

    const signoutHandler = () => {
        dispatch(signout());
    }

    return (

        <header className="header">
            <div className="container header__inner">
                <div className="header__menu-mobile">

                    <Hover onHover={
                        <>
                            <Link to="/" id="menu_mobile"><img src="/images/menu-mobile-icon.png" alt="Some thing diffrent" /></Link>
                            <nav className="menu__category-mobile">
                                <div className="box">
                                    <ul>
                                        <li><a href="/category"><img src="/images/danh-muc-icon.png" alt="Some thing diffrent" />DANH MỤC SẢN PHẨM</a></li>
                                        <li><Link to="/category/Two"><img src="/images/thuc-pham-icon.png" alt="Some thing diffrent" />Thực phẩm nhà làm</Link></li>
                                        <li><Link to="/category/One"><img src="/images/cay-thuoc-icon.png" alt="Some thing diffrent" /> Cây thuốc tự nhiên</Link></li>
                                        <li><Link to="/category/One"><img src="/images/do-thu-cong-icon.png" alt="Some thing diffrent" /> Đồ thủ công mỹ nghệ</Link></li>
                                        <li><Link to="/category/One"><img src="/images/do-thu-cong-icon.png" alt="Some thing diffrent" /> Đồ phong thuỷ</Link></li>
                                        <li><Link to="/category/One"><img src="/images/do-uong-icon.png" alt="Some thing diffrent" /> Đồ uống nhà làm</Link></li>
                                        <li><Link to="/category/One"><img src="/images/san-pham-icon.png" alt="Some thing diffrent" /> Sản phẩm nhà làm khác</Link></li>
                                        <li><Link to="/category/One"><img src="/images/khuyen-mai-icon.png" alt="Some thing diffrent" /> Khuyến mãi & Quà tặng</Link></li>

                                    </ul>
                                    <div className="ribbon ribbon-top-left"><img src="/images/top-left-small.png" alt="Some thing diffrent" /></div>
                                    <div className="ribbon ribbon-bottom-right"><img src="/images/bottom-right-small.png" alt="Some thing diffrent" /></div>
                                </div>

                            </nav>
                        </>
                    }>
                        <Link to="/" id="menu_mobile"><img src="/images/menu-mobile-icon.png" alt="Some thing diffrent" /></Link>
                    </Hover>
                </div>

                <Link to="/" className="logo">
                    <img className="logo__image" src="/images/logo-shop-nha-lam.png" alt="Some thing diffrent" />
                </Link>

                <div className="header__icons">
                    <div className="header__icons_icon">
                        <img src="/images/san-pham-tu-nhien-chat-luong.png" alt="Some thing diffrent" />
                        <div className="header__icons_icon_text">
                            <h3>SẢN PHẨM</h3>
                            <p>Tự nhiên & chất lượng</p>
                        </div>
                    </div>

                    <div className="header__icons_icon">
                        <img src="/images/giao-hang-nhanh.png" alt="Some thing diffrent" />
                        <div className="header__icons_icon_text">
                            <h3>GIAO HÀNG NHANH</h3>
                            <p>Chỉ trong vòng 24h</p>
                        </div>
                    </div>

                    <div className="header__icons_icon">
                        <img src="/images/san-pham-tu-nhien-chat-luong.png" alt="Some thing diffrent" />
                        <div className="header__icons_icon_text">
                            <h3>HOÀN TIỀN</h3>
                            <p>150% nếu phát hiện hàng giả</p>
                        </div>
                    </div>

                </div>

                <div className="header__right">
                    <Link to="/Cart" className="header__right_cart" >
                        <span className="cart-number-items">{cartItems.length > 0 ? cartItems.length : 0}</span>
                        <img src="/images/gio-hang.png" alt="Some thing diffrent" />

                    Giỏ hàng
                    </Link>
                    {
                        userInfo ? (
                            <div className="dropdown">
                                <Link className="header__right_login" to="#">
                                    <img src="/images/dang-nhap-dang-ky.png" alt="Some thing diffrent" />
                                    {userInfo.name}
                                    <i className="fa fa-caret-down"></i></Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/profile">User Profile</Link>
                                    </li>

                                    <li>
                                        <Link to="/orderhistory" >Order history</Link>
                                    </li>
                                    <li>
                                        <Link to="/signout" onClick={signoutHandler}>Sign Out</Link>
                                    </li>

                                </ul>
                            </div>
                        ) : (
                                <Link className="header__right_login" to="/signin">
                                    <img src="/images/dang-nhap-dang-ky.png" alt="Some thing diffrent" />
                                    Sign-In</Link>
                            )
                    }


                </div>

                <div className="header__icons-mobile">
                    <div className="header__icons-mobile_icon">
                        {/* <Link to="/profile"><img src="/images/login-mobile-icon.png" alt="Some thing diffrent" /></Link> */}
                        {
                            userInfo ? (
                                <div className="dropdown">
                                    <Link className="header__right_login" to="#">
                                        <img src="/images/login-mobile-icon.png" alt="Some thing diffrent" />
                                        {/* {userInfo.name}
                                        <i className="fa fa-caret-down"></i>*/}
                                    </Link>
                                    <ul className="dropdown-content">
                                        <li>
                                            <Link to="/profile">User Profile</Link>
                                        </li>

                                        <li>
                                            <Link to="/orderhistory" >Order history</Link>
                                        </li>
                                        <li>
                                            <Link to="/signout" onClick={signoutHandler}>Sign Out</Link>
                                        </li>

                                    </ul>
                                </div>
                            ) : (
                                    <Link className="header__right_login" to="/signin">
                                        <img src="/images/login-mobile-icon.png" alt="Some thing diffrent" />
                                    </Link>
                                )
                        }
                    </div>

                    <div className="header__icons-mobile_icon">
                        <Link to="/Cart"><img src="/images/cart-mobile-icon.png" alt="Some thing diffrent" /><span className="cart-number-items">{cartItems.length > 0 ? cartItems.length : 0}</span></Link>
                    </div>

                    {/* <div className="header__icons-mobile_icon">
                        <a href="#"><img src="/images/call-mobile-icon.png" alt="Some thing diffrent" /></a>
                    </div> */}

                </div>


            </div>
        </header >

    )
}

export default Header
