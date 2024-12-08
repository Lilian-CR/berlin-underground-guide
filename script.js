// Toggle light/dark mode
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeToggle.textContent = document.body.classList.contains('light-mode') ? '🌞' : '🌙';
});

// Create map and add markers with Leaflet.js
const map = L.map('map').setView([52.5200, 13.4050], 13); // Coordinates of Berlin

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Sample venues (replace with your own data)
const venues = [
    {
        name: 'Venue 1',
        description: 'A cool underground spot for music events.',
        lat: 52.5210,
        lon: 13.4015,
        events: ['Music Event 1', 'Art Exhibition 1'],
    },
    {
        name: 'Venue 2',
        description: 'Underground art gallery with regular exhibitions.',
        lat: 52.5230,
        lon: 13.4100,
        events: ['Art Event 1', 'Music Event 2'],
    },
{
        name: 'Venue 3',
        description: 'A cool underground spot for music events.',
        lat: 52.5210,
        lon: 13.4015,
        events: ['Music Event 1', 'Art Exhibition 1'],
    },
    {
        name: 'Venue 4',
        description: 'Underground art gallery with regular exhibitions.',
        lat: 52.5230,
        lon: 13.4100,
        events: ['Art Event 1', 'Music Event 2'],
    },
{
        name: 'Venue 5',
        description: 'Underground art gallery with regular exhibitions.',
        lat: 52.5230,
        lon: 13.4100,
        events: ['Art Event 1', 'Music Event 2'],
    },
    // Add more venues as needed
];

// Add markers for each venue
venues.forEach(venue => {
    const marker = L.marker([venue.lat, venue.lon]).addTo(map);
    marker.bindPopup(`<b>${venue.name}</b><br>${venue.description}<br><b>Upcoming Events:</b><br>${venue.events.join('<br>')}`);

    // Add venue to sidebar
    const venueList = document.getElementById('venue-list');
    const venueItem = document.createElement('li');
    venueItem.textContent = venue.name;
    venueItem.addEventListener('click', () => {
        map.setView([venue.lat, venue.lon], 14); // Zoom into venue
        marker.openPopup();
    });
    venueList.appendChild(venueItem);
});
