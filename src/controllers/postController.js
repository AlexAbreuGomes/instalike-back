import fs from "fs";
import {getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res)  {
    // Chama a função `getTodosPosts` para recuperar todos os posts do banco de dados
    const postsBd = await getTodosPosts();

    // Envia uma resposta bem-sucedida (código de status 200) com os posts recuperados em formato JSON
    res.status(200).json(postsBd);
};

export async function novosPosts(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    }catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha de requisição"})

    }
}

export async function uploadImagem (req, res) {
    const novoPost = {
        descricao:"",
        imgUrl: req.file.originalname,
        alt:""
    };
    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync (req.file.path, imagemAtualizada)
        res.status(200).json(postCriado);
    }catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha de requisição"})

    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`

    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imageBuffer);

        const postAtualizado = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, postAtualizado);
        
        res.status(200).json(postCriado);
    }catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha de requisição"})

    }
}