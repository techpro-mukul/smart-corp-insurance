import React, { Component } from "react";
export default class Map extends Component {
  componentDidMount() {
    this.initMap();
  }

  initMap() {
    let options = {
      zoom: this.props.zoom,
      center: this.props.center,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    let map = new window.google.maps.Map(
      document.getElementById("map"),
      options
    );
  }

  render() {
    return <div id="map" style={{height:"300px"}}/>;
  }
}

