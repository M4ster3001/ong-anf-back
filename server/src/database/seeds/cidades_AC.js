exports.seed = function(knex) {
	return knex("cities").del().then(() => {
		return knex("cities").insert([
{ name: 'Acrelândia', name_order: 'Acrelandia', uf: 'AC' },
			{ name: 'Assis Brasil', name_order: 'Assis Brasil', uf: 'AC' },
			{ name: 'Brasiléia', name_order: 'Brasileia', uf: 'AC' },
			{ name: 'Bujari', name_order: 'Bujari', uf: 'AC' },
			{ name: 'Capixaba', name_order: 'Capixaba', uf: 'AC' },
			{ name: 'Cruzeiro do Sul', name_order: 'Cruzeiro do Sul', uf: 'AC' },
			{ name: 'Epitaciolândia', name_order: 'Epitaciolandia', uf: 'AC' },
			{ name: 'Feijó', name_order: 'Feijo', uf: 'AC' },
			{ name: 'Jordão', name_order: 'Jordao', uf: 'AC' },
			{ name: 'Mâncio Lima', name_order: 'Mancio Lima', uf: 'AC' },
			{ name: 'Manoel Urbano', name_order: 'Manoel Urbano', uf: 'AC' },
			{ name: 'Marechal Thaumaturgo', name_order: 'Marechal Thaumaturgo', uf: 'AC' },
			{ name: 'Plácido de Castro', name_order: 'Placido de Castro', uf: 'AC' },
			{ name: 'Porto Walter', name_order: 'Porto Walter', uf: 'AC' },
			{ name: 'Rio Branco', name_order: 'Rio Branco', uf: 'AC' },
			{ name: 'Rodrigues Alves', name_order: 'Rodrigues Alves', uf: 'AC' },
			{ name: 'Santa Rosa do Purus', name_order: 'Santa Rosa do Purus', uf: 'AC' },
			{ name: 'Senador Guiomard', name_order: 'Senador Guiomard', uf: 'AC' },
			{ name: 'Sena Madureira', name_order: 'Sena Madureira', uf: 'AC' },
			{ name: 'Tarauacá', name_order: 'Tarauaca', uf: 'AC' },
			{ name: 'Xapuri', name_order: 'Xapuri', uf: 'AC' },
			{ name: 'Porto Acre', name_order: 'Porto Acre', uf: 'AC' },
		]);
	});
};
