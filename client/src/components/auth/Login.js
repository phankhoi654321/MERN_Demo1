import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  // when the user is already login mean isAuthenticated is true so always go to "/dashboard"
  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  //if not use this method, the props will wait untill errors and auth.isAuthentication get from store
  // when user loggin => isAuthenticated is true => go to page "/dashboard"
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault(); //Ngan(stop) trinh duyen chuyen trang khi nhan submit   https://www.codehub.vn/khac-nhau-giua-event-preventDefault-va-return-false

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    // console.log(userData);

    this.props.loginUser(userData);

    //test with jwt-decode
    // var jwt_decode = decode("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMjg4OTNkYmU5OTRiMGZlMTQzNWFmMCIsIm5hbWUiOiJNYWkgS2hhbmgiLCJhdmF0YXIiOiIvL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyLzI0OTkxMzg0YTdjZWMwOTU2NzdkYmQ3NDZlOTc4NGEwP3M9MjAwJnI9cGcmZD1tbSIsImlhdCI6MTUzMDMzMjQyMSwiZXhwIjoxNTMwMzM2MDIxfQ.w29uUVxQ5CscNpWRj4Y1iHHUlqqqqMqdsSByqmTwLO0")
    // console.log(jwt_decode)
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    // className="form-control form-control-lg"
                    className={classnames("form-control form-control-lg", {
                      // className form-control form-control-lg always execute
                      "is-invalid": errors.email // className is-invalid only execute when have errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    // className="form-control form-control-lg"
                    className={classnames("form-control form-control-lg", {
                      // className form-control form-control-lg always execute
                      "is-invalid": errors.password // className is-invalid only execute when have errors.name
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
