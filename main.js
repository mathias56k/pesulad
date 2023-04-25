const container = document.querySelector('.container');
const toggleButton = document.querySelector('#sidebar-toggle');
const toggleIcon = document.querySelector('.toggle-icon');

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
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
style: 'mapbox://styles/mathias56k/clgwdvk4100a801pnbw10804o', // style URL
center: [-74.5, 40], // starting position [lng, lat]
zoom: 9 // starting zoom
});