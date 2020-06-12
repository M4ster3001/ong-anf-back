import con from '../database/connection';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util'

import aws from 'aws-sdk'
const s3 = new aws.S3()

export default class Animals {

    async index( req, res ) {

        const { order = "asc", limit = -1, page = '' }  = req.query;
        const { id } = req.params;
        const offset = page * limit;

        let lstAnimals;
        let qtdeAnimals;
        let arr = [];

        try {

            if( !id ) {

                lstAnimals = await con( 'animals' )
                .where( 'status', '0' )
                .select( 'id', 'name', 'age', 'url_image', 'info', 'city', 'state' )
                .offset( offset )
                .limit( limit )
                .orderBy( 'id', order ).then( resp => {

                    resp.forEach( async res => {

                        arr.push({ 'animal': res,  'contact_user': '' });
                    } )
                } );

                qtdeAnimals = await con( 'animals' )
                .where( 'status', '0' )
                .count( 'id', { as: 'qtde' } );

            } else {

                lstAnimals = await con( 'animals' )
                .where( 'id_keeper', id )
                .select( 'id', 'name', 'age', 'url_image', 'info', 'city', 'state', 'status', 'id_finder' )
                .offset( offset )
                .limit( limit )
                .orderBy( 'id', order ).then( async resp => {

                    resp.forEach(async (res) => {
                        if (res.id_finder) {

                            let user_found = await con('users').where('id', res.id_finder).select('name', 'phone', 'email').first();
                            arr.push({ 'animal': res, 'contact_user': user_found });

                        }
                        else {

                            arr.push({ 'animal': res, 'contact_user': '' });

                        }
                    })
                } );

                qtdeAnimals = await con( 'animals' )
                .where( 'id_keeper', id )
                .count( 'id', { as: 'qtde' } );
            }

            if( !arr ){

                return res.status( 400 ).json({ message: 'Nenhum animal perdido' });
            }

            return res.json({ 'lstAnimals': arr, qtdeAnimals});
        } catch( er ) {

            return res.status( 400 ).json( `Ocorreu um erro ao listar os animais ${ er }` );
        }

    }

    async show( req, res ) {
        const { id } = req.params;
        let contact_finder;

        try {

            const data = await con( 'animals' )
            .join( 'users', 'animals.id_keeper', '=', 'users.id' )
            .where( 'animals.id', id )
            .select( 
                'users.name', 
                'animals.name', 
                'animals.age', 
                'animals.url_image', 
                'animals.info', 
                'animals.city', 
                'animals.state', 
                'animals.id_finder', 
                'animals.status'  
            )
            .first();

            if( !data ){

                return res.status( 400 ).json({ message: 'Animalzinho não localizado' });
            }

            if( data.id_finder ) {

                contact_finder = await con( 'users' ).where( 'id', data.id_finder ).select( 'email', 'phone' ).first();
                
                if( !contact_finder ){

                    return res.status( 400 ).json({ message: 'O usuário que notifico não foi encontrado' });
                }
            }

            return res.json({ data, contact_finder });

        }catch ( er ) {

            return res.status( 400 ).json({ message: `Ocorreu um erro ao buscar o registro, tente novamente` });
        }

    }

    async create( req, res ) {

        let { name, age, info, city, uf: state, id_keeper } = req.body;
        let{ originalname, size, key, location: url = "" } = req.file;

        let auth = req['headers']['authorization'].replace( 'Bearer', '' ).trim();

        name = name.normalize( 'NFD' ).replace( /([^\u0300-\u036f0-9a-zA-Z/\s{1,}])/g, '' );
        age = age.replace( /([^0-9a-zA-Z/\s{1,}])/g, '' );
        info = info.normalize( 'NFD' ).replace( /([^\u0300-\u036f0-9a-zA-Z/\s{1,}])/g, '' );
        city = city && city.normalize( 'NFD' ).replace( /([^\u0300-\u036f0-9a-zA-Z/\s{1,}])/g, '' );
        state = state && state.replace( /([^0-9a-zA-Z/\s{1,}])/g, '' );

        if( !url ) {
            url = ( process.env.NODE_DEV == 'DEVELOPMENT' ? process.env.PATH_LOCAL + key : key ) 
        }
        
        const data = await con( 'users' ).where( 'token', auth ).select( 'id' ).first();

        const url_image = url;

        try {

            const trx = await con.transaction();

            const animal = await trx( 'animals' ).insert({ 
                name, 
                age, 
                info, 
                city, 
                state, 
                url_image, 
                status: false, 
                id_keeper: data.id
            }).catch( async er => {
                
                await trx.rollback();
                await trx.commit();

                console.log( er );
                return res.status( 400 ).json({ message: 'Ocorreu um erro ao registrar o caso no banco, tente novamente' })
            } );

            await trx.commit();

            if( !animal ) {
                
                return res.status( 400 ).json({ message: 'Não foi possível cadastrar' })
            }

            return res.json({ id: animal[0] });

        }catch ( er ) {

            return res.status( 400 ).json({ message: `Ocorreu um erro ao salvar o desaparecimento, tente novamente` });
        }

    }
    
