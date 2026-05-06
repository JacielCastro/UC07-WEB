
// INSTALANDO NODEMON, EXPRESS PARA TRABALHAR COM SERVIDOR

import express from 'express'
import path from 'path'

const app = express()
const PORT = 3000
const HOST = 'localhost'

let cursos = [{
    curso:'Desenvolvimento de sisitema',
    ch: 1200, 
    tipo: 'Tecnico'
}]

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req,res) => {
    res.send(
        '<h1> Página Inicial </h1>' 
    )
})
app.get('/cadastro',(req,res) => {
    res.sendFile(path.resolve('cadastro.html'))
})

app.post('/curso', (req,res) => {
    const curso = req.body.curso
    const ch = req.body.ch
    const tipo = req.body.tipo

    const novoCurso = {
        curso: curso,
        ch: ch,
        tipo: tipo
    }

    cursos.push(novoCurso)
    //const {curso,ch,tipo} = req.body
    console.log(req.body);
    res.status(200).json({ mensagem: 'Dados enviados', novoCurso})
})

app.get('/cursos', (req,res) =>{
    res.status(200).json(cursos)
})

app.listen(PORT,HOST, () => {
    console.log(`Servidor em execução em: http://${HOST}:${PORT}`);
})

