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

mapboxgl.accessToken = 'ACCESS_CODE';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mathias56k/clgwdvk4100a801pnbw10804o', // style URL
    center: INITIAL_CENTER, // starting position [lng, lat]
    zoom: INITIAL_ZOOM, // starting zoom
    projection: 'mercator'
});

// Click to view info
map.on('click', 'markers', function (e) {
    const feature = e.features[0];
    const popup = new mapboxgl.Popup({ className: "popup" })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(`<img src="${feature.properties.P_PILT}"><h3>${feature.properties.P_NIMI}</h3><hr><p><strong>Hinne:</strong> ${feature.properties.P_HINNE}</p><p><strong>Hind:</strong> ${feature.properties.P_HIND}/min</p>`)
        .addTo(map);
})

map.on('load', function() {
    map.loadImage('marker-15.png', function(error, image) {
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
                'icon-size': 0.25 // adjust marker size
            },
        });
    });
});