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


const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollTopBtn.classList.add("show");
        scrollTopBtn.classList.remove("hide");
    } else {
        scrollTopBtn.classList.add("hide");
        scrollTopBtn.classList.remove("show");
    }
});

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function openMessageForm() {
  const form = document.getElementById("messageForm");
  form.classList.remove("hide");
  form.style.display = "block";
  setTimeout(() => form.classList.add("show"), 10); // trigger fade-in
}

function closeMessageForm() {
  const form = document.getElementById("messageForm");
  form.classList.remove("show");
  form.classList.add("hide");
  setTimeout(() => {
    form.style.display = "none";
  }, 400); // match transition duration
}

(function(){
  emailjs.init("UX6DAsyKINOJELtFJ");
})();

document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();
})

  // Collect values from your form
  const params = {
  name: document.getElementById("name").value,
  message: document.getElementById("message").value
};


  document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  emailjs.sendForm("service_5pix2ux", "template_awsvnh8", this)
    .then(function(response) {
      console.log("Email SUCCESS!", response.status, response.text);
      showNotification("successMsg");
      document.getElementById("contactForm").reset();
      closeMessageForm();
    })
    .catch(function(error) {
      console.error("Email FAILED...", error);
      showNotification("errorMsg");
    });
});


// Notification function
function showNotification(id) {
  const note = document.getElementById(id);
  note.classList.add("show");
  setTimeout(() => {
    note.classList.remove("show");
  }, 10000); // visible for 3 seconds
}
