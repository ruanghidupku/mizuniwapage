// main.js - Main application logic

// Get configuration safely
const getConfig = () => {
    // For production (Cloudflare Pages with Functions)
    if (window.location.hostname.includes('pages.dev') || window.location.hostname.includes('mizuniwa')) {
        return {
            API_ENDPOINT: '/api/sheets',
            USE_DIRECT_API: false
        };
    }
    
    // For development (using direct API - make sure config.js exists)
    if (typeof CONFIG !== 'undefined') {
        return {
            ...CONFIG,
            USE_DIRECT_API: true
        };
    }
    
    // Fallback
    console.warn('No configuration found. Using static data only.');
    return {
        USE_DIRECT_API: false,
        STATIC_ONLY: true
    };
};

// Data constants
const LOCATIONS = [
    { icon: '🏟', name: 'Lapangan Tamantirto ꦭꦥꦁꦔꦤ꧀ꦠꦩꦤ꧀ꦠꦶꦂꦠ', distance: '700 m' },
    { icon: '🏪', name: 'Alfamart / Indomaret', distance: '700-900 m' },
    { icon: '🎓', name: 'Universitas Muhammadiyah Yogyakarta', distance: '2 km' },
    { icon: '🎓', name: 'Universitas Alma Ata Yogyakarta', distance: '2 km' },
    { icon: '🏥', name: 'Rumah Sakit PKU Gamping', distance: '5 km' },
    { icon: '🚂', name: 'Stasiun Tugu', distance: '8 km' },
    { icon: '✈️', name: 'Yogyakarta International Airport', distance: '39 km' }
];

const FACILITIES = [
    { icon: '🌐', name: 'Free WiFi', desc: 'Internet cepat coverage di seluruh area' },
    { icon: '🍳', name: 'Dapur Bersama', desc: 'Kompor dan alat makan/minum tersedia untuk digunakan bersama' },
    { icon: '♻️', name: 'Free Iuran Sampah', desc: 'Sampah terkelola dengan baik, tidak ada biaya tambahan' },
    { icon: '🏍️', name: 'Parkir Motor', desc: 'Area parkir khusus motor yang aman dan luas' },
    { icon: '📹', name: 'CCTV 24 Jam', desc: 'Keamanan terjaga dengan kamera CCTV di area strategis' },
    { icon: '🏠', name: 'Rumah 2 Lantai', desc: 'Bangunan 2 lantai dengan area bersantai yang nyaman' }
];

