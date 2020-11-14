import projectList from "./projectList"

class Projects {
  constructor() {
    // controls
    this.nextBtn = document.getElementById("btn-next");
    this.prevBtn = document.getElementById("btn-prev");
    this.currentProject = 0;

    //display
    this.title = document.getElementById('project-title');
    this.techs = document.getElementById('project-tech');
    this.desc = document.getElementById('project-desc');
    this.techDesc = document.getElementById('project-tech-desc');
    this.link = document.getElementById('project-link');
    this.code = document.getElementById('project-code');
    this.design = document.getElementById('project-design');

    // images
    this.images = document.querySelectorAll('.display-image');
    this.imageWrapper = document.getElementById('image-wrapper')

    // scroller
    this.prevNo = document.getElementById('scroll-prev');
    this.nextNo = document.getElementById('scroll-next');
    this.suffix = document.getElementById('scroll-suffix');

    this.nextBtn.addEventListener('click', () => {
      if (this.currentProject < projectList.length - 1) {
        this.currentProject++;
        this.renderProject('next');
        console.log(this.currentProject);
      } else {
        console.log('no more projects');
      }
    })
    this.prevBtn.addEventListener('click', () => {
      if (this.currentProject > 0) {
        this.currentProject--;
        this.renderProject('prev');
        console.log(this.currentProject);
      } else {
        console.log('this is the first project');
      }
    })
  }
  renderProject = (direction = false) => {
    this.changeScroll();
    this.animateChange(600, direction); // equal to the animation time in _projects.scss file.
  }
  changeTexts = () => {
    this.title.textContent = projectList[this.currentProject].title;
    this.techs.textContent = projectList[this.currentProject].tech;
    this.desc.textContent = projectList[this.currentProject].para1;
    this.techDesc.textContent = projectList[this.currentProject].para2;
    this.link.href = projectList[this.currentProject].link;
    this.code.href = projectList[this.currentProject].code;
    this.design.href = projectList[this.currentProject].design;
  }
  changeScroll = () => {
    let prev = this.currentProject;
    let next = this.currentProject + 2;

    prev = prev > 9 ? prev : '0' + prev;
    next = next > 9 ? next : '0' + next;

    this.prevNo.textContent = prev;
    this.nextNo.textContent = next;

    let left = this.currentProject * (90 / (projectList.length - 1));
    this.suffix.style.left = left + '%'
  }
  disableBtns = (time) => {
    this.nextBtn.disabled = true;
    this.prevBtn.disabled = true;
    setTimeout(() => {
      this.nextBtn.disabled = false;
      this.prevBtn.disabled = false;
    }, time)
  }
  slideImg = (direction) => {
    if (direction) {
      this.imageWrapper.classList.add(`slide-${direction}`);
      setTimeout(() => this.imageWrapper.classList.remove(`slide-${direction}`), 1200)
    }
  }
  animateChange = (delay, dir) => { // delay in milisec
    this.disableBtns(delay);
    this.title.classList.add('hidden')
    this.techs.classList.add('hidden')
    this.desc.classList.add('hidden')
    this.techDesc.classList.add('hidden')
    this.slideImg(dir);
    setTimeout(() => {
      this.changeTexts();
      this.images.forEach(image => image.classList.add('hidden'))
      this.images[this.currentProject].classList.remove('hidden')
      this.title.classList.remove('hidden')
      this.techs.classList.remove('hidden')
      this.desc.classList.remove('hidden')
      this.techDesc.classList.remove('hidden')
    }, delay)
  }
}

export default Projects;