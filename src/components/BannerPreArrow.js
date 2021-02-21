import React from 'react'

function BannerPreArrow(props) {
    //console.log(props)
    const { className, style, onClick } = props;
    return (
        <div
            className={className + " banner-arrow banner-pre-arrow"}
            style={{ ...style }}
            onClick={onClick}
        />
    );
}


export default BannerPreArrow
