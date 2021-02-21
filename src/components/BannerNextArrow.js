import React from 'react'

function BannerNextArrow(props) {
    //console.log(props)
    const { className, style, onClick } = props;
    return (
        <div
            className={className + " banner-arrow banner-next-arrow"}
            style={{ ...style }}
            onClick={onClick}
        />
    );
}


export default BannerNextArrow
