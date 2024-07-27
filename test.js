class Test {
    constructor (sectionsArray) {
        this.sNum = 0; // section number
        this.array = sectionsArray;
        this.answers = [];
    }

    sectionsLeft() {
        return this.sNum < this.array.length;
    }

    nextSection() {
        if (this.sectionsLeft()) {
            this.sNum++;
            return this.array[this.sNum - 1];
        }
        return null;
    }

    addAnswers(answers) {
        this.answers.push(answers);
    }

    getResults() {
        return this.answers;
    }

    reset() {
        this.sNum = 0;
        this.answers = [];
    }
}

export default Test;
