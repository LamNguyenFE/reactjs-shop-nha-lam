import React from 'react'

function KhuyenMai() {
    return (
        <div className="khuyenmai">
            <div className="container">
                <div className="khuyenmai__inner">
                    <div className="khuyenmai__left">
                        <img src="/images/dangkykm-icon.png" className="khuyenmai__icon"></img>
                        <div className="khuyenmai__text">
                            Đăng ký nhận khuyến mãi
            </div>
                    </div>
                    <div className="khuyenmai__right">
                        <form>
                            <input type="text" name="subscribe" id="subscribe" placeholder="Nhập Email" />
                            <button type="submit">
                                <img src="/images/email-icon.png" alt="Some thing diffrent" />
                                                                                                                NHẬN KHUYẾN MẠI
              </button>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default KhuyenMai
