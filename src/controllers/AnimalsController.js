import con from '../database/connection';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util'

import aws from 'aws-sdk'
const s3 = new aws.S3()

export default class Animals {

    async index( req, res ) {

        const { order = "asc", limit = 10 }  = req.query;
        const { idUser } = req.params;

        let lstAnimals;
        let qtdeAnimals;

        try {

            if( !idUser ) {

                lstAnimals = await con( 'animals' )
                .where( 'status', '0' )
                .select( 'id', 'name', 'age', 'url_image', 'info', 'city', 'state' )
                .limit( limit )
                .orderBy( 'id', order );

                qtdeAnimals = await con( 'animals' )
                .where( 'status', '0' )
                .count( 'id', { as: 'qtde' } );

            } else {

                lstAnimals = await con( 'animals' )
                .where( 'id_keeper', idUser )
                .select( 'id', 'name', 'age', 'url_image', 'info', 'city', 'state' )
                .limit( limit )
                .count( 'id', { as: 'qtde' } )
                .orderBy( 'id', order );

                qtdeAnimals = await con( 'animals' )
                .where( 'id_keeper', idUser )
                .count( 'id', { as: 'qtde' } );
            }

            if( !lstAnimals ){

                return res.status( 400 ).json({ message: 'Nenhum animal perdido' });
            }

            return res.json({ lstAnimals, qtdeAnimals});
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

        console.log( req.body );
        console.log( req.file );

        let { name, age, info, city, state, id_keeper } = req.body;
        let{ originalname, size, key, location: url = "" } = req.file;

        name = name.normalize( 'NFD' ).replace( /([^\u0300-\u036f0-9a-zA-Z/\s{1,}])/g, '' );
        age = age.replace( /([^0-9a-zA-Z])/g, '' );
        info = info.normalize( 'NFD' ).replace( /([^\u0300-\u036f0-9a-zA-Z/\s{1,}])/g, '' );
        city = city.normalize( 'NFD' ).replace( /([^\u0300-\u036f0-9a-zA-Z/\s{1,}])/g, '' );
        state = state.replace( /([^0-9a-zA-Z/\s{1,}])/g, '' );

        if( !url ) {
            url = ( process.env.NODE_DEV == 'DEVELOPMENT' ? process.env.PATH_LOCAL + key : key ) 
        }

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
                id_keeper
            });

            await trx.commit();

            if( !animal ) {
                
                return res.status( 400 ).json({ message: 'Não foi possível cadastrar' })
            }

            return res.json( animal[0] );

        }catch ( er ) {

            return res.status( 400 ).json({ message: `Ocorreu um erro ao salvar o desaparecimento, tente novamente` });
        }

    }
    
    async update( req, res ) {

        let { name, age, info, city, state, status } = req.body;

        if( req.file ){
            
            let{ originalname, size, key, location: url = "" } = req.file;
        }

        const { id } = req.params;
        
        if( req['headers']['authorization'] ) {

            let auth = req['headers']['authorization'].replace( 'Bearer', '' ).trim();
            let path = req.route.path;
            
            let id_finder = 0;
            
            if( auth && path === '/animals/found/:id') {
                
                id_finder = await con( 'users' ).where( 'token', auth ).select( 'id' ).first();
                
            }
            
            if( !url ) {
                url = ( process.env.NODE_DEV == 'DEVELOPMENT' ? process.env.PATH_LOCAL + key : key ) 
            }

            const url_image = url;
            
            if( name || age || info || city || state || url_image || status ) {

                name = name && name.normalize( 'NFD' ).replace( /([^\u0300-\u036f0-9a-zA-Z/\s{1,}])/g, '' );
                age = age && age.replace( /([^0-9a-zA-Z])/g, '' );
                info = info && info.normalize( 'NFD' ).replace( /([^\u0300-\u036f0-9a-zA-Z/\s{1,}])/g, '' );
                city = city && info.normalize( 'NFD' ).replace( /([^\u0300-\u036f0-9a-zA-Z/\s{1,}])/g, '' );
                state = state && info.replace( /([^0-9a-zA-Z/\s{1,}])/g, '' );

                let animal = { 
                    name, 
                    age, 
                    info, 
                    city, 
                    state, 
                    url_image, 
                    status, 
                    id_finder: id_finder.id 
                };

                try {

                    const upd = await con( 'animals' ).where( 'id', id ).update( animal );

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