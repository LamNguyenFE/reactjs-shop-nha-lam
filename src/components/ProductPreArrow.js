import React from 'react'

function ProductPreArrow(props) {
    //console.log(props)
    const { className, style, onClick } = props;
    return (
        <div
            className={className + " product-arrow product-pre-arrow"}
            style={{ ...style }}
            onClick={onClick}
        />
    );
}


export default ProductPreArrow
