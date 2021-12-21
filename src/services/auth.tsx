const users = [
  { id: 1, email: 'borgoth@mordos.com', password: '12bindthem' },
  { id: 1, email: 'test', password: 'test' },
];

export const login = (email, password) => {
  const user = users.find((el) => el.email === email);
  if (user) {
    if (user.password === password) {
      return true;
    }
  }
  return false;
};
