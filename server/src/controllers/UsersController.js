import con from '../database/connection';
import crypto from 'crypto';
import bCrypt from 'bcrypt';
const salts = 12;

export default class Users {

    async login( req, res ) {

        let { email, password } = req.body;
        email = email.trim();

        const trx = con.transaction();

        if( !email || !password ){

            return res.status( 400 ).json({ error: 'Ocorreu um erro ao problema, tente novamente' });
        }

        try {

            const login = await trx( 'users' )
            .where({ email })
            .select( 'id', 'password' )
            .first()
            .then( async( resp ) => {

                if( !resp ) {

                    return res.status( 400 ).json({ error: 'Usuário não localizado' });
                }

                if( !bCrypt.compareSync( password, resp.password ) ) {

                    return res.status( 400 ).json({ error: 'Login ou senha inválidos' });
                }

                const token = crypto.randomBytes( 12 ).toString( 'HEX' );
                const query = await trx( 'users' ).where( 'id', resp.id ).update({ token })

                if( !query ) {
                    return res.status( 400 ).json({ error: 'Ocorreu um erro no acesso código 3' });
                }

                await trx.commit();
    
                return res.json({ token: token });
            } )

        } catch( er ){

            throw er;
        }
        
    }

    async index ( req, res ) {

        const lst = await con( 'users' ).select( '*' );

        if( lst.length === 0 ) {
            return res.status( 400 ).json({ error: 'Não há usuários cadastrados' });
        }

        return res.json( lst );
    }

    async show( req, res ) {

        const { id } = req.params;

        try {
            const data = await con( 'users' ).where( 'id', id ).select( 'id', 'name', 'email', 'phone' ).first();

            if( !data ) {
                return res.status( 400 ).json({ error: 'Usuário não localizado' });
            }

            return res.json( data );

        }catch( er ) {
            throw er;
        }

    }

    async create( req, res ) {
        let { name, email, phone, password } = req.body;

        const token = crypto.randomBytes( 12 ).toString( 'HEX' );

        name = name.trim();
        email = email.trim();
        phone = phone.trim();
        password = password.trim();

        password = bCrypt.hashSync( password, salts );

        try{

            const query = await con( 'users' ).insert({ name, email, phone, password });

            if( !query ) {
                return res.status( 400 ).json({ error: 'Ocorreu um erro ao cadastrar o usuario' });
            } 

            return res.json( token );

        } catch( er ){
            throw er;
        }

    }
    
    async update( req, res ) {

        let { name, email, phone, password } = req.body;
        const { id } = req.params;
    
        if( name || email || phone || password ) {
            
            name = name && name.trim();
            email = email && email.trim();
            phone = phone && phone.trim();
            
            if( password ) {
                password = password && password.trim();
            
                password = bCrypt.hashSync( password, salts );
            }

            const query = await con( 'users' ).where( 'id', id ).update({ name, email, phone, password });

            if( !query ) {
                return res.status( 400 ).json({ error: 'Erro ao atualizar os dados do usuário' }); 
            }

            return res.json({ message: 'Sucesso ao atualizar os dados!!!' });

        }

    }

    async del( req, res ) {

        const { id } = req.params;

        try {
            let query = await con( 'users' ).where( 'id', id ).delete();
            
            if( !query ) {
                return res.status( 400 ).json({ error: 'Não foi possível deletar o usuário' });
            }

            return res.status( 204 ).send();

        } catch( er ) {
            throw er ;
        }

    }
    
}