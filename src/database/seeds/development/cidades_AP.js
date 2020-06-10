exports.seed = function(knex) {
	return knex("cities").insert([
{ name: 'Cutias', name_order: 'Cutias', uf: 'AP' },
			{ name: 'Ferreira Gomes', name_order: 'Ferreira Gomes', uf: 'AP' },
			{ name: 'Itaubal', name_order: 'Itaubal', uf: 'AP' },
			{ name: 'Laranjal do Jari', name_order: 'Laranjal do Jari', uf: 'AP' },
			{ name: 'Macapá', name_order: 'Macapa', uf: 'AP' },
			{ name: 'Mazagão', name_order: 'Mazagao', uf: 'AP' },
			{ name: 'Oiapoque', name_order: 'Oiapoque', uf: 'AP' },
			{ name: 'Porto Grande', name_order: 'Porto Grande', uf: 'AP' },
			{ name: 'Pracuúba', name_order: 'Pracuuba', uf: 'AP' },
			{ name: 'Santana', name_order: 'Santana', uf: 'AP' },
			{ name: 'Tartarugalzinho', name_order: 'Tartarugalzinho', uf: 'AP' },
			{ name: 'Vitória do Jari', name_order: 'Vitoria do Jari', uf: 'AP' },
	]);
};
