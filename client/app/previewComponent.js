import React, {useEffect} from 'react';
import axios from 'axios';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import jsonQuery from 'json-query';
import { toast } from 'react-toastify';

export const momentDate = (date) => {
    return moment(date).format("YYYY-MM-DD");
}

export const momentTime = (time) => {
    return moment(time).format("HH:mm");
}

export const ContractPreview = (props) => {
    return (
        <div>
            <p align="center">
            <strong><em> </em></strong>
            </p>
            <p align="center">
                <img
                    width="624"
                    height="159"
                    src="assets/img/header.png"
                />
            </p>
            <p>
                <em>{new Date().toISOString().split('T')[0]}</em>
            </p>
            <p>
                <em></em>
            </p>
            <p>
                <em>{props.firstName} {props.lastName}</em>
            </p>
            <p>
                <em>{props.street}</em>
            </p>
            <p>
                <em>{props.city_state_zip}</em>
                <em></em>
            </p>
            <p>
                <em></em>
            </p>
            <p>
                <em></em>
            </p>
            <p>
                <em>Dear {props.firstName}:</em>
            </p>
            <p>
                <em></em>
            </p>
            <p>
                I am pleased to offer you an appointment as Adjunct Faculty in the
                Department of Wellness Education, in the Division of Student Affairs at
                RIT.
            </p>
            <p>
                This appointment begins on {props.semester_start_date} and ends on
                {props.semester_end_date} and follows the approved academic calendar for the
                period of this appointment. Please note that this appointment is for these
                dates only.
            </p>
            <p>
                Please note:
                <em>
                    For RIT retirees returning to work. Under Federal law, if a retiree or
                    the retiree’s spouse/partner accepts a short-term position at RIT (such
                    as an adjunct assignment) after their retirement, their HRA funds
                    cannot be used for expenses incurred while they are employed.
                </em>
            </p>
            <p>
                Your salary for this appointment is $1500 and will be paid on the
                bi-weekly pay calendar beginning on {props.first_pay_date ? props.first_pay_date : moment(new Date()).format("YYYY-MM-DD")} and ending on
                {props.last_pay_date ? " " + props.last_pay_date : " " + moment(new Date()).format("YYYY-MM-DD")} Please refer to RIT payroll calendar on the RIT Payroll website&nbsp;
                <a href="https://www.rit.edu/fa/controller/payroll">
                    https://www.rit.edu/fa/controller/payroll
                </a>
                &nbsp;
                for more information on specific pay dates. Your assignment includes (list
                all courses and other duties):
            </p>
            <p>
                <strong><u>Course Assignments</u></strong>
            </p>
            <p>{props.courses}</p>
            <p>
                This offer is made in accordance with the university’s policies and
            procedures as set forth in the<em>Institute Policies and Procedures Manual</em> which can be found at    <a href="http://www.rit.edu/policies">www.rit.edu/policies</a>, and may
                only be accepted upon the execution of this letter. The provisions of all
                university policies and procedures, as they currently exist, are
                incorporated by reference in this offer letter. I urge you to take the time
                to read these policies as they will govern your rights and responsibilities
                as an employee of RIT. Please note that the university’s policies and
                procedures and its employee benefits will change over time; any such
                changes will automatically apply to you and your employment at RIT.
            Information about RIT benefits may be found at    <a href="http://www.rit.edu/HumanResources">www.rit.edu/HumanResources</a>.
            </p>
            <p>
                You will be required to participate in mandatory training sessions as
                required by applicable law or RIT policies and procedures. Please note that
                participation in these mandatory training sessions is an essential function
                of your job.
            </p>
            <p>
                Appointments are offered on an as needed basis and depend upon numerous
                factors, including but not limited to, sufficient course enrollment,
                continued availability of funding, and satisfactory performance. This
                appointment may be withdrawn at any time and you may be eligible to receive
                a prorated amount of the compensation stated in this offer letter. This
                prorated amount is intended to compensate you for work actually performed
                and shall be determined in the sole and exclusive discretion of RIT.
            </p>
            <p>
                Finally, the terms and conditions outlined in this letter are the only
                terms and conditions offered; no other representations are valid. The
                execution of this letter is contingent upon receiving formal notification
                of your understanding and acceptance of these terms and conditions. Nothing
                contained in this letter, nor any statements made by any RIT employee,
                shall create the expectation of future appointments.
            </p>
            <p>
                RIT’s policy E1.0 states that the annualized load for adjunct faculty may
                not exceed 50% of a full time load, this equates to the equivalent of 999
                work hours in the calendar year. Please note that one credit hour equals
                three work hours for this purpose. Please complete the information below
                and sign and return this offer letter to acknowledge you have read,
                understood and accept the terms and conditions of this offer and that you
                have not exceeded the equivalent of 999 work hours in the calendar year.
                Please return this to my office by {props.due_date ? " " + props.due_date : " " + moment(new Date()).format("YYYY-MM-DD")}.
            </p>
            <p>
                We look forward to working with you.
            </p>
            <p>
                Sincerely,
            </p>
            <table cellPadding="0" cellSpacing="0" align="left">
                <tbody>
                    <tr>
                        <td width="0" height="4">
                        </td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <td>
                            <img
                                width="183"
                                height="65"
                                src="assets/img/signature.jpg"
                                alt="MAS signature"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <br clear="ALL"/>
            <p>
                Michelle A. Schrouder
            </p>
            <p>
                Department Director
            </p>
            <p>
                {props.firstName} {props.lastName}:
            </p>
            <p>
                Please list all other RIT adjunct appointments below within this calendar
                year.
            </p>
            <table border="1" cellSpacing="0" cellPadding="0">
                <tbody>
                    <tr>
                        <td width="188" valign="top">
                            <p>
                                <strong>Department Name</strong>
                            </p>
                        </td>
                        <td width="280" valign="top">
                            <p>
                                <strong>Course Name or Description of Duties</strong>
                            </p>
                        </td>
                        <td width="156" valign="top">
                            <p>
                                <strong>Term (please check all that apply)</strong>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td width="188" valign="top">
                        </td>
                        <td width="280" valign="top">
                        </td>
                        <td width="156" valign="top">
                            <p>
                                ☐Fall ☐Spring
                            </p>
                            <p>
                                ☐Summer
                            </p>
                            <p>
                                ☐Other
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td width="188" valign="top">
                        </td>
                        <td width="280" valign="top">
                        </td>
                        <td width="156" valign="top">
                            <p>
                                ☐Fall ☐Spring
                            </p>
                            <p>
                                ☐Summer
                            </p>
                            <p>
                                ☐Other
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td width="188" valign="top">
                        </td>
                        <td width="280" valign="top">
                        </td>
                        <td width="156" valign="top">
                            <p>
                                ☐Fall ☐Spring
                            </p>
                            <p>
                                ☐Summer
                            </p>
                            <p>
                                ☐Other
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td width="188" valign="top">
                        </td>
                        <td width="280" valign="top">
                        </td>
                        <td width="156" valign="top">
                            <p>
                                ☐Fall ☐Spring
                            </p>
                            <p>
                                ☐Summer
                            </p>
                            <p>
                                ☐Other
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td width="188" valign="top">
                        </td>
                        <td width="280" valign="top">
                        </td>
                        <td width="156" valign="top">
                            <p>
                                ☐Fall ☐Spring
                            </p>
                            <p>
                                ☐Summer
                            </p>
                            <p>
                                ☐Other
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p>
                I ACCEPT THIS APPOINTMENT UNDER THE TERMS DESCRIBED ABOVE.
            </p>
            <p>
                By accepting this appointment I agree to abide by all university policies.
            </p>
            <p>
                ______________________________________________________________________________
                Signature of Acceptance Date
            </p>
            <p>
                cc. Department Director
            </p>
            <p>
                Human Resources
            </p>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));


