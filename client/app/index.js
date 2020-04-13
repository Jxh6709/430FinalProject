import {NavComponent, ProfileComponent, TestTable, SendComponent} from './components';
import ReactDOM from 'react-dom';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

export const sendAjax = (type, action, data, success) => {
    toast.configure();
    console.log (`${type} ${action} ${data} `);
      $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: (xhr, status, error) => {
          const messageObj = JSON.parse(xhr.responseText);
          toast.error(messageObj.error, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
            }); 
        }
      });        
}

const createProfileWindow = (csrf) => {
    sendAjax('GET','/getUserInfo',null, (res) => {
        //console.log(res);
        const user = (res.error || !res.username) ? null : res;
        // ReactDOM.render(
        //     <TestTable children={{render: 'div'}} />,
        //     document.querySelector('#test')
        // );
        ReactDOM.render(
            <ProfileComponent csrf={csrf} user={user}/>,
            document.querySelector('#content')
        );

    });
    createNavWindow(csrf, "profile");
    
};
const createNavWindow = (csrf, activePage) => {
    //setComponent(activePage, csrf);
    ReactDOM.render(
        <NavComponent csrf={csrf} activePage={activePage}/>,
        document.querySelector('#navContainer')
    );
};

const createSendWindow = (csrf) => {
    createNavWindow(csrf, "send");
    ReactDOM.render(
        <SendComponent csrf={csrf}/>,
        document.querySelector('#content')
    );
};

const setup = (csrf) => {

    //getting the active component which will tell us which component to load on init
    sendAjax('GET','/getComponent', null, (res) => {
        console.log(res);
        //default
        if (res.error) {
            createProfileWindow(csrf); //default
        }

        switch (res.activeComponent) {
            case 'send':
                createSendWindow(csrf);
                break;
            default:
                console.log('fault')
                createProfileWindow(csrf);
                break;
        }

            //set up the nav
        const sendButton = document.querySelector("#sendNav");
        const profileButton = document.querySelector("#profileNav"); 

        sendButton.addEventListener('click', (e) => {
            e.preventDefault();
            createSendWindow(csrf);
            return false;
        });
        profileButton.addEventListener('click', (e) => {
            e.preventDefault();
            createProfileWindow(csrf);
            return false;
        });
    });
};

const getToken = () => {
    sendAjax('GET','/getToken',null, (res) => {
        setup(res.csrfToken);
    });
};

const setComponent = (activePage, csrf) => {
    sendAjax('POST','/setComponent', {activeComponent: activePage, _csrf: csrf}, (res) => {});
}

window.onload = () => {
    getToken();
}