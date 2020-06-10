exports.seed = function(knex) {
	return knex("cities").insert([
{ name: 'Serra do Navio', name_order: 'Serra do Navio', uf: 'AP' },
			{ name: 'Amapá', name_order: 'Amapa', uf: 'AP' },
			{ name: 'Pedra Branca do Amapari', name_order: 'Pedra Branca do Amapari', uf: 'AP' },
			{ name: 'Calçoene', name_order: 'Calcoene', uf: 'AP' },
	]);
};
