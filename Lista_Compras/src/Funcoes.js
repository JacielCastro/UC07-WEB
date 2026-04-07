
function adicionar() {    

    let produto = document.getElementById('produto').value
    let categoria = document.getElementById('Categoria').value

    if (produto === '') {
        alert ('Preencha o espaço produto ')
    }else if (categoria === '') {
        alert('Selecione a categoria')
    }
    if (produto !== '' || categoria !== '') {
        let lista = document.getElementById(`${categoria}`)
    let item = document.createElement('li')
    item.innerHTML = produto
    lista.appendChild(item)
    }        
}

let buttonExcluir = document.createElement('button');
buttonExcluir.innerText = '❌';
buttonExcluir.margiLeft = '10px';
buttonExcluir.onclick = function(){ 
    item.remove();
}
item.appendChild(buttonExcluir);
lista.appendChild(item);