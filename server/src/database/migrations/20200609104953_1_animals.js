
exports.up = function(knex) {

    return knex.schema.createTable( 'animals', table => {

        table.increments( 'id' ).primary();
        table.string( 'name' ).notNullable();
        table.integer( 'age' );
        table.string( 'url_image' );
        table.string( 'info' ).notNullable();
        table.string( 'city' ).notNullable();
        table.string( 'state' ).notNullable();
        table.boolean( 'status' ).notNullable();

        table.integer( 'id_user' ).notNullable();

        table.foreign( 'id_user' )
        .references( 'id' )
        .inTable( 'users' );

        table.timestamp( 'create_at' ).defaultTo( knex.fn.now() );
    } );
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists( 'animals' );
}
