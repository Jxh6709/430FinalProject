const ProfileComponent = (props) => {
    return (
        <div>
            <div className="container profile profile-view" id="profile">
                <div className="row">
                    <div className="col-md-12 alert-col relative">
                        <div className="alert alert-info absolue center" role="alert"><button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><span>Profile save with success</span></div>
                    </div>
                </div>
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
                            <h1>Your Name Here</h1>
                            <hr/>
                            <div className="form-row">
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group"><label>Firstname </label><input className="form-control" type="text" name="firstname"/></div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group"><label>Lastname </label><input className="form-control" type="text" name="lastname"/></div>
                                </div>
                            </div>
                            <div className="form-group"><label>Email </label><input className="form-control" type="email" autocomplete="off" required="" name="email"/></div>
                            <div className="form-row">
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group"><label>Password </label><input className="form-control" type="password" name="password" autocomplete="off" required=""/></div>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <div className="form-group"><label>Confirm Password</label><input className="form-control" type="password" name="confirmpass" autocomplete="off" required=""/></div>
                                </div>
                            </div>
                            <hr/>
                            <div className="form-row">
                                <div className="col-md-12 content-right"><button className="btn btn-primary form-btn" type="submit">SAVE </button><button className="btn btn-danger form-btn" type="reset">CANCEL </button></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="col-md-12 search-table-col mtFive"><button className="btn btn-primary">Import From Excel File</button>
                <div className="table-responsive table-bordered table table-hover table-bordered results">
                    <table className="table table-bordered table-hover">
                        <thead className="bill-header cs">
                            <tr className="autoWidth">
                                <th id="trs-hd" className="col-lg-2">Username</th>
                                <th id="trs-hd" className="col-lg-2">Password</th>
                                <th id="trs-hd-5" className="col-lg-2">Name</th>
                                <th id="trs-hd-4" className="col-lg-2">Email</th>
                                <th id="trs-hd-15" className="col-lg-1">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="warning no-result">
                                <td colspan="12"><i className="fa fa-warning"></i>&nbsp; No Result !!!</td>
                            </tr>
                            <tr>
                                <td>Bootstrap Stuido</td>
                                <td>2014</td>
                                <td>2014</td>
                                <td>2014</td>
                                <td><button className="btn btn-success mlFive" type="submit"><i className="fa fa-check fsFifteen" ></i></button><button className="btn btn-danger mlFive" type="submit"><i className="fa fa-trash fsFifteen"></i></button></td>
                            </tr>
                            <tr>
                                <td><input type="text" /></td>
                                <td><input type="text" /></td>
                                <td><input type="text" /></td>
                                <td><input type="text" /></td>
                                <td><button className="btn btn-success mlFive"  type="submit"><i className="fa fa-check fsFifteen"></i></button><button className="btn btn-danger mlFive" type="submit"><i className="fa fa-trash fsFifteen"></i></button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

const NavComponent = (props) => {
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
                            <li className="nav-item" role="presentation"><a className="nav-link text-white" href="#"><i className="fa fa-user-circle-o"></i>&nbsp;Faculty</a></li>
                            <li className="nav-item" role="presentation"><a id = "profileNav" className={`nav-link text-white ${props.activePage === 'profile' ? "activePage" : ""}`} href="#"><i className="icon ion-person"></i>&nbsp;Your Account</a></li>
                            <li className="nav-item" role="presentation"><a className="nav-link text-white" href="/logout"><i className="icon ion-log-out"></i>&nbsp;Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
};

const SendComponent = (props) => {
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