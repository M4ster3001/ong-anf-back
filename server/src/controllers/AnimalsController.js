import con from '../database/connection'

export default class Animals {

    async index( req, res ) {

        try {
            const lstAnimals = con( 'animals' ).select( '*' ).where( 'status', 0 );

            if( !lstAnimals ){

                return res.json({ message: 'Nenhum animal perdido' });
            }

            return res.json( lstAnimals );
        } catch( er ) {

            return res.json( `Ocorreu um erro ao listar os animais ${ er }` );
        }

    }

    async show( req, res ) {

    }

    async create( req, res ) {

        const { name, age, info, city, state, url_image } = req.body;

        const trx = await con.transaction();

        const animal = await trx( 'animals' ).insert({ name, age, info, city, state, url_image });

        await trx.commit();

        if( !animal ) {
            
            return res.json({ message: 'Não foi possível cadastrar' })
        }

        return res.json( animal[0] );

    }
    
    async update( req, res ) {

    }

    async del( req, res ) {

    }

    
}