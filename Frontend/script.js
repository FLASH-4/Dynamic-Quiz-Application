let questions = [
    {
        q: "What is JavaScript?",
        options: ["Programming Language", "OS", "Browser", "Database"],
        answer: 0
    },
    {
        q: "Which tool is used for automation testing?",
        options: ["Selenium", "Excel", "Word", "Paint"],
        answer: 0
    },
    {
        q: "Which keyword declares a variable in JS?",
        options: ["var", "define", "int", "const"],
        answer: 0
    }
];

let index = 0;
let score = 0;
let timer;
let timeLeft = 10;
let answered = false;

/* Analytics */
let timeSpent = [];
let correctCount = 0;
let wrongCount = 0;
let questionStartTime;

function startQuiz() {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("quiz-screen").classList.remove("hidden");
    loadQuestion();
}

function loadQuestion() {
    answered = false;
    timeLeft = 10;
    questionStartTime = Date.now();

    document.getElementById("time").innerText = timeLeft;
    document.getElementById("question").innerText = questions[index].q;

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    questions[index].options.forEach((opt, i) => {
        let btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => selectAnswer(btn, i);
        optionsDiv.appendChild(btn);
    });

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;
        if (timeLeft === 0) nextQuestion();
    }, 1000);
}

function selectAnswer(button, i) {
    if (answered) return;
    answered = true;

    clearInterval(timer);

    document.querySelectorAll(".options-box button")
        .forEach(b => b.classList.remove("selected"));

    button.classList.add("selected");

    let timeTaken = Math.round((Date.now() - questionStartTime) / 1000);
    timeSpent.push(timeTaken);

    if (i === questions[index].answer) {
        score++;
        correctCount++;
    } else {
        wrongCount++;
    }
}

function nextQuestion() {
    clearInterval(timer);

    if (!answered) {
        timeSpent.push(10);
        wrongCount++;
    }

    index++;
    if (index < questions.length) loadQuestion();
    else showResult();
}

function showResult() {
    document.getElementById("main-container").classList.add("hidden");
    document.getElementById("result-screen").classList.remove("hidden");

    let percentage = Math.round((score / questions.length) * 100);

    document.getElementById("score").innerText =
        `Score: ${score}/${questions.length}`;

    document.getElementById("analysis").innerText =
        `Performance: ${percentage}%`;

    renderCharts();
}

function renderCharts() {

    new Chart(document.getElementById("timeChart"), {
        type: "bar",
        data: {
            labels: ["Q1", "Q2", "Q3"],
            datasets: [{
                label: "Time (seconds)",
                data: timeSpent,
                backgroundColor: "#5a67d8"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    new Chart(document.getElementById("resultChart"), {
        type: "pie",
        data: {
            labels: ["Correct", "Wrong"],
            datasets: [{
                data: [correctCount, wrongCount],
                backgroundColor: ["#38a169", "#e53e3e"]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    new Chart(document.getElementById("performanceChart"), {
        type: "doughnut",
        data: {
            labels: ["Score %", "Remaining %"],
            datasets: [{
                data: [
                    (score / questions.length) * 100,
                    100 - (score / questions.length) * 100
                ],
                backgroundColor: ["#3182ce", "#e2e8f0"]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
