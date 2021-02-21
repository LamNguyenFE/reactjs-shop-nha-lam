import React from 'react'
import Menu from './Menu'

function Layout(props) {
    const { children, page } = props
    return (
        <>
            <Menu show={true} />
            <div className={`${page}-page`}>
                <div className="container">
                    {children}
                </div>
            </div>

        </>
    )
}

export default Layout
