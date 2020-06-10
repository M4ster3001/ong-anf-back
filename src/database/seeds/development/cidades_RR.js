exports.seed = function(knex) {
	return knex("cities").insert([
{ name: 'Amajari', name_order: 'Amajari', uf: 'RR' },
			{ name: 'Alto Alegre', name_order: 'Alto Alegre', uf: 'RR' },
			{ name: 'Boa Vista', name_order: 'Boa Vista', uf: 'RR' },
			{ name: 'Bonfim', name_order: 'Bonfim', uf: 'RR' },
			{ name: 'Cantá', name_order: 'Canta', uf: 'RR' },
			{ name: 'Caracaraí', name_order: 'Caracarai', uf: 'RR' },
			{ name: 'Caroebe', name_order: 'Caroebe', uf: 'RR' },
			{ name: 'Iracema', name_order: 'Iracema', uf: 'RR' },
			{ name: 'Mucajaí', name_order: 'Mucajai', uf: 'RR' },
			{ name: 'Normandia', name_order: 'Normandia', uf: 'RR' },
			{ name: 'Pacaraima', name_order: 'Pacaraima', uf: 'RR' },
			{ name: 'Rorainópolis', name_order: 'Rorainopolis', uf: 'RR' },
			{ name: 'São João da Baliza', name_order: 'Sao Joao da Baliza', uf: 'RR' },
			{ name: 'São Luiz', name_order: 'Sao Luiz', uf: 'RR' },
			{ name: 'Uiramutã', name_order: 'Uiramuta', uf: 'RR' },
	]);
};
