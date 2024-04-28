//checking to see if new entry is visible in viewport, if it is then add class to it called show
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});
const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

// blob
const blob = document.getElementById("blob");

document.body.onpointermove = (event) => {
  const { clientX, clientY } = event;

  blob.animate(
    {
      left: `${clientX}px`,
      top: `${clientY}px`,
    },
    { duration: 3000, fill: "forwards" }
  );
};

// app.use(bodyParser.urlencoded({ extended: true }));

window.addEventListener("DOMContentLoaded", (event) => {
  var form = document.getElementById("contact-form");
  var successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    emailjs.sendForm("service_juvwhe7", "template_bb3dy8h", this).then(
      function (response) {
        // Clear the form
        form.reset();

        // Show success message
        successMessage.style.display = "flex";
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 3000);
      },
      function (error) {
        alert("Error sending email: " + JSON.stringify(error));
      }
    );
  });
});

//active seection
document.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section"); // Assuming each of your sections have a 'section' tag. If not, replace with the appropriate selector.
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSection = null;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (
      pageYOffset >= sectionTop - sectionHeight / 3 &&
      pageYOffset < sectionTop + sectionHeight - sectionHeight / 3
    ) {
      currentSection = section;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === currentSection.id) {
      link.classList.add("active");
    }
  });
});

//scrolll

// jQuery(document).ready(function($) {
//     $('a').click(function(e) {
//         e.preventDefault();
//         $id = $(this).attr('href');
//         $('body,html').animate({
//             scrollTop: $($id).offset().top
//         }, 500);
//     });
// });

var cnvs = document.getElementById("canvas");
cnvs.width = window.innerWidth;
cnvs.height = window.innerHeight;
var c = cnvs.getContext("2d");
var dots_num = 75;
var r = 2;
var mx, my;
var mouse_ol = 150;
var dots_ol = 150;
var max_speed = 1;
var max_ms_opac = 1;
var max_dots_opac = 1;
var uni_divs = 30; // ensures that dots are evenly spread across the canvas initially

window.addEventListener("mousemove", updtMouse);

var dots = new Array();

var Dot = function (x, y, dx, dy) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
};

function updtMouse(e) {
  mx = e.x;
  my = e.y;
  console.log(mx + " " + my);
}

function init() {
  for (let i = 0; i < dots_num; i++) {
    let x = Math.floor(
      (Math.random() * innerWidth) / uni_divs +
        parseInt(i / (dots_num / uni_divs)) * (innerWidth / uni_divs)
    );
    let y = Math.floor(Math.random() * innerHeight);
    let dx = Math.random() * max_speed + 0.1;
    let dy = Math.random() * max_speed + 0.1;
    if (i % 2 == 0) {
      dx *= -1;
      dy *= -1;
    }
    let temp = new Dot(x, y, dx, dy);
    dots.push(temp);
  }
}

function update() {
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < dots_num; i++) {
    let dy = dots[i].dy;
    let dx = dots[i].dx;

    dots[i].x += dx;
    dots[i].y += dy;

    // rebounce form walls
    if (dots[i].x > innerWidth || dots[i].x < 0) {
      dots[i].dx *= -1;
    }
    if (dots[i].y > innerHeight || dots[i].y < 0) {
      dots[i].dy *= -1;
    }

    let x = dots[i].x;
    let y = dots[i].y;

    // draw updated circle

    // Draw the dot
    c.beginPath();
    c.arc(dots[i].x, dots[i].y, r, 0, Math.PI * 2, true); // Creates a circle
    c.fillStyle = "#ff7eee"; // Choose a color for the dot
    c.fill();

    // draw its line to mouse
    let d = Math.sqrt((x - mx) * (x - mx) + (y - my) * (y - my));
    if (d < mouse_ol) {
      c.strokeStyle = `rgba(255, 126, 238, 0.5)`;
      c.lineWidth = 2;
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(mx, my);
      c.stroke();
    }

    // draw lines with other dots
    // for(let i=0; i<dots_num; i++) {
    for (let j = i + 1; j < dots_num; j++) {
      let x1 = dots[j].x;
      let y1 = dots[j].y;
      let d = Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
      if (d < dots_ol) {
        c.strokeStyle = `rgba(157, 210, 255, ${
          (max_dots_opac * (dots_ol - d)) / dots_ol
        })`;
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(x1, y1);
        c.lineTo(x, y);
        c.stroke();
        // }
      }
    }
  }
  requestAnimationFrame(update);
}

init();

requestAnimationFrame(update);

//tabs
