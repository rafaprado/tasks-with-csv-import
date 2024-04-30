import { Database } from "../database/index.js";
import { randomUUID } from "node:crypto";
import { createTimestamp } from "../utils/createTimeStamp.js";
import { buildRoutePath } from "../utils/buildRoutePath.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handle: (req, res) => {
      const data = database.select("tasks");
      return res.end(JSON.stringify(data));
    }
  },

  {
    method: "GET",
    path: buildRoutePath("/tasks/:id"),
    handle: (req, res) => {
      const { id } = req.params;

      const data = database.select("tasks", [{id}]);
      return res.end(JSON.stringify(data));
    }
  },

  {
    method: "GET",
    path: buildRoutePath("/tasks/:id/complete"),
    handle: (req, res) => {
      const { id } = req.params;

      const data = database.select("tasks", [{id}]);
      return res.end(JSON.stringify(data));
    }
  },

  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handle: (req, res) => {
     const { title, description } = req.body;

     const task = {
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      created_at: createTimestamp(),
      updated_at: createTimestamp(),
     }

     database.insert("tasks", task);

     return res.writeHead(201).end()
    }
  },

  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handle: (req, res) => {
      const { id } = req.params;

      database.delete("tasks", [{id}]);

      return res.writeHead(204).end();
    }
  },

  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handle: (req, res) => {
      const { id } = req.params;
      const { completed_at, complete } = req.body;

      if(!completed_at && !complete) {
        return res.writeHead(400).end();
      }

      database.update("tasks", id, {completed_at, complete});
      
      return res.writeHead(204).end();
    }
  },

  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handle: (req, res) => {
      const { id } = req.params;

      database.update("tasks", id, req.body);
      
      return res.writeHead(204).end();
    }
  },

];