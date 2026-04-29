
// Criando uma variavel para receber o id da tabela e pegando todas as tag que está dentro do tboby e escolhendo somente o rpimeiro elemento
const tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0]

// Adicionando um evento de click para chamar a função 
document.getElementById('Cadastra').addEventListener('click', Adicionar)

// Criando a função para adicionar conteudo na tabela
function Adicionar (evento) {
    evento.preventDefault() // Impede o carregamento da pagina enqunto não aconteçe o evento 
   
    const nome = document.getElementById('input-nome').value
    const data = document.getElementById('input-data').value
    const email = document.getElementById('input-email').value
    const telefone = document.getElementById('input-tel').value
    const endereco = document.getElementById('input-endereco').value
    const profissao = document.getElementById('input-profissao').value
    const alt = document.getElementById('input-altura').value
    const peso = document.getElementById('input-peso').value
    
    //criando uma nova linha dentro tbody (tr) e adiconando ela dentro da variavel      
    const novaLinha = tabela.insertRow()
    // Chamando a função calculo_imc e guardando o resultado
    const imcCalculo = calculo_Imc()
    // Criando dentro da linha os trechos em HTML para ser adicionado as celulas dentro da tabela e também criando dois botões dentro da linha em html  
    novaLinha.innerHTML = ` 

        <td> ${nome} </td>
        <td> ${data} </td>
        <td> ${email} </td>
        <td> ${telefone} </td>
        <td> ${endereco} </td>
        <td> ${profissao} </td>
        <td> ${alt} </td>
        <td> ${peso} </td>
        <td> ${imcCalculo} <td>
        
        <button id = 'Editar' onclick='Editar(this)'> Editar </button>
        <button id = 'Excluir' onclick='Excluir(this)'> Exccluir </button>
    `

    // Limpando o campo após o cadastro
    document.querySelectorAll('input').forEach(input => input.value = '')

}

// Criando a função para Excluir a linha 
function Excluir(elemento) {
    
    elemento.closest('tr').remove()

}

// editando a célula da linha
function Editar(elemento) {
    
    const linha = elemento.closest('tr')
    const celulas = linha.querySelectorAll('td')
    document.getElementById('input-nome').value = celulas[0].innerText.trim()
    document.getElementById('input-data').value = celulas[1].innerText.trim()
    document.getElementById('input-email').value = celulas[2].innerText.trim()
    document.getElementById('input-tel').value = celulas[3].innerText.trim()
    document.getElementById('input-endereco').value = celulas[4].innerText.trim()
    document.getElementById('input-profissao').value = celulas[5].innerText.trim()
    document.getElementById('input-altura').value = celulas[6].innerText.trim()
    document.getElementById('input-peso').value = celulas[7].innerText.trim()

    linha.remove()
}

// Criando a função para calcular o imc 
 function calculo_Imc() {
    let alt = document.getElementById('input-altura').value
    let peso = document.getElementById('input-peso').value

    // validação para saber se input está fazio

    if (!alt || !peso) {
        alert('Por favor, preencha peso e altura corretamente. ')
        return
    }

    let imc = (peso / (alt * alt)).toFixed(2) 
    return imc
    
}