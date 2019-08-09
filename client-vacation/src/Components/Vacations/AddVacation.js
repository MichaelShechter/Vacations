import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Input from "../Input";
import { addVacation } from "../../actions/vacationAction";
import {loadUser} from "../../actions/authAction";
import {Button, Card} from "react-bootstrap";
import {Formik} from "formik";
import * as Yup from "yup";
import Spinner from "../Layout/Spinner";

class AddVacation extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

    this.props.loadUser(localStorage.getItem("token"));

  }

  onSubmit = values => {
    this.props.addVacation(values,this.props.history)

  };

  render() {
      const loading = this.props.auth.loading;

      if(loading) {
          return <Spinner/>
      }

    return (
        <Formik
            initialValues={{
              name:'',
              description: '',
              destination:'',
              startDate:'',
              endDate:'',
              price:'',
              image:'',

            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Vacation name  is  required"),
              description: Yup.string().required("Vacation  description is  required"),
              destination:Yup.string().required("Destination  is  required"),
              startDate:Yup.date().required("Vacation Start date  is  required"),
              endDate:Yup.date().required("Vacation end date  is  required"),
              price:Yup.string().required("Price   is  required"),
              image:Yup.string().required("Image URL    is  required")
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
                      <Card.Title>Add vacation</Card.Title>
                      <Input
                          id={"name"}
                          label={"Vacation name:"}
                          type={"text"}
                          placeHolder={"Vacation name"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.name && errors.name}
                      />
                      <Input
                          id={"description"}
                          label={"Description:"}
                          type={"text"}
                          placeHolder={"Description"}

                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.description && errors.description}
                      />
                      <Input
                          id={"destination"}
                          label={"Destination:"}
                          type={"text"}
                          placeHolder={"Destination"}
                          // defaultValue={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.destination && errors.destination}
                      />
                      <Input
                          id={"startDate"}
                          label={"Start Date:"}
                          type={"date"}
                          placeHolder={"Destination"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.startDate && errors.startDate}
                      />
                      <Input
                          id={"endDate"}
                          label={"End Date:"}
                          type={"date"}
                          placeHolder={"End Date"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.endDate && errors.endDate}
                      />

                      <Input
                          id={"image"}
                          label={"Image URL:"}
                          type={"text"}
                          placeHolder={"Image URL"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.image && errors.image}
                      />

                      <Input
                          id={"price"}
                          label={"Price:"}
                          type={"text"}
                          placeHolder={"Price"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.price && errors.price}
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
                    </Card.Body>
                  </Card>
                </div>
            )}
        />
    );


  }
}

AddVacation.propTypes = {
    setAlert: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    loadUser:PropTypes.object.isRequired
};



const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps,{addVacation,loadUser})(AddVacation);
