var sqlMap = {
  user: {
    add: 'insert into user(id, email, username, password) values (0, ?, ?, ?)',
    login: "SELECT * FROM user WHERE email=? AND password=?"
  },
  task: {
    add: 'insert into tasks(id, title, description, tags, owner, status) values (0, ?, ?, ?, ?, 0)',
    getAllTasks: "SELECT * FROM tasks WHERE owner=?",
    deleteTaskDatas: "DELETE FROM tasks WHERE id IN(?)",
    editTask: "UPDATE tasks SET title = ?, description = ?, tags = ? WHERE id = ?",
    inputSearch: "SELECT * FROM tasks WHERE owner=?",
    setStatus: "UPDATE tasks SET status = ? WHERE id = ?",
    setWillEditData: "SELECT * FROM tasks WHERE id = ?",
  }
}
module.exports = sqlMap;
