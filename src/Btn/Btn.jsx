import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const buttonStyle = {
    //Паддинги:
    pt: '5px', 
    pb: '5px', 
    pl: '15px', 
    pr: '15px', 

    fontSize: '12px',     
    fontFamily: '"Roboto", sans-serif',
    fontWeight: 400,
    fontStyle: 'normal',    
    lineHeight: '14px', 

    textTransform: 'inherit', //'lowercase',

    borderRadius: '5px'
};

const buttonTheme = {
    palette: {
        action: {
            disabledBackground: '#AFAFAF',
            disabled: '#FFFFFF'
        },

        primary: { 
            main: '#4B51EF',
            contrastText: '#FFFFFF'
        }, 

        secondary: {
            main: '#52CF4F',
            contrastText: '#FFFFFF'
        },
    }
};

export default function Btn({colorFromMuiPalette, muiTheme, children, ...otherProps}) {
    let color = colorFromMuiPalette || "primary";
    let theme = muiTheme || buttonTheme;
    return (
        <ThemeProvider theme={createTheme(theme)}>
            <Button sx={buttonStyle} disableElevation={true} variant="contained" color={color} {...otherProps}>{children}</Button>
        </ThemeProvider>
    );
}