import http from 'http' 
import fs from 'fs' 
import queryString from 'querystring' // pega a parte final da URL da requisição (após o símbolo ?)

const PORTA = 3000
const HOST = 'localhost'
let cursos = [] // array para armazenar os cursos cadastrados

const server = http.createServer((req, res) => {
    // const {url, method} = req //    desestruturação do objeto, o mesmo que: const url = req.url    const method = req.method
    console.log(`Requisição: URL - ${req.url} - Método: ${req.method}`) // conferir a requisição - URL e Método
    if(req.url === '/' && req.method === 'GET'){
        res.writeHead(200, {"content-type": 'text/html; charset=utf-8'})
        // res.write()
        res.end('<h1> Página Inicial </h1>')
    }else if(req.url === '/cadastro' && req.method === 'GET'){
         res.writeHead(200, {"content-type": 'text/html; charset=utf-8'})   
        res.end(fs.readFileSync('cadastro.html', 'utf-8'))
    } else if(req.url === '/curso' && req.method === 'POST'){
        // res.writeHead(200, {"content-type": 'text/html; charset=utf-8'}) //resposta - página HTML
        // res.writeHead(200, {"content-type": 'aplication/json; charset=utf-8'}) //resposta - JSON
        let dados = ''
        req.on('data', chunk => {
            dados += chunk.toString('utf-8')
        })
        req.on('end', () => {
            const dados_req1 = queryString.parse(dados) //curso=DS&ch=1200&tipo=tecnico = {curso: 'DS', ch: '1200', tipo: 'tecnico'}
            const dados_req2 = new URLSearchParams(dados) //converte a string da requisição em objeto javascript
            cursos.push(dados_req2) // adiciona o curso cadastrado no array de cursos            
            // res.write('<h1> Cursos </h1>')          
            // res.end(`
            //     <h3> Curso: ${dados_req1.curso} <br> 
            //     Carga Horária: ${dados_req1.ch} <br> 
            //     Tipo: ${dados_req2.get('tipo')} </h3>`)// resposta em HTML
            //
            // res.end(JSON.stringify({
            //     curso: dados_req1.curso, 
            //     ch: dados_req1.ch, 
            //     tipo: dados_req2.get('tipo')})) // resposta em JSON

            res.writeHead(302, {'Location': `/cursos` }) // redireciona para a página de cursos após o cadastro
            res.end()
           
        })

    }else if(req.url === '/cursos' && req.method === 'GET'){
         res.writeHead(200, {"content-type": 'text/html; charset=utf-8'})
         res.end(`
            <h1> Lista de Cursos </h1>
            <h3> ${cursos.map(curso => `
                <br> Curso: ${curso.get('curso')} <br>
                Carga Horária: ${curso.get('ch')} <br>
                Tipo: ${curso.get('tipo')} <br> `
            )} </h3> `) // acessa o array com os cursos e mostra as informações no HTML
    }else{
        res.writeHead(404, {"content-type": 'text/html; charset=utf-8'})
        res.end('<h1> Página não localizada! </h1>')
    }

})

server.listen(PORTA, HOST,  () => {
    console.log(`Servidor rodando: http://${HOST}:${PORTA}`)
})