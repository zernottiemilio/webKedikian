document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('projects-map').setView([-31.4167, -64.1833], 5);

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
        { nombre: "Obra Civil Parque Industrial", tipo: "obraCivil", lat: -32.950, lng: -60.650, img: "https://via.placeholder.com/120x80?text=Parque+Industrial" },
        { nombre: "Provisión de materiales para obra", tipo: "obraCivil", lat: -33.000, lng: -64.000, img: "https://via.placeholder.com/120x80?text=Materiales" }
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
