exports.seed = function(knex) {
	return knex("cities").insert([
{ name: 'Vargem Grande do Sul', name_order: 'Vargem Grande do Sul', uf: 'SP' },
			{ name: 'Vargem Grande Paulista', name_order: 'Vargem Grande Paulista', uf: 'SP' },
			{ name: 'Várzea Paulista', name_order: 'Varzea Paulista', uf: 'SP' },
			{ name: 'Vera Cruz', name_order: 'Vera Cruz', uf: 'SP' },
			{ name: 'Vinhedo', name_order: 'Vinhedo', uf: 'SP' },
			{ name: 'Viradouro', name_order: 'Viradouro', uf: 'SP' },
			{ name: 'Vista Alegre do Alto', name_order: 'Vista Alegre do Alto', uf: 'SP' },
			{ name: 'Vitória Brasil', name_order: 'Vitoria Brasil', uf: 'SP' },
			{ name: 'Votorantim', name_order: 'Votorantim', uf: 'SP' },
			{ name: 'Votuporanga', name_order: 'Votuporanga', uf: 'SP' },
			{ name: 'Zacarias', name_order: 'Zacarias', uf: 'SP' },
			{ name: 'Chavantes', name_order: 'Chavantes', uf: 'SP' },
			{ name: 'Estiva Gerbi', name_order: 'Estiva Gerbi', uf: 'SP' },
	]);
};
