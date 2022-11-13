const queries = {
  createUser: () => {
    return `INSERT IGNORE users 
                (name, email, password)
                     VALUES
                        (?, ?, ?);`;
  },

  checkCreds: () => {
    return `SELECT id FROM users WHERE 
                        email = ?
                            AND 
                                password = ?;`;
  },

  addToken: () => {
    return `INSERT INTO logins
                    (user_id, token)
                            VALUES
                                (?, ?);`;
  },

  removeToken: () => {
    return `DELETE FROM logins
                WHERE token = ?;`;
  },

  getUser: () => {
    return `SELECT name, email, users.entry_date FROM users
              JOIN logins
                ON users.id = logins.user_id
                  WHERE token = ?;`;
  },

  deleteUser: () => {
    return `DELETE users FROM users
              JOIN logins
                ON users.id = logins.user_id
                  WHERE token = ?;`;
  },

  updateUser: (column) => {
    return `UPDATE users
              JOIN logins
                ON users.id = logins.user_id
                  SET ${column} = ?
                  WHERE token = ?;`;
  },

  checkToken: () => {
    return `SELECT users.id
              FROM users
                JOIN logins
                  ON users.id = logins.user_id
                    WHERE token = ?;`;
  },
};

module.exports = queries;
