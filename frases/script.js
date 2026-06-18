const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Gerador de expressão matemática única e altamente complexa (mistura várias operações)
function generateMathExpression(result) {
  // 1. Escolhe uma base de potência ou raiz quadrada para iniciar o bloco complexo
  const bases =;
  const base = bases[Math.floor(Math.random() * bases.length)];
  const isPower = Math.random() > 0.5;
  
  let bloco1Valor;
  let bloco1Texto;

  if (isPower) {
    bloco1Valor = base * base;
    bloco1Texto = `${base}²`;
  } else {
    bloco1Valor = base;
    bloco1Texto = `√${base * base}`;
  }

  // 2. Mistura Multiplicação e Divisão no segundo bloco: ((Bloco1 + A) × B)
  const a = Math.floor(Math.random() * 5) + 2; // 2 a 6
  const b = Math.floor(Math.random() * 3) + 2; // 2 a 4
  
  const bloco2Valor = (bloco1Valor + a) * b;
  const bloco2Texto = `((${bloco1Texto} + ${a}) × ${b})`;

  // 3. Introduz uma Divisão exata: (Bloco2 ÷ C)
  // Encontra um divisor válido maior que 1 para o bloco2
  let divisores = [];
  for (let i = 2; i <= 6; i++) {
    if (bloco2Valor % i === 0) divisores.push(i);
  }
  
  // Fallback seguro caso não encontre divisores no laço
  const c = divisores.length > 0 ? divisores[Math.floor(Math.random() * divisores.length)] : 2;
  const bloco3Valor = Math.floor(bloco2Valor / c);
  const bloco3Texto = `(${bloco2Texto} ÷ ${c})`;

  // 4. Finaliza com Soma ou Subtração para atingir o valor exato do caractere (result)
  // Estrutura final: Bloco3 + X = result  => X = result - Bloco3
  const x = result - bloco3Valor;

  if (x >= 0) {
    return `${bloco3Texto} + ${x}`;
  } else {
    return `${bloco3Texto} - ${Math.abs(x)}`;
  }
}

// Reconstrói a folha de forma totalmente dinâmica
function buildActivity() {
  const textInput = document.getElementById('userPhrase').value.toUpperCase();
  const cleanText = textInput.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Z ]/g, '');

  if (cleanText.trim().length === 0) {
    alert("Por favor, digite uma frase contendo letras.");
    return;
  }

  const questionsGrid = document.getElementById('mathQuestions');
  const answerSlots = document.getElementById('answerSlots');

  questionsGrid.innerHTML = '';
  answerSlots.innerHTML = '';

  let questionCount = 1;
  let currentLineSlots = "";

  for (let i = 0; i < cleanText.length; i++) {
    const char = cleanText[i];

    if (char === " ") {
      currentLineSlots += `<div class="space-slot" style="display:inline-block; width:20px;"></div>`;
    } else {
      const charCode = alphabet.indexOf(char) + 1;

      if (charCode > 0) {
        const expression = generateMathExpression(charCode);

        questionsGrid.innerHTML += `
          <div class="math-box">
            <span class="question-number">${questionCount}) </span>
            <span class="expression">${expression}</span>
          </div>
        `;

        currentLineSlots += `
          <div class="answer-box" style="display:inline-block; margin:5px; text-align:center;">
            <input type="text" maxlength="1" style="width:30px; text-align:center;" id="answer-${questionCount}"><br>
            <span class="letter-label" style="font-size:12px;">${questionCount}</span>
          </div>
        `;
        questionCount++;
      }
    }
  }
  answerSlots.innerHTML = currentLineSlots;
}
