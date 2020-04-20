import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {sendAjax} from './index';


const yayToast = (msg) => {
    toast.success(msg, {
        position: "top-center",
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
  },[]);  
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
                <div className="container-fluid"><a className="navbar-brand" href="#"><i className="fa fa-globe"></i>&nbsp;Contract Solutions</a><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                    <div
                        className="collapse navbar-collapse" id="navcol-1">
                        <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item" role="presentation"><a id="sendNav" className={`nav-link text-white ${props.activePage === 'send' ? "activePage" : ""}`}  href="#"><i className="fa fa-home"></i>&nbsp;Send</a></li>
                            <li className="nav-item" role="presentation"><a className="nav-link text-white" href="#"><i className="fa fa-wpexplorer"></i>&nbsp;Preview</a></li>
                            <li className="nav-item" role="presentation"><a className="nav-link text-white" href="#"><i className="fa fa-star-o"></i>&nbsp;Semesters</a></li>
                            <li className="nav-item" role="presentation"><a id = "facultyNav" className={`nav-link text-white ${props.activePage === 'faculty' ? "activePage" : ""}`} href="#"><i className="fa fa-user-circle-o"></i>&nbsp;Faculty</a></li>
                            <li className="nav-item" role="presentation"><a id = "profileNav" className={`nav-link text-white ${props.activePage === 'profile' ? "activePage" : ""}`} href="#"><i className="icon ion-person"></i>&nbsp;Your Account</a></li>
                            <li className="nav-item" role="presentation"><a className="nav-link text-white" href="/logout"><i className="icon ion-log-out"></i>&nbsp;Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
};

export const SendComponent = (props) => {
    return (
        <div>
            <section id="contact" className="sendStyles">
        <div className="container">
            <form id="contactForm" action="javascript:void();" method="post">
                <div className="form-row sendMargin">
                    <div className="col-md-6 sendPadding">
                        <fieldset></fieldset>
                        <legend className="pbFt"><i className="fa fa-info"></i>&nbsp;Options</legend>
                        <p></p>
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td><i className="fa fa-check-circle"></i></td>
                                        <td>
                                            <div className="dropdown"><button className="btn btn-primary dropdown-toggle sendDropdown" data-toggle="dropdown" aria-expanded="false" type="button" >Select a term</button>
                                                <div className="dropdown-menu" role="menu"><a className="dropdown-item" role="presentation" href="#">First Item</a><a className="dropdown-item" role="presentation" href="#">Second Item</a><a className="dropdown-item" role="presentation" href="#">Third Item</a></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><i className="icon ion-ios-people"></i></td>
                                        <td>
                                            <div className="dropdown"><button className="btn btn-primary dropdown-toggle sendDropdown" data-toggle="dropdown" aria-expanded="false" type="button" >Select Faculty</button>
                                                <div className="dropdown-menu"
                                                    role="menu"><a className="dropdown-item" role="presentation" href="#">First Item</a><a className="dropdown-item" role="presentation" href="#">Second Item</a><a className="dropdown-item" role="presentation" href="#">Third Item</a></div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr></tr>
                                    <tr>
                                        <td><i className="icon ion-ios-email"></i></td>
                                        <td className="border emailBorder"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><button className="btn btn-primary active btn-block downloadButton" type="submit">Download Selected<i className="fa fa-chevron-circle-right mlFive" ></i></button>
                        <button className="btn btn-primary active btn-block downloadButton" type="submit">Download All<i className="fa fa-chevron-circle-right mlFive" ></i></button></div>
                    <div className="col-12 col-md-6 sendPadding" id="message" >
                        <fieldset>
                            <legend><i className="fa fa-envelope"></i>&nbsp;Email</legend>
                        </fieldset>
                        <div className="form-group has-feedback">
                            <label for="from_name">Subject</label>
                            <input className="form-control" type="text" id="from_name"  name="from_name" placeholder="Voornaam en Achternaam" />
                        </div>
                        <div className="form-group"><label for="comments">Message</label>
                            <textarea className="form-control" id="comments" name="Comments" placeholder="Type uw bericht hier.." rows="5">
                                </textarea>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary active btn-block buttonBackground" type="submit">Email Selected
                            <i className="fa fa-chevron-circle-right mlFive">
                                </i>
                            </button>
                            <button className="btn btn-primary active btn-block buttonBackground"  type="submit">Email All
                            <i className="fa fa-chevron-circle-right mlFive" ></i>
                            </button>
                        </div>
                        
                    </div>
                </div>
            </form>
        </div>
    </section>
    </div>
    );
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