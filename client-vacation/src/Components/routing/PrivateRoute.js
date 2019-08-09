import React, {Component, Fragment} from "react";
import { connect } from "react-redux";
import { Route, Redirect } from 'react-router-dom';
import * as PropTypes from "prop-types";


class PrivateRoute extends Component {
    render() {
        let {component: Component, ...rest} = this.props;

        const {isAuthenticated, loading} = this.props.auth;
        console.log(this.props);

        return (
            <Route
                {...rest}
                render={props =>
                    !isAuthenticated && !loading ? (
                        <Redirect to='/login'/>
                    ) : (
                        <Component {...props} />
                    )
                }
            />
        );
    }
}

PrivateRoute.propTypes = {component: PropTypes.any}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(PrivateRoute);




