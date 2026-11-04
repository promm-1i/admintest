const tabContBtn = document.querySelectorAll(".tabBtn_list");
const tabCont = document.querySelectorAll(".tabItem");
tabContBtn.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    document.querySelector(".tabBtn_list.active").classList.remove("active");
    document.querySelector(".tabItem.active").classList.remove("active");
    btn.classList.add("active");
    tabCont[idx].classList.add("active")
  })
})

const mainSect3Slider = new Swiper(".sub1_sect3_swiper", {
  speed: 900,
  autoplay: {
    delay: 5500,
    disableOnInteraction: false,
  },
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  observer: true,
  observeParents: true,
  pagination: {
    el: ".sub1_sect3_swiper_page",
    clickable: true
  },
  navigation: {
    nextEl: ".sub1_sect3_swiper-btn.swiper-button-next",
    prevEl: ".sub1_sect3_swiper-btn.swiper-button-prev",
  },
});