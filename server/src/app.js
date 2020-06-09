import express from 'express';
import router from './routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';

console.clear();

require( 'dotenv' ).config({ path: 'variables.env' });

const app = express();

const corsOptions = {
    origin: process.env.API_URL || '*',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
    allowedHeaders: [ '*' ]
}

app.use( cors( corsOptions ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ urlencoded: true }) );
app.use( morgan( process.env.NODE_DEV == 'PRODUCTION' ? 'tiny' : 'dev' ) );

if( !fs.existsSync( './tmp/uplodas' ) ) {
    fs.mkdirSync( './tmp/uploads' );
}

app.use( '/images', expres.static( path.resolve( __dirname, '.', 'tmp', 'uploads' ) ) );

app.use( '/', router );

export default app;