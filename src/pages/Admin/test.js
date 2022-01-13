/* eslint-disable no-use-before-define */

import React, { useEffect, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import routes from '../../routes';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags() {

    const [rest, setRest] = useState([])

    useEffect(() => {
        let arr = [];
        routes.map((el) => {
            if (el.type == 'multi') {
                el.child.map((item) => {
                    arr.push({
                        name: item.name
                    })
                })
            } else {
                arr.push({
                    name: el.name
                })
            }
        })
        console.log("---arr", arr)
        setRest(arr)
    }, [])
    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={rest}
            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            renderOption={(option, { selected }) => (
                <React.Fragment>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.name}

                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />isWrite
                </React.Fragment>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Checkboxes" placeholder="Favorites" />
            )}
        />
    );
}