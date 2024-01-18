import React from 'react';

const SearchButton = ({ onClick, text, style }) => {
    return (
        <button className='searchbutton' onClick={onClick} style={style}>{text}</button>
    );
};

export default SearchButton;
