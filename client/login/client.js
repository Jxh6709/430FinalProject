const handleLogin = (e) => {
    e.preventDefault();

    console.log($("input[name=_csrf]").val());

    sendAjax('POST',$("#loginForm").attr("action"), $("#loginForm").serialize(),redirect);

    return false;
};

const LoginWindow = (props) => {
    return (
        <div>
            <div className="login-dark">
            <form method="post" id="loginForm" name="loginForm" action="/login" method="POST" onSubmit={handleLogin}>
                    <div className="illustration"><i className = "icon ion-ios-locked-outline"></i></div>
                    <div className="form-group"><input className = "form-control"  type="text" name="username" placeholder="Username"/></div>
                    <div className="form-group"><input className = "form-control" type="password" name="pass" placeholder="Password" /></div>
                    <input type="hidden" name="_csrf" value={props.csrf} />
                    <div className="form-group"><button className = "btn btn-primary btn-block" type="submit">Log In</button></div>
                    <a className="forgot" href="#">Forgot your email or password?</a>
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