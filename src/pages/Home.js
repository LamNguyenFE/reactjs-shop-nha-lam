import React, { useEffect } from 'react'


import Product2S from '../components/Product2S';
import Banner from '../components/Banner';
import Lazy from '../components/Lazy';
import Product2 from '../components/Product2';
import Product3Right from '../components/Product3Right';
import Product3Left from '../components/Product3Left';
import Product4 from '../components/Product4';
import Menu from '../components/Menu';

function Home() {
    useEffect(() => {
        document.title = 'Shop Nhà Làm'
    })



    return (
        <>
            <Menu />
            <Banner />
            <Lazy />
            <Product2S />
            <Product2 />

            <Product3Right />

            <Product3Left />

            {/* <Product4 /> */}
            <Product3Left />

            {/* //Chung action du lieu bi de vao nhau */}
            <Product2S category="One"></Product2S>
            <Product2S category="Two"></Product2S>
            <Product2 category="Two"></Product2>
            {/* <Product4 category="One"></Product4> */}
            <Product4 category="One"></Product4>
        </>
    )
}

export default Home
