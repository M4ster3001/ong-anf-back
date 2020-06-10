
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'Aldo', email: 'aldo@gmail.com', phone: '14997890987', password: '', token: 'a5sd4a5s4d5asd5a4'},
        {id: 2, name: 'Junior', email: 'junior@gmail.com', phone: '14997898567', password: 'kaicann12312', token: '5asd5as5d1a5s1c2a1s2'},
        {id: 3, name: 'Teste', email: 'teste@live.com', phone: '14997899087', password: 'kaicann12312', token: 'as2d1a2sd12asd'},
        {id: 4, name: 'Tester ', email: 'tester@bol.com', phone: '14997891987', password: 'kaicann12312', token: '5asd5asd2a1sd'},
        {id: 5, name: 'Ferreira', email: 'ferreira@hotmail.com', phone: '14997890369', password: 'asd2454c5as1', token: '3as1d2as1d5a'},
      ]);
    });
};
