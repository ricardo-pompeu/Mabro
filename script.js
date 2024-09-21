document.getElementById('mineralForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const brilho = document.getElementById('brilho').value;
    const dureza = document.getElementById('dureza').value;
    const cor = document.getElementById('cor').value;

    // Tabela fictícia de minerais
    const minerais = [
        { nome: 'Minério1', brilho: 'metálico', dureza: '1-2', cor: 'branco' },
        { nome: 'Minério2', brilho: 'metálico', dureza: '1-2', cor: 'branco' },
        { nome: 'Minério3', brilho: 'metálico', dureza: '1-2', cor: 'branco' },
        { nome: 'Minério4', brilho: 'metálico', dureza: '1-2', cor: 'branco' },
        { nome: 'Pirita', brilho: 'metálico', dureza: '7-10', cor: 'amarelo' },
        { nome: 'Talco', brilho: 'não metálico', dureza: '1-2', cor: 'branco' },
        { nome: 'Magnetita', brilho: 'metálico', dureza: '5-6', cor: 'preto' },
        { nome: 'Hematita', brilho: 'metálico', dureza: '5-6', cor: 'vermelho' },
        { nome: 'Azurita', brilho: 'não metálico', dureza: '3-4', cor: 'azul' }
        // Adicione mais minerais conforme necessário
    ];

    // Filtrar minerais com base nas respostas
    const resultados = minerais.filter(mineral =>
        mineral.brilho === brilho &&
        mineral.dureza === dureza &&
        mineral.cor === cor
    );

    const resultadoDiv = document.getElementById('resultado');
    const tabela = document.getElementById('mineralTabela');
    const tbody = tabela.querySelector('tbody');
    
    // Limpar resultados anteriores
    tbody.innerHTML = '';

    if (resultados.length > 0) {
        resultados.forEach(mineral => {
            const row = `<tr>
                <td>${mineral.nome}</td>
                <td>${mineral.brilho}</td>
                <td>${mineral.dureza}</td>
                <td>${mineral.cor}</td>
            </tr>`;
            tbody.innerHTML += row;
        });

        tabela.style.display = 'table';
        resultadoDiv.innerHTML = '';
    } else {
        resultadoDiv.innerHTML = 'Nenhum mineral encontrado com essas características.';
        tabela.style.display = 'none';
    }
});

