
exports.up = function(knex) {
    return knex.schema.createTable( 'cities', table => {
        table.increments( 'id' ).primary();
        table.string( 'name' ).notNullable();
        table.string( 'name_order' ).notNullable();

        table.string( 'uf' );

        table.timestamp( 'updated_at' ).defaultTo( knex.fn.now() );  
        table.timestamp( 'created_at' ).defaultTo( knex.fn.now() );  
    } );
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists( 'cities' );
};
