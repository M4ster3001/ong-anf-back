
exports.up = function(knex) {
    return knex.schema.createTable( 'states', table => {
        table.increments( 'id' ).primary();
        table.string( 'name' ).notNullable();
        table.string( 'uf' ).notNullable();

        table.timestamp( 'updated_at' ).defaultTo( knex.fn.now() );  
        table.timestamp( 'created_at' ).defaultTo( knex.fn.now() );  
    } );
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists( 'states' );
};
