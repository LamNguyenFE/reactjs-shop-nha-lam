import React from 'react'

function ProductNextArrow(props) {
    //console.log(props)
    const { className, style, onClick } = props;
    return (
        <div
            className={className + " product-arrow product-next-arrow"}
            style={{ ...style }}
            onClick={onClick}
        />
    );
}


export default ProductNextArrow
