module.exports = {
  "type": "postgres",
  "host": process.env.DB_HOST,
  "port": 5432,
  "username": "siat",
  "password": "testpass",
  "database": "siat-tec",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true
};
