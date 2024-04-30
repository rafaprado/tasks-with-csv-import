import http from "node:http";
import { routes } from "./routes/index.js";
import { jsonMiddleware } from "./middleware/json.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  await jsonMiddleware(req, res);

  const routeExists = routes.find(route => {
    if(route.method === method && route.path.test(url)) {
      const routeParams = url.match(route.path);
      const params = {...routeParams.groups};

      req.params = params;
      
      return route.handle(req, res);
    }
  });


  if(!routeExists) return res.writeHead(404).end();

});

server.listen(3333);