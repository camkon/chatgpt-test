import { Box, Paper, styled } from "@mui/material";
import axios from "axios";
import { MuiChipsInput } from "mui-chips-input";
import { api } from "../../core/api";
import { useDispatch } from "react-redux";
import { filesAction } from "../../store/files";

const SearchBox = styled(Paper)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    height: "3rem",
    padding: "0 0rem",
    margin: "0 auto 1rem auto",
    boxSizing: "border-box",
    background: '#40414f',
    color: '#fff !important',
}));


const FileSearch = ({ query, setQuery }) => {

    const dispatch = useDispatch()

    const handleSearchFiles = async (search_text, page) => {
		const data = JSON.stringify({
			search_text: search_text,
			page: page
		})

        axios.post(api.docs_list, data, {headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'X-API-Key': '5b8e7e84-7011-4c47-a5f2-d02ab153de29'}}).then(res => {
			if(res.status === 200) {
                dispatch(filesAction.setList(res?.data?.fileslist))
			}
		})
    }

    const keyDownHandler = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearchFiles(e.target.value,0);
        }else if (e.key === "Backspace" && query?.length === 1) {
            handleSearchFiles('',0)
        }
    };

    return (
        <SearchBox elevation={1} sx={{width: {xs: '95%', lg: '70%'}}}>
            <MuiChipsInput
                placeholder="Search"
                fullWidth
                onChange={setQuery}
                value={query}
                onKeyDown={keyDownHandler}
                InputProps={{endAdornment: ''}}
                sx={{
                    "&.MuiFormControl-root": {
                        ".MuiInputBase-input": {
                            color: '#fff'
                        },

                        //border
                        ".MuiInputBase-root": {
                            ".MuiOutlinedInput-notchedOutline": {
                                border: "none",
                                borderRadius: "0.25rem",
                            },
                        },
                        //on hover
                        ".MuiInputBase-root:hover": {
                            ".MuiOutlinedInput-notchedOutline": {
                                border: "none",
                            },
                        },

                        //on focus
                        ".MuiInputBase-root.Mui-focused": {
                            ".MuiOutlinedInput-notchedOutline": {
                                border: "none",
                            },
                        },
                        ".MuiAutocomplete-endAdornment": {
                            // display: "none",
                        },
                        ".MuiChip-root": {
                            color: '#ddd'
                        }
                    },
                }}
            />
        </SearchBox>
    );
};

export default FileSearch