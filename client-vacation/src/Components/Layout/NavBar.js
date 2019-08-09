import React, { Component, Fragment } from "react";
import { Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { logOut } from "../../actions/authAction";
import PropTypes from "prop-types";

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const onLogOut = () => {
      this.props.logOut();
    };

    const title = this.props.title;
    const { isAuthenticated, user } = this.props.auth;
    const guestLinks = (
      <Fragment>
        <LinkContainer className="ml-auto pr-2" to="/login">
          <NavItem>Login</NavItem>
        </LinkContainer>
        <LinkContainer to="/register">
          <NavItem>Register</NavItem>
        </LinkContainer>
      </Fragment>
    );

    const authLinks = (
      <Fragment>
        <span>Hello {user && user.user.firstName}</span>
        <LinkContainer className="ml-auto" to="#">
          <NavItem onClick={onLogOut}>Logout</NavItem>
        </LinkContainer>
      </Fragment>
    );

    const adminLinks = (
        <Fragment>
            <LinkContainer className="pl-2" to="/chart">
                <NavItem>Report</NavItem>
            </LinkContainer>
            <LinkContainer className="pl-2" to="/addVacation">
                <NavItem>Add vacation</NavItem>
            </LinkContainer>
        </Fragment>

    );

    return (
      <div>
        <Navbar bg="dark" variant="dark" className="mb-3">
          <LinkContainer className="" to="/">
            <Navbar.Brand>{title}</Navbar.Brand>
          </LinkContainer>
            {isAuthenticated ? authLinks : guestLinks}
          {user &&user.user.admin ? adminLinks :null }
        </Navbar>
      </div>
    );
  }
}

NavBar.propTypes = {
    auth: PropTypes.object,
    logOut: PropTypes.func.isRequired,
};



const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logOut }
)(NavBar);
