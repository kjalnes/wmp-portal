let requestId;
let before = null;

const rotate = (earth) => {
    earth.setView([40.6925285, -73.9553329], 3);
    WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);
    startRotation(earth);
};

const animate = (earth, now) => {
    let latLng = earth.getPosition();
    let elapsed = before ? now - before: 0;
    before = now;
    earth.setCenter([latLng[ 0 ], latLng[ 1 ] + 0.1 * ( elapsed / 30 ) ]);
    startRotation(earth);
};

const startRotation = (earth) => {
    requestId = requestAnimationFrame(animate.bind(null, earth));
};

// stop recursion
const stopRotation = () => {
    if (requestId) {
       cancelAnimationFrame(requestId);
       requestId = undefined;
    }
};

const panTo = (earth, latLng, addMarker) => {
    let lat = latLng[0];
    let lng = latLng[1];

    earth.panInsideBounds([
        [ lat - 10, lng - 10 ],
        [ lat + 10, lng + 10 ]
    ]);

    if (addMarker) {
        WE.marker(latLng).addTo(earth);
    }
};

const createMarkerAndPopup = (country, earth) => {
      let marker = WE.marker(country.latlng).addTo(earth);
};


export { rotate, animate, startRotation, stopRotation, panTo, createMarkerAndPopup };


