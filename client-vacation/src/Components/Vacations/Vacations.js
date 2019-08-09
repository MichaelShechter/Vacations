import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Row } from "react-bootstrap";
import * as _ from "lodash";
import VacationItem from "./VacationItem";
import { loadUser } from "../../actions/authAction";
import {
  fetchVacations,
  fetchVacationsFollowed
} from "../../actions/vacationAction";
import Spinner from "../Layout/Spinner";

class Vacations extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const { loadUser, fetchVacations, fetchVacationsFollowed } = this.props;
    loadUser(localStorage.getItem("token"));
    this.interval = setInterval(()=>{fetchVacations();
    fetchVacationsFollowed();
    }, 5000);

  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const { vacations } = this.props.vacations;
    const { vacationsFollowedByUser } = this.props.vacations;
    const follow = vacationsFollowedByUser.map(follow => follow._id);
    const [vacationsFollowed, vacationsNotFollowed] = _.partition(
      vacations,
      vacation => follow.includes(vacation._id)
    );
    const loading = this.props.auth.loading;

    if (loading) {
      return <Spinner />;
    }
    return (
      <Container>
        <Fragment>
          <Row>
            {vacationsFollowed.map(vacation => (
              <VacationItem key={vacation._id} {...vacation} follow={true} />
            ))}
          </Row>
          <Row>
            {vacationsNotFollowed.map(vacation => (
              <VacationItem key={vacation._id} {...vacation} follow={false} />
            ))}
          </Row>
        </Fragment>
      </Container>
    );
  }
}

Vacations.propTypes = {
  loadUser: PropTypes.func.isRequired,
  fetchVacations: PropTypes.func.isRequired,
  vacations: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  vacations: state.vacationsItems,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { fetchVacations, loadUser, fetchVacationsFollowed }
)(Vacations);
