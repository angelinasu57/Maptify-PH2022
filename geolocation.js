// Credit to: https://developers.google.com/maps/documentation/javascript/geolocation#maps_map_geolocation-javascript
// https://developers.google.com/maps/documentation/javascript/markers

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, userMarker, userPos, userButton, infoWindow;

function initMap() {
  const center = new google.maps.LatLng(35.9132, -79.0558); // center chapel hill
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 18, // between streets-view and buildings-view
  });

  // TODO: marker for user, change code, prefered look
  const userIcon = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "blue",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  };

  // TODO: user button, for spotify/etc info
  infoWindow = new google.maps.InfoWindow({
    content: "",
  });

  // TODO: change, button to pan to current location
  const locationButton = document.createElement("button");

  locationButton.textContent = "Go to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          map.setCenter(userPos);
          userMarker = new google.maps.Marker({
            position: userPos,
            map: map,
            icon: userIcon,
            label: "You",
          });
          google.maps.event.addListener(userMarker, "click", function() {
            infoWindow.setPosition(userPos);
            infoWindow.open(map);
          });
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

// TODO: uh, how to add other ppl as markers???
function setMarkers(map) {
  // Adds markers to the map.
  // Marker sizes are expressed as a Size of X,Y where the origin of the image
  // (0,0) is located in the top left of the image.
  // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.
}

// TODO: how organize data of ppl
// location
// narrow into 1 mile radius