import con from '../database/connection';
import crypto from 'crypto';
import bCrypt from 'bcrypt';
import { validationResult } from 'express-validator'
const salts = 12;

export default class Users {

    async login( req, res ) {

        const errors = validationResult( req );
        if (!errors.isEmpty()) {
            return res.status( 422 ).json({ errors: errors.array() });
        }

        let { email, password } = req.body;
            
        if( !email || !password ){
            
            return res.status( 400 ).json({ error: 'Ocorreu um erro ao problema, tente novamente' });
        }
        
        try {
            
            const login = await con( 'users' )
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
                const query = await con( 'users' ).where( 'id', resp.id ).update({ token })

                if( !query ) {
                    return res.status( 400 ).json({ error: 'Ocorreu um erro no acesso código 3' });
                }
    
                return res.json({ token: token });
            } )

        } catch( er ){

            return res.json({ message: `Ocorreu um erro no login, tente novamente` });
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

        let auth = req['headers']['authorization'].replace( 'Bearer', '' ).trim();

        try {

            const data = await con( 'users' ).where( 'token', auth ).select( 'id', 'name', 'email', 'phone' ).first();

            if( !data ) {
                return res.status( 400 ).json({ error: 'Usuário não localizado' });
            }

            return res.json( data );

        }catch( er ) {

            return res.status( 400 ).json({ message: 'Ocorreu um erro ao buscar os dados do usuário' });
        }

    }

    async create( req, res ) {

        const errors = validationResult( req );
        if (!errors.isEmpty()) {
            return res.status( 422 ).json({ errors: errors.array() });
        }

        let { user_name: name, email, phone, password } = req.body;

        const token = crypto.randomBytes( 12 ).toString( 'HEX' );

            name = name.normalize( 'NFD' ).replace( /([^\u0300-\u036f0-9a-zA-Z/\s{1,}])/g, '' );
            phone = phone.replace( /([^0-9])/g, '' );
            password = password.trim();

            password = bCrypt.hashSync( password, salts );

            try{

                const query = await con( 'users' ).insert({ name, email, phone, password, token });

                if( !query ) {
                    return res.status( 400 ).json({ error: 'Ocorreu um erro ao cadastrar o usuario' });
                } 

                return res.json( token );

            } catch( er ){

                return res.status( 400 ).json({ message: 'Ocorreu um erro ao salvar o usuário' });
            }

    }
    
    async update( req, res ) {

        const errors = validationResult( req );
        if (!errors.isEmpty()) {
            return res.status( 422 ).json({ errors: errors.array() });
        }

        let { user_name: name, email, phone, old_password, password } = req.body;
        const { id } = req.params;
    
        if( name || email || phone || ( password & old_password ) ) {
            
            name = name && name.normalize( 'NFD' ).replace( /([^\u0300-\u036f0-9a-zA-Z/\s{1,}])/g, '' );
            phone = phone && phone.replace( /([^0-9])/g, '' );
            
            if( password && old_password ) {

                password = password && password.trim();          
                password = bCrypt.hashSync( password, salts );

                old_password = old_password && old_password.trim();        

                const compare_pwd = await con( 'users' ).where( 'id', id ).select( 'password' ).first();

                if( !bCrypt.compareSync( old_password, compare_pwd.password ) ) {

                    return res.json({ error: 'Senha antiga incorreta' });
                }

            }

            try {

                const query = await con( 'users' ).where( 'id', id ).update({ name, email, phone, password });

                if( !query ) {
                    return res.status( 400 ).json({ error: 'Erro ao atualizar os dados do usuário' }); 
                }

                return res.json({ message: 'Sucesso ao atualizar os dados!!!' });

            } catch( er ){

                return res.status( 400 ).json({ message: 'Ocorreu um erro ao atualizar os dados' });
            }

        } else if( validadeEmail.test( email ) === false ){

            return res.status( 400 ).json({ message: 'Formato de e-mail inválido' });
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

            return res.status( 400 ).json({ message: 'Ocorreu um erro ao deletar o registro' });
        }

    }
    
}