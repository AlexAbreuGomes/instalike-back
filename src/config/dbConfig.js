import { MongoClient } from "mongodb";

export default async function conectarBanco(stringConexao) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(stringConexao);
        console.log('conectando ao cluster do banco de dados ...');
        await mongoClient.connect();
        console.log('conectado ao mongodb com sucesso!!');

        return mongoClient;

    } catch (erro) {
        console.error('falha ao se conectar com o mongo');
        process.exit();
    }
}