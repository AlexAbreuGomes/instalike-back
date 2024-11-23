// Importa o módulo express para criar um framework de servidor web
import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Cria uma instância do aplicativo Express para lidar com requisições e respostas HTTP
const app = express();
app.use(express.static("uploads"))
routes(app);

// Inicia o servidor e escuta por requisições na porta 3000
app.listen(3000, () => {
    console.log("cansado né..."); // Mensagem de log indicando que o servidor está ouvindo
});


