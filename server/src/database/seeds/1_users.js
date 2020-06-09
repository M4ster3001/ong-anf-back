
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'Aldo', 'email': 'aldo@gmail.com', 'phone': '14997890987', 'password': ''},
        {id: 2, name: 'Junior', 'email': 'junior@gmail.com', 'phone': '14997898567', 'password': ''},
        {id: 3, name: 'Teste', 'email': 'teste@live.com', 'phone': '14997899087', 'password': ''},
        {id: 4, name: 'Tester ', 'email': 'tester@bol.com', 'phone': '14997891987', 'password': ''},
        {id: 5, name: 'Ferreira', 'email': 'ferreira@hotmail.com', 'phone': '14997890369', 'password': ''},
      ]);
    });
};
