plantaZoneamento = L.featureGroup();

//Manchas zoneamento
$.getJSON("camadas/data/zon2012webtabela.geojson", (data) => {
    L.geoJson(data, {
        style: (feature) => {
            let corzona;
            cormz = feature.properties.abrevia;
            if (cormz === 'ZAP') corzona = "#ffc821";
            else if (cormz === 'ZAP (CCS1)') corzona = "#ffc821";
            else if (cormz === 'ZAP (CCS2)') corzona = "#ffc821";
            else if (cormz === 'ZC 1') corzona = "#917951";
            else if (cormz === 'ZC 1 (CCS2)') corzona = "#917951";
            else if (cormz === 'ZC 2') corzona = "#ff5765";
            else if (cormz === 'ZC 2 (CCS1)') corzona = "#ff5765";
            else if (cormz === 'ZC 2 (CCS2)') corzona = "#ff5765";
            else if (cormz === 'ZEA') corzona = "#7cc5ab";
            else if (cormz === 'ZEA (CCS1)') corzona = "#7cc5ab";
            else if (cormz === 'ZEA (CCS3)') corzona = "#7cc5ab";
            else if (cormz === 'ZEU') corzona = "#d4d4bc";
            else if (cormz === 'ZEU (CCS1)') corzona = "#d4d4bc";
            else if (cormz === 'ZEU (CCS2)') corzona = "#d4d4bc";
            else if (cormz === 'ZIP') corzona = "#c82d2d";
            else if (cormz === 'ZIP (CCS1)') corzona = "#c82d2d";
            else if (cormz === 'ZIP (CCS2)') corzona = "#c82d2d";
            else if (cormz === 'ZIT') corzona = "#caf5f5";
            else if (cormz === 'ZIT (CCS2)') corzona = "#caf5f5";
            else if (cormz === 'ZPA 1') corzona = "#468e57";
            else if (cormz === 'ZPA 1 (CCS1)') corzona = "#468e57";
            else if (cormz === 'ZPA 1 (CCS3)') corzona = "#468e57";
            else if (cormz === 'ZPA 2') corzona = "#11cd00";
            else if (cormz === 'ZPA 2 (CCS2)') corzona = "#11cd00";
            else if (cormz === 'ZPA 3') corzona = "#71b580";
            else if (cormz === 'ZPA 3 (CCS1)') corzona = "#71b580";
            else if (cormz === 'ZPA 3 (CCS2)') corzona = "#71b580";
            else if (cormz === 'ZPA 3 (CCS3)') corzona = "#71b580";
            else if (cormz === 'ZPN') corzona = "#83cada";
            else if (cormz === 'ZPN (CCS1)') corzona = "#83cada";
            else if (cormz === 'ZPN (CCS2)') corzona = "#83cada";
            else if (cormz === 'ZR') corzona = "#96b7ab";
            else if (cormz === 'ZR 1') corzona = "#7090d0";
            else if (cormz === 'ZR 1 (Q1)') corzona = "#7090d0";
            else if (cormz === 'ZR 1 (Q1)(CCS3)') corzona = "#7090d0";
            else if (cormz === 'ZR 1 (Q2)') corzona = "#7090d0";
            else if (cormz === 'ZR 1 (Q2)(CCS3)') corzona = "#7090d0";
            else if (cormz === 'ZR 1 (Q3)') corzona = "#7090d0";
            else if (cormz === 'ZR 1 (Q3)(CCS3)') corzona = "#7090d0";
            else if (cormz === 'ZR 2') corzona = "#b599da";
            else if (cormz === 'ZR 2 (Q1)') corzona = "#b599da";
            else if (cormz === 'ZR 2 (Q1)(CCS3)') corzona = "#b599da";
            else if (cormz === 'ZR 2 (Q2)') corzona = "#b599da";
            else if (cormz === 'ZR 2 (Q3)') corzona = "#b599da";
            else if (cormz === 'ZR 2 (Q3)(CCS3)') corzona = "#b599da";
            else if (cormz === 'ZR 3') corzona = "#da89bc";
            else if (cormz === 'ZR 3 (CCS1)') corzona = "#da89bc";
            else if (cormz === 'ZR 3 (CCS3)') corzona = "#da89bc";
            else if (cormz === 'ZSI') corzona = "#ff721b";
            else if (cormz === 'ZSI (CCS1)') corzona = "#ff721b";
            else if (cormz === 'ZSI (CCS2)') corzona = "#ff721b";
            else if (cormz === 'ZTRA') corzona = "#fdf5b0";
            else if (cormz === 'ZTRA (CCS1)') corzona = "#fdf5b0";
            else if (cormz === 'ZTRU') corzona = "#bfdb99";
            else if (cormz === 'ZTRU (CCS2)') corzona = "#bfdb99";
            else if (cormz === 'ZU 1') corzona = "#ef8242";
            else if (cormz === 'ZU 1 (CCS1)') corzona = "#ef8242";
            else if (cormz === 'ZU 1 (CCS2)') corzona = "#ef8242";
            else if (cormz === 'ZU 2') corzona = "#e9e9a8";
            else if (cormz === 'ZU 2 (CCS1)') corzona = "#e9e9a8";
            else if (cormz === 'ZU 2 (CCS2)') corzona = "#e9e9a8";
            else if (cormz === 'ZU 2 (CCS3)') corzona = "#e9e9a8";
            else if (cormz === 'ZU 2 (Artigo 80)') corzona = "#e9e9a8";
            else if (cormz === 'ZU 3') corzona = "#ffff00";
            else if (cormz === 'ZU 3 (CCS1)') corzona = "#ffff00";
            else if (cormz === 'ZU 3 (CCS2)') corzona = "#ffff00";
            else if (cormz === 'ZU 4') corzona = "#deb239";
            else if (cormz === 'ZU 4 (CCS1)') corzona = "#deb239";
            else if (cormz === 'ZU 4 (CCS2)') corzona = "#deb239";
            else if (cormz === 'ZU 5') corzona = "#8c8a23";
            else if (cormz === 'ZU 5 (CCS1)') corzona = "#8c8a23";
            else if (cormz === 'ZU 5 (CCS2)') corzona = "#8c8a23";
            else corzona = "#fff";
            return { stroke: false, fillColor: corzona, fillOpacity: 0.4 };
        },

        onEachFeature: (feature, layer) => {
            layer.bindPopup(
                '<strong>' + 'Zona: ' + feature.properties.abrevia + '</strong>' + '<br/>' +
                '<table>' +
                '<tr>' +
                '<td>' +
                'Usos permitidos: ' + feature.properties.permitidos + '<br/>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                'Usos permissíveis: ' + feature.properties.permissiv + '<br/>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                'Altura máxima: ' + feature.properties.alturamax + '<br/>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                'Altura máxima do embasamento: ' + feature.properties.alturaemb + '<br/>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                'Coeficiente de aproveitamento: ' + feature.properties.coefaprov + '<br/>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                'Taxa de ocupação embasamento: ' + feature.properties.toemb + '<br/>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                'Taxa de ocupação torre: ' + feature.properties.totorre + '<br/>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                'Taxa de permeabilidade: ' + feature.properties.permeab + '<br/>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                'Recuo frontal: ' + feature.properties.embrecfron + '<br/>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                'Recuos laterais e fundos: ' + feature.properties.embreclat + '<br/>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                'Recuos laterais e fundos com aberturas: ' + feature.properties.embreclatc + '<br/>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                'Área mínima do lote: ' + feature.properties.lotemaxare + '<br/>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                'Testada mínima do lote: ' + feature.properties.lotemaxtes + '<br/>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>' +
                'Profundidade mínima do lote: ' + feature.properties.lotemaxpro +
                '</td>' +
                '</tr>' +
                '</table>'
            )
        },
        pane: 'camadaB'
    }).addTo(plantaZoneamento);
});

//CCS
$.getJSON("camadas/data/zon2012ccs.geojson", (data) => {
    L.geoJson(data, {
        style: (feature) => {
            var corlinhaccs,
                corcss = feature.properties.tipo;
            if (corcss == 'CCS1') corlinhaccs = "#ff0000";
            else if (corcss == 'CCS2') corlinhaccs = "#723900";
            else if (corcss == 'CCS3') corlinhaccs = "#b82e00";
            else corlinhaccs = "#fff";
            return { color: corlinhaccs, weight: 5, Opacity: 0.4, interactive: false };
        },
        interactive: false
    }).addTo(plantaZoneamento);
});
mapa.addLayer(plantaZoneamento);