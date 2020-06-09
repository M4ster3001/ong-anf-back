
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('animals').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('animals').insert([
        { id: 1, name: 'Bob', age: '2', info: 'ele é muito docil e muito preguiçoso', url_image: "doguinho.jpg", city: 'Marilia', state: 'SP', status: false, id_user: 1 },
        { id: 2, name: 'Bob 2', age: '8', info: 'ele é muito docil e muito preguiçoso', url_image: "doguinho2.jpg", city: 'Bauru', state: 'SP', status: true, id_user: 1 },
        { id: 3, name: 'Doguinho', age: '5', info: 'ele é muito docil e muito preguiçoso', url_image: "doguinho.jpg", city: 'Joinville', state: 'SC', status: false, id_user: 3 },
        { id: 4, name: 'Hercules', age: '1', info: 'ele é muito docil e muito preguiçoso', url_image: "doguinho2.jpg", city: 'Florianopolis', state: 'SC', status: false, id_user: 2 },
        { id: 5, name: 'Sheera', age: '10', info: 'ela é muito docil e muito preguiçoso', url_image: "doguinho.jpg", city: 'Lins', state: 'SP', status: false, id_user: 4 },
      ]);
    });
};
