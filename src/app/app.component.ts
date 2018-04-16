import { Component, OnInit } from '@angular/core';
declare var google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  lat: number = -12.046458;
  lng: number = -77.042388;
  zoom:number = 10;
  markers:Array<any> =[
    { lat: -12.046458, lng: -77.042388},
    { lat: -12.132318, lng: - 77.021437},
    { lat: -11.992025, lng: - 77.117282},
    { lat: -10.992025, lng: - 77.117282},
    { lat: -9.992025, lng: - 77.117282},
  ];
  
  btnclick(){
    // centrado automatico
    let bounds_ = this.generateBounds(this.markers);
    this.lat = (bounds_.northeast.latitude + bounds_.southwest.latitude) / 2;
    this.lng = (bounds_.northeast.longitude + bounds_.southwest.longitude) / 2;

    // Change this array to test.
    var points = this.markers;

    function getBoundsZoomLevel(bounds, mapDim) {
      var WORLD_DIM = { height: 256, width: 256 };
      var ZOOM_MAX = 21;

      function latRad(lat) {
        var sin = Math.sin(lat * Math.PI / 180);
        var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
        return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
      }

      function zoom(mapPx, worldPx, fraction) {
        return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
      }

      var ne = bounds.getNorthEast();
      var sw = bounds.getSouthWest();

      var latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

      var lngDiff = ne.lng() - sw.lng();
      var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

      var latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
      var lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

      return Math.min(latZoom, lngZoom, ZOOM_MAX);
    }

    function createMarkerForPoint(point) {
      return new google.maps.Marker({
        position: new google.maps.LatLng(point.lat, point.lng)
      });
    }

    function createBoundsForMarkers(markers) {
      var bounds = new google.maps.LatLngBounds();

      $.each(markers, function () {
        bounds.extend(this.getPosition());
      });
      console.log(bounds);
      return bounds;
    }

    var $mapDiv = $('agm-map');

    var mapDim = {
      height: $mapDiv.height(),
      width: $mapDiv.width()
    }
    console.log(mapDim);

    var markers = [];
    $.each(points, function () { markers.push(createMarkerForPoint(this)); });

    var bounds = (markers.length > 0) ? createBoundsForMarkers(markers) : null;

    this.zoom =  (bounds) ? getBoundsZoomLevel(bounds, mapDim) : 0;
  }
  generateBounds(markers): any {
    if (markers && markers.length > 0) {
      let bounds = new google.maps.LatLngBounds();
      console.log(bounds);
      markers.forEach((marker: any) => {
        bounds.extend(new google.maps.LatLng({ lat: marker.lat, lng: marker.lng }));
      });
      console.log(markers);
      if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
        let extendPoint = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.01, bounds.getNorthEast().lng() + 0.01);
        bounds.extend(extendPoint);
      }
      return {
        northeast: {
          latitude: bounds.getNorthEast().lat(),
          longitude: bounds.getNorthEast().lng()
        },
        southwest: {
          latitude: bounds.getSouthWest().lat(),
          longitude: bounds.getSouthWest().lng()
        }
      }
    }
    return {};
  }
  ngOnInit(){
  }
}
