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





window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollTopBtn.classList.add("show");
        scrollTopBtn.classList.remove("hide");
    } else {
        scrollTopBtn.classList.add("hide");
        scrollTopBtn.classList.remove("show");
    }
});

const scrollTopBtn = document.getElementById("GoUpBtn");

function GoUp() {
   document.getElementById("Top").scrollIntoView({behavior:"smooth"})
}

function updateGithubCards(isDark) {
    const color = isDark ? 'ffffff' : '000000';
    const subColor = isDark ? 'aaaaaa' : '555555';

    document.getElementById('githubStatsImg').src =
        `https://github-readme-stats.vercel.app/api?username=constPy&show_icons=true&hide_border=true&bg_color=00000000&title_color=${color}&text_color=${color}&icon_color=${color}&count_private=true`;

    document.getElementById('githubStreakImg').src =
        `https://streak-stats.demolab.com?user=constPy&hide_border=true&background=00000000&ring=${color}&fire=${color}&currStreakLabel=${color}&sideLabels=${color}&dates=${subColor}&stroke=ffffff20&currStreakNum=${color}&sideNums=${color}`;

    document.getElementById('githubLangsImg').src =
        `https://github-readme-stats.vercel.app/api/top-langs/?username=constPy&layout=compact&hide_border=true&bg_color=00000000&title_color=${color}&text_color=${color}&count_private=true`;
}

// GitHub Contribution Calendar
async function loadGithubCalendar() {
    const grid = document.getElementById("calendarGrid");
    const totalEl = document.getElementById("totalContribs");

    grid.innerHTML = `<div class="calendar-loading" style="grid-column: span 53;">Loading contributions...</div>`;

    try {
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/constPy?y=last");
        const data = await res.json();

        const contributions = data.contributions; // array of { date, count, level }
        const total = data.total["lastYear"] ?? data.total[new Date().getFullYear()];

        totalEl.textContent = `${total.toLocaleString()} contributions in the last year`;

        grid.innerHTML = "";

        // GitHub calendar starts from Sunday — pad the first week
        const firstDay = new Date(contributions[0].date).getDay(); // 0=Sun
        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement("div");
            empty.style.width = "13px";
            grid.appendChild(empty);
        }

        contributions.forEach(({ date, count, level }) => {
            const cell = document.createElement("div");
            cell.className = "cal-cell";
            cell.dataset.level = level;
            const formatted = new Date(date).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric"
            });
            cell.dataset.tooltip = count === 0
                ? `No contributions on ${formatted}`
                : `${count} contribution${count > 1 ? "s" : ""} on ${formatted}`;
            grid.appendChild(cell);
        });

    } catch (err) {
        grid.innerHTML = `<div class="calendar-loading" style="grid-column: span 53;">Couldn't load calendar.</div>`;
        console.error("GitHub calendar error:", err);
    }
}

loadGithubCalendar();

async function loadGithubCalendar() {
    const grid = document.getElementById("calendarGrid");
    const totalEl = document.getElementById("totalContribs");

    grid.innerHTML = `<div class="calendar-loading" style="grid-column: span 53;">Loading contributions...</div>`;

    try {
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/constPy?y=last");
        const data = await res.json();

        const contributions = data.contributions;
        const total = data.total["lastYear"] ?? data.total[new Date().getFullYear()];
        totalEl.textContent = `${total.toLocaleString()} contributions in the last year`;

        // --- Compute stats ---
        let activeDays = 0;
        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;

        const today = new Date().toISOString().split("T")[0];

        // Longest & active days (forward pass)
        contributions.forEach(({ count }) => {
            if (count > 0) {
                activeDays++;
                tempStreak++;
                if (tempStreak > longestStreak) longestStreak = tempStreak;
            } else {
                tempStreak = 0;
            }
        });

        // Current streak (reverse pass from today)
        const sorted = [...contributions].reverse();
        // If today has no contributions yet, allow starting from yesterday
        const startIndex = sorted[0]?.date === today && sorted[0]?.count === 0 ? 1 : 0;
        for (let i = startIndex; i < sorted.length; i++) {
            if (sorted[i].count > 0) {
                currentStreak++;
            } else {
                break;
            }
        }

        // --- Render stats ---
        document.getElementById("activeDays").textContent = activeDays;
        document.getElementById("currentStreak").textContent = currentStreak + (currentStreak === 1 ? " day" : " days");
        document.getElementById("longestStreak").textContent = longestStreak + (longestStreak === 1 ? " day" : " days");

        // --- Render calendar grid ---
        grid.innerHTML = "";
        const firstDay = new Date(contributions[0].date).getDay();
        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement("div");
            empty.style.width = "13px";
            grid.appendChild(empty);
        }

        contributions.forEach(({ date, count, level }) => {
            const cell = document.createElement("div");
            cell.className = "cal-cell";
            cell.dataset.level = level;
            const formatted = new Date(date).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric"
            });
            cell.dataset.tooltip = count === 0
                ? `No contributions on ${formatted}`
                : `${count} contribution${count > 1 ? "s" : ""} on ${formatted}`;
            grid.appendChild(cell);
        });

    } catch (err) {
        grid.innerHTML = `<div class="calendar-loading" style="grid-column: span 53;">Couldn't load calendar.</div>`;
        console.error("GitHub calendar error:", err);
    }
}

loadGithubCalendar();