new Swiper('.swiper-container', {
  loop: true,
  slidesPerView: 2,
  centeredSlides: true,
  effect: 'coverflow',
    spaceBetween: -120, 


  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 1000,
    modifier: 1,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

