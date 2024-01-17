import React from 'react';

const SearchButton = ({ onClick, text }) => {
    return (
        <button className='searchbutton' onClick={onClick}>{text}</button>
    );
};

export default SearchButton;
