import con from '../database/connection';

export default class States {

    async states( req, res) {
        const lsStates = await con( 'states' ).select( 'uf' );

        return res.json( lsStates );
    }

    async cities( req, res) {
        const { uf } = req.params;

        const lsCities = await con( 'cities' ).select( 'name' ).where( 'uf', uf ).orderBy( 'name_order', 'ASC' );

        return res.json( lsCities );
    }
}