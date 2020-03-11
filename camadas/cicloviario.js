viasciclo = L.featureGroup();
//Propostas DET
$.getJSON("camadas/data/viewciclovias.geojson", (data) => {
    L.geoJson(data, {
        style: (feature) => {

            //cor
            let colinha;
            cormz = feature.properties.tipo;
            if (cormz === 'ciclofaixa') { colinha = "#e68a00"; }
            else if (cormz === 'ciclovia') { colinha = "#ff4dd2"; }
            else if (cormz === 'compartilhado') { colinha = "#b30059"; }
            else { colinha = "#fff"; };

            //tipo de linha
            let tipolinha;
            if (cormz === 'compartilhado') { tipolinha = "10 10"; }
            else { tipolinha = null; };

            //estilo
            return { color: colinha, weight: 4, dashArray: tipolinha, opacity: 0.65, interactive: false };
        }
    }).addTo(viasciclo);
});

mapa.addLayer(viasciclo);