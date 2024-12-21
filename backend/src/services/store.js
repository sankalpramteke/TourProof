import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');

// Ensure data directory exists
await fs.mkdir(DATA_DIR, { recursive: true });

class Store {
  constructor(filename) {
    this.filepath = path.join(DATA_DIR, `${filename}.json`);
    this.initializeFile();
  }

  async initializeFile() {
    try {
      await fs.access(this.filepath);
    } catch {
      await fs.writeFile(this.filepath, '[]');
    }
  }

  async getAll() {
    const data = await fs.readFile(this.filepath, 'utf8');
    return JSON.parse(data);
  }

  async getById(id) {
    const items = await this.getAll();
    return items.find(item => item.id === id);
  }

  async create(data) {
    const items = await this.getAll();
    const id = Date.now().toString();
    const newItem = { id, ...data, createdAt: new Date().toISOString() };
    items.push(newItem);
    await fs.writeFile(this.filepath, JSON.stringify(items, null, 2));
    return newItem;
  }

  async update(id, data) {
    const items = await this.getAll();
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;

    const updatedItem = { ...items[index], ...data, updatedAt: new Date().toISOString() };
    items[index] = updatedItem;
    await fs.writeFile(this.filepath, JSON.stringify(items, null, 2));
    return updatedItem;
  }

  async delete(id) {
    const items = await this.getAll();
    const filteredItems = items.filter(item => item.id !== id);
    await fs.writeFile(this.filepath, JSON.stringify(filteredItems, null, 2));
  }

  async query(filterFn) {
    const items = await this.getAll();
    return items.filter(filterFn);
  }
}

// Create stores for different entities
export const userStore = new Store('users');
export const tourStore = new Store('tours');
export const verificationStore = new Store('verifications');
