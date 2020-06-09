const xlsxFile = require( 'read-excel-file/node' );
const fs = require( 'fs' );

console.clear();

let func =    'exports.seed = function(knex) {' + "\n"
            + "\t" + 'return knex("cities").insert([' + "\n";

let func_wdel = 'exports.seed = function(knex) {' + "\n"
            + "\t" + 'return knex("cities").truncate()'
            + '.then(() => {' + "\n"
            + "\t\t" + 'return knex("cities").insert([' + "\n";

let end =   "\n\t]);"
          + "\n};\n";

let end_wdel =   "\n\t\t]);"
                + "\n\t});"
                + "\n};\n";

let lines = "";
let oldCity = '';
let name_sem_acento = '';

let i = 0;
let j = 0;
let new_city_file = 0;

xlsxFile( './files/ibge.xlsx' ).then( ( rows ) => {
    rows.forEach( (col) => {

       console.log( `J: ${ j } ${ oldCity }` )

       if( !oldCity || oldCity != col[3] || j >= 300 ) {
           
           if( lines.trim() && oldCity != "UF" ) {

               fs.writeFileSync( `./database/seeds/cidades_${ oldCity }${ j >= 300 ? '_' + new_city_file : '' }.js`, 
               ( ( i == 1 ? func_wdel : func ) 
                + lines.trim() 
                + ( i == 1 ? end_wdel : end ) ) );
                
                console.log( `Sucess ${ oldCity } ${ i }` );
                i++;
            }

            if( j < 300 ){
                oldCity = col[3];
                new_city_file = 0;             
            } else {
                new_city_file++;
                j = 0;
            }
            
            lines = "";

        }

        name_sem_acento = col[4].normalize('NFD').replace( /([\u0300-\u036f]|[^0-9a-zA-Z/\s{2,}])/g, '' );

        lines += "\t\t\t" + `{ name: '${col[4]}', name_order: '${name_sem_acento}', uf: '${ col[3] }' },` + "\n";
        j++;

    })
    
} )