import React, {useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import moment from 'moment';
import {momentDate, momentTime, PreviewComponent} from './previewComponent';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'; 
import axios from 'axios';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import jsonQuery from 'json-query';
import { yayToast } from './components';
import { booToast, sendAjax } from './index';
import { saveAs } from 'file-saver';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
    margin: 2,
    },
    noLabel: {
    marginTop: theme.spacing(3),
    },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

export const SendComponent = (props) => {
    useEffect(()=> {
        axios.get('/getFaculty')
            .then(res => {
            const persons = res.data.data;
            const colNames = res.data.cols;

            axios.get('/getTerms').then(res => {
                const terms = res.data.data;
                setState({terms: terms, columns: colNames, data: persons});
            });
        });
    },[]);  
    //the pieces of our table
    const [state, setState] = React.useState({
        columns: [
        ],
        data: [
        ],
        terms: [],
        firstPayDate: momentDate(new Date()),
        lastPayDate: momentDate(new Date()),
        dueDate: momentDate(new Date()),
        selectedTerm: "",
        selectedInstructors: "",
        subject: "",
        emailContent: ""
    });

    const facultyOptions = state.data.map((person) => {
        return (
        <MenuItem key={person._id} value={`${person.firstName} ${person.lastName}`}>{person.firstName} {person.lastName}</MenuItem>
        )
    });

    const termOptions = state.terms.map((term) => {
        return (
            <option key={term}>{term}</option>
        )
    });


    const handleDateChange = (name, event, value) => {
        setState({...state, [name]: value});
    };

    const handleChange = (e) => {
        setState({...state, [e.target.name]:e.target.value})
    }

    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        useState({...state, selectedInstructors: value});
    };

    const str2bytes  = (str) => {
        let bytes = new Uint8Array(str.length);
        for (let i=0; i<str.length; i++) {
            bytes[i] = str.charCodeAt(i);
        }
        return bytes;
    }

    const handleButtons = (name) => {
        let objToPost = {
            firstPayDate: state.firstPayDate || momentDate(new Date()),
            lastPayDate: state.lastPayDate || momentDate(new Date()),
            dueDate: state.dueDate || momentDate(new Date()),
            term: state.selectedTerm,
            _csrf: props.csrf
        }

        if (name.includes("email")) {
            objToPost['email'] = "true";
            objToPost['subject'] = state.subject,
            objToPost['emailContent'] = state.emailContent;
        }

        if (name.toLowerCase().includes('selected')) {
            let arrayOfIds = [];
            state.selectedInstructors.forEach(si => {
                const name = si.split(" ");
                const [fname, lname] = name;
                const facObj = {data: state.data};
                arrayOfIds.push(jsonQuery(`data[firstName=${fname}&lastName=${lname}]._id`
                , { data: facObj}).value);
            });
            objToPost['faculty'] = arrayOfIds.join('-');
        }
        sendAjax('POST', '/handleContracts', {data: objToPost, _csrf: props.csrf}, (res) => {
            try {
                saveAs(res.href,"contracts.zip");
                yayToast("Contracts Downloaded");
            } catch (e) {
                booToast("Error Downloading Contracts: Please try again later.")
                console.log('Could not download')
            }
        })
    }

    const classes = useStyles();
    return (
        <div>
            <section id="contact" className="sendStyles">
        <div className="container">
            <form id="contactForm"  method="post">
                <div className="form-row sendMargin">
                    <div className="col-md-6 sendPadding">
                        <legend>
                            <i className="fa fa-filter"></i>&nbsp;Options
                        </legend>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="">Select a Term</InputLabel>
                            <Select native onChange={handleChange} name="selectedTerm" value={state.selectedTerm}>
                            <option aria-label="None" value="" />
                                {termOptions}
                            </Select>
                        </FormControl>
                        <br/>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-native-simple">Select an Instructor</InputLabel>
                            <Select
                                multiple
                                value={state.selectedInstructors !== undefined ? state.selectedInstructors : []}
                                name="selectedInstructors"
                                onChange={handleChange}
                                input={<Input id="select-multiple-chip" />}
                                renderValue={(selected) => (
                                    <div className={classes.chips}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                    </div>
                                )}
                                MenuProps={MenuProps}
                                >
                                {facultyOptions}
                            </Select>
                        </FormControl>
                        <br/>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                className={classes.formControl}
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="fpd"
                                label="First Pay Date"
                                name="firstPayDate"
                                value={moment(state.firstPayDate)}
                                onChange={(e, value) => handleDateChange("firstPayDate",e, value)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <br/>
                            <KeyboardDatePicker
                                className={classes.formControl}
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="lpd"
                                label="Last Pay Date"
                                name="lastPayDate"
                                value={moment(state.lastPayDate)}
                                onChange={(e, value) => handleDateChange("lastPayDate",e, value)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <br/>
                            <KeyboardDatePicker
                                className={classes.formControl}
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="dd"
                                label="Due Date"
                                name="dueDate"
                                value={moment(state.dueDate)}
                                onChange={(e, value) => handleDateChange("dueDate",e, value)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <br/>
                        <ButtonGroup
                                orientation="vertical"
                                color="primary"
                                aria-label="vertical contained primary button group"
                                variant="contained"
                            >
                                <Button onClick={() => handleButtons("downloadSelected")} name="downloadSelected" disabled={state.selectedInstructors === undefined || state.selectedTerm === undefined || state.selectedInstructors === "" || state.selectedTerm === ""}>Download Selected</Button>
                                <Button onClick={() => handleButtons("downloadAll")} name="downloadAll" disabled={state.selectedTerm === undefined || state.selectedTerm === ""}>Download All</Button>
                            </ButtonGroup>
                        </div>
                    <div className="col-12 col-md-6 sendPadding" id="message" >
                        <fieldset className="emailPadding">
                            <legend><i className="fa fa-envelope"></i>&nbsp;Email</legend>
                        </fieldset>
                        <div className="form-group">
                            <TextField id="outlined-required"
                                        className="formWidth"
                                        label="Subject"
                                        name="subject"
                                        onChange={handleChange}
                                        placeholder="Enter Subject"
                                        variant="outlined"/>
                        </div>
                        <div className="form-group">
                            <TextField
                                id="outlined-multiline-static"
                                className="formWidth"
                                label="Content"
                                name="emailContent"
                                multiline
                                rows={6}
                                placeholder="Enter Content"
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </div>
                        <div className="form-group">
                            <ButtonGroup
                                orientation="vertical"
                                color="primary"
                                aria-label="vertical contained primary button group"
                                variant="contained"
                            >
                                <Button onClick={() => handleButtons("emailSelected")} name="emailSelected" disabled={state.selectedInstructors === undefined || state.selectedTerm === undefined || 
                                    state.selectedInstructors === "" || state.selectedTerm === "" || state.subject === undefined 
                                    || state.subject === "" || state.emailContent === undefined || state.emailContent === ""}>Email Selected</Button>
                                <Button onClick={() => handleButtons("emailAll")} name="emailAll" disabled={state.selectedTerm === undefined || state.selectedTerm === "" || state.subject === undefined 
                                    || state.subject === "" || state.emailContent === undefined || state.emailContent === ""}>Email All</Button>
                            </ButtonGroup>
                        </div>
                        
                    </div>
                </div>
            </form>
        </div>
    </section>
    </div>
    );
};
