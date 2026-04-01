/*Dark Mode*/
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}


/*Navigation Buttons*/

function AboutBtn(){
  document.getElementById("about").scrollIntoView({behavior:"smooth"})
}

function WorkBtn(){
  document.getElementById("work").scrollIntoView({behavior:"smooth"})
}


function ContactBtn(){
  document.getElementById("contact").scrollIntoView({behavior:"smooth"})
}

// Scroll animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe all elements except nav and logo
document.addEventListener('DOMContentLoaded', () => {

    const elementsToAnimate = document.querySelectorAll('.hero p, .about-text');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    elementsToAnimate.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});
});

function toggleDarkMode() {
    // Toggle the class
    document.body.classList.toggle("dark-mode");
    
    // Save the current mode in localStorage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

window.onload = function() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode"); // ensures light mode stays default
    }
};


// Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
};

scrollTopBtn.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
