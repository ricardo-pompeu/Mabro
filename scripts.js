// Banco de dados de rochas com características predefinidas
const rochas = [
    {
        cor: 'Preta',
        textura: 'Granulada',
        tipo: 'Ignea',
        nome: 'Basalto'
    },
    {
        cor: 'Branca',
        textura: 'Lisa',
        tipo: 'Sedimentar',
        nome: 'Calcário'
    },
    {
        cor: 'Branca',
        textura: 'Lisa',
        tipo: 'Sedimentar',
        nome: 'Açai'
    },
    {
        cor: 'Branca',
        textura: 'Lisa',
        tipo: 'Sedimentar',
        nome: 'Açai'
    },
    {
        cor: 'Branca',
        textura: 'Lisa',
        tipo: 'Sedimentar',
        nome: 'Açai'
    },
    {
        cor: 'Vermelha',
        textura: 'Porosa',
        tipo: 'Metamórfica',
        nome: 'Quartzito'
    },
    {
        cor: 'Preta',
        textura: 'Porosa',
        tipo: 'Ignea',
        nome: 'Obsidiana'
    },
    {
        cor: 'Branca',
        textura: 'Granulada',
        tipo: 'Metamórfica',
        nome: 'Mármore'
    },
    {
        cor: 'Vermelha',
        textura: 'Lisa',
        tipo: 'Sedimentar',
        nome: 'Arenito'
    },
    {
        cor: 'Preta',
        textura: 'Granulada',
        tipo: 'Ignea',
        nome: 'Gabro'
    }
];

// Objeto para armazenar as características escolhidas pelo usuário
const selectedCharacteristics = {};

// Função para passar para a próxima etapa e armazenar a característica escolhida
function nextStep(step, characteristic, value) {
    selectedCharacteristics[characteristic] = value;
    document.querySelectorAll('.step').forEach(stepElement => {
        stepElement.classList.add('hidden');
    });
    document.getElementById(`step-${step}`).classList.remove('hidden');
}

// Função para finalizar o processo e mostrar o resultado
function finalizar(tipo) {
    selectedCharacteristics['tipo'] = tipo;
    document.querySelectorAll('.step').forEach(stepElement => {
        stepElement.classList.add('hidden');
    });
    document.getElementById('result').classList.remove('hidden');

    // Procura todas as rochas que correspondem às características escolhidas
    const rochasEscolhidas = rochas.filter(rocha => 
        rocha.cor === selectedCharacteristics['cor'] &&
        rocha.textura === selectedCharacteristics['textura'] &&
        rocha.tipo === selectedCharacteristics['tipo']
    );

    // Exibe os resultados na página
    if (rochasEscolhidas.length > 0) {
        let resultadoHTML = "Rochas correspondentes:<br>";
        rochasEscolhidas.forEach(rocha => {
            resultadoHTML += `
                Nome da Rocha: ${rocha.nome}<br>
                Cor: ${rocha.cor}<br>
                Textura: ${rocha.textura}<br>
                Tipo: ${rocha.tipo}<br><br>
            `;
        });
        document.getElementById('selected-rock').innerHTML = resultadoHTML;
    } else {
        document.getElementById('selected-rock').innerHTML = `
            Nenhuma rocha correspondente encontrada.<br>
            Cor: ${selectedCharacteristics['cor']}<br>
            Textura: ${selectedCharacteristics['textura']}<br>
            Tipo: ${selectedCharacteristics['tipo']}
        `;
    }
}

// Exemplo de chamada das funções em botões (HTML)
// <button onclick="nextStep(2, 'cor', 'Preta')">Preta</button>
// <button onclick="nextStep(2, 'cor', 'Branca')">Branca</button>
// ...
// <button onclick="finalizar('Ignea')">Ignea</button>
// <button onclick="finalizar('Sedimentar')">Sedimentar</button>
// ...

