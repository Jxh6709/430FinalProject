import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {sendAjax} from './index';
import TelegramIcon from '@material-ui/icons/Telegram';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SchoolIcon from '@material-ui/icons/School';
import AssignmentIcon from '@material-ui/icons/Assignment';


export const yayToast = (msg) => {
    toast.success(msg, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    }); 
};

export const GenTable = (props) => { 
  toast.configure()

  useEffect(()=> {
    axios.get(props.getURL)
        .then(res => {
        const persons = res.data.data;
        const colNames = res.data.cols;

        setState({columns: colNames, data: persons}); 
    });
  },[props.getURL]);  
  //the pieces of our table
  const [state, setState] = React.useState({
    columns: [
    ],
    data: [
    ]
  });

  return (
      <div>
        <MaterialTable
      title={props.title}
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                //make the call
                sendAjax('POST',props.postURL,{newData,_csrf: props.csrf}, (res) => {
                    if (res) {
                        //yayToast(`User ${newData.username} has been created!`); 
                        yayToast('Successful creation');
                    }
                });
                //locally push
                data.push(newData);
                return { ...prevState, data};
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                    //up up and away
                    sendAjax('PUT',props.putURL,{newData,_csrf: props.csrf}, (res) => {
                        //yayToast(`User ${newData.username} has been updated!`);
                        yayToast('Successful Update');
                    }); 
                    //replace locally
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                  //out with the old
                sendAjax('DELETE',props.deleteURL,{oldData,_csrf: props.csrf}, (res) => {
                    //bye bye
                    if (res) {
                        //yayToast(`User ${oldData.username} has been deleted!`); 
                        yayToast('Successful Delete');
                    }
                }); 
                //remove from table
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
    <ToastContainer />
      </div> 
  );
}



export const ProfileComponent = (props) => {
    const {firstName,lastName, email} = props.user; 
    const [values, setValues] = React.useState({
        firstName, lastName, email
    });
 
    const handleChange = (e) => {
        setValues({...values,[e.target.name]:e.target.value});
    }
    const reset = (e) => {
        e.preventDefault();
        setValues({firstName, lastName, email})
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        const newData = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email
        };
        console.log(newData);
        sendAjax('PUT','/updateUser',{newData,_csrf:props.csrf},() => {
            yayToast(`${newData.firstName} ${newData.lastName} has been updated`);
        });
    }
    return (
        <div>
            <div className="container profile profile-view" id="profile">
                <form>
                    <div className="form-row profile-row">
                        <div className="col-md-4 relative">
                            <div className="avatar">
                                <div className="avatar-bg center">
                                </div>
                            </div>
                            <input type="file" className="form-control" name="avatar-file"/>
                        </div>
                        <div className="col-md-8">
                            
                            <hr/>
                            <div className="form-row">
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group"><label>Firstname </label><input className="form-control" type="text" name="firstName" value={values.firstName} onChange={handleChange} /></div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group"><label>Lastname </label><input className="form-control" type="text" name="lastName" value={values.lastName} onChange={handleChange}/></div>
                                </div>
                            </div>
                            <div className="form-group"><label>Email </label><input className="form-control" type="email"  name="email" value={values.email} onChange={handleChange}/></div>
                            {/* <div className="form-row">
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group"><label>Password </label><input className="form-control" type="password" name="password" autocomplete="off" required=""/></div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group"><label>Confirm Password</label><input className="form-control" type="password" name="confirmpass" autocomplete="off" required=""/></div>
                                </div>
                            </div> */}
                            <hr/>
                            <div className="form-row">
                                <div className="col-md-12 content-right"><button className="btn btn-primary form-btn" onClick={handleUpdate}>SAVE </button><button className="btn btn-info form-btn" onClick={reset} >UNDO </button></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div> 
            <GenTable title ="Other Users" csrf={props.csrf} getURL="/getUsers" postURL="/addUser" putURL="/updateUser" deleteURL="deleteUser"/>
            
        </div>
    )
};


export const NavComponent = (props) => {
    return (
        <div>
            <nav className="navbar navbar-light navbar-expand-md sticky-top navigation-clean-button navStyles">
                <div className="container-fluid"><a className="navbar-brand" href="#"> <AssignmentIcon /> &nbsp;Contract Solutions</a><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                    <div
                        className="collapse navbar-collapse" id="navcol-1">
                        <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item" role="presentation"><a id="sendNav" className={`nav-link text-white ${props.activePage === 'send' ? "activePage" : ""}`}  href="#"> <TelegramIcon /> &nbsp;Send</a></li>
                            <li className="nav-item" role="presentation"><a id="previewNav" className={`nav-link text-white ${props.activePage === 'preview' ? "activePage" : ""}`} href="#"> <FindInPageIcon /> &nbsp;Preview</a></li>
                            <li className="nav-item" role="presentation"><a id="courseNav"  className={`nav-link text-white ${props.activePage === 'courses' ? "activePage" : ""}`} href="#"> <SchoolIcon /> &nbsp;Semesters</a></li>
                            <li className="nav-item" role="presentation"><a id = "facultyNav" className={`nav-link text-white ${props.activePage === 'faculty' ? "activePage" : ""}`} href="#"> <SupervisorAccountIcon /> &nbsp;Faculty</a></li>
                            <li className="nav-item" role="presentation"><a id = "profileNav" className={`nav-link text-white ${props.activePage === 'profile' ? "activePage" : ""}`} href="#"> <AccountBoxIcon /> &nbsp;Your Account</a></li>
                            <li className="nav-item" role="presentation"><a className="nav-link text-white" href="/logout"> <ExitToAppIcon /> &nbsp;Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
};


/**
 * const handleChange = (e, index) => {
    setValues([
      ...values.slice(0, index),
      { ...values[index], [e.target.name]: e.target.value },
      ...values.slice(index + 1),
    ])
  }
  values.map((node, index) => (
{values ? (
          values.map((node, index) => (<TextField
                      type="text"
                      name="medicationName"
                      label="Medication Name"
                      variant="outlined"
                      fullWidth
                      value={node.medicationName}
                      index={index}
                      onChange={(e) => handleChange(e, index)}
                      margin="normal"
                      required
                    />))
        ) : (
          <Typography variant="h3">
            We do not have any medications listed for you.
          </Typography>
        )}

 */