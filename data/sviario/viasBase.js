const fs = require('fs-extra')

fs.emptyDirSync('exportTabela');

console.log('## removidos arquivos antigos da pasta');

const sviario = JSON.parse(fs.readFileSync('/mnt/c/Users/jaceguay/temp/sistemaViarioIDv.geojson', 'utf8'));

let contador = Object.keys(sviario.features).length;
let totalitens = {};
sviario.features.forEach((via) => {
    contador -= 1;
    codvia = via.properties.cod + '.' + via.properties.secao;
    if (totalitens[codvia] === undefined) {
        totalitens[codvia] = {
            "type": "Feature",
            "geometry": {
                "type": "MultiLineString",
                "coordinates": [via.geometry.coordinates[0]]
            },
            "properties": {
                "nome": via.properties.nome,
                "cod": via.properties.cod,
                "secao": via.properties.secao,
                "ptotalvia": via.properties.ptotalvia,
                "ppasseio1": via.properties.ppasseio1,
                "ppasseio2": via.properties.ppasseio2,
                "leidata": via.properties.leidata
            }
        };
    } else {
        totalitens[codvia].geometry.coordinates.push(
            via.geometry.coordinates[0]
        );
    };
    if (contador === 0) {
        for (const property in totalitens) {
            //console.log(totalitens[property]);
            fs.writeFile(`exportTabela/${String(totalitens[property].properties.cod)}.${String(totalitens[property].properties.secao)}.geojson`, JSON.stringify(totalitens[property]), (err) => {
                if (err) throw err;
            });
        };
    };
});