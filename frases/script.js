const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Gerador randômico de equações matemáticas estruturadas e mistas
function generateMathExpression(result) {
  // Define 3 tipos de estruturas complexas misturadas
  const estruturas = ['tipo1', 'tipo2', 'tipo3'];
  const escolhida = estruturas[Math.floor(Math.random() * estruturas.length)];

  // Gera números aleatórios pequenos para compor a equação
  const a = Math.floor(Math.random() * 6) + 3; // 3 a 8
  const b = Math.floor(Math.random() * 5) + 2; // 2 a 6
  const c = Math.floor(Math.random() * 4) + 2; // 2 a 5

  switch (escolhida) {
    case 'tipo1': 
      // Estrutura: (A × B) - C + X = result  =>  X = result - (A * B) + C
      // Garante que o resultado intermediário seja positivo
      const mult1 = a * b;
      const x1 = result - mult1 + c;
      if (x1 >= 0) {
        return `(${a} × ${b}) - ${c} + ${x1}`;
      } else {
        return `(${a} × ${b}) - ${c} - ${Math.abs(x1)}`;
      }

    case 'tipo2':
      // Estrutura: (Multiplicação com Divisão) => (A × X) / B = result => X = (result * B) / A
      // Para manter números inteiros, definimos B e X primeiro
      const b2 = Math.floor(Math.random() * 3) + 2; // 2 a 4
      const produto = result * b2;
      
      // Encontra um divisor para o produto para ser o número 'A'
      let divisores = [];
      for (let i = 2; i <= 10; i++) {
        if (produto % i === 0) divisores.push(i);
      }
      
      if (divisores.length > 0) {
        const a2 = divisores[Math.floor(Math.random() * divisores.length)];
        const x2 = produto / a2;
        return `(${a2} × ${x2}) ÷ ${b2}`;
      }
      // Sobra de segurança caso não ache divisor exato
      return `(${result} × 4) ÷ 4`;

    case 'tipo3':
      // Estrutura com Potência/Raiz: (A² - B) + X = result => X = result - A² + B
      const base = Math.floor(Math.random() * 3) + 3; // 3, 4 ou 5
      const pot = base * base;
      const b3 = Math.floor(Math.random() * 5) + 1; // 1 a 5
      const x3 = result - pot + b3;
      
      if (x3 >= 0) {
        return `(${base}² - ${b3}) + ${x3}`;
      } else {
        return `(${base}² - ${b3}) - ${Math.abs(x3)}`;
      }
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
