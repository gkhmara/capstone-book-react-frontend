import React from "react";
import Box from '@mui/material/Box';

function Header() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
            '& > *': {
            m: 1,
        },
        }}
      >
        <h1>Welcome to your Book List!</h1>
      </Box>
    </>
  );
}

export default Header;