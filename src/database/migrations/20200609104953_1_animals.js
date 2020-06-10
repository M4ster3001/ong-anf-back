
exports.up = function(knex) {

    return knex.schema.createTable( 'animals', table => {

        table.increments( 'id' ).primary();
        table.string( 'name' ).notNullable();
        table.string( 'age' );
        table.string( 'url_image' );
        table.string( 'info' ).notNullable();
        table.string( 'city' ).notNullable();
        table.string( 'state' ).notNullable();
        table.integer( 'id_finder' );
        table.boolean( 'status' ).notNullable();

        table.integer( 'id_keeper' ).notNullable();

        table.foreign( 'id_keeper' )
        .references( 'id' )
        .inTable( 'users' );

        table.timestamp( 'create_at' ).defaultTo( knex.fn.now() );
    } );
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists( 'animals' );
}
