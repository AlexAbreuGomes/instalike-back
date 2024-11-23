// Importa a função para conectar ao banco de dados (supondo que esteja em src/config/dbConfig.js)
import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarBanco from "../config/dbConfig.js";

// Estabelece uma conexão com o banco de dados usando a função importada
const conexao = await conectarBanco(process.env.STRING_CONEXAO);

// Função assíncrona para recuperar todos os posts da coleção do banco de dados
export async function getTodosPosts() {
    // Acessa a conexão do banco de dados a partir da conexão estabelecida
    const db = conexao.db('db_instabytes');
    // Obtém a coleção chamada "posts" do banco de dados
    const colecao = db.collection('posts');
    // Usa o método `find` da coleção para recuperar todos os documentos e convertê-los em um array
    return colecao.find().toArray();
}

export async function criarPost(novoPost) { 
     const db = conexao.db('db_instabytes');
     const colecao = db.collection('posts');
     return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) { 
    const db = conexao.db('db_instabytes');
    const colecao = db.collection('posts');
    const objId = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId (objId)}, {$set:novoPost});
}
