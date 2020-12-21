import React from 'react';
import notfound from '../images/notfound.gif'

const NotFound = ()=>{
    return (
        <div>
            <h1>Page not found</h1>
            <img src={notfound} alt="Cyclist not found"/>
        </div>
    )
}

export default NotFound;