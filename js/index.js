import Form from "./form.js";
import Projects from "./projects"
import projectList from "./projectList"

class Hamburger {
  constructor() {
    this.hamburger = document.querySelector('.hamburger')
    this.nav = document.querySelector('.nav')

    this.hamburger.addEventListener('click', () => {
      this.hamburger.classList.toggle('open');
      this.nav.classList.toggle('open')
    })
  }
}

const hamburger = new Hamburger();

class NavScroll {
  constructor() {
    this.header = document.querySelector('header');
    this.navItems = document.querySelectorAll('.nav-item');
    this.sections = document.querySelectorAll('section');
    this.sectionTops = [];

    document.addEventListener('scroll', () => {
      window.scrollY ? this.header.classList.add('scrolled') : this.header.classList.remove('scrolled');
      this.updateSectionTops();
      this.changeActiveNav();
    });
    this.sections.forEach(section => {

    })
  }
  updateSectionTops = () => {
    let sectionTops = [];
    this.sections.forEach(section => {
      sectionTops.push(section.offsetTop)
    });
    this.sectionTops = sectionTops;
  };
  changeActiveNav = () => {
    this.sectionTops.forEach((top, index) => {
      // window.scrollY + 1 since equal did not work on the lat section
      if ((window.scrollY + 1 >= top && (window.scrollY < this.sectionTops[index + 1] || index == this.sectionTops.length - 1))) {
        this.navItems.forEach(item => item.classList.remove('active'));
        this.navItems[index].classList.add('active');
      }
    })
  }
}

const navScroll = new NavScroll();
navScroll.updateSectionTops();
navScroll.changeActiveNav();

class Typewriter {
  constructor() {
    this.prompt = document.getElementById('prompt');
    this.cursor = document.getElementById('cursor');
    this.txt = '';
    this.words = ['full-stack developer', 'from project to deployment', 'front-end-focused', 'check out my projects!'];
    this.wait = 3000;
    this.wordIndex = 0;
    this.typeSpeed = 200;
    this.wait = 2000;
    this.isDeleting = false;
    this.index = null;
  }
  insertToSpan = (text) => {
    this.prompt.textContent = text;
  }
  type = () => {
    if (this.index !== null) {
      clearTimeout(this.index);
    }

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

const typeWriter = new Typewriter();
typeWriter.cursorPulse(500);
typeWriter.type();

class SkillDisplay {
  constructor() {
    this.skillNames = document.querySelectorAll('.skills-menu-item');
    this.skillDisplays = document.querySelectorAll('.skill');
    this.measure = document.querySelector('.measure')

    this.skillNames.forEach(name => {
      name.addEventListener('click', (e) => {
        this.measure.classList.add('visible')
        this.skillNames.forEach(item => item.classList.remove('active'))
        e.target.classList.add('active')
        this.skillDisplays.forEach(display => display.classList.remove('active'))
        this.skillDisplays[e.target.dataset.skillNo].classList.add('active')
      })
    })
  }
};

const skillDisplay = new SkillDisplay();

const form = new Form();
const projects = new Projects();
