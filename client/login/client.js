import React from 'react';
import ReactDOM from 'react-dom'
import {sendAjax} from '../app/index'
import {toast} from 'react-toastify';

const redirect = (response) => {
    window.location = response.redirect;
};

const handleLogin = (e) => {
    e.preventDefault();

    sendAjax('POST',$("#loginForm").attr("action"), $("#loginForm").serialize(),redirect);

    return false;
};

const handlePasswordChange = (e) => {
    e.preventDefault();

    sendAjax('POST',$("#pwdForm").attr("action"), $("#pwdForm").serialize(),redirect);

    return false;
};

const LoginWindow = (props) => {
    const showPwdChange = () => {
        createChangePasswordWindow(props.csrf);
    }

    return (
        <div>
            <div className="login-dark">
            <form method="post" id="loginForm" name="loginForm" action="/login" method="POST" onSubmit={handleLogin}>
                    <div className="illustration"><i className = "icon ion-ios-locked-outline"></i></div>
                    <div className="form-group"><input className = "form-control"  type="text" name="username" placeholder="Username"/></div>
                    <div className="form-group"><input className = "form-control" type="password" name="pass" placeholder="Password" /></div>
                    <input type="hidden" name="_csrf" value={props.csrf} />
                    <div className="form-group"><button className = "btn btn-primary btn-block" type="submit">Log In</button></div>
                    <a onClick={showPwdChange} className="forgot" href="#">Forgot your email or password?</a>
                </form>
            </div>     
        </div>
    );
};

const PasswordChangeWindow = (props) => {
    toast.configure();
    const returnToLogin = () => {
        createLoginWindow(props.csrf);
    }
    return (
        <div>
            <div className="login-dark">
                <form id="pwdForm" name="pwdForm" action='/changePassword' method='POST' onSubmit={handlePasswordChange}>
                    <div className="illustration"><i className = "icon ion-ios-locked-outline"></i></div>
                    <div className="form-group"><input className = "form-control"  type="text" name="username" placeholder="Username"/></div>
                    <div className="form-group"><input className = "form-control" type="password" name="oldpass" placeholder="Old Password" /></div>
                    <div className="form-group"><input className = "form-control" type="password" name="newpass1" placeholder="New Password" /></div>
                    <div className="form-group"><input className = "form-control" type="password" name="newpass2" placeholder="Confirm New Password" /></div>
                    <input type="hidden" name="_csrf" value={props.csrf} />
                    <div className="form-group"><button className = "btn btn-primary btn-block" type="submit">Submit</button></div>
                    <a onClick={returnToLogin} id="returnToLogin" className="forgot" href="#">Return To Login</a>
                </form>
            </div>     
        </div>
    );
};

const createLoginWindow = (csrf) => {
    console.log(csrf);
    ReactDOM.render(
        <LoginWindow csrf={csrf}/>,
        document.querySelector('#content')
    );
};

const createChangePasswordWindow = (csrf) => {
    console.log(csrf);
    ReactDOM.render(
        <PasswordChangeWindow csrf={csrf}/>,
        document.querySelector('#content')
    );
};

const setup = (csrf) => {
    createLoginWindow(csrf); //default
};

const getToken = () => {
    sendAjax('GET','/getToken',null, (res) => {
        setup(res.csrfToken);
    });
};


//let's go
$(document).ready(() => {
    getToken();
});