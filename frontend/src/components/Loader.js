import React from 'react';
import { spinner } from 'react-bootstrap'

const Loader = () => {
    return <spinner
        animation="border"
        role="status"
        style={{
            width: '100px',
            height: '100px',
            margin: 'auto',
            display: 'block'
        }}>
        <span class="sr-only">Loading...</span>
    </spinner>;
};

export default Loader;
