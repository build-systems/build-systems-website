const slider = document.querySelector(".blog-carousel") as HTMLElement;

const allLinks: NodeListOf<HTMLElement> =
  document.querySelectorAll(".card-link");

// Previous
const buttonPrevious = document.querySelector(".btn-prev") as HTMLElement;
buttonPrevious.addEventListener("click", () => {
  slider.scrollBy(-400, 0);
});

// Next
const buttonNext = document.querySelector(".btn-next") as HTMLElement;
buttonNext.addEventListener("click", () => {
  slider.scrollBy(400, 0);
});

// Mouse click and drag to scroll
// Variables to store mouse position
let isDown = false;
let startX: number;
let scrollLeft: number;

// Event listener for mouse entering the carousel element
slider.addEventListener("mouseenter", (event) => {
  // Add event listeners for mouse down, move, and up
  slider.addEventListener("mousedown", onMouseDown);
  slider.addEventListener("mousemove", onMouseMove);
  slider.addEventListener("mouseup", onMouseUp);
});

// Function to handle mouse down event
function onMouseDown(e: MouseEvent) {
  slider.style.scrollSnapType = "none";
  slider.style.scrollBehavior = "auto";
  allLinks.forEach((element: HTMLElement) => {
    element.style.cursor = "grabbing";
  });
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  cancelMomentumTracking();
}

// Function to handle mouse move event
function onMouseMove(e: MouseEvent) {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  var prevScrollLeft = slider.scrollLeft;
  slider.scrollLeft = scrollLeft - walk;
  velX = slider.scrollLeft - prevScrollLeft;
}

// Function to handle mouse up event
function onMouseUp(e: MouseEvent) {
  isDown = false;
  slider.classList.remove('active');
  beginMomentumTracking();
  setTimeout(function () {
    slider.style.scrollSnapType = "x mandatory";
    slider.style.scrollBehavior = "smooth";
    allLinks.forEach((element: HTMLElement) => {
      element.style.cursor = "pointer";
    });
  }, 1000);
}

slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove('active');
});

// Momentum
var velX = 0;
var momentumID: number;

slider.addEventListener("wheel", (e) => {
  cancelMomentumTracking();
});

function beginMomentumTracking() {
  cancelMomentumTracking();
  momentumID = requestAnimationFrame(momentumLoop);
}
function cancelMomentumTracking() {
  cancelAnimationFrame(momentumID);
}
function momentumLoop() {
  slider.scrollLeft += velX;
  velX *= 0.95;
  if (Math.abs(velX) > 0.5) {
    momentumID = requestAnimationFrame(momentumLoop);
  }
}
