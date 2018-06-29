import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux"; // Connects a React component to a Redux store.
import { registerUser } from "../../actions/authActions";
import PropTypes from "prop-types";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //if not use this method, the props will wait untill error get from store
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value }); //target.name is array everything come from state
    // console.log(e.target)
  }

  onSubmit(e) {
    e.preventDefault(); //Ngan trinh duyen chuyen trang khi nhan submit   https://www.codehub.vn/khac-nhau-giua-event-preventDefault-va-return-false

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history); 
    // function registerUser call from action with connection bellow
    //When user click submit button, the newUser data will be tranfer to action by registerUser(newUser) and payload get new object
    // is new User and which action is TEST_DISPATCH tranfer to reducer and update user from reducer to store.
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      // className form-control form-control-lg always execute
                      "is-invalid": errors.name // className is-invalid only execute when have errors.name true or false
                    })}
                    // className="form-control form-control-lg"
                    placeholder="Name"
                    name="name"
                    required
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback"> {errors.name} </div>
                  )}
                  {/* object above will execute when errors.name have value, mean 2 of them is right */}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      // className form-control form-control-lg always execute
                      "is-invalid": errors.email // className is-invalid only execute when have errors.email
                    })}
                    // className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      // className form-control form-control-lg always execute
                      "is-invalid": errors.password // className is-invalid only execute when have errors.name
                    })}
                    // className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      // className form-control form-control-lg always execute
                      "is-invalid": errors.password2 // className is-invalid only execute when have errors.name
                    })}
                    // className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired, //registerUser is function, make it is required
  auth: PropTypes.object.isRequired, //auth is a object, make it is required
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  //state get from store in reducer (rootReducer)
  auth: state.auth, // auth(props of component) : state.auth (state.auth from store in reducer)
  errors: state.errors // for this component props.errors get from redux store state.errors
});
 
export default connect(
  mapStateToProps,
  { registerUser } // this is action
)(withRouter(Register));
