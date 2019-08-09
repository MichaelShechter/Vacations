import React, { Component, Fragment } from "react";
import "./vacationItem.css";

import { Card, Modal, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faDollarSign,
  faStar as fasStar
} from "@fortawesome/free-solid-svg-icons";
import { faStar, faEdit } from "@fortawesome/free-regular-svg-icons";
import Input from "../Input";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser } from "../../actions/authAction";
import { deleteVacation, editVacation,followVacation,unFollowVacation } from "../../actions/vacationAction";


class VacationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      _id: this.props._id,
      name: this.props.name,
      description: this.props.description,
      destination: this.props.destination,
      image: this.props.image,
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      price: this.props.price,
      follow:this.props.follow

    };
  }

  render() {

    const {
      auth: { user }
    } = this.props;

    console.log(this.props);





    function convertDate(unformattedDate) {
      let current_date = new Date(unformattedDate);
      let formatted_date =
          current_date.getMonth() +
        "/" +
          current_date.getDate() +
        "/" +
        current_date.getFullYear();
      return formatted_date;
    }



  return (
      <Fragment>
        <Card className="m-4  col-3" border="secondary">
          <div>

            {this.state.follow ===true    ?
                <span className="pull-right"  onClick={() =>  this.props.unFollowVacation(this.state._id)} >
                <FontAwesomeIcon
                    className={"iconHover"}
                    icon={fasStar}
                    title={"UnFollow"}
                    color={"blue"}
                />
                </span>
                : <span className="pull-right"  onClick={() =>this.props.followVacation(this.state._id)}>
                <FontAwesomeIcon
                    className={"iconHover"}
                    icon={faStar}
                    title={"Follow"}
                    color={"blue"}
                />
                </span>
                }
            {this.props.auth.user.user.admin === true ?
                <span className="pull-left" onClick={this.showModal}>
                <FontAwesomeIcon
                    className={"iconHover"}
                    icon={faEdit}
                    title={"Edit"}
                    color={"blue"}
                />
              </span>
           :null }
          </div>
          <Card.Body>
            <Card.Title>{this.state.description}</Card.Title>
            <Card.Text>
              <FontAwesomeIcon icon={faDollarSign} />
              {this.state.price}
            </Card.Text>
            <Card.Text>
              {convertDate(this.state.startDate)}-
              {convertDate(this.state.endDate)}
            </Card.Text>
            <img className={'img-fluid'}
              src={this.state.image}
              alt={"img"}
            />
          </Card.Body>
          {this.props.auth.user.user.admin === true ?
              <div className="trashIcon  m-auto">
            <span onClick={() => this.onDelete(this.state._id)}>
              <FontAwesomeIcon
                  className={"iconHover"}
                  icon={faTrash}
                  title={"Delete"}
                  inverse={false}
              />
            </span>
              </div>
          :null}
        </Card>
        <Modal show={this.state.show} onHide={this.handleModal}>
          <form className="form" onSubmit={this.handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit {this.state.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Input
                id="name"
                label={"Vacation Name:"}
                placeHolder={"Vacation Name"}
                defaultValue={this.state.name}
                onChange={this.handleChange}
              />
              <Input
                id="description"
                label={"Description:"}
                placeHolder={"Description"}
                defaultValue={this.state.description}
                onChange={this.handleChange}
              />
              <Input
                id="destination"
                label={"Destination:"}
                placeHolder={"Destination"}
                defaultValue={this.state.destination}
                onChange={this.handleChange}
              />
              <Input
                id="startDate"
                label={"Vacation start date:"}
                placeHolder={"Vacation start date"}
                defaultValue={this.state.startDate}
                type={"date"}
                onChange={this.handleChange}
              />
              <Input
                id="endDate"
                label={"Vacation end date:"}
                placeHolder={"Vacation end date"}
                defaultValue={this.state.endDate}
                type={"date"}
                onChange={this.handleChange}
              />
              <Input
                id="image"
                label={"Vacation image:"}
                placeHolder={"Vacation image"}
                type={"text"}
                onChange={this.handleChange}
              />
              <Input
                id="price"
                label={"Vacation price:"}
                placeHolder={"Vacation price"}
                defaultValue={this.state.price}
                onChange={this.handleChange}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleModal}>
                Close
              </Button>
              <Button
                variant="outline-success"
                type="submit"
                size="sm"
                className="mt-2"
              >
                Submit
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </Fragment>
    );
  }

  onDelete = _id => {
    this.props.deleteVacation(_id);
  };



  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleModal = () => {
    const { show } = this.state;
    this.setState({
      show: !show
    });
  };

  handleChange = e => {
    let id = e.target.id;
    console.log(`the id value = ${id}`);
    console.log(e.target.value);
    this.setState({ [id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let id = e.target.id;
    console.log(`id:${id}`);
    console.log(`The state values : ${this.state}`);
    const editedFields = {
      id:this.state._id,
      name:this.state.name,
      description:this.state.description,
      destination:this.state.destination,
      image:this.state.image,
      startDate:this.state.startDate,
      endDate:this.state.endDate,
      price:this.state.price
    };

    this.props.editVacation(editedFields);
    this.setState({ show: false });
  };
}

VacationItem.propTypes = {
  auth:PropTypes.object,
  vacations: PropTypes.array.isRequired,
  loadUser:PropTypes.func.isRequired,
  deleteVacation:PropTypes.func.isRequired,
  editVacation:PropTypes.func.isRequired,
  followVacation:PropTypes.func.isRequired,
  unFollowVacation:PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  vacations: state.vacationsItems.vacations,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loadUser, deleteVacation,editVacation,followVacation,unFollowVacation }
)(VacationItem);
