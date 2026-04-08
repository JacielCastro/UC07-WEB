
// AQUI ESTOU ADICIONANDO O ITEM NA LISTA  
function adicionar() {    

    let produto = document.getElementById('produto').value
    let categoria = document.getElementById('Categoria').value
    // VERIFICANDO SE INPUT ESTÃO VAZIOS
    if (produto === '') {
        alert ('Preencha o espaço produto ')
    }else if (categoria === '') {
        alert('Selecione a categoria')
    }
    // PEGANDO ID CATEGORIA E COLOCANDO DENTRO DA VARIAVEL 
    let lista = document.getElementById(`${categoria}`)
    // CRIANDO ELEMENTO E COLOCANDO DENTRO DE UMA VARIAVEL
    let item = document.createElement('li') 
    // CRIANDO UM BUTÃO
    let botao = document.createElement('button') 
    // CRIANDO ARQUIVO HTML
    botao.textContent = '❌ ' 
    // COLOCANDO O VALOR DENTRO DE UMA TAG HTML
    item.innerHTML = produto;
     // CRIANDO A FUNÇÃO AO CLICK PARA REMOVE O ELEMENTO
    botao.addEventListener('click',() => {
        item.remove()
    })

    // CRIANDO O BUTÃO
    let Editar = document.createElement('button')
    Editar.textContent = '✏️ '
    //item.innerHTML = produto;

    // CRIANDO A FUNÇÃO PARA EDITAR O ELEMENTO 
    Editar.addEventListener('click', () => {
        let novoTexto = prompt('Editar item: ', item.firstChild.textContent)
        if (novoTexto) {
            item.firstChild.textContent = novoTexto
            salva_lista()
        }
    })

    let concluido_b = document.createElement('button')
    concluido_b.textContent = '✔️'
    
    concluido_b.addEventListener('click', (e) => {
        // evita clicar nos botões
        e.stopPropagation()
        let listaConcluidos = document.getElementById('concluidos')
        // verifica se já está nos concluídos
        if (item.parentElement.id !== 'concluidos') {
        // guarda de qual categoria veio
        item.dataset.categoria = item.parentElement.id
        item.classList.add('concluido')
        listaConcluidos.appendChild(item)

        } else {

        let listaOriginal = document.getElementById(item.dataset.categoria)
        item.classList.remove('concluido')
        listaOriginal.appendChild(item)
    }

    salva_lista()
})
    // ADICIONANDO O BUTÃO AO ELEMENTO
    item.appendChild(concluido_b);
    // ADICIONANDO O ITEM NA FUNÇÃO EDITAR 
    item.appendChild(Editar);
    // ADICIONANDO O BUTÃO AO ELEMENTO
    item.appendChild(botao);
    // ADICIONANDO O ITEM NA LISTA 
    lista.appendChild(item);    
    document.getElementById('produto').value='';   
    
}
  
// SALVANDO ALISTA NO NAVEGADOR 
function salva_lista() {
    let lista = document.querySelectorAll('ul')
    let dados = {}

    lista.forEach(lista => {
        let = categoria = lista.id
        let itens = []

        lista.querySelectorAll('li').forEach(item =>{
            itens.push({
                texto: item.firstChild.textContent,
                concluido: item.classList.contains('concluido')
            })
        })

        dados[categoria] = itens

    })

    localStorage.setItem('listaProdutos',JSON.stringify(dados))
}

// FUNÇÃO PARA CARREGAR AO ABRIR A PÁGINA 
function carregarDados() {
    let dados = JSON.parse(localStorage.getItem('listaProdutos'))

    if (!dados) return
    
    for (let categoria in dados){
        dados[categoria].forEach(itemData => {
            adicionar(itemData.texto, categoria, itemData.concluido)
        })
    } 
}

window.onload = carregarDados

