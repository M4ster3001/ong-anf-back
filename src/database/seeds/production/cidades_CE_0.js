exports.seed = function(knex) {
	return knex("cities").insert([
{ name: 'Abaiara', name_order: 'Abaiara', uf: 'CE' },
			{ name: 'Acarapé', name_order: 'Acarape', uf: 'CE' },
			{ name: 'Acaraú', name_order: 'Acarau', uf: 'CE' },
			{ name: 'Acopiara', name_order: 'Acopiara', uf: 'CE' },
			{ name: 'Aiuaba', name_order: 'Aiuaba', uf: 'CE' },
			{ name: 'Alcântaras', name_order: 'Alcantaras', uf: 'CE' },
			{ name: 'Altaneira', name_order: 'Altaneira', uf: 'CE' },
			{ name: 'Alto Santo', name_order: 'Alto Santo', uf: 'CE' },
	]);
};
