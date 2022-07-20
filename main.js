import './style.css';

// IMAGE SLIDER //
const slideBtns = document.querySelectorAll('[data-slideBtn]');
const sliderContainer = document.querySelector('[data-slideContainer]');
const slides = [...document.querySelectorAll('[data-slide')];

let currentIndex = 0;
let isMoving = false;

const handleSlideBtnClick = (e) => {
  if (isMoving) return;
  isMoving = true;
  e.currentTarget.id === 'prev' ? currentIndex-- : currentIndex++;
  sliderContainer.dispatchEvent(new Event('sliderMove'));
};

const removeDisabledAttribute = (elm) =>
  elm.forEach((el) => el.removeAttribute('disabled'));

const addDisabledAttribute = (el) => el.setAttribute('disabled', 'true');

slideBtns.forEach((btn) => btn.addEventListener('click', handleSlideBtnClick));

sliderContainer.addEventListener('sliderMove', () => {
  sliderContainer.style.transform = `translate(-${
    currentIndex * slides[0].clientWidth
  }px)`;
  removeDisabledAttribute(slideBtns);
  currentIndex === 0 && addDisabledAttribute(slideBtns[0]);
});

document
  .querySelectorAll('[data-slide] img')
  .forEach((img) => (img.ondragstart = () => false));

sliderContainer.addEventListener('transitionend', () => (isMoving = false));

const slideObserver = new IntersectionObserver(
  (slide) => {
    if (slide[0].isIntersecting) {
      addDisabledAttribute(slideBtns[1]);
    }
  },
  {
    threshold: 0.75,
  }
);

slideObserver.observe(slides[slides.length - 1]);

// Form Event

const form = document.querySelector('#contact-form');
const email = document.querySelector('#email')
const submitBtn = document.querySelector('#contact-btn');

const contactBtnOptions = {
  pending: `
    <svg xmlns="http://www.w3.org/2000/svg" class="animate-spin" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="128" y1="32" x2="128" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="224" y1="128" x2="192" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="195.9" y1="195.9" x2="173.3" y2="173.3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="128" y1="224" x2="128" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="60.1" y1="195.9" x2="82.7" y2="173.3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="32" y1="128" x2="64" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="60.1" y1="60.1" x2="82.7" y2="82.7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line></svg>
    <span class="uppercase tracking-wide animate-pulse">
    Sending...
    </span>
  `,
  success: `
  <span class="uppercase tracking-wide">
    Thank you!
    </span>
    <span class="uppercase tracking-wide">
    ✌️
    </span>`,
};

const postEmailToDatabase = (email) => {
  console.info(`Your email is: ${email}`);
  return new Promise((resolve) => setTimeout(resolve, 2000))
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.innerHTML = contactBtnOptions.pending;
  const emailValue = email.value;
  addDisabledAttribute(submitBtn);
  email.style.display = 'none';
  await postEmailToDatabase(emailValue);
  submitBtn.innerHTML = contactBtnOptions.success;
});

// Fade up event

const fadeUpObserver = new IntersectionObserver((elsToWatch) => {
  elsToWatch.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('faded');
      fadeUpObserver.unobserve(el);
    }
  });
}, {
  threshold: .75,
});

document.querySelectorAll('.fade-up').forEach((item) => {
  fadeUpObserver.observe(item)
})