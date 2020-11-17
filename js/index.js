import Form from "./form.js";
import Projects from "./projects";
import Hamburger from "./hamburger";
import NavScroll from "./navbar";
import Typewriter from "./typewriter";
import SkillDisplay from "./skills";


// hamburger animation
const hamburger = new Hamburger();

// navbar changes and classes depending on the scroll value
const navScroll = new NavScroll();
navScroll.updateSectionTops();
navScroll.changeActiveNav();

// typewriter effect in the hero section
const typeWriter = new Typewriter();
typeWriter.cursorPulse(500);
typeWriter.type();

// animations for skill section
const skillDisplay = new SkillDisplay();

// form validation and data send to the backend
const form = new Form();

// animations and text changes for the project section
const projects = new Projects();
projects.renderProject();
