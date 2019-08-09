import React, { Component } from "react";
import "./Login.css";
import { Button, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Input from "../Input";
import { connect } from "react-redux";
import { login} from "../../actions/authAction";
import { Link } from "react-router-dom";
import {setAlert} from "../../actions/alertsActions";
import PropTypes from "prop-types";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit = values => {
    const { userName, password } = values;
    console.log(`userName = ${userName} | password = ${password} `);
    this.props.login(values);

  };

  render() {
    const { isAuthenticated,} = this.props.auth;
    if(isAuthenticated){
      this.props.history.push('/')
    }


    return (
      <Formik
        initialValues={{
          userName: "",
          password: ""
        }}
        validationSchema={Yup.object().shape({
          userName: Yup.string().required("User name is  required"),
          password: Yup.string().required("Password name is  required")
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
                <Card.Title>Login form</Card.Title>
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
                  <Link to="/register">Dont have account? Register here</Link>
                </Button>
              </Card.Body>
            </Card>
          </div>
        )}
      />
    );
  }
}



Login.propTypes = {
  login: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(
    mapStateToProps,
    { login,setAlert }
)(Login);



