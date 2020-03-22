const fs = require('fs-extra')

fs.emptyDirSync('exportMalha');

console.log('## removidos arquivos antigos da pasta');

const malha = JSON.parse(fs.readFileSync('/mnt/c/Users/jaceguay/temp/plantacadastralMalha.geojson', 'utf8'));

let contador = Object.keys(malha.features).length;
let totalitens = {};
malha.features.forEach((articula) => {
    contador -= 1;
    if (totalitens[articula.properties.nome] === undefined) {
        totalitens[articula.properties.nome] = [{
            "type": "Feature",
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [articula.geometry.coordinates[0]]
            },
            "properties": {
                "inscrlig": String(articula.properties.inscrlig),
                "c": String(articula.properties.c)
            }
        }];
    } else {
        totalitens[articula.properties.nome].push(
            {
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": [articula.geometry.coordinates[0]]
                },
                "properties": {
                    "inscrlig": String(articula.properties.inscrlig),
                    "c": String(articula.properties.c)
                }
            }
        );
    };
    if (contador === 0) {
        for (const property in totalitens) {
            fs.writeFile(`exportMalha/${String(property)}.geojson`, JSON.stringify(totalitens[property]), (err) => {
                if (err) throw err;
            });
        };
    };
});