const STATIC_ROOM_DATA = {
    "650000": {
        title: "Rp 650.000/bulan",
        description: "Kamar lantai bawah dengan fasilitas dasar",
        rooms: [
            {
                id: 2,
                type: "Kamar 2",
                name: "Kamar Bawah Depan",
                location: "Posisi depan rumah",
                features: [
                    "Ranjang single dengan kasur",
                    "Kamar mandi bersama",
                    "Free WiFi",
                    "Dekat pintu masuk"
                ],
                price: "Rp 650.000",
                image: "https://images.pexels.com/photos/5461586/pexels-photo-5461586.jpeg"
            },
            {
                id: 3,
                type: "Kamar 3",
                name: "Kamar Dekat Dapur",
                location: "Akses mudah ke dapur bersama",
                features: [
                    "Ranjang single dengan kasur",
                    "Kamar mandi bersama",
                    "Free WiFi",
                    "Dekat area dapur"
                ],
                price: "Rp 650.000",
                image: "https://images.pexels.com/photos/5461586/pexels-photo-5461586.jpeg"
            }
        ]
    },
    "700000": {
        title: "Rp 700.000/bulan",
        description: "Kamar lantai atas dengan kamar mandi bersama",
        rooms: [
            {
                id: 4,
                type: "Kamar 4",
                name: "Kamar Atas Belakang",
                location: "Kamar mandi bersama",
                features: [
                    "Kamar lebih luas",
                    "Ranjang single dengan kasur",
                    "Kamar mandi bersama",
                    "Free WiFi",
                    "Posisi belakang, lebih tenang"
                ],
                price: "Rp 700.000",
                image: "https://images.pexels.com/photos/5461588/pexels-photo-5461588.jpeg"
            },
            {
                id: 5,
                type: "Kamar 5",
                name: "Kamar Atas Depan",
                location: "Kamar mandi bersama",
                features: [
                    "Kamar lebih luas",
                    "Ranjang single dengan kasur",
                    "Kamar mandi bersama",
                    "Free WiFi",
                    "View depan rumah"
                ],
                price: "Rp 700.000",
                image: "https://images.pexels.com/photos/5461588/pexels-photo-5461588.jpeg"
            }
        ]
    },
    "750000": {
        title: "Rp 750.000/bulan",
        description: "Kamar premium dengan kamar mandi dalam atau lokasi istimewa",
        rooms: [
            {
                id: 1,
                type: "Kamar 1",
                name: "Kamar Parkiran",
                location: "Depan garasi",
                features: [
                    "Ranjang single dengan kasur",
                    "Kamar mandi dalam (closet duduk)",
                    "Free WiFi",
                    "Akses mudah ke parkiran"
                ],
                price: "Rp 750.000",
                image: "https://images.pexels.com/photos/5997993/pexels-photo-5997993.jpeg"
            },
            {
                id: 6,
                type: "Kamar 6 - Premium",
                name: "Kamar Atas Depan Privat",
                location: "Kamar mandi dalam",
                features: [
                    "Ranjang single dengan kasur",
                    "Kamar mandi dalam (closet duduk)",
                    "Free WiFi",
                    "Privasi maksimal"
                ],
                price: "Rp 750.000",
                image: "https://images.pexels.com/photos/5997993/pexels-photo-5997993.jpeg"
            },
            {
                id: 7,
                type: "Kamar 7 - Premium",
                name: "Kamar Atas Belakang Privat",
                location: "Kamar mandi dalam",
                features: [
                    "Ranjang single dengan kasur",
                    "Kamar mandi dalam (closet duduk)",
                    "Free WiFi",
                    "Tenang dan privat"
                ],
                price: "Rp 750.000",
                image: "https://images.pexels.com/photos/5997993/pexels-photo-5997993.jpeg"
            }
        ]
    }
};

// Utility functions
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const parts = dateString.split('/');
    if (parts.length !== 3) return dateString;
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 
                  'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
    const month = parseInt(parts[1]) - 1;
    return `${parts[0]} ${months[month]} ${parts[2]}`;
};

const showError = (message) => {
    const syncStatus = document.getElementById('syncStatus');
    if (syncStatus) {
        syncStatus.innerHTML = `<span class="error">⚠️ ${message}</span>`;
    }
};

const showSuccess = (message) => {
    const syncStatus = document.getElementById('syncStatus');
    if (syncStatus) {
        syncStatus.innerHTML = `<span class="success">✓ ${message}</span>`;
    }
};

