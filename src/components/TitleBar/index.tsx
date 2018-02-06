// Import the base Component class from React
import React, { Component } from 'react';
// Import the connector to connect React and Redux
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators, Action } from 'redux';
// Import the root state types and actions from the core folder
import { RootState, actions } from '../../core';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// Import the stylesheet for this component
import './index.less';

import Navigation from '../Navigation';
import NavButton from '../Navigation/NavButton';

// Define the property types
interface TitleBarProps {
  user: any;
  authenticated: boolean;
  logout: () => void;
  goToLogin: () => void;
}

// Define the state types
interface TitleBarState {}

class TournamentTitleBar extends Component<TitleBarProps, TitleBarState> {
  
  public render() {
    let currentUser;
    if (this.props.authenticated) {
      currentUser = (
        <h5>{this.props.user.profile.displayName} &nbsp;
          <a onClick={() => {}}>View Account</a> &nbsp;  
          <a onClick={() => this.props.logout()}>Logout</a>
        </h5>
      );
    } else {
      currentUser = (
        <h5>
          <a onClick={() => this.props.goToLogin()}>Login</a> &nbsp;
          <a onClick={() => {}}>Create An Account</a>
        </h5>
      );
    }
    return (
      <div className="titlebar">
        <div className="titlebar-container">
          <div className="info">
            {currentUser}
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

}

// Function to map the state of the object to the component props
const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
  authenticated: state.auth.authenticated
});

// Function to map the dispatch functions to the component props
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(actions.auth.logout());
    },
    goToLogin: () => {
      dispatch(push('/login'));
    }
  };  
};

// Export the final connected class
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TournamentTitleBar);
