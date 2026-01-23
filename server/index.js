const jsonServer = require("json-server"); // importing json-server module
const server = jsonServer.create();        // Instalar na pasta server: npm i json-server@0.17.0
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000; //  chose port from here like 8080, 3001
const cors = require('cors');


server.use(router);

server.use(cors({origin: ["http://localhost:5173"], 
    methods: ["GET","POST", "PUT", "PATCH", "DELETE"],
    credentials: true 
}));

server.use(middlewares);


server.listen(port);



