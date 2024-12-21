import bcrypt from 'bcryptjs';
import { userStore } from '../services/store.js';

class User {
  static async create(userData) {
    const { password, ...rest } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    return userStore.create({ ...rest, password: hashedPassword });
  }

  static async findByEmail(email) {
    const users = await userStore.query(user => user.email === email);
    return users[0];
  }

  static async findById(id) {
    return userStore.getById(id);
  }

  static async findByUsername(username) {
    const users = await userStore.query(user => user.username === username);
    return users[0];
  }

  static async update(id, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return userStore.update(id, data);
  }

  static async comparePassword(user, candidatePassword) {
    return bcrypt.compare(candidatePassword, user.password);
  }
}

export default User;
