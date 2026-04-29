// PEGANDO O ELEMENTO POR ID E COLOCANDO UM OUVINTI PARA UM EVENTO CLICK ACIONAR A FUNÇÃO CADASTRO
document.getElementById('botao').addEventListener('click',cadastrar)

const tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0]

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

function cadastrar(evento) {
    
    const resultadoImc = calculo_Imc()

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
    <td>${resultadoImc}</td>
    <button id= 'excluir' onclick= excluir(this)> Excluir </button>
    <button id= 'editar' onclick= excluir(this)> Editar </button>
    
    `
}
function calculo_Imc() {
    let imc 
    let altura = Number(document.getElementById('input-altura').value)
    let peso = Number(document.getElementById('input-peso').value)
    imc = peso / (altura * 2)
    return imc.toFixed(2)
    
}
function Editar(element) {
    const linha = element.parentElement.parentElement
    const celulas = linha.querySelectorAll('td')
    document.getElementById('nome').value = celulas[0].innerHTML
}

function Excluir(element) {
    Element.parentElement.remove()
}

