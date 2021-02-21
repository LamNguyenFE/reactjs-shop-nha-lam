import React from 'react'

function Hover({ onHover, children }) {
    return (
        <div className="hover">
            <div className="hover__no-hover">{children}</div>
            <div className="hover__hover">{onHover}</div>
        </div>
    )
}

export default Hover

// Usage

// Then use it like this:

//     <Hover onHover={<div> Show this on hover </div>}>
//         <div> Show on no hover </div>
//     </Hover>
