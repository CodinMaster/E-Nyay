import React, { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import { Button, Container, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import socket from "../functionalities/socket";
import { useNavigate } from "@reach/router";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const options = ["judge", "lawyer", "party"];

export default function Entry() {
  const navigate = useNavigate();
  const classes = useStyles();

  const [selection, updateSelection] = useState(options[0]);
  const [room, updateRoom] = useState("");
  const [visible, visibility] = useState(false);
  const [url, updateUrl] = useState("");

  const handleChange = (event) => {
    updateSelection(event.target.value);
  };

  const enterRoom = (e) => {
    console.log(room);
    socket.emit("joinRoom", room);
    visibility(true);
  };
  const onSelect = (e) => {
    console.log(selection, room, url);
    socket.emit(selection, { position: selection, room, url });
    navigate("/call", { state: { selection, room, url } });
  };

  return (
    <div
      className="wrapperBack"
      style={{
        backgroundImage: "url(./v.jpg)",
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <Container maxWidth="sm">
        {!visible && (
          <div>
            <div>
              <TextField
                id="outlined-basic"
                label="Room Id"
                variant="outlined"
                onChange={(e) => updateRoom(e.target.value)}
              />
            </div>
            <Button variant="contained" color="primary" onClick={enterRoom}>
              Enter
            </Button>
          </div>
        )}
        {visible && (
          <div>
            <div>What are You?</div>
            <FormControl className={classes.formControl}>
              <Select
                value={selection}
                onChange={handleChange}
                displayEmpty
                className={classes.selectEmpty}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="" disabled>
                  Role
                </MenuItem>
                <MenuItem value={"judge"}>Judge</MenuItem>
                <MenuItem value={"lawyer"}>Lawyer</MenuItem>
                <MenuItem value={"party"}>Party</MenuItem>
              </Select>
              <FormHelperText>Select Your Role</FormHelperText>
            </FormControl>
            <div>
              <label>Enter Your Stream Playback Url</label>
              <TextField
                id="outlined-basic"
                label="Url"
                variant="outlined"
                onChange={(e) => updateUrl(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={onSelect}>
                Enter
              </Button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
