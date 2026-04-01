import React from 'react';
import i1 from "../assets/images/cat.png"

const Error = ({ error }) => (
    <main class="error-page">
    <div class="er">
    <div class="error">
        404
    </div>
    <div class="err">
        <img src={i1} alt="cat" />
        <h1 class="okak">ОКАК</h1>
    </div>
    </div>
</main>
);

export default Error;
