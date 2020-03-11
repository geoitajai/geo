esgoto = L.featureGroup();
//Propostas DET

$.getJSON("camadas/data/redeEsgSEMASA.geojson", (data) => {
    L.geoJson(data, {
        style: (feature) => {
            return { color: 'red', weight: 6, opacity: 0.55, interactive: false };
        }
    }).addTo(esgoto);
});

mapa.addLayer(esgoto);