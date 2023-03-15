import React, { Component } from "react";
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends Component {
  render() {
    const style = {
      width: "720px",
      height: "360px",
      };
    return (
      <Map 
        google={this.props.google} 
        zoom={13} style={style} 
        initialCenter={{
        lat: 42.291130,
        lng: -83.717522
        }}
      >
        <Marker
        title={'Start point'}
        name={'Restraunt'}
        position={{lat: 42.281520, lng: -83.743290}} />
        <Marker
        name={'Home'}
        position={{lat: 42.291130, lng: -83.717522}} />
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: "YOUR_GOOGLE_MAP_API_KEY"
})(MapContainer)