import React from 'react'
import { Link } from 'react-router-dom';
import Hover from './Hover'
import SearchBox from './SearchBox';

function Menu(props) {
    const { show = false } = props;
    return (
        <div className="menu">
            <div className="container menu__inner">


                {show ? (
                    <Hover onHover={
                        <nav className="menu__category">
                            <div className="box">
                                <ul>
                                    <li><a href="/category"><img src="/images/danh-muc-icon.png" alt="Some thing diffrent" />DANH MỤC SẢN PHẨM</a></li>
                                    <li><Link to="/category/Two"><img src="/images/thuc-pham-icon.png" alt="Some thing diffrent" />Thực phẩm nhà làm</Link></li>
                                    <li><Link to="/category/One"><img src="/images/cay-thuoc-icon.png" alt="Some thing diffrent" /> Cây thuốc tự nhiên</Link></li>
                                    <li><Link to="/category/Two"><img src="/images/do-thu-cong-icon.png" alt="Some thing diffrent" /> Đồ thủ công mỹ nghệ</Link></li>
                                    <li><Link to="/category/One"><img src="/images/do-thu-cong-icon.png" alt="Some thing diffrent" /> Đồ phong thuỷ</Link></li>
                                    <li><Link to="/category/Two"><img src="/images/do-uong-icon.png" alt="Some thing diffrent" /> Đồ uống nhà làm</Link></li>
                                    <li><Link to="/category/One"><img src="/images/san-pham-icon.png" alt="Some thing diffrent" /> Sản phẩm nhà làm khác</Link></li>
                                    <li><Link to="/category/Two"><img src="/images/khuyen-mai-icon.png" alt="Some thing diffrent" /> Khuyến mãi & Quà tặng</Link></li>

                                </ul>
                                <div className="ribbon ribbon-top-left"><img src="/images/top-left-small.png" alt="Some thing diffrent" /></div>
                                <div className="ribbon ribbon-bottom-right"><img src="/images/bottom-right-small.png" alt="Some thing diffrent" /></div>
                            </div>

                        </nav>
                    }>
                        <nav className="menu__category">
                            <div className="box">
                                <ul>
                                    <li><a href="/category"><img src="/images/danh-muc-icon.png" alt="Some thing diffrent" />DANH MỤC SẢN PHẨM</a></li>
                                </ul>
                                <div className="ribbon ribbon-top-left"><img src="/images/top-left-small.png" alt="Some thing diffrent" /></div>
                                <div className="ribbon ribbon-bottom-right"><img src="/images/bottom-right-small.png" alt="Some thing diffrent" /></div>
                            </div>

                        </nav>
                    </Hover>
                ) : (
                        <nav className="menu__category">
                            <div className="box">
                                <ul>
                                    <li><a href="/category"><img src="/images/danh-muc-icon.png" alt="Some thing diffrent" />DANH MỤC SẢN PHẨM</a></li>
                                    <li><Link to="/category/Two"><img src="/images/thuc-pham-icon.png" alt="Some thing diffrent" />Thực phẩm nhà làm</Link></li>
                                    <li><Link to="/category/One"><img src="/images/cay-thuoc-icon.png" alt="Some thing diffrent" /> Cây thuốc tự nhiên</Link></li>
                                    <li><Link to="/category/Two"><img src="/images/do-thu-cong-icon.png" alt="Some thing diffrent" /> Đồ thủ công mỹ nghệ</Link></li>
                                    <li><Link to="/category/One"><img src="/images/do-thu-cong-icon.png" alt="Some thing diffrent" /> Đồ phong thuỷ</Link></li>
                                    <li><Link to="/category/Two"><img src="/images/do-uong-icon.png" alt="Some thing diffrent" /> Đồ uống nhà làm</Link></li>
                                    <li><Link to="/category/One"><img src="/images/san-pham-icon.png" alt="Some thing diffrent" /> Sản phẩm nhà làm khác</Link></li>
                                    <li><Link to="/category/Two"><img src="/images/khuyen-mai-icon.png" alt="Some thing diffrent" /> Khuyến mãi & Quà tặng</Link></li>

                                </ul>
                                <div className="ribbon ribbon-top-left"><img src="/images/top-left-small.png" alt="Some thing diffrent" /></div>
                                <div className="ribbon ribbon-bottom-right"><img src="/images/bottom-right-small.png" alt="Some thing diffrent" /></div>
                            </div>

                        </nav>

                    )
                }






                <a href="/#">Về chúng tôi</a>
                <span>|</span>
                <a href="/#">Bản tin mỗi ngày</a>
                {/* <form>
                    <input type="text" name="Search" id="Search" placeholder="Nhập nội dung tìm kiếm" />
                    <button type="submit">
                        Tìm kiếm
        </button>
                </form> */}
                <SearchBox />
            </div>
        </div>
    )
}

// $("#menu_mobile").click(function () {
//     var display = $(".menu__category").css("display");
//     // alert(display)
//     if ($(window).width() < 1368) {
//       if (display == 'none')
//         $(".menu__category").css("display", "block");
//       else
//         $(".menu__category").css("display", "none");
//     }
//   });

//   $(window).resize(function () {
//     if ($(window).width() >= 1368) {
//       $(".menu__category").css("display", "block");
//     }
//     else {
//       $(".menu__category").css("display", "none");
//     }
//   });

export default Menu
