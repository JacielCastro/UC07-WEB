// PEGANDO O ELEMENTO POR ID E COLOCANDO UM OUVINTI PARA EVENTO CLICK ACIONAR A FUNÇÃO CADASTRO
document.getElementById('botao').addEventListener('click',cadastrar)

const tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0]

function cadastrar(evento) {
    evento.preventDefault()
    const nome = document.getElementById('input-nome').value
    const data_nascimento = document.getElementById('input-data').value
    const email = document.getElementById('input-email').value
    const telefone = document.getElementById('input-tel').value
    const endereco = document.getElementById('input-endereco').value
    const numero = document.getElementById('input-numero').value
    const profissao = document.getElementById('input-profissao').value
    const altura = document.getElementById('input-altura').value
    const peso = document.getElementById('input-peso').value

    const linha = tabela.insertRow()
    linha.innerHTML = `
    <td>${nome}</td>
    <td>${data_nascimento}</td>
    <td>${email}</td>
    <td>${telefone}</td>
    <td>${endereco}</td>
    <td>${numero}</td>
    <td>${profissao}</td>
    <td>${altura}</td>
    <td>${peso}</td>

    `

}