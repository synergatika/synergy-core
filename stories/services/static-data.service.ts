import { Injectable } from '@angular/core';
import {
  IStaticDataService,
} from 'sng-core';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService extends IStaticDataService {
  public get getMapPinStyle() {
    return {
      pin: {
        url: 'assets/media/images/pin.png',
        scaledSize: {
          width: 15,
          height: 15
        }
      },
      mapStyle: [{
        "featureType": "all", "elementType": "labels",
        "stylers": [{ "visibility": "off" }]
      }, {
        "featureType": "administrative", "elementType": "labels",
        "stylers": [{ "visibility": "off" }]
      }, {
        "featureType": "administrative", "elementType": "labels.text.fill",
        "stylers": [{ "color": "#444444" }, { "visibility": "off" }]
      }, {
        "featureType": "administrative.neighborhood", "elementType": "labels",
        "stylers": [{ "visibility": "off" }]
      }, {
        "featureType": "landscape", "elementType": "all",
        "stylers": [{ "visibility": "on" }, { "color": "#e0dfe0" }]
      }, {
        "featureType": "landscape", "elementType": "labels",
        "stylers": [{ "visibility": "off" }]
      }, {
        "featureType": "poi", "elementType": "all",
        "stylers": [{ "visibility": "off" }]
      }, {
        "featureType": "poi", "elementType": "labels",
        "stylers": [{ "visibility": "off" }]
      }, {
        "featureType": "poi.park", "elementType": "geometry",
        "stylers": [{ "color": "#a8a9a8" }, { "visibility": "on" }]
      }, {
        "featureType": "road", "elementType": "all",
        "stylers": [{ "saturation": -100 }, { "lightness": 45 }]
      }, {
        "featureType": "road", "elementType": "geometry.fill",
        "stylers": [{ "visibility": "on" }, { "color": "#5b5b5a" }]
      }, {
        "featureType": "road", "elementType": "labels",
        "stylers": [{ "visibility": "on" }]
      }, {
        "featureType": "road.highway", "elementType": "all",
        "stylers": [{ "visibility": "simplified" }]
      }, {
        "featureType": "road.highway", "elementType": "labels",
        "stylers": [{ "visibility": "on" }]
      }, {
        "featureType": "road.arterial", "elementType": "labels.icon",
        "stylers": [{ "visibility": "on" }]
      }, {
        "featureType": "transit", "elementType": "all",
        "stylers": [{ "visibility": "off" }]
      }, {
        "featureType": "transit", "elementType": "labels",
        "stylers": [{ "visibility": "on" }]
      }, {
        "featureType": "water", "elementType": "all",
        "stylers": [{ "color": "#ffffff" }, { "visibility": "on" }]
      }, {
        "featureType": "water", "elementType": "labels",
        "stylers": [{ "visibility": "off" }]
      },
      {
        "featureType": "all", "elementType": "labels",
        "stylers": [{ "gamma": 0.26 }, { "visibility": "off" }]
      },
      {
        "featureType": "road", "elementType": "all",
        "stylers": [{ "hue": "#ffffff" }]
      },
      {
        "featureType": "road.highway", "elementType": "geometry",
        "stylers": [{ "lightness": 50 }, { "hue": "#ffffff" }]
      },
      {
        "featureType": "road.highway", "elementType": "labels.text",
        "stylers": [{ "visibility": "on" }]
      }, {
        "featureType": "road.arterial", "elementType": "geometry",
        "stylers": [{ "lightness": 20 }]
      },
      {
        "featureType": "road.arterial", "elementType": "labels.text",
        "stylers": [{ "visibility": "on" }]
      },
      {
        "featureType": "road.local", "elementType": "labels.text",
        "stylers": [{ "visibility": "on" }]
      }]
    };
  }
}
