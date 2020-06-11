import con from '../database/connection'

export default class Animals {

    async index( req, res ) {

        const { order = "asc", limit = 10 }  = req.query;

        try {

            const lstAnimals = await con( 'animals' )
            .where( 'status', '0' )
            .select( 'id', 'name', 'age', 'url_image', 'info', 'city', 'state' )
            .limit( limit )
            .orderBy( 'id', order );

            if( !lstAnimals ){

                return res.status( 400 ).json({ message: 'Nenhum animal perdido' });
            }

            return res.json( lstAnimals );
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
            url = ( process.env.NODE_DEV == 'DEV' ? process.env.PATH_LOCAL + key : '' ) 
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
        let { name, age, info, city, state, url_image, status } = req.body;
        const { id, id_finder } = req.params;

        
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
                id_finder 
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


    }

    async del( req, res ) {
        const { id } = req.params;

        try {
            const del = await con( 'animals' ).where( 'id', id).delete();

            if( !del ) {
            
                return res.status( 400 ).json({ message: 'Não foi possível deletar o registro' })
            }

            return res.status( 204 ).send(); 

        } catch ( er ) {

            return res.status( 400 ).json({ message: 'Ocorreu um erro ao deletar o registro' })
        }

    }

    
}