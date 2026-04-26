import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const BigCircularProgress = ({ value, label }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 75,
        height: 75,
      }}
    >
      <CircularProgress
        variant="determinate"
        value={value}
        size={50}
        thickness={4}
        color="primary"
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" component="div" color="text.secondary">
          {`${value}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default BigCircularProgress;
