const reveals = document.querySelectorAll('.reveal')

function revealOnScroll(){

  const triggerBottom = window.innerHeight * 0.88

  reveals.forEach(section => {

    const top = section.getBoundingClientRect().top

    if(top < triggerBottom){
      section.classList.add('active')
    }
  })
}

window.addEventListener('scroll', revealOnScroll)

revealOnScroll()
