import projectList from "./data/projectList"

class Projects {
  constructor() {
    // controls
    this.nextBtn = document.getElementById("btn-next");
    this.prevBtn = document.getElementById("btn-prev");

    // content and animation variables
    this.currentProject = 0;
    this.currentTitle = projectList[this.currentProject].title;
    this.deleting = true;
    this.timeoutIndex = 0;
    this.delay = 600; // equal to the $animation-length in _project.scss
    this.iteration = this.currentTitle.length;

    //display
    this.title = document.querySelector('.project-title-prompt');
    this.cursor = document.querySelector('.project-title-cursor');
    this.techs = document.getElementById('project-tech');
    this.desc = document.getElementById('project-desc');
    this.techDesc = document.getElementById('project-tech-desc');
    this.link = document.getElementById('project-link');
    this.code = document.getElementById('project-code');
    this.design = document.getElementById('project-design');

    // images
    this.images = document.querySelectorAll('.display-image');
    this.imageWrapper = document.getElementById('image-wrapper');

    // scroller
    this.prevNo = document.getElementById('scroll-prev');
    this.nextNo = document.getElementById('scroll-next');
    this.suffix = document.getElementById('scroll-suffix');

    this.nextBtn.addEventListener('click', () => {
      if (this.currentProject < projectList.length - 1) {
        this.currentProject++;
        this.renderProject('next');
      } else {
        console.log('no more projects');
      }
    })
    this.prevBtn.addEventListener('click', () => {
      if (this.currentProject > 0) {
        this.currentProject--;
        this.renderProject('prev');
      } else {
        console.log('this is the first project');
      }
    })
  }
  renderProject = (direction = false) => {
    this.changeScroll();
    this.animateChange(direction); // equal to the animation time in _projects.scss file.
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
    if (next < 10) {
      next = '0' + next;
    } else if (next > projectList.length) {
      next = 'end'
    }

    this.prevNo.textContent = prev;
    this.nextNo.textContent = next;

    let left = this.currentProject * (90 / (projectList.length - 1));
    this.suffix.style.left = left + '%'
  }
  disableBtns = (action) => {
    if (action) {
      this.nextBtn.disabled = true;
      this.prevBtn.disabled = true;
    } else {
      this.nextBtn.disabled = false;
      this.prevBtn.disabled = false;
    }
  }
  slideImg = (direction) => {
    if (direction) {
      this.imageWrapper.classList.add(`slide-${direction}`);
      setTimeout(() => {
        this.images.forEach(image => image.classList.add('hidden'));
        this.images[this.currentProject].classList.remove('hidden');
      }, this.delay)
      setTimeout(() => this.imageWrapper.classList.remove(`slide-${direction}`), this.delay * 2)
    }
  }
  manageProjectDesc = (action, className) => {
    if (action === "add") {
      this.techs.classList.add(className);
      this.desc.classList.add(className);
      this.techDesc.classList.add(className);
    } else if (action === 'remove') {
      this.techs.classList.remove(className)
      this.desc.classList.remove(className)
      this.techDesc.classList.remove(className);
    }
  }
  animateTitle = () => {

    clearTimeout(this.timeoutIndex);

    if (this.deleting === true && this.iteration > 0) {
      this.iteration--;
      this.title.textContent = this.currentTitle.substring(0, this.iteration)
    } else if (this.iteration === 0) {
      this.currentTitle = projectList[this.currentProject].title;
      this.deleting = false;
      ++this.iteration;
    } else if (this.deleting === false && this.iteration < this.currentTitle.length) {
      ++this.iteration;
      this.title.textContent = this.currentTitle.substring(0, this.iteration)
    } else if (this.iteration === this.currentTitle.length) {
      clearTimeout(this.timeoutIndex);
      this.deleting = true;
      this.changeTexts();
      this.manageProjectDesc('remove', 'hidden');
      setTimeout(() => {
        this.cursor.classList.add('hidden');
        this.disableBtns(false)
      }, this.delay);
      return true;
    }
    this.timeoutIndex = setTimeout(() => this.animateTitle(), 75)
  }
  animateChange = (dir) => {
    this.disableBtns(true);
    this.manageProjectDesc('add', 'hidden')
    this.slideImg(dir);
    this.cursor.classList.remove('hidden')
    this.animateTitle();
    // this last function must end all of the above, since it is async and should wait for the cursor to finish typing title before showing other texts 
  }
}

export default Projects;