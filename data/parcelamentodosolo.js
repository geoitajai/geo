parcelamentodosolo = L.featureGroup();
let parcelamentodestaque = L.featureGroup().addTo(mapa);
loteresultado = false;
parcelamentodosolo_chk = true;

let colunasparcelamento = [
    {
        title: 'Nome',
        field: 'nome',
        headerFilter: 'input',
        width: 200,
        cellClick: (e, cell) => {
            parcelamentodestaque.clearLayers();
            mapa.closePopup();
            parcelamentodados.query()
                .limit(1)
                .precision(5)
                .fields(['objectid'])
                .where(`codigo = '${cell._cell.row.data.id}'`)
                .run((error, lnparc) => {
                    L.geoJson(lnparc, {
                        style: (feature) => {
                            return {
                                weight: 5,
                                color: "blue",
                                dashArray: "30 10",
                                fill: false
                            };
                        }
                    }).addTo(parcelamentodestaque);
                    mapa.flyToBounds(parcelamentodestaque.getBounds(), {
                        maxZoom: 19
                    });
                })
        }
    },
    {
        title: 'Descrição',
        field: 'descr',
        width: 100
    },
    {
        title: 'Lei',
        field: 'lei',
        width: 80
    }, {
        title: 'Setor',
        field: 'setor',
        width: 65
    }, {
        title: 'Carimbo',
        field: 'carimboapr',
        width: 90
    }, {
        title: 'prancha(s)',
        formatter: 'link',
        width: 130,
        formatterParams: {
            labelField: 'rotulolink',
            urlField: 'linkprancha',
            target: '_blank'
        }
    }, {
        title: 'cód.',
        field: 'id',
        width: 60
    }
];

table.setColumns(colunasparcelamento);

function parcDestaque(e) {
    parcelamentodestaque.clearLayers();
    L.geoJson(e.sourceTarget.feature, {
        style: (feature) => {
            return {
                weight: 5,
                color: "blue",
                dashArray: "30 10",
                fill: false
            };
        }
    }).addTo(parcelamentodestaque);
    table.deselectRow();
    table.selectRow(e.target.feature.properties.codigo);
    table.scrollToRow(e.target.feature.properties.codigo);
    L.popup()
        .setLatLng(e.latlng)
        .setContent(
            e.target.feature.properties.nome
        ).openOn(mapa);
};

//camada e tabela parcelamento
let dadosparcelamento = L.esri.query({
    url: 'https://arcgis.itajai.sc.gov.br/server/rest/services/Hosted/loteamentos_urbanismo_visualizacao/FeatureServer/0/'
});

dadosparcelamento.returnGeometry(false)
    .run((error, linhas) => {
        linhas.features.forEach(el => {
            let linkprancha;
            let rotulolink;
            if (el.properties.googleid == '') {
                linkprancha = '';
                rotulolink = 'prancha pendente';
            } else {
                linkprancha = `https://drive.google.com/file/d/${el.properties.googleid}/view`;
                rotulolink = 'clique para visualizar';
            };
            tabelaparcelamento.push({
                'nome': el.properties.nome,
                'descr': el.properties.descr,
                'lei': el.properties.lei,
                'setor': el.properties.setor,
                'carimboapr': el.properties.carimboapr,
                'linkprancha': linkprancha,
                'rotulolink': rotulolink,
                'id': el.properties.codigo,
            });
        });
        table.setData(tabelaparcelamento);
    });

function inteParc(feature, layer) {
    layer.on({
        click: parcDestaque
    });
};

//serviço esri
let parcelamentodados = L.esri.featureLayer({
    url: 'https://arcgis.itajai.sc.gov.br/server/rest/services/Hosted/loteamentos_urbanismo_visualizacao/FeatureServer/0/',
    fields: ['objectid', 'nome', 'codigo'],
    precision: 5,
    pane: 'marker_overlay',
    style: () => {
        return {
            color: '#00264d',
            fillColor: '#99ccff',
            fillOpacity: 0.5,
            weight: 2
        };
    },
    onEachFeature: inteParc
}).addTo(parcelamentodosolo);

mapa.addLayer(parcelamentodosolo);