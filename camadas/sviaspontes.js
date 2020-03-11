infra = L.featureGroup();
//Propostas DET

function tipoicone(e) {
    if (e == 'ponte (Projetada)') {
        return L.icon({
            iconUrl: 'images/ponteProj.png',
            iconAnchor: [24, 15],
            popupAnchor: [0, -10],
            iconSize: [48, 30]
        });
    } else {
        return L.icon({
            iconUrl: 'images/ponte.png',
            iconAnchor: [24, 15],
            popupAnchor: [0, -10],
            iconSize: [48, 30]
        });
    }
};

$.getJSON("camadas/data/sviaspontes.geojson", (data) => {
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, { icon: tipoicone(feature.properties.tipo) });
        },
        onEachFeature: function (feature, layer) {
            function nomeclean(nome) {
                if (nome === null) { return '-' } else { return nome }
            };
            let nome = nomeclean(feature.properties.nome);
            let lei = nomeclean(feature.properties.lei);
            layer.bindPopup(
                '<p>Nome: <strong>' + nome + '</strong></br>' +
                'Lei: ' + lei + '</br>' +
                'Tipo: ' + feature.properties.tipo + '</br>' +
                'Material: ' + feature.properties.material + '</p>'
            );
        }
    }).addTo(infra);
});

mapa.addLayer(infra);