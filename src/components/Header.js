import React from "react";
import Box from '@mui/material/Box';

function Header() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          fontSize: 60,
          color: '#0000FF',
          flexDirection: 'column',
          alignItems: 'center',
            '& > *': {
            m: 1,
        },
        }}
      >
        <h1>Book List</h1>
      </Box>
    </>
  );
}

export default Header;