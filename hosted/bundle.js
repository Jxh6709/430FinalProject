"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ProfileComponent = function ProfileComponent(props) {
  var _props$user = props.user,
      firstName = _props$user.firstName,
      lastName = _props$user.lastName,
      email = _props$user.email;

  var _React$useState = React.useState({
    firstName: firstName,
    lastName: lastName,
    email: email
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      values = _React$useState2[0],
      setValues = _React$useState2[1];

  var handleChange = function handleChange(e) {
    setValues(_objectSpread({}, values, _defineProperty({}, e.target.name, e.target.value)));
  };

  var reset = function reset(e) {
    e.preventDefault();
    setValues({
      firstName: firstName,
      lastName: lastName,
      email: email
    });
  };

  return (
    /*#__PURE__*/
    React.createElement("div", null,
    /*#__PURE__*/
    React.createElement("div", {
      className: "container profile profile-view",
      id: "profile"
    },
    /*#__PURE__*/
    React.createElement("div", {
      className: "row"
    },
    /*#__PURE__*/
    React.createElement("div", {
      className: "col-md-12 alert-col relative"
    },
    /*#__PURE__*/
    React.createElement("div", {
      className: "alert alert-info absolue center",
      role: "alert"
    },
    /*#__PURE__*/
    React.createElement("button", {
      type: "button",
      className: "close",
      "data-dismiss": "alert",
      "aria-label": "Close"
    },
    /*#__PURE__*/
    React.createElement("span", {
      "aria-hidden": "true"
    }, "\xD7")),
    /*#__PURE__*/
    React.createElement("span", null, "Profile save with success")))),
    /*#__PURE__*/
    React.createElement("form", null,
    /*#__PURE__*/
    React.createElement("div", {
      className: "form-row profile-row"
    },
    /*#__PURE__*/
    React.createElement("div", {
      className: "col-md-4 relative"
    },
    /*#__PURE__*/
    React.createElement("div", {
      className: "avatar"
    },
    /*#__PURE__*/
    React.createElement("div", {
      className: "avatar-bg center"
    })),
    /*#__PURE__*/
    React.createElement("input", {
      type: "file",
      className: "form-control",
      name: "avatar-file"
    })),
    /*#__PURE__*/
    React.createElement("div", {
      className: "col-md-8"
    },
    /*#__PURE__*/
    React.createElement("h1", null, "Your Name Here"),
    /*#__PURE__*/
    React.createElement("hr", null),
    /*#__PURE__*/
    React.createElement("div", {
      className: "form-row"
    },
    /*#__PURE__*/
    React.createElement("div", {
      className: "col-sm-12 col-md-6"
    },
    /*#__PURE__*/
    React.createElement("div", {
      className: "form-group"
    },
    /*#__PURE__*/
    React.createElement("label", null, "Firstname "),
    /*#__PURE__*/
    React.createElement("input", {
      className: "form-control",
      type: "text",
      name: "firstName",
      value: values.firstName,
      onChange: handleChange
    }))),
    /*#__PURE__*/
    React.createElement("div", {
      className: "col-sm-12 col-md-6"
    },
    /*#__PURE__*/
    React.createElement("div", {
      className: "form-group"
    },
    /*#__PURE__*/
    React.createElement("label", null, "Lastname "),
    /*#__PURE__*/
    React.createElement("input", {
      className: "form-control",
      type: "text",
      name: "lastName",
      value: values.lastName,
      onChange: handleChange
    })))),
    /*#__PURE__*/
    React.createElement("div", {
      className: "form-group"
    },
    /*#__PURE__*/
    React.createElement("label", null, "Email "),
    /*#__PURE__*/
    React.createElement("input", {
      className: "form-control",
      type: "email",
      name: "email",
      value: values.email,
      onChange: handleChange
    })),
    /*#__PURE__*/
    React.createElement("hr", null),
    /*#__PURE__*/
    React.createElement("div", {
      className: "form-row"
    },
    /*#__PURE__*/
    React.createElement("div", {
      className: "col-md-12 content-right"
    },
    /*#__PURE__*/
    React.createElement("button", {
      className: "btn btn-primary form-btn",
      onClick: function onClick() {
        updateUser(user);
      }
    }, "SAVE "),
    /*#__PURE__*/
    React.createElement("button", {
      className: "btn btn-info form-btn",
      onClick: reset
    }, "UNDO "))))))),
    /*#__PURE__*/
    React.createElement("div", {
      className: "col-md-12 search-table-col mtFive"
    },
    /*#__PURE__*/
    React.createElement("button", {
      className: "btn btn-primary"
    }, "Import From Excel File"),
    /*#__PURE__*/
    React.createElement("div", {
      className: "table-responsive table-bordered table table-hover table-bordered results"
    },
    /*#__PURE__*/
    React.createElement("table", {
      className: "table table-bordered table-hover"
    },
    /*#__PURE__*/
    React.createElement("thead", {
      className: "bill-header cs"
    },
    /*#__PURE__*/
    React.createElement("tr", {
      className: "autoWidth"
    },
    /*#__PURE__*/
    React.createElement("th", {
      id: "trs-hd",
      className: "col-lg-2"
    }, "Username"),
    /*#__PURE__*/
    React.createElement("th", {
      id: "trs-hd",
      className: "col-lg-2"
    }, "Password"),
    /*#__PURE__*/
    React.createElement("th", {
      id: "trs-hd-5",
      className: "col-lg-2"
    }, "Name"),
    /*#__PURE__*/
    React.createElement("th", {
      id: "trs-hd-4",
      className: "col-lg-2"
    }, "Email"),
    /*#__PURE__*/
    React.createElement("th", {
      id: "trs-hd-15",
      className: "col-lg-1"
    }, "Action"))),
    /*#__PURE__*/
    React.createElement("tbody", null,
    /*#__PURE__*/
    React.createElement("tr", {
      className: "warning no-result"
    },
    /*#__PURE__*/
    React.createElement("td", {
      colSpan: "12"
    },
    /*#__PURE__*/
    React.createElement("i", {
      className: "fa fa-warning"
    }), "\xA0 No Result !!!")),
    /*#__PURE__*/
    React.createElement("tr", null,
    /*#__PURE__*/
    React.createElement("td", null, "Bootstrap Stuido"),
    /*#__PURE__*/
    React.createElement("td", null, "2014"),
    /*#__PURE__*/
    React.createElement("td", null, "2014"),
    /*#__PURE__*/
    React.createElement("td", null, "2014"),
    /*#__PURE__*/
    React.createElement("td", null,
    /*#__PURE__*/
    React.createElement("button", {
      className: "btn btn-success mlFive",
      type: "submit"
    },
    /*#__PURE__*/
    React.createElement("i", {
      className: "fa fa-check fsFifteen"
    })),
    /*#__PURE__*/
    React.createElement("button", {
      className: "btn btn-danger mlFive",
      type: "submit"
    },
    /*#__PURE__*/
    React.createElement("i", {
      className: "fa fa-trash fsFifteen"
    })))),
    /*#__PURE__*/
    React.createElement("tr", null,
    /*#__PURE__*/
    React.createElement("td", null,
    /*#__PURE__*/
    React.createElement("input", {
      type: "text"
    })),
    /*#__PURE__*/
    React.createElement("td", null,
    /*#__PURE__*/
    React.createElement("input", {
      type: "text"
    })),
    /*#__PURE__*/
    React.createElement("td", null,
    /*#__PURE__*/
    React.createElement("input", {
      type: "text"
    })),
    /*#__PURE__*/
    React.createElement("td", null,
    /*#__PURE__*/
    React.createElement("input", {
      type: "text"
    })),
    /*#__PURE__*/
    React.createElement("td", null,
    /*#__PURE__*/
    React.createElement("button", {
      className: "btn btn-success mlFive",
      type: "submit"
    },
    /*#__PURE__*/
    React.createElement("i", {
      className: "fa fa-check fsFifteen"
    })),
    /*#__PURE__*/
    React.createElement("button", {
      className: "btn btn-danger mlFive",
      type: "submit"
    },
    /*#__PURE__*/
    React.createElement("i", {
      className: "fa fa-trash fsFifteen"
    })))))))))
  );
};

var TestTable = function TestTable(props) {
  var _React$useState3 = React.useState({
    columns: [{
      title: 'Name',
      field: 'name'
    }, {
      title: 'Surname',
      field: 'surname'
    }, {
      title: 'Birth Year',
      field: 'birthYear',
      type: 'numeric'
    }, {
      title: 'Birth Place',
      field: 'birthCity',
      lookup: {
        34: 'İstanbul',
        63: 'Şanlıurfa'
      }
    }],
    data: [{
      name: 'Mehmet',
      surname: 'Baran',
      birthYear: 1987,
      birthCity: 63
    }, {
      name: 'Zerya Betül',
      surname: 'Baran',
      birthYear: 2017,
      birthCity: 34
    }]
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      state = _React$useState4[0],
      setState = _React$useState4[1];

  console.log(state);
  return (
    /*#__PURE__*/
    React.createElement("div", null,
    /*#__PURE__*/
    React.createElement("div", {
      style: {
        maxWidth: "100%"
      }
    },
    /*#__PURE__*/
    React.createElement(MaterialUI.Table, {
      columns: [{
        title: "Adı",
        field: "name"
      }, {
        title: "Soyadı",
        field: "surname"
      }, {
        title: "Doğum Yılı",
        field: "birthYear",
        type: "numeric"
      }, {
        title: "Doğum Yeri",
        field: "birthCity",
        lookup: {
          34: "İstanbul",
          63: "Şanlıurfa"
        }
      }],
      data: [{
        name: "Mehmet",
        surname: "Baran",
        birthYear: 1987,
        birthCity: 63
      }],
      title: "Demo Title"
    })))
  );
};

var NavComponent = function NavComponent(props) {
  return (
    /*#__PURE__*/
    React.createElement("div", null,
    /*#__PURE__*/
    React.createElement("nav", {
      className: "navbar navbar-light navbar-expand-md sticky-top navigation-clean-button navStyles"
    },
    /*#__PURE__*/
    React.createElement("div", {
      className: "container-fluid"
    },
    /*#__PURE__*/
    React.createElement("a", {
      className: "navbar-brand",
      href: "#"
    },
    /*#__PURE__*/
    React.createElement("i", {
      className: "fa fa-globe"
    }), "\xA0Contract Solutions"),
    /*#__PURE__*/
    React.createElement("button", {
      "data-toggle": "collapse",
      className: "navbar-toggler",
      "data-target": "#navcol-1"
    },
    /*#__PURE__*/
    React.createElement("span", {
      className: "sr-only"
    }, "Toggle navigation"),
    /*#__PURE__*/
    React.createElement("span", {
      className: "navbar-toggler-icon"
    })),
    /*#__PURE__*/
    React.createElement("div", {
      className: "collapse navbar-collapse",
      id: "navcol-1"
    },
    /*#__PURE__*/
    React.createElement("ul", {
      className: "nav navbar-nav ml-auto"
    },
    /*#__PURE__*/
    React.createElement("li", {
      className: "nav-item",
      role: "presentation"
    },
    /*#__PURE__*/
    React.createElement("a", {
      id: "sendNav",
      className: "nav-link text-white ".concat(props.activePage === 'send' ? "activePage" : ""),
      href: "#"
    },
    /*#__PURE__*/
    React.createElement("i", {
      className: "fa fa-home"
    }), "\xA0Send")),
    /*#__PURE__*/
    React.createElement("li", {
      className: "nav-item",
      role: "presentation"
    },
    /*#__PURE__*/
    React.createElement("a", {
      className: "nav-link text-white",
      href: "#"
    },
    /*#__PURE__*/
    React.createElement("i", {
      className: "fa fa-wpexplorer"
    }), "\xA0Preview")),
    /*#__PURE__*/
    React.createElement("li", {
      className: "nav-item",
      role: "presentation"
    },
    /*#__PURE__*/
    React.createElement("a", {
      className: "nav-link text-white",
      href: "#"
    },
    /*#__PURE__*/
    React.createElement("i", {
      className: "fa fa-star-o"
    }), "\xA0Semesters")),
    /*#__PURE__*/
    React.createElement("li", {
      className: "nav-item",
      role: "presentation"
    },
    /*#__PURE__*/
    React.createElement("a", {
      className: "nav-link text-white",
      href: "#"
    },
    /*#__PURE__*/
    React.createElement("i", {
      className: "fa fa-user-circle-o"
    }), "\xA0Faculty")),
    /*#__PURE__*/
    React.createElement("li", {
      className: "nav-item",
      role: "presentation"
    },
    /*#__PURE__*/
    React.createElement("a", {
      id: "profileNav",
      className: "nav-link text-white ".concat(props.activePage === 'profile' ? "activePage" : ""),
      href: "#"
    },
    /*#__PURE__*/
    React.createElement("i", {
      className: "icon ion-person"
    }), "\xA0Your Account")),
    /*#__PURE__*/
    React.createElement("li", {
      className: "nav-item",
      role: "presentation"
    },
    /*#__PURE__*/
    React.createElement("a", {
      className: "nav-link text-white",
      href: "/logout"
    },
    /*#__PURE__*/
    React.createElement("i", {
      className: "icon ion-log-out"
    }), "\xA0Logout")))))))
  );
};

var SendComponent = function SendComponent(props) {
  return (
    /*#__PURE__*/
    React.createElement("div", null,
    /*#__PURE__*/
    React.createElement("section", {
      id: "contact",
      className: "sendStyles"
    },
    /*#__PURE__*/
    React.createElement("div", {
      className: "container"
    },
    /*#__PURE__*/
    React.createElement("form", {
      id: "contactForm",
      action: "javascript:void();",
      method: "post"
    },
    /*#__PURE__*/
    React.createElement("div", {
      className: "form-row sendMargin"
    },
    /*#__PURE__*/
    React.createElement("div", {
      className: "col-md-6 sendPadding"
    },
    /*#__PURE__*/
    React.createElement("fieldset", null),
    /*#__PURE__*/
    React.createElement("legend", {
      className: "pbFt"
    },
    /*#__PURE__*/
    React.createElement("i", {
      className: "fa fa-info"
    }), "\xA0Options"),
    /*#__PURE__*/
    React.createElement("p", null),
    /*#__PURE__*/
    React.createElement("div", {
      className: "table-responsive"
    },
    /*#__PURE__*/
    React.createElement("table", {
      className: "table"
    },
    /*#__PURE__*/
    React.createElement("tbody", null,
    /*#__PURE__*/
    React.createElement("tr", null,
    /*#__PURE__*/
    React.createElement("td", null,
    /*#__PURE__*/
    React.createElement("i", {
      className: "fa fa-check-circle"
    })),
    /*#__PURE__*/
    React.createElement("td", null,
    /*#__PURE__*/
    React.createElement("div", {
      className: "dropdown"
    },
    /*#__PURE__*/
    React.createElement("button", {
      className: "btn btn-primary dropdown-toggle sendDropdown",
      "data-toggle": "dropdown",
      "aria-expanded": "false",
      type: "button"
    }, "Select a term"),
    /*#__PURE__*/
    React.createElement("div", {
      className: "dropdown-menu",
      role: "menu"
    },
    /*#__PURE__*/
    React.createElement("a", {
      className: "dropdown-item",
      role: "presentation",
      href: "#"
    }, "First Item"),
    /*#__PURE__*/
    React.createElement("a", {
      className: "dropdown-item",
      role: "presentation",
      href: "#"
    }, "Second Item"),
    /*#__PURE__*/
    React.createElement("a", {
      className: "dropdown-item",
      role: "presentation",
      href: "#"
    }, "Third Item"))))),
    /*#__PURE__*/
    React.createElement("tr", null,
    /*#__PURE__*/
    React.createElement("td", null,
    /*#__PURE__*/
    React.createElement("i", {
      className: "icon ion-ios-people"
    })),
    /*#__PURE__*/
    React.createElement("td", null,
    /*#__PURE__*/
    React.createElement("div", {
      className: "dropdown"
    },
    /*#__PURE__*/
    React.createElement("button", {
      className: "btn btn-primary dropdown-toggle sendDropdown",
      "data-toggle": "dropdown",
      "aria-expanded": "false",
      type: "button"
    }, "Select Faculty"),
    /*#__PURE__*/
    React.createElement("div", {
      className: "dropdown-menu",
      role: "menu"
    },
    /*#__PURE__*/
    React.createElement("a", {
      className: "dropdown-item",
      role: "presentation",
      href: "#"
    }, "First Item"),
    /*#__PURE__*/
    React.createElement("a", {
      className: "dropdown-item",
      role: "presentation",
      href: "#"
    }, "Second Item"),
    /*#__PURE__*/
    React.createElement("a", {
      className: "dropdown-item",
      role: "presentation",
      href: "#"
    }, "Third Item"))))),
    /*#__PURE__*/
    React.createElement("tr", null),
    /*#__PURE__*/
    React.createElement("tr", null,
    /*#__PURE__*/
    React.createElement("td", null,
    /*#__PURE__*/
    React.createElement("i", {
      className: "icon ion-ios-email"
    })),
    /*#__PURE__*/
    React.createElement("td", {
      className: "border emailBorder"
    }))))),
    /*#__PURE__*/
    React.createElement("button", {
      className: "btn btn-primary active btn-block downloadButton",
      type: "submit"
    }, "Download Selected",
    /*#__PURE__*/
    React.createElement("i", {
      className: "fa fa-chevron-circle-right mlFive"
    })),
    /*#__PURE__*/
    React.createElement("button", {
      className: "btn btn-primary active btn-block downloadButton",
      type: "submit"
    }, "Download All",
    /*#__PURE__*/
    React.createElement("i", {
      className: "fa fa-chevron-circle-right mlFive"
    }))),
    /*#__PURE__*/
    React.createElement("div", {
      className: "col-12 col-md-6 sendPadding",
      id: "message"
    },
    /*#__PURE__*/
    React.createElement("fieldset", null,
    /*#__PURE__*/
    React.createElement("legend", null,
    /*#__PURE__*/
    React.createElement("i", {
      className: "fa fa-envelope"
    }), "\xA0Email")),
    /*#__PURE__*/
    React.createElement("div", {
      className: "form-group has-feedback"
    },
    /*#__PURE__*/
    React.createElement("label", {
      "for": "from_name"
    }, "Subject"),
    /*#__PURE__*/
    React.createElement("input", {
      className: "form-control",
      type: "text",
      id: "from_name",
      name: "from_name",
      placeholder: "Voornaam en Achternaam"
    })),
    /*#__PURE__*/
    React.createElement("div", {
      className: "form-group"
    },
    /*#__PURE__*/
    React.createElement("label", {
      "for": "comments"
    }, "Message"),
    /*#__PURE__*/
    React.createElement("textarea", {
      className: "form-control",
      id: "comments",
      name: "Comments",
      placeholder: "Type uw bericht hier..",
      rows: "5"
    })),
    /*#__PURE__*/
    React.createElement("div", {
      className: "form-group"
    },
    /*#__PURE__*/
    React.createElement("button", {
      className: "btn btn-primary active btn-block buttonBackground",
      type: "submit"
    }, "Email Selected",
    /*#__PURE__*/
    React.createElement("i", {
      className: "fa fa-chevron-circle-right mlFive"
    })),
    /*#__PURE__*/
    React.createElement("button", {
      className: "btn btn-primary active btn-block buttonBackground",
      type: "submit"
    }, "Email All",
    /*#__PURE__*/
    React.createElement("i", {
      className: "fa fa-chevron-circle-right mlFive"
    })))))))))
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
"use strict";

var createProfileWindow = function createProfileWindow(csrf) {
  sendAjax('GET', '/getUserInfo', null, function (res) {
    //console.log(res);
    var user = res.error || !res.username ? null : res;
    ReactDOM.render(
    /*#__PURE__*/
    React.createElement(TestTable, {
      children: "null"
    }), document.querySelector('#test'));
    ReactDOM.render(
    /*#__PURE__*/
    React.createElement(ProfileComponent, {
      csrf: csrf,
      user: user
    }), document.querySelector('#content'));
  });
  createNavWindow(csrf, "profile");
};

var createNavWindow = function createNavWindow(csrf, activePage) {
  //setComponent(activePage, csrf);
  ReactDOM.render(
  /*#__PURE__*/
  React.createElement(NavComponent, {
    csrf: csrf,
    activePage: activePage
  }), document.querySelector('#navContainer'));
};

var createSendWindow = function createSendWindow(csrf) {
  createNavWindow(csrf, "send");
  ReactDOM.render(
  /*#__PURE__*/
  React.createElement(SendComponent, {
    csrf: csrf
  }), document.querySelector('#content'));
};

var setup = function setup(csrf) {
  //getting the active component which will tell us which component to load on init
  sendAjax('GET', '/getComponent', null, function (res) {
    console.log(res); //default

    if (res.error) {
      createProfileWindow(csrf); //default
    }

    switch (res.activeComponent) {
      case 'send':
        createSendWindow(csrf);
        break;

      default:
        console.log('fault');
        createProfileWindow(csrf);
        break;
    } //set up the nav


    var sendButton = document.querySelector("#sendNav");
    var profileButton = document.querySelector("#profileNav");
    sendButton.addEventListener('click', function (e) {
      e.preventDefault();
      createSendWindow(csrf);
      return false;
    });
    profileButton.addEventListener('click', function (e) {
      e.preventDefault();
      createProfileWindow(csrf);
      return false;
    });
  });
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (res) {
    setup(res.csrfToken);
  });
};

var setComponent = function setComponent(activePage, csrf) {
  sendAjax('POST', '/setComponent', {
    activeComponent: activePage,
    _csrf: csrf
  }, function (res) {});
};

window.onload = function () {
  getToken();
};
"use strict";

var updateUser = function updateUser(user) {
  console.log(user);
};
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
