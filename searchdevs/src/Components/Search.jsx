import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const Search = ({ onChange , value, onEnter, onSearch, placeholder, width, height,border}) => {

  /* const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        onEnter();
    }
}; */
  return (
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': {
        m: 1,
        width: width,
        '& input': {
          height: height,
          '&:hover': {
            borderColor: border,
          },
          '&:focus': {
            borderColor: border,  // Altere para a cor desejada quando o input estiver selecionado
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: border,  // ou a cor padrão desejada
        },
      },
    }}
    noValidate
    autoComplete="off"
  >
    <div>
      <TextField 
        id="outlined-search" 
        label="Search" 
        type="search"
        value={value}
        onChange={onChange}
        // onKeyPress={onEnter}
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  </Box>
  );
}

export default Search;