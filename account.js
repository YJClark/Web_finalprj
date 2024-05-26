const accounts = [
  { username: 'customer1', password: 'password1' },
  { username: 'customer2', password: 'password2' },
  { username: 'customer3', password: 'password3' },
  // Add more accounts here
];

const accountData = accounts.map(account => `${account.username}:${account.password}`).join('\n');

const fs = require('fs');
fs.writeFile('accounts.txt', accountData, (err) => {
  if (err) throw err;
  console.log('Accounts file created successfully!');
});



