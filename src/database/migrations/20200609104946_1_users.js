
exports.up = function(knex) {

    return knex.schema.createTable( 'users', table => {
        
        table.increments( 'id' ).primary();
        table.string( 'name' ).notNullable();
        table.string( 'email' ).notNullable();
        table.string( 'phone' ).notNullable();
        table.string( 'password' ).notNullable();
        table.string( 'token' );

        table.timestamp( 'create_at' ).defaultTo( knex.fn.now() );
    } );
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists( 'users' );
}
