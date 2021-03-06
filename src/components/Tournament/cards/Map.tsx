import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, Action } from 'redux';
import { RootState, actions } from '../../../core';
import MediaQuery from 'react-responsive';
import { graphql, ChildProps } from 'react-apollo';
import gql from 'graphql-tag';
import { Card, CardContent, Typography, IconButton, CardMedia, CircularProgress } from 'material-ui';

import { Event } from '../../../core/types';

import LocationMap from '../../LocationMap';
import Loading from '../../Loading';

const styles = {
  root: {
    maxHeight: 300
  }
};

interface Props {
  eventCode: string;
}

interface Response {
  event: Event;
}

class MapCard extends Component<ChildProps<Props, Response>> {

  // The render function will render the component
  public render() {
    const { error, loading, event } = this.props.data;
    let address;
    let map;
    if (!loading) {
      if (event.location) {
        address = <p>{event.location.address}</p>;
        if (event.location.coordinates) {
          let { lat, lng } = event.location.coordinates;
          map = (
            <LocationMap lat={lat} lng={lng} />
          );
        }
      }
    }
    return (
      <Card  style={{ height: 300 }}>
        {loading ? (
          <Loading/>
        ) : map}
      </Card>
    );
  }

}

export default graphql<Response, Props>(gql`
  query MapCardQuery($code: String) {
    event(code: $code) {
      id
      location {
        coordinates {
          lat
          lng
        }
      }
    }
  }
`, {
  options: (props: Props) => ({
    variables: {
      code: props.eventCode
    }
  })
})(MapCard);
