const fs = require('fs');

let dgeom = { "features": [] };
let dpesquisa = { "features": [] };

function viasgeom(arquivo) {
    let conteudogeom = JSON.parse(fs.readFileSync(arquivo, 'utf8'));
    for (const key in conteudogeom.features) {
        dgeom.features.push({
            //'type': 'Feature',
            'geometry': {
                'type': 'MultiLineString',
                'coordinates': conteudogeom.features[key].geometry.coordinates
            },
            'properties': conteudogeom.features[key].properties
        });
    };
};

function viaspesquisa(arquivo) {
    let conteudopesquisa = JSON.parse(fs.readFileSync(arquivo, 'utf8'));
    for (const key in conteudopesquisa.features) {
        dpesquisa.features.push({
            'properties': conteudopesquisa.features[key].properties
        });
    };
};

(async () => {
    /*
    await viasgeom('sviarioGeomback.geojson');
    fs.writeFile(`sviarioGeom.geojson`, JSON.stringify(dgeom), (err) => {
        if (err) throw err;
    });
    */
    console.log('geometria gravada')

    await viaspesquisa('sistemaViarioPesquisa.geojson');
    fs.writeFile(`pesquisa.geojson`, JSON.stringify(dpesquisa), (err) => {
        if (err) throw err;
    });
    console.log('relação pesquisa gravada')
})();