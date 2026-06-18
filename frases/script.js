const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Gerador que obrigatoriamente combina as 6 operações em uma única linha
function generateMathExpression(result) {
  // 1. RADICIAÇÃO (Gera uma raiz exata entre 2 e 5)
  const raizBase = Math.floor(Math.random() * 4) + 2; // 2 a 5
  const raizValor = raizBase * raizBase;
  let expr = `√${raizValor}`; // Valor atual: raizBase
  let currentVal = raizBase;

  // 2. POTENCIAÇÃO (Eleva uma base entre 2 e 3)
  const potBase = Math.floor(Math.random() * 2) + 2; // 2 ou 3
  expr = `(${expr} + ${potBase}²)`;
  currentVal = currentVal + (potBase * potBase); // Soma + Potência aplicadas

  // 3. MULTIPLICAÇÃO (Multiplica por um fator pequeno de 2 a 4)
  const mult = Math.floor(Math.random() * 3) + 2;
  expr = `(${expr} × ${mult})`;
  currentVal = currentVal * mult;

  // 4. SUBTRAÇÃO (Garante que o número não fique negativo ou zerado)
  const sub = Math.floor(Math.random() * 5) + 2; // 2 a 6
  expr = `(${expr} - ${sub})`;
  currentVal = currentVal - sub;

  // 5. DIVISÃO (Encontra um divisor perfeito para manter o número inteiro)
  let divisores = [];
  for (let i = 2; i <= 6; i++) {
    if (currentVal % i === 0) divisores.push(i);
  }
  // Se não houver divisor válido, usa 1 por segurança (o que mantém o inteiro)
  const div = divisores.length > 0 ? divisores[Math.floor(Math.random() * divisores.length)] : 1;
  expr = `(${expr} ÷ ${div})`;
  currentVal = Math.floor(currentVal / div);

  // 6. SOMA FINAL (Ajusta o valor para bater exatamente com o caractere desejado)
  const x = result - currentVal;
  if (x >= 0) {
    return `${expr} + ${x}`;
  } else {
    // Caso o valor atual passe do resultado da letra, compensa subtraindo no final
    return `${expr} - ${Math.abs(x)}`;
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
