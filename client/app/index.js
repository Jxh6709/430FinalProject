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
      $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: (xhr, status, error) => {
            if (xhr.status === 200) {
                try {
                    const uriContent = `data:application/octet-stream;charset=utf-8;base64,${xhr.responseText.toString('base64')}`;
                    
                    const link = document.createElement('a');
                    link.setAttribute("href",URL.createObjectURL(new Blob([xhr.responseText], {
                        type: "application/octet-stream"
                        }))
                    );
                    link.setAttribute("download", "contracts.zip");
                    link.click();
                } catch (e) {
                    console.log('Could not download')
                }
            }else {
                try {
                    const messageObj = JSON.parse(xhr.responseText);
                    booToast(messageObj.error);
                }
                catch (e) {
                    //pass
                    console.log(e);           
                }
            }
           
        }
      });        
}

export const createProfileWindow = (csrf) => {
    sendAjax('GET','/getUserInfo',null, (res) => {
        //console.log(res);
        const user = (res.error || !res.username) ? null : res;
        ReactDOM.render(
            <ProfileComponent csrf={csrf} user={user}/>,
            document.querySelector('#content')
        );

    });
    createNavWindow(csrf, "profile");
    
};
export const createNavWindow = (csrf, activePage) => {
    ReactDOM.render(
        <NavComponent csrf={csrf} activePage={activePage}/>,
        document.querySelector('#navContainer')
    );
};

export const createSendWindow = (csrf) => {
    createNavWindow(csrf, "send");
    ReactDOM.render(
        <SendComponent csrf={csrf}/>,
        document.querySelector('#content')
    );
};

export const createFacultyWindow = (csrf) => {
    createNavWindow(csrf, "faculty");
    ReactDOM.render(
        <GenTable title ="All Faculty" csrf={csrf} getURL="/getFaculty" postURL="/addFaculty" putURL="/updateFaculty" deleteURL="deleteFaculty"/>,
        document.querySelector('#content')

    )
};

export const createPreviewWindow = (csrf) => {
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
    
    createProfileWindow(csrf); //default

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

};

const getToken = () => {
    sendAjax('GET','/getToken',null, (res) => {
        setup(res.csrfToken);
    });
};

window.onload = () => {
    getToken();
}