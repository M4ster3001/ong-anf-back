import con from '../database/connection'

export default class Animals {

    async index( req, res ) {

        const { order = "asc", limit = 10 }  = req.query;

        try {
            const lstAnimals = await con( 'animals' )
            .where( 'status', '0' )
            .select( 'id', 'name', 'city', 'state', 'info' )
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

        const data = await con( 'animals' )
        .join( 'users', 'animals.id_keeper', '=', 'users.id' )
        .where( 'animals.id', id )
        .select( 'users.name', 'animals.name', 'animals.age', 'animals.info', 'animals.city', 'animals.state', 'animals.id_finder', 'animals.status'  )
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

    }

    async create( req, res ) {

        let { name, age, info, city, state, url_image, id_keeper } = req.body;

        name = name.normalize( 'NFD' ).replace( /([^\u0300-\u036f0-9a-zA-Z/\s{1,}])/g, '' );
        age = age.replace( /([^0-9])/g, '' );
        info = info.normalize( 'NFD' ).replace( /([^\u0300-\u036f0-9a-zA-Z/\s{1,}])/g, '' );
        city = city.normalize( 'NFD' ).replace( /([^\u0300-\u036f0-9a-zA-Z/\s{1,}])/g, '' );
        state = state.replace( /([^0-9a-zA-Z/\s{1,}])/g, '' );

        const trx = await con.transaction();

        const animal = await trx( 'animals' ).insert({ name, age, info, city, state, url_image, status: false, id_keeper});

        await trx.commit();

        if( !animal ) {
            
            return res.status( 400 ).json({ message: 'Não foi possível cadastrar' })
        }

        return res.json( animal[0] );

    }
    
    async update( req, res ) {
        let { name, age, info, city, state, url_image, status } = req.body;
        const { id, id_finder } = req.params;

        
        if( name || age || info || city || state || url_image || status ) {

            name = name && name.normalize( 'NFD' ).replace( /([^\u0300-\u036f0-9a-zA-Z/\s{1,}])/g, '' );
            age = age && age.replace( /([^0-9])/g, '' );
            info = info && info.normalize( 'NFD' ).replace( /([^\u0300-\u036f0-9a-zA-Z/\s{1,}])/g, '' );
            city = city && info.normalize( 'NFD' ).replace( /([^\u0300-\u036f0-9a-zA-Z/\s{1,}])/g, '' );
            state = state && info.replace( /([^0-9a-zA-Z/\s{1,}])/g, '' );

            console.log( id, name, age, info, city, state )

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
            throw er;
        }

    }

    
}