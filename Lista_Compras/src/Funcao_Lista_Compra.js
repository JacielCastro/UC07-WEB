// Ajustei a função para aceitar parâmetros quando chamada pelo carregarDados
function adicionar(textoParam = null, categoriaParam = null, concluidoParam = false) {    

    // Se vier do parâmetro (carregarDados), usa ele. Se não, pega do input (usuário clicando).
    let produto = textoParam || document.getElementById('produto').value;
    let categoria = categoriaParam || document.getElementById('Categoria').value;

    // VERIFICANDO SE INPUT ESTÃO VAZIOS (apenas se não for carregamento automático)
    if (!textoParam) {
        if (produto === '') {
            alert('Preencha o espaço produto');
            return; // Para a execução aqui
        } else if (categoria === '') {
            alert('Selecione a categoria');
            return;
        }
    }

    // Seleciona a lista correta
    let lista = document.getElementById(categoria);
    if (!lista) return;

    // CRIANDO ELEMENTO
    let item = document.createElement('li');
    item.dataset.categoria = categoria; // Salva a categoria original no dataset
    
    // Criamos um span ou apenas o nó de texto para o nome do produto
    // Isso facilita a edição sem sumir com os botões
    let textoDoItem = document.createTextNode(produto);
    item.appendChild(textoDoItem);

    // FUNÇÃO BOTÃO REMOVER
    let botao = document.createElement('button');
    botao.textContent = '❌'; 
    botao.onclick = () => {
        item.remove();
        salva_lista(); // Salva após remover
    };

    // FUNÇÃO BOTÃO EDITAR
    let Editar = document.createElement('button');
    Editar.textContent = '✏️';
    Editar.onclick = () => {
        let novoTexto = prompt('Editar item: ', item.firstChild.textContent);
        if (novoTexto) {
            item.firstChild.textContent = novoTexto;
            salva_lista();
        }
    };

    // FUNÇÃO BOTÃO CONCLUÍDO
    let concluido_b = document.createElement('button');
    concluido_b.textContent = '✔️';
    concluido_b.onclick = (e) => {
        e.stopPropagation();
        let listaConcluidos = document.getElementById('concluidos');
        
        if (item.parentElement.id !== 'concluidos') {
            item.classList.add('concluido');
            listaConcluidos.appendChild(item);
        } else {
            // Volta para a categoria original guardada no dataset
            let listaOriginal = document.getElementById(item.dataset.categoria);
            item.classList.remove('concluido');
            listaOriginal.appendChild(item);
        }
        salva_lista();
    };

    // ADICIONANDO BOTÕES AO ITEM
    item.appendChild(concluido_b);
    item.appendChild(Editar);
    item.appendChild(botao);

    // Se o item for carregado como concluído, move para a lista de concluídos
    if (concluidoParam) {
        item.classList.add('concluido');
        document.getElementById('concluidos').appendChild(item);
    } else {
        lista.appendChild(item);
    }

    // Limpa o input e salva
    if (!textoParam) {
        document.getElementById('produto').value = '';
        salva_lista();
    }
}

// SALVANDO A LISTA NO LOCALSTORAGE
function salva_lista() {
    let listas = document.querySelectorAll('ul');
    let dados = {};

    listas.forEach(lista => {
        let categoria = lista.id;
        let itens = [];

        lista.querySelectorAll('li').forEach(item => {
            itens.push({
                texto: item.firstChild.textContent,
                // Importante: salvamos a categoria original mesmo se estiver no "concluidos"
                categoriaOrigem: item.dataset.categoria,
                concluido: item.classList.contains('concluido')
            });
        });
        dados[categoria] = itens;
    });

    localStorage.setItem('listaProdutos', JSON.stringify(dados));
}

// CARREGAR DADOS
function carregarDados() {
    let dados = JSON.parse(localStorage.getItem('listaProdutos'));
    if (!dados) return;
    
    // Limpa as listas atuais antes de carregar (evita duplicar com o Live Server)
    document.querySelectorAll('ul').forEach(ul => {
        // Remove apenas os 'li', mantém os 'h3'
        const itens = ul.querySelectorAll('li');
        itens.forEach(i => i.remove());
    });

    for (let categoria in dados) {
        dados[categoria].forEach(itemData => {
            // Passamos os dados para a nova versão da função adicionar
            adicionar(itemData.texto, itemData.categoriaOrigem || categoria, itemData.concluido);
        });
    } 
}

function enviarWhatsApp() {
    let dados = JSON.parse(localStorage.getItem('listaProdutos'));
    
    if (!dados) {
        alert("A lista está vazia!");
        return;
    }

    let mensagem = "*🛒 Minha Lista de Compras 🛒*\n\n";

    for (let categoria in dados) {
        // Só adiciona a categoria na mensagem se ela tiver itens
        if (dados[categoria].length > 0 && categoria !== 'concluidos') {
            mensagem += `*--- ${categoria.toUpperCase()} ---*\n`;
            
            dados[categoria].forEach(item => {
                let check = item.concluido ? "✅" : "⬜";
                mensagem += `${check} ${item.texto}\n`;
            });
            mensagem += "\n";
        }
    }

    // Se houver itens na lista de concluídos geral, você pode adicionar também
    if (dados['concluidos'] && dados['concluidos'].length > 0) {
        mensagem += "*✔️ JÁ COMPRADOS:*\n";
        dados['concluidos'].forEach(item => {
            mensagem += `~${item.texto}~\n`; // Fica com efeito riscado no WhatsApp
        });
    }

    // Codifica o texto para o formato de URL
    let textoFinal = encodeURIComponent(mensagem);
    let url = `https://wa.me/?text=${textoFinal}`;

    // Abre o WhatsApp (Web ou App)
    window.open(url, '_blank');
}

window.onload = carregarDados;