famaiParques = L.featureGroup();

//Recursos naturais
$.getJSON("camadas/data/famaiParques.geojson", (data) => {
    L.geoJson(data, {
        style: (feature) => {
            let corzona;
            let linhazona;
            let linhatipo;
            let cormz = feature.properties.denomina;

            if (cormz === 'APP Topo de morro') {
                corzona = "#99cc00";
                linhazona = 2;
                linhatipo = null;
            } else if (cormz === 'Parque Municipal') {
                corzona = "#00cc00";
                linhazona = 3;
                linhatipo = null;
            } else if (cormz === 'Zona de amortecimento') {
                corzona = "#ffff66";
                linhazona = 1;
                linhatipo = "10 10";
            } else {
                linhatipo = null;
                corzona = "#fff";
                linhazona = 1;
            };

            return {
                color: corzona,
                weight: linhazona,
                dashArray: linhatipo,
                fillColor: corzona,
                fillOpacity: 0.4
            };
        },

        onEachFeature: (feature, layer) => {

            let legzona = feature.properties.zona;
            let legleg = feature.properties.legislacao;
            let zona;
            let legislacao;

            if (legzona === null) { zona = '-'; } else { zona = feature.properties.zona; };
            if (legleg === null) { legislacao = '-'; } else { legislacao = feature.properties.legislacao; };

            layer.bindPopup(
                '<strong>' + 'Nome: ' + feature.properties.nome + '</strong>' + '<br/>' +
                'zona: ' + zona + '<br/>' +
                'legislação: ' + legislacao
            )
        },
        pane: 'camadaB'
    }).addTo(famaiParques);
});

mapa.addLayer(famaiParques);