// Fetch room data
async function fetchRoomData() {
    const config = getConfig();
    
    if (config.STATIC_ONLY) {
        return null;
    }
    
    try {
        let response;
        
        if (config.USE_DIRECT_API) {
            // Direct API call (development)
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.GOOGLE_SHEET_ID}/values/${config.SHEET_RANGE}?key=${config.GOOGLE_API_KEY}`;
            response = await fetch(url);
        } else {
            // Cloudflare Worker endpoint (production)
            response = await fetch(config.API_ENDPOINT);
        }
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        return parseSheetData(data.values);
    } catch (error) {
        console.error('Error fetching room data:', error);
        showError('Gagal memuat data real-time. Menampilkan data statis.');
        return null;
    }
}

// Parse Google Sheets data
function parseSheetData(rows) {
    if (!rows || rows.length < 2) return null;
    
    const roomStatus = {};
    
    // Skip header row
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row && row[0]) {
            roomStatus[row[0]] = {
                status: row[3] || 'TERSEDIA',
                tenant: row[4] || '',
                contact: row[5] || '',
                checkin: row[6] || '',
                checkout: row[7] || ''
            };
        }
    }
    
    return roomStatus;
}

// Render functions
function renderLocations() {
    const container = document.getElementById('locationGrid');
    if (!container) return;
    
    container.innerHTML = LOCATIONS.map(loc => `
        <div class="location-item">
            <div class="location-name">${loc.icon} ${loc.name}</div>
            <div class="location-distance">${loc.distance}</div>
        </div>
    `).join('');
}

function renderFacilities() {
    const container = document.getElementById('facilitiesGrid');
    if (!container) return;
    
    container.innerHTML = FACILITIES.map(facility => `
        <div class="facility-item fade-in">
            <div class="facility-icon">${facility.icon}</div>
            <h3 class="facility-name">${facility.name}</h3>
            <p class="facility-desc">${facility.desc}</p>
        </div>
    `).join('');
}

function renderRooms(roomStatusData) {
    const container = document.getElementById('roomsContainer');
    if (!container) return;
    
    let html = '';

    Object.keys(STATIC_ROOM_DATA).forEach(priceKey => {
        const category = STATIC_ROOM_DATA[priceKey];
        
        html += `
            <div class="price-category fade-in">
                <h3>${category.title}</h3>
                <p>${category.description}</p>
            </div>
            <div class="room-grid">
        `;

        category.rooms.forEach(room => {
            const status = roomStatusData ? roomStatusData[room.id.toString()] : null;
            const isAvailable = !status || status.status === 'TERSEDIA';
            
            html += `
                <div class="room-card fade-in ${!isAvailable ? 'unavailable' : ''}">
                    <div style="position: relative;">
                        <img src="${room.image}" 
                             alt="${room.name}" 
                             class="room-image"
                             loading="lazy">
                        <div class="availability-badge ${isAvailable ? 'available' : 'unavailable'}">
                            ${isAvailable ? 'TERSEDIA' : 'TERISI'}
                        </div>
                    </div>
                    <div class="room-content">
                        <div class="room-type">${room.type}</div>
                        <h3 class="room-name">${room.name}</h3>
                        <p style="color: var(--medium-gray); font-size: 0.9rem; margin-bottom: 1rem;">
                            ${room.location}
                        </p>
                        <ul class="room-features">
                            ${room.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                        <div class="room-price">
                            ${room.price}
                            <span class="price-period">/bulan</span>
                        </div>
                        ${!isAvailable && status ? `
                            <div class="tenant-info">
                                <strong>Status:</strong> Terisi hingga ${formatDate(status.checkout)}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        });

        html += '</div>';
    });

    container.innerHTML = html;
    
    if (roomStatusData) {
        showSuccess('Data berhasil disinkronkan');
    }
    
    // Re-observe fade-in elements
    observeFadeInElements();
}

// Mobile menu handling
function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const menu = document.getElementById('mobileMenu');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
    });
    
    // Close menu on link click
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
        });
    });
}

// Smooth scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Height of fixed navbar
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for animations
function observeFadeInElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0.1s';
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Navigation shadow on scroll
function initNavScroll() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
        }
        
        // Hide/show nav on scroll (optional)
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// Initialize all components
async function init() {
    // Render static content first
    renderLocations();
    renderFacilities();
    
    // Initialize UI components
    initMobileMenu();
    initSmoothScroll();
    initNavScroll();
    observeFadeInElements();
    
    // Load room data with static fallback
    renderRooms(null); // Show static data first
    
    // Try to fetch dynamic data
    const dynamicData = await fetchRoomData();
    if (dynamicData) {
        renderRooms(dynamicData);
    }
}

// Auto-refresh data every 5 minutes
function startAutoRefresh() {
    setInterval(async () => {
        const dynamicData = await fetchRoomData();
        if (dynamicData) {
            renderRooms(dynamicData);
        }
    }, 300000); // 5 minutes
}

// Service Worker registration (optional, for offline support)
if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered:', registration.scope))
            .catch(err => console.log('SW registration failed:', err));
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Start auto-refresh after initialization
window.addEventListener('load', () => {
    startAutoRefresh();
});

// Export for debugging (optional)
window.KosMizuniwa = {
    fetchRoomData,
    renderRooms,
    getConfig,
    version: '1.0.0'
};