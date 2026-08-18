// ================================
// MENU MOBILE
// ================================

function toggleMenu() {
    const menu = document.getElementById("navLinks");

    menu.classList.toggle("active");
}


// ================================
// PROJETOS
// ================================

const projetos = {

    semaforo: {
        titulo: "🚦 Semáforo com Arduino",

        texto:
            "Neste projeto você aprenderá a controlar LEDs usando um Arduino. " +
            "A ideia é reproduzir o funcionamento básico de um semáforo.",

        codigo:
`int vermelho = 8;
int amarelo = 9;
int verde = 10;

void setup() {
    pinMode(vermelho, OUTPUT);
    pinMode(amarelo, OUTPUT);
    pinMode(verde, OUTPUT);
}

void loop() {

    digitalWrite(verde, HIGH);
    delay(3000);

    digitalWrite(verde, LOW);
    digitalWrite(amarelo, HIGH);
    delay(1000);

    digitalWrite(amarelo, LOW);
    digitalWrite(vermelho, HIGH);
    delay(3000);

    digitalWrite(vermelho, LOW);
}`
    },

    robo: {
        titulo: "🤖 Robô Desviador",

        texto:
            "O robô utiliza um sensor ultrassônico para identificar " +
            "obstáculos. Quando encontra algo em seu caminho, ele " +
            "pode parar e mudar de direção.",

        codigo:
`int trig = 7;
int echo = 6;

void setup() {
    pinMode(trig, OUTPUT);
    pinMode(echo, INPUT);
}

void loop() {

    digitalWrite(trig, HIGH);
    delayMicroseconds(10);
    digitalWrite(trig, LOW);

    long tempo = pulseIn(echo, HIGH);

    long distancia = tempo / 58;

    if (distancia < 20) {
        // Desviar do obstáculo
    }
}`
    },

    sensor: {
        titulo: "📏 Sensor de Distância",

        texto:
            "Utilize um sensor ultrassônico HC-SR04 para descobrir " +
            "a distância entre o sensor e um objeto.",

        codigo:
`int trig = 7;
int echo = 6;

void setup() {
    Serial.begin(9600);

    pinMode(trig, OUTPUT);
    pinMode(echo, INPUT);
}

void loop() {

    digitalWrite(trig, HIGH);
    delayMicroseconds(10);
    digitalWrite(trig, LOW);

    long tempo = pulseIn(echo, HIGH);

    long distancia = tempo / 58;

    Serial.print("Distancia: ");
    Serial.print(distancia);
    Serial.println(" cm");

    delay(500);
}`
    }
};


function mostrarProjeto(projeto) {

    const dados = projetos[projeto];

    document.getElementById("modalTitle").textContent = dados.titulo;

    document.getElementById("modalText").textContent = dados.texto;

    document.getElementById("modalCode").textContent = dados.codigo;

    document.getElementById("projectModal").style.display = "flex";
}


function fecharModal() {
    document.getElementById("projectModal").style.display = "none";
}


window.onclick = function(event) {

    const modal = document.getElementById("projectModal");

    if (event.target === modal) {
        fecharModal();
    }

};


// ================================
// QUIZ
// ================================

const perguntas = [

    {
        pergunta:
            "Qual componente permite que um robô detecte objetos ao seu redor?",

        respostas: [
            "Motor",
            "Sensor",
            "Bateria",
            "LED"
        ],

        correta: 1
    },

    {
        pergunta:
            "Qual placa é muito utilizada em projetos educacionais de robótica?",

        respostas: [
            "Arduino",
            "Televisão",
            "Monitor",
            "Teclado"
        ],

        correta: 0
    },

    {
        pergunta:
            "Qual linguagem é frequentemente utilizada para programar o Arduino?",

        respostas: [
            "HTML",
            "CSS",
            "C/C++",
            "SQL"
        ],

        correta: 2
    }

];

let perguntaAtual = 0;
let pontos = 0;


function carregarPergunta() {

    const pergunta = perguntas[perguntaAtual];

    document.getElementById("question").textContent =
        pergunta.pergunta;

    document.getElementById("questionNumber").textContent =
        `Pergunta ${perguntaAtual + 1}/${perguntas.length}`;

    const respostas =
        document.getElementById("answers");

    respostas.innerHTML = "";

    pergunta.respostas.forEach((resposta, index) => {

        const button = document.createElement("button");

        button.textContent = resposta;

        button.onclick = () => responder(index);

        respostas.appendChild(button);

    });

    document.getElementById("quizResult").textContent = "";
}


function responder(resposta) {

    const pergunta = perguntas[perguntaAtual];

    const resultado =
        document.getElementById("quizResult");

    if (resposta === pergunta.correta) {

        pontos++;

        resultado.textContent =
            "🎉 Resposta correta! Muito bem!";

        resultado.style.color = "#22c55e";

    } else {

        resultado.textContent =
            "❌ Ops! Essa não é a resposta correta.";

        resultado.style.color = "#ef4444";

    }

    setTimeout(() => {

        perguntaAtual++;

        if (perguntaAtual < perguntas.length) {

            carregarPergunta();

        } else {

            finalizarQuiz();

        }

    }, 1200);
}


function finalizarQuiz() {

    document.getElementById("question").textContent =
        `🏆 Você terminou o desafio!`;

    document.getElementById("answers").innerHTML = "";

    document.getElementById("questionNumber").textContent =
        "Desafio concluído";

    const resultado =
        document.getElementById("quizResult");

    resultado.style.color = "#00e5ff";

    resultado.textContent =
        `Você acertou ${pontos} de ${perguntas.length} perguntas!`;

    atualizarProgresso();
}


// ================================
// PROGRESSO
// ================================

function atualizarProgresso() {

    let progresso = 20 + (pontos * 20);

    if (progresso > 100) {
        progresso = 100;
    }

    document.getElementById("progressBar").style.width =
        progresso + "%";

    document.getElementById("progressValue").textContent =
        progresso + "%";
}


// Inicializar quiz
carregarPergunta();