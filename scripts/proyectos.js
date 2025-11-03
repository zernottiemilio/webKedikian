document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('projects-map').setView([-31.4215974212694, -64.49739821367723], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Iconos PNG públicos
    const icons = {
        obraCivil: L.icon({ 
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
            iconSize: [35, 35],
            iconAnchor: [17, 35],
            popupAnchor: [0, -35]
        }),
    };

    const proyectos = [
        { nombre: "WO Carlos Paz", tipo: "obraCivil", lat: -31.420662362818266, lng:  -64.49958330323393, img: "https://api.custer.com.ar/GF/File/proyects/49/avances/woo.png" },
        { nombre: "Obra Coop. San Roque", tipo: "obraCivil", lat: -31.395525, lng: -64.504944, img: "./assets/sanRoque.jpeg" },
        { nombre: "Mon petit", tipo: "obraCivil", lat: -31.4194810717101, lng:  -64.49073114509658, img: "./assets/monPetit.jpeg" },
        { nombre: "Ruta C45", tipo: "obraCivil", lat: -31.45613984994005, lng:  -64.42374053766612, img: "./assets/rutaC45.jpeg" },
        { nombre: "Cereño Grupo Fonte", tipo: "obraCivil", lat: -31.38077497001291, lng: -64.25698498465428, img: "./assets/cereno.jpeg"},
        { nombre: "Cocoguana", tipo: "obraCivil", lat:-31.44391101398981, lng: -64.43853591349071, img: "./assets/cocoguana.jpeg" }
    ];

    proyectos.forEach(p => {
        L.marker([p.lat, p.lng], { icon: icons[p.tipo] })
            .addTo(map)
            .bindPopup(`
                <div style="text-align:center;">
                    <b>${p.nombre}</b><br>
                    <img src="${p.img}" alt="${p.nombre}" style="width:120px; margin-top:5px; border-radius:5px;">
                </div>
            `);
    });
});
