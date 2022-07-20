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