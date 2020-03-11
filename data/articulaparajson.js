const fs = require('fs')
const articula = JSON.parse(fs.readFileSync('./articula.geojson', 'utf8'));

let transform = articula.features.map((x) => {
    return {
        'nome': x.properties.nome,
        'sw': [x.properties.y2, x.properties.x2],
        'ne': [x.properties.y, x.properties.x]
    }
});

fs.writeFile('./artic.json', JSON.stringify(transform, null, 2), (err) => {
    if (err) throw err;
    console.log(' gravado');
});