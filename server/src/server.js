require( 'dotnev' ).config({ path: 'variables.env' });

import app from './app';

app.set( 'PORT', process.env.PORT || 7000 );

if( app.listen() ) {

    let server = app.listen();
    server.close();
}

const server = app.listen( app.get( 'port' ), () => { `Servidor rodando na porta ${ app.get( 'port' ) }` } )