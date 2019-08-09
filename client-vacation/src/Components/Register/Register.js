import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../Input";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register, clearErrors } from "../../actions/authAction";
import { setAlert } from "../../actions/alertsActions";
import { loadUser, } from "../../actions/authAction";
import PropTypes from "prop-types";

class Register extends Component {
  constructor(props) {
    super(props);
  }

    onSubmit = values => {
    console.log(`on submit called -> ${values}`);
    this.props.register(values);
  };

  render() {
      console.log(this.props);
        const { isAuthenticated} = this.props.auth;
      console.log(`isAuthenticated value = ${isAuthenticated}`);
      if(isAuthenticated){
          console.log(`isAuthenticated Condition is true`);
         this.props.history.push('/')
      }


    return (
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          userName: "",
          password: ""
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string()
            .required("First is  required")
            .min(2)
            .max(12),
          lastName: Yup.string()
            .required("Last name is  required")
            .min(2)
            .max(12),
          userName: Yup.string()
            .required("User name is  required")
            .min(2)
            .max(12),
          password: Yup.string()
            .required("Password name is  required")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .max(12)
        })}
        onSubmit={this.onSubmit}
        render={({
          handleChange,
          handleBlur,
          values,
          errors,
          handleSubmit,
          touched
        }) => (
          <div className="col-4   m-auto">
            <Card className="mt-5" border="secondary">
              <Card.Body>
                <Card.Title>Register form</Card.Title>
                <Input
                  id={"firstName"}
                  label={"First Name:"}
                  type={"text"}
                  placeHolder={"First name"}
                  name={"first Name"}
                  defaultValue={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && errors.firstName}
                />
                <Input
                  id={"lastName"}
                  label={"Last name:"}
                  type={"text"}
                  placeHolder={"Last name"}
                  defaultValue={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && errors.lastName}
                />
                <Input
                  id={"userName"}
                  label={"User name:"}
                  type={"text"}
                  placeHolder={"User name"}
                  defaultValue={values.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.userName && errors.userName}
                />
                <Input
                  id={"password"}
                  label={"Password:"}
                  type={"Password"}
                  placeHolder={"Password"}
                  defaultValue={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && errors.password}
                />
                <Button
                  variant="outline-success"
                  type="submit"
                  size="sm"
                  className="mt-2"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Button
                  variant="outline-secondary"
                  type="submit"
                  size="sm"
                  className="mt-2"
                >
                  <Link to="/login">You have account? Login </Link>
                </Button>
              </Card.Body>
            </Card>
          </div>
        )}
      />
    );
  }
}

Register.propTypes = {
    login: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    register:PropTypes.object.isRequired,
    clearErrors:PropTypes.object.isRequired,
    loadUser:PropTypes.object.isRequired
};





const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { register, clearErrors, setAlert ,loadUser}
)(Register);
