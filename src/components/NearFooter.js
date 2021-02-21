import React from 'react'
import { Link } from 'react-router-dom'

function NearFooter() {
    return (
        <div className="category-near-footer">
            <div className="container">
                <div className="category-near-footer__inner">
                    <div className="category-near-footer__wrap">
                        <Link to="/" className="category-near-footer__link"><img src="/images/thuc-pham-nha-lam.png" alt="Some thing diffrent" />
                                                                                                              Thực phẩm nhà làm</Link>
                    </div>
                    <div className="category-near-footer__wrap">
                        <Link to="/" className="category-near-footer__link green"><img src="/images/cay-thuoc-green.png" alt="Some thing diffrent" />
                                                                                                                Cây thuốc tự nhiên</Link>
                    </div>
                    <div className="category-near-footer__wrap">
                        <Link to="/" className="category-near-footer__link"><img src="/images/thuc-pham-nha-lam.png" alt="Some thing diffrent" />
                                                                                                                  Thực phẩm nhà làm</Link>
                    </div>
                    <div className="category-near-footer__wrap">
                        <Link to="/" className="category-near-footer__link"><img src="/images/thuc-pham-nha-lam.png" alt="Some thing diffrent" />
                                                                                                                    Thực phẩm nhà làm</Link>
                    </div>
                    <div className="category-near-footer__wrap">
                        <Link to="/" className="category-near-footer__link"><img src="/images/thuc-pham-nha-lam.png" alt="Some thing diffrent" />
                                                                                                                      Thực phẩm nhà làm</Link>
                    </div>
                    <div className="category-near-footer__wrap">
                        <Link to="/" className="category-near-footer__link"><img src="/images/thuc-pham-nha-lam.png" alt="Some thing diffrent" />
                                                                                                                        Thực phẩm nhà làm</Link>
                    </div>



                </div>
            </div>
        </div>
    )
}

export default NearFooter
