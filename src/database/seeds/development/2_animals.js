
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('animals').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('animals').insert([
        { id: 1, name: 'Bob', age: '2 anos', info: 'ele é muito docil e muito preguiçoso', url_image: "doguinho.jpg", city: 'Marilia', state: 'SP', status: false, id_keeper: 1, id_finder: '' },
        { id: 2, name: 'Bob 2', age: '8 meses', info: 'ele é muito docil e muito preguiçoso', url_image: "doguinho2.jpg", city: 'Marilia', state: 'SP', status: true, id_keeper: 1, id_finder: 5 },
        { id: 3, name: 'Doguinho', age: '5 anos', info: 'ele é muito docil e muito preguiçoso', url_image: "doguinho.jpg", city: 'Joinville', state: 'SC', status: false, id_keeper: 3, id_finder: '' },
        { id: 4, name: 'Hercules', age: '1 ano', info: 'ele é muito docil e muito preguiçoso', url_image: "doguinho2.jpg", city: 'Florianopolis', state: 'SC', status: false, id_keeper: 2, id_finder: '' },
        { id: 5, name: 'Sheera', age: '10 meses', info: 'ela é muito docil e muito preguiçoso', url_image: "doguinho.jpg", city: 'Lins', state: 'SP', status: false, id_keeper: 4, id_finder: '' },
      ]);
    });
};
