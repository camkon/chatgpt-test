import { alpha, filledInputClasses, outlinedInputClasses, paperClasses } from "@mui/material";
import { blue, blueGrey, green, lightBlue, orange, red, deepPurple } from "@mui/material/colors";

const primary = {
    main: '#a50f63',
    light: blue[300],
    dark: blue[900],
}
// const primary = {
//     main: blue[700],
//     light: blue[300],
//     dark: blue[900],
// }
const error = {
    main: red[700],
    light: red[300],
    dark: red[900],
}

export const custom = {
    components: {
        // MuiButton: {
        //     styleOverrides: {
        //         root: {
        //             fontFamily: 'Josefin Sans',
        //             borderRadius: 0,
        //             padding: '0.75rem 1.5rem',
        //             fontSize: '0.9rem',
        //             textTransform: 'none'
        //         },
        //         outlined: {
        //             backgroundColor: 'transparent',
        //             border: '2px solid #fff',
        //             color: '#fff',
        //             '&:hover': {
        //                 border: '2px solid #fff',
        //                 backgroundColor: '#fff',
        //                 color: '#000'
        //             }
        //         },
        //         contained: {
        //             backgroundColor: '#a50f63',
        //             border: '2px solid #a50f63',
        //             color: '#fff',
        //             '&:hover': {
        //                 backgroundColor: '#fff',
        //                 color: '#a50f63'   
        //             }
        //         },
        //         standard: {
        //             padding: '0.75rem 3rem',
        //             backgroundColor: 'transparent',
        //             border: '2px solid #a50f63',
        //             transition: 'all 0.3s ease-in-out',
        //             '&:hover': {
        //                 border: '2px solid #a50f63',
        //                 backgroundColor: '#a50f63',
        //                 color: '#fff'
        //             }          
        //         }
        //     },
        // },
        // MuiContainedButton: {
        //     styleOverrides: {
        //         root: {
        //             borderRadius: 6,                   
        //             backgroundColor: 'red' 
        //         },
        //     },
        // },
        // MuiCard: {
        //     styleOverrides: {
        //         root: {
        //             borderRadius: 20,
        //             [`&.${paperClasses.elevation1}`]: {
        //                 boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)',
        //             },
        //         }
        //     }
        // },
        // MuiPaper: {
        //     styleOverrides: {
        //         root: {
        //             borderRadius: 8,
        //             [`&.${paperClasses.elevation1}`]: {
        //                 boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)',
        //             },
        //         }
        //     }
        // },
        // MuiOutlinedInput: {
        //     styleOverrides: {
        //         root: {
        //             borderRadius: 6,
        //             '&:hover': {
        //                 [`& .${outlinedInputClasses.notchedOutline}`]: {
        //                   borderColor: '#202123',
        //                 },
        //               },
        //             [`&.${outlinedInputClasses.focused}`]: {
        //                 backgroundColor: 'transparent',
        //                 [`& .${outlinedInputClasses.notchedOutline}`]: {
        //                     borderColor: '#202123',
        //                 },
        //             },
        //             [`&.${filledInputClasses.error}`]: {
        //                 [`& .${outlinedInputClasses.notchedOutline}`]: {
        //                     borderColor: error.main,
        //                 },
        //             },
        //             label: {
        //               color: red[500]
        //             }
        //         },
        //         notchedOutline: {
        //             borderWidth: '1.5px',
        //             borderColor: '#00000030',
        //             color: '#fff'
        //         }
        //     }
        // },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    color: '#eee',
                    '&:hover': {
                        [`& .${outlinedInputClasses.notchedOutline}`]: {
                          borderColor: '#202123',
                        },
                      },
                    [`&.${outlinedInputClasses.focused}`]: {
                        [`& .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: '#202123',
                        },
                        '& label': {
                            color: red[500]
                        }
                    },
                    [`&.${filledInputClasses.error}`]: {
                        [`& .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: error.main,
                        },
                    },
                },
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#ccc',
                    [`&.${outlinedInputClasses.focused}`]: {
                        color: '#ddd'
                    },
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    color: '#eee',
                    backgroundColor: '#2e2e38'
                }
            }
        }
    },
}