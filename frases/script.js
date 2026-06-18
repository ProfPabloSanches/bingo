const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Gerador randômico de equações matemáticas estruturadas
function generateMathExpression(result) {
    const operations = ['soma', 'subtracao', 'multiplicacao', 'expressao', 'exponenciacao', 'radiciacao'];
    const chosenOp = operations[Math.floor(Math.random() * operations.length)];

    switch (chosenOp) {
        case 'soma':
            const s1 = Math.floor(Math.random() * (result - 1)) + 1;
            return `${s1} + ${result - s1}`;
        case 'subtracao':
            const sub2 = Math.floor(Math.random() * 12) + 4;
            return `${result + sub2} - ${sub2}`;
        case 'multiplicacao':
            let divisors = [];
            for(let i=1; i<=result; i++) { if(result % i === 0) divisors.push(i); }
            const d1 = divisors[Math.floor(Math.random() * divisors.length)];
            return `${d1} × ${result / d1}`;
        case 'exponenciacao':
            for (let base = 2; base <= 5; base++) {
                if (base * base === result) return `${base}²`;
                if (base * base * base === result) return `${base}³`;
            }
            return `${result}¹`;
        case 'radiciacao':
            return `√${result * result}`;
        case 'expressao':
            const a = Math.floor(Math.random() * 3) + 2;
            const b = Math.floor(Math.random() * 3) + 2;
            const diff = result - (a * b);
            return diff >= 0 ? `(${a} × ${b}) + ${diff}` : `(${a} × ${b}) - ${Math.abs(diff)}`;
    }
}

// Reconstrói a folha de forma totalmente dinâmica
function buildActivity() {
    const inputElement = document.getElementById('userPhrase');
    if (!inputElement) return;

    const textInput = inputElement.value.toUpperCase();
    
    // Tratamento robusto para remover acentos e manter apenas A-Z e espaços
    const cleanText = textInput.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Z ]/g, '');
    
    if (cleanText.trim().length === 0) {
        alert("Por favor, digite uma frase contendo letras.");
        return;
    }

    const questionsGrid = document.getElementById('mathQuestions');
    if (!questionsGrid) return;
    
    // Limpa a grade de perguntas antiga
    questionsGrid.innerHTML = '';

    let questionCount = 1;

    // Passa por cada caractere digitado para gerar as contas
    for (let i = 0; i < cleanText.length; i++) {
        const char = cleanText[i];

        // Ignora espaços vazios e gera contas apenas para as letras reais
        if (char !== " ") {
            const alphabetIndex = alphabet.indexOf(char) + 1;
            
            if (alphabetIndex > 0) {
                // Gera e adiciona a linha de comando matemático correspondente
                const expr = generateMathExpression(alphabetIndex);
                const qItem = document.createElement('div');
                qItem.classList.add('question-item');
                qItem.innerHTML = `<span>Letra ${questionCount}) &nbsp; <strong>${expr}</strong> = </span><div class="blank-line"></div>`;
                questionsGrid.appendChild(qItem);

                questionCount++;
            }
        }
    }
}

// Inicia com a palavra padrão assim que a página carrega completamente
window.addEventListener('DOMContentLoaded', () => {
    buildActivity();
});
