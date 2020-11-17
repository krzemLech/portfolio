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

export default NavScroll;