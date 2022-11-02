import React from 'react';
import {Stack, TextField} from "@mui/material";
import {DateTimePicker} from "@mui/x-date-pickers";
import {useState} from "react";
import {getYear} from "date-fns";

export const DateTimePickerMui = (props) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const maxYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    props.onChange(selectedDate);

    const handleDateTimeChange = (newDateTime) => {
        setSelectedDate(newDateTime);
        props.onChange(newDateTime);

    }
    console.log({selectedDate});

    return (
        <Stack>
            <DateTimePicker label='Date-time picker'
                            minDate={new Date()}
                            maxDate={maxYear}
                            renderInput={(params) => <TextField {...params} />} value={selectedDate}
                            onChange={handleDateTimeChange}/>
        </Stack>
    )
}