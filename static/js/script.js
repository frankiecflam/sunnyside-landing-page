// Element Selectors
const topBar = document.querySelector(".top-bar");
const menuBtn = document.querySelector(".nav__btn");
const menuBtnBtn = document.querySelector(".nav__btn-menu");
const menuItems = document.querySelectorAll(".nav__link");
const navList = document.querySelector(".nav__list")

const allSections = document.querySelectorAll("section");
const features = document.querySelector(".features");
const gallery = document.querySelector(".gallery");
const footerNavItems = document.querySelectorAll(".footer__nav-link");


/*===NAVIGATION===*/
function navToggle () {
    topBar.classList.toggle("nav-open");
}

// Display mobile nav upon click
menuBtn.addEventListener("click", function(e){
    navToggle();
})

document.addEventListener("mouseup", function(e) {
    // Upon a click on menu link, close the menu
    menuItems.forEach(item => {
        item.addEventListener("click", function(){
            // When nav is open
            if(topBar.classList.contains("nav-open")) {
                navToggle();
            }
        });
    })
})

// Scrolling when nav item is clicked
function smoothScrollTo (e) {
    e.preventDefault();
    const section = e.target.getAttribute("href").slice(1);
    const scrollTo = document.getElementById(section);
    if(!scrollTo) return;

    scrollTo.scrollIntoView({behavior: "smooth"});
}

menuItems.forEach(item => {
    item.addEventListener("click", function(e) {
        smoothScrollTo(e);
    })
})

footerNavItems.forEach(item => {
    item.addEventListener("click", function(e) {
        smoothScrollTo(e);
    })
})


// Reveal section as scrolling through
const revealSection = function(entries, observer) {
    const [entry] = entries;
    
    if(!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);

}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.1
})

allSections.forEach(section => {
    sectionObserver.observe(section);
    section.classList.add("section--hidden")
})

// GSAP
let tl = gsap.timeline();
tl.from(".header", {
    scale: 0.5,
    duration: 1,
    opacity: 0,
    ease: Expo.Easeout,
    delay: 0.2
})
.to(".header__heading", {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    y: 0,
}, "-=0.3")
.to(".header__arrow", {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    y: 0,
})
.to("#nav__contact", {
    opacity: 1,
})