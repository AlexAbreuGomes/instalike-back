import cors from "cors"
import express from "express"; // Importa o framework Express.js para criar a aplicação web
import multer from "multer"; // Importa o módulo Multer para lidar com uploads de arquivos
import { listarPosts, novosPosts, uploadImagem, atualizarNovoPost } from "../controllers/postController.js"; // Importa funções para gerenciar posts do arquivo postController.js

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus:200
}

// Configura o armazenamento de arquivos no disco
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para uploads (./uploads/ neste caso)
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo enviado
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer usando a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Define as rotas da aplicação
const routes = (app) => {
  // Middleware para interpretar dados JSON enviados no corpo da requisição
  app.use(express.json());
  app.use(cors(corsOptions));

  // Rota GET para listar posts (provavelmente usando a função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar novos posts (provavelmente usando a função novosPosts)
  app.post("/posts", novosPosts);

  // Rota POST para uploads de imagens com o Multer
  //  - upload.single("imagem") configura o Multer para lidar com um arquivo chamado "imagem"
  //  - uploadImagem é chamada após o upload para processar a imagem
  app.post("/postsUploads", upload.single("imagem"), uploadImagem);

  app.put("/postsUploads/:id", atualizarNovoPost )
};

export default routes; // Exporta a função routes como padrão