import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function DeviceList(props) {
  const [deviceName, setdeviceName] = React.useState(props.list[0].label);
  return (
    <>
      {console.log(props.label)}
      <FormControl variant="standard" fullWidth size="small">
        <InputLabel id="demo-simple-select-standard-label">
          {props.label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={deviceName}
          onChange={(e) => {
            setdeviceName(e.target.value);
          }}
        >
          {props.list.map((make, index) => (
            <MenuItem key={index} value={make.id}>
              {make.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
