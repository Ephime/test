import Test from './test.js';
import data from './data.js';

const test = new Test(data.sections);

const testDiv = document.getElementById('testDiv');

function renderSection() {
    const currentSection = test.nextSection();
    if (currentSection) {
        testDiv.innerHTML = '';

        const description = document.createElement('p');
        description.innerHTML = currentSection.description;
        testDiv.appendChild(description);

        currentSection.questions.forEach((question, index) => {
            const questionElem = document.createElement('p');
            questionElem.innerHTML = question.q;

            const answerElem = document.createElement('input');
            answerElem.dataset.index = index; // To keep track of answers

            testDiv.append(questionElem, answerElem);
        });

        const nextButton = document.createElement('button');
        nextButton.innerHTML = 'Next';

        nextButton.onclick = () => {
            const answers = Array.from(testDiv.querySelectorAll('input')).map(input => input.value);
            test.addAnswers(answers);
            renderSection();
        };

        testDiv.appendChild(nextButton);
    } else {
        renderResults();
    }
}

function renderResults() {
    testDiv.innerHTML = '';
    const results = test.getResults();
    let totalCorrect = 0;
    let totalQuestions = 0;

    results.forEach((sectionAnswers, sectionIndex) => {
        const section = data.sections[sectionIndex];

        const sectionDescription = document.createElement('p');
        sectionDescription.innerHTML = `<strong>Section ${sectionIndex + 1}:</strong> ${section.description}`;
        testDiv.appendChild(sectionDescription);

        section.questions.forEach((question, questionIndex) => {
            const userAnswer = sectionAnswers[questionIndex];
            const isCorrect = userAnswer.trim().toLowerCase() === question.a.trim().toLowerCase();
            if (isCorrect) totalCorrect++;
            totalQuestions++;

            const resultItem = document.createElement('p');
            resultItem.className = isCorrect ? 'correct' : 'incorrect';
            resultItem.innerHTML = `
                Q: ${question.q} <br>
                Your answer: ${userAnswer} <br>
                Correct answer: ${question.a} <br>
                Translation: ${question.t}
            `;
            testDiv.appendChild(resultItem);
        });
    });

    const score = document.createElement('p');
    score.innerHTML = `<strong>Total Correct: ${totalCorrect} out of ${totalQuestions}</strong>`;
    testDiv.appendChild(score);

    const resetButton = document.createElement('button');
    resetButton.innerHTML = 'Start Over';
    resetButton.onclick = () => {
        test.reset();
        renderSection();
    };
    testDiv.appendChild(resetButton);
}

renderSection();
