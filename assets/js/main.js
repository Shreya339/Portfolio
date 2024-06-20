/* ============ SHOW SIDEBAR ========== */
const navMenu = document.getElementById('sidebar'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* ============ OPEN SIDEBAR ========== */
/* Validate If Constant Exists */
if(navToggle){
    navToggle.addEventListener("click", () => {
        navMenu.classList.add('show-sidebar')
    })
}

/* ============ HIDE SIDEBAR ========== */
if(navClose){
    navClose.addEventListener("click", () => {
        navMenu.classList.remove('show-sidebar')
    })
}

/* ============SIDEBAR SHARE============ */
document.querySelector('.social__share').addEventListener('click', () => {
    const linkURL = `http://127.0.0.1:5500/index.html`;

    // Use the Clipboard API to copy the link
    navigator.clipboard.writeText(linkURL).then(() => {
        alert('Link copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
});

/* ============SKILLS CAROUSEL========== */

document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".skills__button");
    const carouselContent = document.querySelector(".carousel-content");

    function updateCarousel(content) {
        // Clear previous content
        carouselContent.innerHTML = '';

        // Populate new content
        content.forEach(item => {
            const carouselItem = document.createElement('div');
            carouselItem.className = 'carousel-item';

            const icon = document.createElement('img');
            icon.src = item.icon;
            icon.className = `carousel-icon ${item.icon}`;
            carouselItem.appendChild(icon);

            const text = document.createElement('p');
            text.className = 'carousel-text';
            text.textContent = item.text;
            carouselItem.appendChild(text);

            carouselContent.appendChild(carouselItem);
             // Trigger the transition after a slight delay
             setTimeout(() => {
                carouselItem.classList.add('visible');
            }, 10);
        });
    }

    // Change selected item when clicked
    items.forEach(item => {
        item.addEventListener("click", () => {

             // Remove 'active' class from all items
             items.forEach(i => i.classList.remove('active__skill'));
             // Add 'active' class to the clicked item
             item.classList.add('active__skill');

            const content = JSON.parse(item.getAttribute("data-content"));
            updateCarousel(content);
        });
    });

    // Default select the first item
    if (items.length > 0) {
        // make item active
        items[0].classList.add('active__skill'); 
        // add content to carousel
        const firstContent = JSON.parse(items[0].getAttribute("data-content"));
        updateCarousel(firstContent);
    }
});

/* ==============MIXITUP PORTFOLIO FILTER=========== */

var mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});

/* ========LINK 'ACTIVE' WORK BUTTON======= */
const linkWork = document.querySelectorAll('.work__item');

function activeWork(){
    linkWork.forEach(item => item.classList.remove('active-work'));
    this.classList.add('active-work');
}

linkWork.forEach(item => item.addEventListener("click", activeWork));

/* ========WORK POPUP======= */
//register event listener for portfolio card clicks and open popup
document.addEventListener("click", (e)=> {
    if(e.target.classList.contains("work__button")){
        togglePortfolioPopup();
        populatePopupDetails(e.target.parentElement);
    }
})

function togglePortfolioPopup(){
    document.querySelector(".portfolio__popup").classList.toggle("open");
}

//to close popup
document.querySelector('.portfolio__popup-close').addEventListener("click", togglePortfolioPopup);

//populate popup details from parent
function populatePopupDetails(parent){
    console.log(parent); //we are getting the parent as the parameter
    document.querySelector('.pp__thumbnail img').src = parent.querySelector('.work__img').src;
    document.querySelector('.pp__details__title').innerHTML = parent.querySelector(".work__title").innerHTML;
    document.querySelector(".portfolio__popup-subtitle span").innerHTML = parent.querySelector(".details__title").innerHTML;
    document.querySelector(".pp__details__description").innerHTML = parent.querySelector(".details__description").innerHTML;
    document.querySelector('.pp-git-link').href = parent.querySelector('.git-link').href;
    var techItems = parent.querySelectorAll('.technologies ul li');
    var ppTechList = document.querySelector('.pp__technologies');
    ppTechList.innerHTML = '';
    techItems.forEach(function(item) {
        // Clone the list item to avoid moving it from the original location
        var newItem = item.cloneNode(true);
        ppTechList.appendChild(newItem);
    });
}

//Services Modal
const modalViews = document.querySelectorAll(".services__modal"),
      modalBtns = document.querySelectorAll(".services__button"),
      modalCloses = document.querySelectorAll(".services__modal-close")

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i)=>{
    modalBtn.addEventListener('click', ()=> {
        modal(i)
    })
})

//cant use this beacuse we need to add event listener to all 3 modal-close buttons
/* document.querySelector('.services__modal-close').addEventListener('click', () => {
    document.querySelector('.services__modal').classList.remove("active-modal"); 
    modalCloses.forEach(modal => {
        modal.classList.remove('.active-modal');
    })

}); */

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', ()=>{
        modalViews.forEach((modal) =>{
            modal.classList.remove('active-modal')
        })
    })
})

/* ===========SCROLL SECTIONS ACTIVE LINK======= */
// get all sections that have an id
const sections = document.querySelectorAll("section[id]");

// add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter); // navHighlighter() -> using ths passes the return value and doesn't call the function

function navHighlighter(){
    //get current scrol position
    let scrollY = window.scrollY;
    // now loop through sections to get height, top and ID values for each
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute("id");

        /* - If our current scroll position enters the space where
        current section on screen is, add .active class to corresponding
        navigation link, else remove it 
        - To know which link needs an active class, we use sectionId variable
        that we are getting while looping through sections as a selector*/

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight)
            {
                document.querySelector('.nav__menu a[href*='+ sectionId +']').classList.add("active-link");
            }
        else{
            document.querySelector('.nav__menu a[href*='+ sectionId +']').classList.remove("active-link");
        }
    })
}