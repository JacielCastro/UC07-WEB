// criando uma função para receber os valores dos inputs
function adicionar_card(tituloParam = null,descricaoParam = null,PrioridadeParam = null, ) {

    let titulo = tituloParam || document.getElementById('Titulo').value;
    let descricao = descricaoParam || document.getElementById('Descricao').value;
    let prioridade = PrioridadeParam || document.getElementById("Prioridade").value;

    if (titulo === '') {
        alert('Preencha o espaço do título')
        
    }if (descricao === '') {
        alert('Preencha o espaço da descrição')
        
    }if (prioridade === '') {
        alert('Preencha o espaço da prioridade')
        
    }

    // VERIFICANDO SE A PRIORIDADE ESTA CORRETA
    let Prioridades_card = document.getElementById(prioridade);
    if (!Prioridades_card) return;
    // CRIANDO UM ELEMENTO PARA AS COLUNAS
    let Card = document.createElement('div');
    Card.dataset.prioridade = prioridade;

}
