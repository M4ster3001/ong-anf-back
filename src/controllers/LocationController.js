import con from '../database/connection';

export default class States {

    async states( req, res) {

        try {

            const lsStates = await con( 'states' ).select( 'uf' );

            return res.json( lsStates );

        } catch( er ) {

            return res.status( 400 ).json({ message: 'Não foi possível carregar os estados' });
        }
    }

    async cities( req, res) {
        const { uf } = req.params;

        try {
                
            const lsCities = await con( 'cities' ).select( 'name' ).where( 'uf', uf ).orderBy( 'name_order', 'ASC' );

            return res.json( lsCities );

        } catch( er ) {

            return res.status( 400 ).json({ message: 'Não foi possível carregar as cidades' });
        }
    }
}