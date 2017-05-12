// function initialize(earth) {
//     var options = { zoom: 3.0, position: [40.6925285,-73.9553329] };
//     // var earth = new WE.map('earth_div', options);
//     WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);
//      // panTo(center, options?)
// }



let requestId;
let before = null;

function rotate(earth) {
    earth.setView([40.6925285, -73.9553329], 3);
    WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);

    // Start a simple rotation animation
    startRotation(earth);
}

function animate(earth, now) {
    var coordinates = earth.getPosition();
    var latitude = coordinates[0];
    var longitude = coordinates[1];
    var elapsed = before ? now - before: 0;
    before = now;
    earth.setCenter([latitude, longitude + 0.1*(elapsed/30)]);
    startRotation(earth);
}

function startRotation(earth) {
    requestId = requestAnimationFrame(animate.bind(null, earth));
}

function stopRotation() {
    if (requestId) {
       cancelAnimationFrame(requestId);
       requestId = undefined;
    }
}


function panTo(earth, coordinates) {
    console.log('panTo got called')
    earth.panTo([71.1695, 25.7832])
}

export { rotate, animate, startRotation, stopRotation, panTo };
