
function adicionar() {    

    let produto = document.getElementById('produto').value
    let categoria = document.getElementById('Categoria').value

    if (produto === '') {
        alert ('Preencha o espaço produto ')
    }else if (categoria === '') {
        alert('Selecione a categoria')
    }
    
    let lista = document.getElementById(`${categoria}`)
    let item = document.createElement('li')
    let botao = document.createElement('button')
    botao.textContent = '❌'
    item.innerHTML = produto;
    item.appendChild(botao);
    lista.appendChild(item);    
    document.getElementById('produto').value='';    
     
    botao.addEventListener('click',() => {
        item.remove()
    })    
}

function salva_lista() {
    let lista = document.querySelectorAll('ul')
    let dados = {}

    lista.forEach(lista => {
        let = categoria = lista.id
        let itens = []

        lista.querySelectorAll('li').forEach(item =>{
            itens.push({
                texto: item.firstChild.textContent,
                concluido: item.classList.contains('concluindo')
            })
        })
        dados[categoria] =itens
    })
    localStorage.setItem('listaProdutos',JSON.stringify(dados))
}

function carregarDados() {
    let dados = JSON.parse(localStorage.getItem(listaProdutos))

    if (!dados) return
    
    for (let categoria in dados){
        let lista = document.getElementById(categoria)
        dados[categoria].forEach(itemData => {
            criarItem(itemData.texto, categoria, itemData.concluido)
        })
    } 
}

/*function adicionar() {    
    let produto = document.getElementById('produto').value
    let categoria = document.getElementById('Categoria').value

    if (produto === '') {
        alert('Preencha o espaço produto')
        return
    }

    criarItem(produto, categoria, false)
    document.getElementById('produto').value = ''
    salvarDados()
}
*/



  