export const PreviewComponent = (props) => {
    toast.configure();

    const classes = useStyles();

    const handleDateChange = (name, event, value) => {
        console.log(event);
        setState({...state, [name]: value});
    };

    const handleChange = (e) => {
        setState({...state, [e.target.name]:e.target.value})
    }

    const handleUpdateCourses = () => {
        //all this crap just to get the id
        const name = state.selectedInstructor.split(" ");
        const [fname, lname] = name;
        const facObj = {data: state.data}
        const personInfo = jsonQuery(`data[firstName=${fname}&lastName=${lname}]`, { data: facObj}).value;

        axios.get(`/getCoursesPerInstructorAndTerm?id=${personInfo._id}&term=${state.selectedTerm}`)
        .then(result => {
            const data = result.data.data;
            console.log(data);

            if (data.length !== 0) {
                let courseStr = "";
                data.forEach(element => {
                    courseStr += `${element.subject} \(${element.catalog}\) \- ${element.descr} ${element.section} 
                    ${element.classNbr} ${momentDate(element.startDate)} - ${momentDate(element.endDate)} ${momentTime(element.mtgStart)} - ${momentTime(element.mtgEnd)} \n`;
                });
    
                setState({...state, 
                    firstName: fname,
                    lastName: lname,
                    street: personInfo.street,
                    city: personInfo.city_state_zip,
                    semester_start_date: moment(data.startDate).format("YYYY-MM-DD"),
                    semester_end_date: moment(data.endDate).format("YYYY-MM-DD"),
                    courses: courseStr
                })
            } else {
                toast.error(`${state.selectedInstructor} is not scheduled to teach during term ${state.selectedTerm}`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                    });
                }
        });
    };

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
        firstPayDate: moment(new Date()).format("YYYY-MM-DD"),
        lastPayDate: moment(new Date()).format("YYYY-MM-DD"),
        dueDate: moment(new Date()).format("YYYY-MM-DD"),
        selectedTerm: "",
        selectedInstructor: "",
        firstName: "",
        lastName: "",
        street:"",
        city: "",
        semester_start_date: moment(new Date()).format("YYYY-MM-DD"),
        semester_end_date: moment(new Date()).format("YYYY-MM-DD"),
        courses: ""
    });

    const facultyOptions = state.data.map((person) => {
        return (
        <option key={person._id}>{person.firstName} {person.lastName}</option>
        )
    });

    const termOptions = state.terms.map((term) => {
        return (
            <option key={term}>{term}</option>
        )
    });


    return (
        <div className="mtFive">
        <div className="container">
            <div className="row">
                <div className="col-md-3 sendPadding" >
                    <legend className="pbFt">
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
                        <Select onChange={handleChange}
                        name = "selectedInstructor"
                        native
                        value={state.selectedInstructor}
                        >
                        <option aria-label="None" value="" />
                        {facultyOptions}
                        </Select>
                    </FormControl>
                    {(state.selectedInstructor === undefined || state.selectedTerm === undefined || state.selectedInstructor === "" || state.selectedTerm === "")  ? 
                        (<Button variant="contained" disabled={true}>Updated Courses</Button>)  
                     : (<Button variant="contained" onClick={handleUpdateCourses}>Update Courses</Button>)         
                    }
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

                </div>
                <div className="col-md-9">
                    <legend className="pbFt">
                        <i className="fa fa-info"></i>&nbsp;Preview</legend>
                        <ContractPreview first_pay_date={state.firstPayDate} last_pay_date={state.lastPayDate} due_date={state.dueDate}
                            firstName={state.firstName} lastName={state.lastName} street={state.street} city_state_zip={state.city} 
                            semester_start_date={state.semester_start_date} semester_end_date={state.semester_end_date} 
                            courses={state.courses}/>

                </div>
            </div>
        </div>
    </div>
    )
};
