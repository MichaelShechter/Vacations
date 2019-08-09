import React, { Fragment, Component } from "react";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

class Alerts extends Component {
  constructor(props) {
    super(props);
  }
  render() {
      console.log(this.props);
    return (
      <Fragment>
        <Alert variant={"danger"}>
          <FontAwesomeIcon
            className={"iconHover"}
            icon={faExclamation}
            title={"Error"}
            color={"black"}
          />
        </Alert>
      </Fragment>
    );
  }
}

// export default Alerts;
const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(
  mapStateToProps,
  {}
)(Alerts);
