import {NavComponent, ProfileComponent, GenTable} from './components';
import ReactDOM from 'react-dom';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { PreviewComponent } from './previewComponent';
import { SendComponent } from './sendComponents';

export const booToast = (msg) => {
    toast.error(msg, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
        }); 
}

export const sendAjax = (type, action, data, success) => {
    toast.configure();
    console.log (`${type} ${action} `);
    console.log(data);
      $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: (xhr, status, error) => {
          const messageObj = JSON.parse(xhr.responseText);
          booToast(messageObj.error);
          
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

const createFacultyWindow = (csrf) => {
    createNavWindow(csrf, "faculty");
    ReactDOM.render(
        <GenTable title ="All Faculty" csrf={csrf} getURL="/getFaculty" postURL="/addFaculty" putURL="/updateFaculty" deleteURL="deleteFaculty"/>,
        document.querySelector('#content')

    )
};

const createPreviewWindow = (csrf) => {
    createNavWindow(csrf, "preview");
    ReactDOM.render(
        <PreviewComponent csrf="csrf"/>,
        document.querySelector('#content')

    )
};

const createCoursesWindow = (csrf) => {
    createNavWindow(csrf, "courses");
    ReactDOM.render(
        <GenTable title ="View Courses" csrf={csrf} getURL="/getCourses" postURL="/addCourse" putURL="/updateCourse" deleteURL="/deleteCourse"/>,
        document.querySelector('#content')

    )
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
        const facultyButton = document.querySelector("#facultyNav"); 
        const courseButton = document.querySelector("#courseNav"); 
        const previewButton = document.querySelector("#previewNav"); 

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
        facultyButton.addEventListener('click', (e) => {
            e.preventDefault();
            createFacultyWindow(csrf);
            return false;
        });
        courseButton.addEventListener('click', (e) => {
            e.preventDefault();
            createCoursesWindow(csrf);
            return false;
        });
        previewButton.addEventListener('click', (e) => {
            e.preventDefault();
            createPreviewWindow(csrf);
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