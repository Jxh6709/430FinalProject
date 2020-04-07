"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var handleLogin = function handleLogin(e) {
  e.preventDefault();
  console.log($("input[name=_csrf]").val());
  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
  return false;
};

var LoginWindow = function LoginWindow(props) {
  var _React$createElement;

  return (
    /*#__PURE__*/
    React.createElement("div", null,
    /*#__PURE__*/
    React.createElement("div", {
      className: "login-dark"
    },
    /*#__PURE__*/
    React.createElement("form", (_React$createElement = {
      method: "post",
      id: "loginForm",
      name: "loginForm",
      action: "/login"
    }, _defineProperty(_React$createElement, "method", "POST"), _defineProperty(_React$createElement, "onSubmit", handleLogin), _React$createElement),
    /*#__PURE__*/
    React.createElement("div", {
      className: "illustration"
    },
    /*#__PURE__*/
    React.createElement("i", {
      className: "icon ion-ios-locked-outline"
    })),
    /*#__PURE__*/
    React.createElement("div", {
      className: "form-group"
    },
    /*#__PURE__*/
    React.createElement("input", {
      className: "form-control",
      type: "text",
      name: "username",
      placeholder: "Username"
    })),
    /*#__PURE__*/
    React.createElement("div", {
      className: "form-group"
    },
    /*#__PURE__*/
    React.createElement("input", {
      className: "form-control",
      type: "password",
      name: "pass",
      placeholder: "Password"
    })),
    /*#__PURE__*/
    React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }),
    /*#__PURE__*/
    React.createElement("div", {
      className: "form-group"
    },
    /*#__PURE__*/
    React.createElement("button", {
      className: "btn btn-primary btn-block",
      type: "submit"
    }, "Log In")),
    /*#__PURE__*/
    React.createElement("a", {
      className: "forgot",
      href: "#"
    }, "Forgot your email or password?"))))
  );
};

var createLoginWindow = function createLoginWindow(csrf) {
  console.log(csrf);
  ReactDOM.render(
  /*#__PURE__*/
  React.createElement(LoginWindow, {
    csrf: csrf
  }), document.querySelector('#content'));
};

var setup = function setup(csrf) {
  createLoginWindow(csrf); //default
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (res) {
    setup(res.csrfToken);
  });
}; //let's go


$(document).ready(function () {
  getToken();
});
"use strict";

var redirect = function redirect(response) {
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  console.log("".concat(type, " ").concat(action, " ").concat(data, " "));
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      console.log(messageObj.error);
    }
  });
};
