import http from 'http'
import fs from 'fs'

const PORTA = 3000
const HOST  = 'localhost'
const cursos = [] // array para armazenar os cursos cadastrados

const server = http.createServer((req,res) => {

    console.log(`Requisição: URL - ${req.url} - Método: ${req.method}`);
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead({"content-type": 'text/html; charset=utf-8'})
        res.end('<h1> página Inicial </h1>')
    } else if(req.url === '/cadastro' && req.method === 'GET'){
        res.writeHead(200, {"content-type": 'text/html; charset=utf-8'})
        res.end(fs.readFileSync('cadastro.html', 'utf-8'))
    }else if(req.url === '/curso'  && req.method === 'POST'){
        let dados = ''
        req.on('data', chunk => {
            dados += chunk.toString('utf-8')
        })
        req.on('end', () => {
            const dados_req1 = queryString.parse(dados)
            const dados_req2 = new URLSearchParams(dados)
            cursos.push(dados_req2)
            res.whiteHead(302, {'location': `/cursos`})
            res.end()

        })
    }else if (req.url === '/cursos' && req.method === 'GET') {
        res.writeHead(200, {" content-type": 'text/html; charset=utf-8'})
        res.end(`
            <h1> Lista de cursos <h1>
            <h3> ${ cursos.map(curso => `
                <br> Curso: ${curso.get('curso')} <br>
                carga Horária: ${curso.get('ch')} <br>
                Tipo: ${curso.get('tipo')} <br>`
            )}
            </h3>`)
    }else{
        res.writeHead(404, {"content-type": 'text/html; charset=utf-8'})
        res.end('<h1> Página não localizada! </h1>')
    }

})

server.listen(PORTA,HOST,() => {
    console.log(`servidor rodando: http://${HOST}:${PORTA}`);
    
})