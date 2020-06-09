import app from '../app';
import supertest from 'supertest';


const req = supertest( app );

test( 'Testando jest', () => {

    expect(1).toBe(1);
} )

test( 'Testando o ASYNC', async() => {  } );

test( 'Verificando routes get', async() => {
    const resp = await req.get( '/' ).expect( 200 );

    expect( resp.res.statusMessage ).toBe( 'Ok get' );
} )

test( 'Verificando routes post', async() => {
    const resp = await req.post( '/' ).expect( 200 );

    expect( resp.res.statusMessage ).toBe( 'Ok post' );
} )