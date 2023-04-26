const container = document.querySelector('.container');
const toggleButton = document.querySelector('#sidebar-toggle');
const toggleIcon = document.querySelector('.toggle-icon');

// Set Initial Center and Initial Zoom
const INITIAL_CENTER = [25.048056, 58.804251];
const INITIAL_ZOOM = 6.25;

toggleButton.addEventListener('click', function () {
    container.classList.toggle('active');
    toggleButton.classList.toggle('active');
    if (container.classList.contains('active')) {
        toggleIcon.innerHTML = '<i class="fas fa-chevron-left"></i>';
    } else {
        toggleIcon.innerHTML = '<i class="fas fa-chevron-right"></i>';
    }
});

mapboxgl.accessToken = 'ACCESS_KEY';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mathias56k/clgwdvk4100a801pnbw10804o', // style URL
    center: INITIAL_CENTER, // starting position [lng, lat]
    zoom: INITIAL_ZOOM, // starting zoom
    projection: 'mercator'
});

map.dragRotate.disable();

map.touchZoomRotate.disableRotation();

// Click to view info
map.on('click', 'markers', function (e) {
    const feature = e.features[0];
    // Count the stars in GEOJSON
    const starCount = feature.properties.P_RATING;
    // Create a string of star icons based on the count
    const stars = '<i class="fa-solid fa-star" style="color: #00a3d7;"></i>'.repeat(starCount);
    
    // Set Default Cash Icon & if P_CASH is Y change the icon
    let cashIcon = '<i class="fa-sharp fa-solid fa-coins" style="color: #ebebeb;"></i>';
    if (feature.properties.P_CASH === 'Y') {
        cashIcon = cashIcon = '<i class="fa-sharp fa-solid fa-coins" style="color: #669c35;"></i>';
    } else if (feature.properties.P_CASH === 'Z') {
        cashIcon = 'Zetoonid'
    }

    // Set Default Card Icon & if P_CARD is Y change the icon
    let cardIcon = '<i class="fa-solid fa-credit-card" style="color: #ebebeb;"></i>';
    if (feature.properties.P_CARD === 'Y') {
        cardIcon = '<i class="fa-solid fa-credit-card" style="color: #669c35;"></i>';
    } else if (feature.properties.P_CARD === 'Z') {
        cardIcon = ''
    }

    let vacIcon = ''
    if (feature.properties.P_VAC === 'Y') {
        vacIcon = '<img class="svg" src="images/main/vac/VAC.svg">';
    }

    // Popup HTML
    const popupContent = `<img class="main-picture" src="${feature.properties.P_PIC}">
                      <h3>${feature.properties.P_NAME}</h3>
                      <div class="pics">
                      <div class="boxes">
                      <img class="svg" src="images/main/boxes/boxes-${feature.properties.P_BOXES.toString().padStart(2, '0')}.svg">
                      <p class="boxes-info">Selles pesulas on ${feature.properties.P_BOXES} boksi</p>
                      </div>
                      ${vacIcon}
                      </div>
                      <hr>
                      <p><strong>Hinne:</strong> ${stars}</p>
                      <p><strong>Hind:</strong> ${feature.properties.P_PRICE}/min</p>
                      <p><strong>Maksmine:</strong> ${cashIcon} ${cardIcon}</p>`;


    const popup = new mapboxgl.Popup({ className: "popup", closeButton: false })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(popupContent)
        .addTo(map);
})

map.on('load', function () {
    map.loadImage('marker-15.png', function (error, image) {
        if (error) throw error;
        map.addImage('marker-15', image);

        map.addSource('markers', {
            type: 'geojson',
            data: 'data/pesulad.geojson',
        });

        // Add markers to the map
        map.addLayer({
            id: 'markers',
            type: 'symbol',
            source: 'markers',
            layout: {
                'icon-image': 'marker-15', // choose marker icon
                'icon-size': 0.25, // adjust marker size
                'icon-allow-overlap': true,

            },
        });
    });
});