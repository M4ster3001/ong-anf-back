require( 'dotenv' ).config({ path: 'variables.env' })

console.clear();

import app from './app';

app.set( 'PORT', process.env.PORT || 7000 );

if( app.listen() ) {

    let server = app.listen();
    server.close();
}

const server = app.listen( app.get( 'PORT' ), () => { console.log( `Servidor rodando na porta ${ app.get( 'PORT' ) }` ) } )