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

export default SkillDisplay;