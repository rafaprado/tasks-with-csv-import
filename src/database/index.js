import fs from "node:fs/promises";
import { createTimestamp } from "../utils/createTimeStamp.js";

const databasePath = new URL("database.json", import.meta.url);

export class Database {
  #database = {};
  
  constructor() {
    fs.readFile(databasePath, "utf-8").then(data => {
      this.#database = JSON.parse(data);
    })
    .catch(() => {
      this.#persist();
    });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table, filters = []) {
    const tableExists = this.#database[table];

    if(Array.isArray(tableExists)) {
      if(filters.length === 0) return tableExists;

      const filterEntries = filters.reduce((acc, curr) => {
        return Object.entries(curr);
      }, []);

      const selectedItems = filterEntries.map(item => {
        const [key, value] = item;
        
        return tableExists.filter(row => row[key] === value)[0];
      }) ?? [];

      return selectedItems;
    } else {
      return null;
    }
  }

  insert(table, data) {
    let tableExists = this.#database[table];

    if(!Array.isArray(tableExists)) {
      this.#database[table] = [data];
    } else {
      this.#database[table].push(data);
    }

    return this.#persist();
  }

  delete(table, filters) {
    let tableExists = this.#database[table];

    if(Array.isArray(tableExists)) {
      const filterEntries = filters.reduce((acc, curr) => {
        return Object.entries(curr);
      }, []);

      const selectedItems = filterEntries.map(item => {
        const [key, value] = item;
        
        tableExists = tableExists.filter(row => row[key] !== value)[0];

        return tableExists;
      }) ?? [];

      this.#database[table] = selectedItems;
      this.#persist();
    } else {
      return null;
    }
  }

  insert(table, data) {
    let tableExists = this.#database[table];

    if(!Array.isArray(tableExists)) {
      this.#database[table] = [data];
    } else {
      this.#database[table].push(data);
    }

    return this.#persist();
  }

  update(table, id, data) {
    let tableExists = this.#database[table];

    if(!Array.isArray(tableExists)) return [];
  
    const rowIndex = tableExists.findIndex(row => row.id === id);
    
    if(rowIndex > -1) {
      this.#database[table][rowIndex] = {...this.#database[table][rowIndex], ...data};

      if(this.#database[table][rowIndex]["updated_at"]) {
        this.#database[table][rowIndex]["updated_at"] = createTimestamp();
      }
    }

    return this.#persist();
  }
}