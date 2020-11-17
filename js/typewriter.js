class Typewriter {
  constructor() {
    this.prompt = document.getElementById('prompt');
    this.cursor = document.getElementById('cursor');
    this.txt = '';
    this.words = ['Full-Stack Junior Developer', 'from Project to Deployment', 'Python enthusiast', 'Front-end-focused', 'Check out my projects!'];
    this.wait = 3000;
    this.wordIndex = 0;
    this.typeSpeed = 200;
    this.wait = 2000;
    this.isDeleting = false;
    this.index = 0;
  }
  insertToSpan = (text) => {
    this.prompt.textContent = text;
  }
  type = () => {
    clearTimeout(this.index);

    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];
    let currentSpeed = this.typeSpeed;

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    this.insertToSpan(this.txt)

    if (this.isDeleting) {
      currentSpeed = this.typeSpeed / 2;
    } else {
      currentSpeed = this.typeSpeed
    }

    // word is complete
    if (!this.isDeleting && this.txt.length == fullTxt.length) {
      currentSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      currentSpeed = this.wait;
    }

    this.index = setTimeout(this.type, currentSpeed)
  }
  cursorPulse = (pulseSpeed) => {
    setInterval(() => {
      this.cursor.classList.toggle('hidden')
    }, pulseSpeed)
  }
}

export default Typewriter;