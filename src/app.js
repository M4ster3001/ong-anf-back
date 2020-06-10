import express from 'express';
import router from './routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';

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
app.use( bodyParser.urlencoded({ urlencoded: true, extended: true }) );
app.use( morgan( process.env.NODE_DEV == 'PRODUCTION' ? 'tiny' : 'dev' ) );

if( !fs.existsSync( './uploads' ) ) {
    fs.mkdirSync( './uploads' );
}

app.use( '/uploads', express.static( path.resolve( __dirname, '..', 'uploads' ) ) );

app.use( '/', router );

export default app;