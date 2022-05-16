detpropostas = L.featureGroup();

//Proposta engenharia de Trânsito
$.getJSON("detprop.geojson", (data) => {
    L.geoJson(data, {
        style: (feature) => {
            //cor
            let colinha;
            cormz = feature.properties.tipoint;
            if (cormz === 'Nova Ligação') { colinha = "#ff4759"; }
            else if (cormz === 'Nova Ligação (Variante)') { colinha = "#820002"; }
            else if (cormz === 'Alargamento') { colinha = "#61ff6e"; }
            else if (cormz === 'Mudança de Sentido') { colinha = "#ffb031"; }
            else if (cormz === 'Reurbanização') { colinha = "#3ffff3"; }
            else { colinha = "#fff"; };
            //tipo de linha
            let tipolinha;
            if (cormz === 'Nova Ligação (Variante)') { tipolinha = "10 10"; }
            else { tipolinha = null; };
            //estilo
            return { color: colinha, weight: 4, dashArray: tipolinha, opacity: 0.65, interactive: false };
        },
        pane: 'basemap_overlay'
    }).addTo(detpropostas);
});

mapa.addLayer(detpropostas);