    async update( req, res ) {

        let { name, age, info, city, state, status } = req.body;
        let flg_back = 0;

        const { id } = req.params;
        let url_image;
        
        if( req.file ) {
            let{ originalname, size, key, location: url = "" } = req.file;
            
            if( !url ) {
                url = ( process.env.NODE_DEV == 'DEVELOPMENT' ? process.env.PATH_LOCAL + key : key ) 
            }

            url_image = url;
        }
        
        
        if( req['headers']['authorization'] ) {

            let auth = req['headers']['authorization'].replace( 'Bearer', '' ).trim();
            let path = req.route.path;
            
            let id_finder = 0;
            
            if( auth && path === '/animals/found/:id') {
                
                id_finder = await con( 'users' ).where( 'token', auth ).select( 'id' ).first();
                id_finder = id_finder.id;
                status = true;
                
            }

            if( auth && path === '/animals/notfound/:id') {
                status = false;
                id_finder = 0;
                flg_back = 1;
            }

            console.log( name, age, info, city, state, status, id_finder )

            
            if( name || age || info || city || state || url_image || status  || id_finder  || flg_back == 1 ) {
                
                name = name && name.normalize( 'NFD' ).replace( /([^\u0300-\u036f0-9a-zA-Z/\s{1,}])/g, '' );
                age = age && age.replace( /([^0-9a-zA-Z/\s{1,}])/g, '' );
                info = info && info.normalize( 'NFD' ).replace( /([^\u0300-\u036f0-9a-zA-Z/\s{1,}])/g, '' );
                city = city && city.normalize( 'NFD' ).replace( /([^\u0300-\u036f0-9a-zA-Z/\s{1,}])/g, '' );
                state = state && state.replace( /([^0-9a-zA-Z/\s{1,}])/g, '' );
                
                let animal = { 
                    name, 
                    age, 
                    info, 
                    city, 
                    state, 
                    url_image, 
                    status, 
                    id_finder 
                };

                try {

                    const upd = await con( 'animals' )
                    .where( 'id', id )
                    .update( animal )
                    .catch( er => {

                        console.log( er );
                    } );

                    if( !upd ) {
                    
                        return res.status( 400 ).json({ message: 'Não foi possível atualizar o cadastro' })
                    }
            
                    return res.json({ message: 'Dados atualizados' });

                } catch( er ) {

                    return res.json({ error: 'Ocorreu um erro ao atualizar os dados' })
                }

            }

        } else {

            return res.status( 401 ).json({ message: 'Não autorizado' })
        }


    }

    async del( req, res ) {

        const { id } = req.params;
        let delete_file;

        try {

            const data_image = await con( 'animals' ).where( 'id', id).select( 'url_image' ).first();
            
            const del = await con( 'animals' ).where( 'id', id ).delete();

            if( !del ) {
            
                return res.status( 400 ).json({ message: 'Não foi possível deletar o registro' })
            }
            
            if( process.env.STORAGE_TYPE === 's3' && data_image.url_image){

                let path_aws = `https://${process.env.BUCKET}.${process.env.STORAGE_TYPE}.amazonaws.com/`;

                delete_file = s3.deleteObject({
                    Bucket: process.env.BUCKET,
                    Key: data_image.url_image.replace( path_aws, '' )
                }).promise();
                
            } else if( process.env.STORAGE_TYPE == 'local' && data_image.url_image ) {
                
                promisify( fs.unlink )( path.resolve( __dirname, '..', '..', 'uploads', data_image.url_image.replace( process.env.PATH_LOCAL, '' ) ) )
            }


            return res.status( 204 ).send(); 

        } catch ( er ) {

            return res.status( 400 ).json({ message: 'Ocorreu um erro ao deletar o registro' })
        }

    }

    
}