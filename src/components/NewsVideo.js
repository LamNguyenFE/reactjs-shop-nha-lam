import React from 'react'

function NewsVideo() {
    return (
        <>
            <div className="news-videos">
                <div className="container ">
                    <div className="news-videos__inner">

                        <div className="videos-section fix-height">
                            <div className="category-title">
                                <div className="category-name">
                                    <a href="/#"><img src="/images/video-icon.png" />VIDEO SẢN PHẢM</a>
                                </div>
                                <div className="load-more "></div>
                            </div>


                        </div>
                        <div className="news-section mobile-invisible">

                            <div className="category-title ">
                                <div className="category-name">
                                    <a href="/#"><img src="/images/ban-tin-icon.png" />BẢN TIN MỖI NGÀY</a>
                                </div>
                                <div className="load-more "></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="news-videos">
                <div className="container ">
                    <div className="news-videos__inner">

                        <iframe className="videos-section" src="https://www.youtube.com/embed/IYLMKv2U7Nw" frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>




                        <div className="news-section">

                            <div className="category-title mobile-visible">
                                <div className="category-name">
                                    <a href="/#"><img src="/images/ban-tin-icon.png" />BẢN TIN MỖI NGÀY</a>
                                </div>
                                <div className="load-more "></div>
                            </div>

                            <div className="news">
                                <div className="new">

                                    <img src="/images/news-img1.png" alt="Some thing diffrent" className="new__image" />

                                    <div className="new__content">
                                        <div className="new__title">Trăng trên phố - tròn vị tình nhân</div>
                                        <div className="new__short-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit eum
                                        harum
                                        porro delectus quis obcaecati, possimus esse impedit reprehenderit fuga cumque molestias aut natus
                                        minus
                  ea nostrum nemo explicabo quia!</div>
                                    </div>
                                </div>

                                <div className="new">

                                    <img src="/images/news-img2.png" alt="Some thing diffrent" className="new__image" />

                                    <div className="new__content">
                                        <div className="new__title">Trăng trên phố - tròn vị tình nhân</div>
                                        <div className="new__short-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit eum
                                        harum
                                        porro delectus quis obcaecati, possimus esse impedit reprehenderit fuga cumque molestias aut natus
                                        minus
                  ea nostrum nemo explicabo quia!</div>
                                    </div>
                                </div>


                                <div className="new">

                                    <img src="/images/news-img3.png" alt="Some thing diffrent" className="new__image" />

                                    <div className="new__content">
                                        <div className="new__title">Trăng trên phố - tròn vị tình nhân</div>
                                        <div className="new__short-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit eum
                                        harum
                                        porro delectus quis obcaecati, possimus esse impedit reprehenderit fuga cumque molestias aut natus
                                        minus
                  ea nostrum nemo explicabo quia!</div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default NewsVideo
