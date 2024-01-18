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

export default Hamburger;