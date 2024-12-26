// Toggle light/dark mode
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('light-mode') ? '🌞' : '🌙';
});

const aboutBtn = document.getElementById('about-btn');
const aboutModal = document.getElementById('about-modal');
const closeAboutBtn = document.querySelector('.close-about-btn');

aboutModal.style.display = 'none';

aboutBtn.addEventListener('click', () => {
    aboutModal.style.display = 'flex';  
});

closeAboutBtn.addEventListener('click', () => {
    aboutModal.style.display = 'none';  
});

window.addEventListener('click', (event) => {
    if (event.target === aboutModal) {
        aboutModal.style.display = 'none'; 
    }
});

// Map initialization
const map = L.map('map').setView([52.5200, 13.4050], 13); // Center on Berlin

// OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Venue data with coordinates, description, and website URLs
const venues = [
    {
        id: 1,
        name: 'Clash',
        lat: 52.4919589, 
        lon: 13.3885567,
        imageUrl: 'https://fastly.4sqi.net/img/general/width960/91447_eygmGDYQalMslkEoZ-p4iguTerVp6SvRAx7hq5tnc3Y.jpg',
        description: 'Coffee shop - Restaurant - Bar - Beergarden - Concerts. The best place in Kreuzberg 61 for great parties, concerts, or just having a beer with your friends. MUSIC GENRE: Ska, Oi, Punk, Hardcore, Raggae.',
        websiteUrl: 'https://clash-berlin.de/',
    },
    {
        id: 2,
        name: 'Kastanienkeller',
        lat: 52.5375349, 
        lon: 13.4088525,
        imageUrl: 'https://live.staticflickr.com/65535/54190174674_18d8a58cb2_k.jpg',
        description: 'Bar, Café, Concert. Table Tennis under the black light (from middle of Nov. till middle of May starting around 21.00). Fr/Sa: Concerts, Partys u.v.m. mostly starting around 21.00. MUSIC GENRE: Ska, Oi, Punk, Hardcore, Metal, Indie-Rock, Garage, Shoegaze.',
        websiteUrl: 'https://www.instagram.com/explore/locations/366636780496912/kastanienkeller/?hl=en',
    },
    {
        id: 3,
        name: 'Koma.F',
        lat: 52.5076,
        lon: 13.4262,
        imageUrl: 'https://berlindiyhcpunk.wordpress.com/wp-content/uploads/2009/09/the-black-gramola-conspiracy-1.jpg',
        description: 'A cool underground spot for punk music and non professional bands. MUSIC GENRE: Ska, Oi, Punk, Hardcore, Metal, Death-Metal, D-Beat, Trash/Crossover.',
        websiteUrl: 'https://koepi137.net/',
    },
    {
        id: 4,
        name: 'Loge',
        lat: 52.5136836,
        lon: 13.4660501,
        imageUrl: 'https://live.staticflickr.com/65535/54189896921_5443d918ee_k.jpg',
        description: 'The Loge, a pub supported by the association Utlande e.V., is a place where they aim to connect the common threads by bringing together various subcultures and emancipatory movements. A place that, besides regular pub operations, also provides space for readings, concerts, discussions, informational events, and other gatherings. MUSIC GENRE: Ska, Oi, Punk, Hardcore, Metal, Indie-Rock, Garage, Shoegaze.',
        websiteUrl: 'https://www.loge-berlin.org/',
        photoCredit: 'Photo credit by Oyèmi Noize/ @noheroes.jpg on Instagram.',
    },
    {
        id: 5,
        name: 'Oyoun',
        lat: 52.4839,
        lon: 13.4229,
        imageUrl: 'https://oyoun.de/files/2022/09/jam-session-website.jpg',
        description: 'SIZE: 155 square metres event space. CAPACITY: max. seating 90-120 persons; Variable furnishings and seating. USE: Versatile club, ideal for theatre performances, concerts, dance performances, film evenings, spoken word events and much more. MUSIC GENRE: Jazz, World Music, Classic, Hip-Hop.',
        websiteUrl: 'https://oyoun.de/en/raum/club/',
    },
];

function openPopup(venueData) {
    const modal = document.getElementById('venue-modal');
    document.getElementById('venue-name').textContent = venueData.name;
    document.getElementById('venue-image').src = venueData.imageUrl;
    document.getElementById('venue-description').textContent = venueData.description;
    const venueWebsite = document.getElementById('venue-website');
    venueWebsite.href = venueData.websiteUrl;
    venueWebsite.textContent = "Visit Website";

   const photoCreditElement = document.getElementById('venue-photo-credit');
    if (venueData.photoCredit) {
        photoCreditElement.textContent = venueData.photoCredit;
        photoCreditElement.style.display = 'block'; 
    } else {
        photoCreditElement.style.display = 'none'; 
    }

    modal.style.display = 'block'; 
}

document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('venue-modal').style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('venue-modal')) {
        document.getElementById('venue-modal').style.display = 'none';
    }
});

venues.forEach(venue => {
    const marker = L.marker([venue.lat, venue.lon]).addTo(map);
    
    marker.bindPopup(`<b>${venue.name}</b><br>${venue.description}`);

    marker.on('click', () => {
        openPopup(venue); 
        map.setView([venue.lat, venue.lon], 14); 
    });
});
