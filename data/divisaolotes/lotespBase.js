const fs = require('fs-extra')

fs.emptyDirSync('./exportTabela/003');
fs.emptyDirSync('./exportTabela/005');
fs.emptyDirSync('./exportTabela/201');
fs.emptyDirSync('./exportTabela/202');
fs.emptyDirSync('./exportTabela/203');
fs.emptyDirSync('./exportTabela/204');
fs.emptyDirSync('./exportTabela/211');
fs.emptyDirSync('./exportTabela/212');
fs.emptyDirSync('./exportTabela/214');
fs.emptyDirSync('./exportTabela/215');
fs.emptyDirSync('./exportTabela/216');
fs.emptyDirSync('./exportTabela/221');

console.log('## removidos arquivos antigos da pasta');

const plantaLotes = JSON.parse(fs.readFileSync('/mnt/c/Users/jaceguay/temp/plantacadastralDv.geojson', 'utf8'));

let contador = Object.keys(plantaLotes.features).length;
let totalitens = [];
plantaLotes.features.forEach((lote) => {
    contador -= 1;
    if (totalitens[lote.properties.inscrlig] === undefined) {
        totalitens[lote.properties.inscrlig] = [{
            "type": "Feature",
            "geometry": lote.geometry,
            "properties": {
                "ninscrao": lote.properties.ninscrao,
                "ncodimov": lote.properties.ncodimov,
                "nrazaoso": lote.properties.nrazaoso,
                "nlogrado": lote.properties.nlogrado,
                "nnumimov": lote.properties.nnumimov,
                "ncomplem": lote.properties.ncomplem,
                "nnomebai": lote.properties.nnomebai,
                "ntestapr": lote.properties.ntestapr,
                "nmfundos": lote.properties.nmfundos,
                "nareater": lote.properties.nareater,
                "nmatricu": lote.properties.nmatricu,
                "ncodcont": lote.properties.ncodcont,
                "nfracaoi": lote.properties.nfracaoi,
                "ntipopes": lote.properties.ntipopes,
                "inscrlig": lote.properties.inscrlig,
                "zon2012": lote.properties.zon2012,
                "zon2012alt": lote.properties.zon2012alt,
                "reaeroporto": lote.properties.reaeroporto === null ? null : lote.properties.reaeroporto.trim(),
                "redeptransito": lote.properties.redeptransito === null ? null : lote.properties.redeptransito.trim(),
                "reambiental": lote.properties.reambiental === null ? null : lote.properties.reambiental.trim(),
                "rerodovias": lote.properties.rerodovias === null ? null : lote.properties.rerodovias.trim(),
                "via1": lote.properties.via1,
                "viasecao": lote.properties.viasecao
            }
        }];
    } else {
        totalitens[lote.properties.inscrlig].push(
            {
                "properties": {
                    "ncodimov": lote.properties.ncodimov,
                    "nrazaoso": lote.properties.nrazaoso,
                    "ntipopes": lote.properties.ntipopes,
                    "ncodcont": lote.properties.ncodcont,
                    "ncomplem": lote.properties.ncomplem,
                    "nfracaoi": lote.properties.nfracaoi
                }
            }
        );
    };
    if (contador === 0) {
        for (const property in totalitens) {
            //console.log(totalitens[property][0].properties.inscrlig);
            fs.writeFile(`./exportTabela/${String(totalitens[property][0].properties.inscrlig.substring(0, 3))}/${String(totalitens[property][0].properties.inscrlig)}.geojson`, JSON.stringify(totalitens[property], null, 2), (err) => {
                if (err) throw err;
            });
        };
    };
});