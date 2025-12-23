/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "burgerMenu": () => (/* binding */ burgerMenu),
/* harmony export */   "isWebp": () => (/* binding */ isWebp),
/* harmony export */   "phoneMask": () => (/* binding */ phoneMask),
/* harmony export */   "popups": () => (/* binding */ popups)
/* harmony export */ });
/*---------------------------------------------------------------------------
Проверка WebP
---------------------------------------------------------------------------*/
function isWebp() {
   function testWebP(callback) {
      const webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height === 2);
      };
      webP.src =
         "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }

   testWebP(function (support) {
      document.body.classList.add(support ? "webp" : "no-webp");
   });
}


/*---------------------------------------------------------------------------
Маска телефона
---------------------------------------------------------------------------*/
function phoneMask() {
   document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll("input.tel-mask").forEach((input) => {
         let keyCode;
         function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            let matrix = "+7 (___) ___ __ __",
               i = 0,
               val = this.value.replace(/\D/g, ""),
               new_value = matrix.replace(/[_\d]/g, (a) =>
                  i < val.length ? val.charAt(i++) : a
               );
            i = new_value.indexOf("_");
            if (i !== -1) {
               i < 5 && (i = 3);
               new_value = new_value.slice(0, i);
            }
            let reg = matrix
               .substr(0, this.value.length)
               .replace(/_+/g, (a) => `\\d{1,${a.length}}`)
               .replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || (keyCode > 47 && keyCode < 58)) {
               this.value = new_value;
            }
            if (event.type === "blur" && this.value.length < 5) this.value = "";
         }

         input.addEventListener("input", mask);
         input.addEventListener("focus", mask);
         input.addEventListener("blur", mask);
         input.addEventListener("keydown", mask);
      });
   });
}


/*---------------------------------------------------------------------------
Бургер меню
---------------------------------------------------------------------------*/
function burgerMenu() {
   document.addEventListener("DOMContentLoaded", () => {
      const menuIcon = document.querySelector(".menu__icon");
      const menuBody = document.querySelector(".menu__body");
      const body = document.body;
      const menuBodyClose = document.querySelector(".menu__body-close");

      if (!menuIcon || !menuBody) return;

      const closeMenu = () => {
         menuIcon.classList.remove("active");
         menuBody.classList.remove("active");
         body.classList.remove("no-scroll");
      };

      menuIcon.addEventListener("click", () => {
         menuIcon.classList.toggle("active");
         menuBody.classList.toggle("active");
         body.classList.toggle("no-scroll");
      });

      menuBody.addEventListener("click", (e) => {
         if (e.target.tagName === "A" || e.target.closest("a")) closeMenu();
      });

      if (menuBodyClose) menuBodyClose.addEventListener("click", closeMenu);

      document.addEventListener("click", (e) => {
         if (!menuBody.contains(e.target) && !menuIcon.contains(e.target)) closeMenu();
      });
   });
}


/*---------------------------------------------------------------------------
Попапы
---------------------------------------------------------------------------*/
function popups() {
   document.addEventListener("DOMContentLoaded", () => {
      const openButtons = document.querySelectorAll(".open-popup");

      function closeActivePopup() {
         const activePopup = document.querySelector(".popup.show");
         if (activePopup) {
            activePopup.classList.remove("show");
         }
      }

      openButtons.forEach((button) => {
         button.addEventListener("click", function (e) {
            e.preventDefault();

            const popupId = this.dataset.popup;
            const popup = document.getElementById(popupId);
            if (!popup) return;

            // закрываем текущий попап
            closeActivePopup();

            // открываем новый
            popup.classList.add("show");
            document.body.style.overflow = "hidden";
         });
      });

      document.addEventListener("click", (e) => {
         const openPopup = document.querySelector(".popup.show");
         if (!openPopup) return;

         const isCloseBtn = e.target.closest(".popup__close");
         const isInsideBody = e.target.closest(".popup__body");
         const isPopupArea = e.target.closest(".popup");

         if (isCloseBtn || (!isInsideBody && isPopupArea)) {
            openPopup.classList.remove("show");
            document.body.style.overflow = "";
         }
      });
   });
}


/*==========================================================================
Swiper init
============================================================================*/
/* const reviewsSlider = document.querySelector(".reviews__slider");

if (reviewsSlider) {
   const reviewsSwiper = new Swiper(reviewsSlider, {
      slidesPerView: 1,
      loop: true,
      freeMode: false,
   });
} */

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.isWebp();
_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.burgerMenu();
_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.popups();
_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.phoneMask();

/*==========================================================================
Submenu
============================================================================*/
document.addEventListener("DOMContentLoaded", () => {
   const items = document.querySelectorAll(".menu__item--has-submenu");

   items.forEach((item) => {
      const toggle = item.querySelector(".submenu-toggle");

      toggle.addEventListener("click", (e) => {
         e.preventDefault();
         e.stopPropagation();

         items.forEach((i) => {
            if (i !== item) i.classList.remove("open");
         });

         item.classList.toggle("open");
      });
   });

   document.addEventListener("click", (e) => {
      if (!e.target.closest(".menu__item--has-submenu")) {
         items.forEach((item) => item.classList.remove("open"));
      }
   });
});


/*==========================================================================
Preloader
============================================================================*/
document.addEventListener("DOMContentLoaded", () => {
   const preloader = document.querySelector(".preloader");

   if (!preloader) return;

   const MIN_TIME = 1000;
   const startTime = Date.now();

   window.addEventListener("load", () => {
      const timePassed = Date.now() - startTime;
      const delay = Math.max(0, MIN_TIME - timePassed);

      setTimeout(() => {
         preloader.classList.add("hidden");

         setTimeout(() => {
            preloader.remove();
         }, 1200);
      }, delay);
   });
});


/*==========================================================================
Header fix
============================================================================*/
document.addEventListener("DOMContentLoaded", () => {
   const header = document.querySelector("header");

   if (!header) return;

   const toggleHeader = () => {
      if (window.scrollY > 40) {
         header.classList.add("fx");
      } else {
         header.classList.remove("fx");
      }
   };

   window.addEventListener("scroll", toggleHeader);
   toggleHeader();
});


/*==========================================================================
Observer Animation
============================================================================*/
if (document.readyState === "complete") {
   init();
} else {
   window.addEventListener("load", init);
}

function init() {
   function onEntry(entry) {
      entry.forEach(change => {
         if (change.isIntersecting) {
            change.target.classList.add('element-show');
         }
      });
   }

   let options = { threshold: [0.0] };
   let observer = new IntersectionObserver(onEntry, options);
   let elements = document.querySelectorAll('.element-animation');
   for (let elm of elements) {
      observer.observe(elm);
   }
}



/*==========================================================================
Move buttons
============================================================================*/
document.addEventListener("DOMContentLoaded", () => {
   const headerButtons = document.querySelector(".header__callback");
   const menuBody = document.querySelector(".menu__body");
   const headerBody = document.querySelector(".header__buttons");

   if (!headerButtons || !menuBody || !headerBody) return;

   const originalParent = headerBody;
   const originalNextSibling = headerButtons.nextElementSibling;

   const mq = window.matchMedia("(max-width: 1200px)");

   function handleMove(e) {
      if (e.matches) {
         if (headerButtons.parentElement !== menuBody) {
            menuBody.appendChild(headerButtons);
         }
      } else {
         if (headerButtons.parentElement !== originalParent) {
            if (originalNextSibling) {
               originalParent.insertBefore(headerButtons, originalNextSibling);
            } else {
               originalParent.appendChild(headerButtons);
            }
         }
      }
   }

   handleMove(mq);
   mq.addEventListener("change", handleMove);
});


/*==========================================================================
Related slider
============================================================================*/
const cardsSlider = document.querySelector(".latest__slider");

if (cardsSlider) {
   const cardsSwiper = new Swiper(cardsSlider, {
      loop: true,
      spaceBetween: 32,
      navigation: {
         nextEl: '.latest__next',
         prevEl: '.latest__prev',
      },
      breakpoints: {
         320: {
            slidesPerView: 1,
         },
         650: {
            slidesPerView: 2,
         },
         1100: {
            slidesPerView: 3,
         },
         1600: {
            slidesPerView: 4,
         }
      }
   });
}

/*==========================================================================
Filter tabs
============================================================================*/
document.addEventListener('DOMContentLoaded', function () {
   const tabs = document.querySelectorAll('.filters__tab');
   const cards = document.querySelectorAll('.filters__card');

   tabs.forEach(tab => {
      tab.addEventListener('click', () => {
         const tabId = tab.getAttribute('data-tab');
         tabs.forEach(t => t.classList.remove('active'));
         tab.classList.add('active');
         cards.forEach(card => {
            card.classList.remove('show');
         });
         const targetCard = document.querySelector(`.filters__card[data-tab="${tabId}"]`);
         if (targetCard) {
            targetCard.classList.add('show');
         }
      });
   });
});

/*==========================================================================
Swiper in product card  
============================================================================*/
document.addEventListener('DOMContentLoaded', function () {
   document.querySelectorAll('.card-preview__slider').forEach(function (slider) {
      const swiperInstance = new Swiper(slider, {
         loop: true,
         nested: true,
         pagination: {
            el: slider.closest('.card-preview__image').querySelector('.card-preview__pagination'),
            clickable: true,
            type: 'bullets',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            renderBullet: function (index, className) {
               return `<span class="${className}"></span>`;
            },
         },
      });

      if (window.innerWidth > 1024) {
         let lastMouseX = null;
         let threshold = 20;
         slider.addEventListener('mousemove', function (event) {
            if (lastMouseX !== null) {
               let deltaX = event.clientX - lastMouseX;
               if (Math.abs(deltaX) > threshold) {
                  if (deltaX > 0) {
                     swiperInstance.slideNext();
                  } else {
                     swiperInstance.slidePrev();
                  }
                  lastMouseX = event.clientX;
               }
            } else {
               lastMouseX = event.clientX;
            }
         });

         slider.addEventListener('mouseleave', function () {
            lastMouseX = null;
         });
      }
   });
});



/*==========================================================================
Reviews slider
============================================================================*/
const reviewsSlider = document.querySelector(".reviews__slider");

if (reviewsSlider) {
   const reviewsSwiper = new Swiper(reviewsSlider, {
      slidesPerView: 1,
      loop: true,
      spaceBetween: 0,
      navigation: {
         nextEl: '.reviews__next',
         prevEl: '.reviews__prev',
      },
   });
}


/*==========================================================================
Best slider
============================================================================*/
document.addEventListener("DOMContentLoaded", function () {

   function carouselEffect({ swiper, on, extendParams }) {
      extendParams({
         carouselEffect: {
            opacityStep: 0.33,
            scaleStep: 0.2,
            sideSlides: 2
         }
      });

      on("beforeInit", () => {
         if (swiper.params.effect !== "carousel") return;
         swiper.classNames.push(`${swiper.params.containerModifierClass}carousel`);
         Object.assign(swiper.params, {
            watchSlidesProgress: true,
            centeredSlides: true
         });
         Object.assign(swiper.originalParams, {
            watchSlidesProgress: true,
            centeredSlides: true
         });
      });

      on("progress", () => {
         if (swiper.params.effect !== "carousel") return;

         const { scaleStep, opacityStep, sideSlides } = swiper.params.carouselEffect;
         const maxSide = Math.max(Math.min(sideSlides, 3), 1);
         const l = { 1: 2, 2: 1, 3: 0.2 }[maxSide];
         const o = { 1: 50, 2: 50, 3: 67 }[maxSide];
         const r = swiper.slides.length;

         for (let i = 0; i < r; i++) {
            const slide = swiper.slides[i];
            const progress = slide.progress;
            const y = Math.abs(progress);

            let u = 1;
            if (y > 1) u = (y - 1) * 0.3 * l + 1;

            const v = `${progress * u * o * (swiper.rtlTranslate ? -1 : 1)}%`;
            const scale = 1 - y * scaleStep;
            const zIndex = r - Math.abs(Math.round(progress));

            slide.style.transform = `translateX(${v}) scale(${scale})`;
            slide.style.zIndex = zIndex;
            slide.style.opacity = y > maxSide + 1 ? 0 : 1;

            slide.querySelectorAll(".swiper-carousel-animate-opacity").forEach(el => {
               el.style.opacity = 1 - y * opacityStep;
            });
         }
      });

      on("resize", () => {
         if (swiper.virtual && swiper.params.virtual?.enabled) {
            requestAnimationFrame(() => {
               if (!swiper.destroyed) {
                  swiper.updateSlides();
                  swiper.updateProgress();
               }
            });
         }
      });

      on("setTransition", (_, duration) => {
         if (swiper.params.effect !== "carousel") return;
         swiper.slides.forEach(slide => {
            slide.style.transitionDuration = `${duration}ms`;
            slide.querySelectorAll(".swiper-carousel-animate-opacity").forEach(el => {
               el.style.transitionDuration = `${duration}ms`;
            });
         });
      });
   }

   const bestSlider = document.querySelector(".best__slider");
   if (bestSlider) {
      const bestSwiper = new Swiper(bestSlider, {
         effect: "carousel",
         grabCursor: true,
         loop: true,
         loopAdditionalSlides: 1,
         slidesPerView: "auto",
         autoplay: {
            delay: 3000
         },
         modules: [carouselEffect]
      });
   }

});


/*==========================================================================
Sort
============================================================================*/
document.addEventListener("DOMContentLoaded", () => {
   const sorts = document.querySelectorAll(".catalog__sort");

   if (!sorts.length) return;

   sorts.forEach((sort) => {
      const btn = sort.querySelector(".catalog__sort-btn");
      const params = sort.querySelector(".catalog__sort-params");

      if (!btn || !params) return;

      btn.addEventListener("click", (e) => {
         e.stopPropagation();

         // Закрываем все остальные
         sorts.forEach((other) => {
            if (other !== sort) {
               other.querySelector(".catalog__sort-btn")?.classList.remove("active");
               other.querySelector(".catalog__sort-params")?.classList.remove("show");
            }
         });

         btn.classList.toggle("active");
         params.classList.toggle("show");
      });

      params.addEventListener("click", (e) => {
         if (e.target.closest("a")) {
            btn.classList.remove("active");
            params.classList.remove("show");
         }
      });
   });

   // Глобальное закрытие по клику вне
   document.addEventListener("click", (e) => {
      sorts.forEach((sort) => {
         if (!sort.contains(e.target)) {
            sort.querySelector(".catalog__sort-btn")?.classList.remove("active");
            sort.querySelector(".catalog__sort-params")?.classList.remove("show");
         }
      });
   });
});

/*==========================================================================
Scroll top
============================================================================*/
document.addEventListener("DOMContentLoaded", () => {
   const goToTopBtn = document.querySelector(".go-to-top");
   if (!goToTopBtn) return;

   const toggleButtonVisibility = () => {
      const triggerHeight = window.innerHeight;

      if (window.scrollY > triggerHeight) {
         goToTopBtn.classList.add("show");
      } else {
         goToTopBtn.classList.remove("show");
      }
   };

   window.addEventListener("scroll", toggleButtonVisibility);

   goToTopBtn.addEventListener("click", () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   });

   toggleButtonVisibility();
});


/*==========================================================================
Aside
============================================================================*/
document.addEventListener("DOMContentLoaded", () => {
   const toggle = document.querySelector(".catalog__filter-toggle");
   const aside = document.querySelector(".catalog__aside");
   const close = document.querySelector(".aside__close");
   const body = document.body;

   if (!toggle || !aside) return;

   function openFilter() {
      toggle.classList.add("active");
      aside.classList.add("show");
      body.classList.add("filter-opened");
   }

   function closeFilter() {
      toggle.classList.remove("active");
      aside.classList.remove("show");
      body.classList.remove("filter-opened");
   }

   toggle.addEventListener("click", (e) => {
      e.stopPropagation();

      if (aside.classList.contains("show")) {
         closeFilter();
      } else {
         openFilter();
      }
   });

   if (close) {
      close.addEventListener("click", () => {
         closeFilter();
      });
   }

   document.addEventListener("click", (e) => {
      if (!aside.contains(e.target) && !toggle.contains(e.target)) {
         closeFilter();
      }
   });

});


/*==========================================================================
Bussones center slider
============================================================================*/
const bcSlider = document.querySelector(".business-center__slider");

if (bcSlider) {
   const bcSwiper = new Swiper(bcSlider, {
      loop: true,
      spaceBetween: 0,
      effect: 'fade',
      direction: "horizontal",
      slidesPerView: 1,
      pagination: {
         el: ".business-center__pagination",
         clickable: true,
      },
      speed: 1000,
      autoplay: {
         delay: 3000,
         disableOnInteraction: false
      }
   });
}



/*------------------------------Галерея---------------------------*/
const openBtn = document.getElementById('openGallery');

if (openBtn) {
   openBtn.addEventListener('click', () => {
      const slides = document.querySelectorAll('.business-center__slide');
      if (!slides.length) return;

      const items = Array.from(slides)
         .map(slide => {
            const img = slide.querySelector('img');
            if (!img || !img.src) return null;

            return {
               src: img.src,
               type: 'image',
               caption: img.alt || ''
            };
         })
         .filter(Boolean);

      if (!items.length) return;
      if (typeof Fancybox === 'undefined' || !Fancybox.show) return;

      Fancybox.show(items);
   });
}


/*==========================================================================
Hidden text
============================================================================*/
document.addEventListener('DOMContentLoaded', () => {
   const hiddenText = document.querySelector('.hidden-text');
   if (!hiddenText) return;

   const wrapper = hiddenText.querySelector('.hidden-text__wrapper');
   const toggleBtn = hiddenText.querySelector('.hidden-text__toggle button');
   const collapsedHeight = 160;

   wrapper.style.maxHeight = collapsedHeight + 'px';

   toggleBtn.addEventListener('click', () => {
      const isOpen = wrapper.classList.contains('open');

      if (isOpen) {
         wrapper.style.maxHeight = collapsedHeight + 'px';
         wrapper.classList.remove('open');
         toggleBtn.textContent = 'Показать больше';
      } else {
         wrapper.style.maxHeight = wrapper.scrollHeight + 'px';
         wrapper.classList.add('open');
         toggleBtn.textContent = 'Скрыть';
      }
   });
});


/*==========================================================================
Swiper in office card
============================================================================*/
document.addEventListener('DOMContentLoaded', function () {
   document.querySelectorAll('.offices__item-slider').forEach(function (slider) {
      const swiperInstance = new Swiper(slider, {
         loop: true,
         nested: true,
         pagination: {
            el: slider.closest('.offices__item-preview').querySelector('.offices__item-pagination'),
            clickable: true,
            type: 'bullets',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            renderBullet: function (index, className) {
               return `<span class="${className}"></span>`;
            },
         },
      });

      if (window.innerWidth > 1024) {
         let lastMouseX = null;
         let threshold = 20;
         slider.addEventListener('mousemove', function (event) {
            if (lastMouseX !== null) {
               let deltaX = event.clientX - lastMouseX;
               if (Math.abs(deltaX) > threshold) {
                  if (deltaX > 0) {
                     swiperInstance.slideNext();
                  } else {
                     swiperInstance.slidePrev();
                  }
                  lastMouseX = event.clientX;
               }
            } else {
               lastMouseX = event.clientX;
            }
         });

         slider.addEventListener('mouseleave', function () {
            lastMouseX = null;
         });
      }
   });
});


/*==========================================================================
Office tabs
============================================================================*/
document.addEventListener('DOMContentLoaded', () => {
   const tabs = document.querySelectorAll('.offices__tab');
   const items = document.querySelectorAll('.offices__items');
   const loader = document.querySelector('.loading-icon');
   let timeoutId = null; // для таймера лоадера

   if (!tabs.length || !items.length || !loader) return;

   tabs.forEach(tab => {
      tab.addEventListener('click', () => {
         const target = tab.dataset.tab;

         if (tab.classList.contains('active')) return;

         // отменяем предыдущий таймер, если он есть
         if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
         }

         // активный таб
         tabs.forEach(t => t.classList.remove('active'));
         tab.classList.add('active');

         // показать лоадер
         loader.classList.add('active');

         // скрыть все табы
         items.forEach(item => item.classList.remove('active'));

         // сбросить все анимации
         document
            .querySelectorAll('.element-animation')
            .forEach(el => el.classList.remove('element-show'));

         // запускаем таймер для имитации загрузки
         timeoutId = setTimeout(() => {
            loader.classList.remove('active');

            const targetItem = document.querySelector(
               `.offices__items[data-tab="${target}"]`
            );

            if (!targetItem) return;

            // показываем контент
            targetItem.classList.add('active');

            // 🔹 даём браузеру отрендерить контент, потом запускаем анимацию
            requestAnimationFrame(() => {
               requestAnimationFrame(() => {
                  targetItem
                     .querySelectorAll('.element-animation')
                     .forEach(el => el.classList.add('element-show'));
               });
            });

            timeoutId = null; // таймер отработал
         }, 300); // длительность лоадера
      });
   });
});




/*==========================================================================
Офис слайдеры   
============================================================================*/

const productGallerySlider = document.querySelector('.office__gallery-slider');
const productGallerySlider2 = document.querySelector('.office__gallery-slider-2');

if (productGallerySlider && productGallerySlider2) {

   const productSwiper = new Swiper(productGallerySlider, {
      direction: 'vertical',
      spaceBetween: 10,
      slidesPerView: 6,
      freeMode: {
         enabled: true,
         momentum: true,
         momentumRatio: 1,
         momentumBounce: false,
      },
      watchSlidesProgress: true,
   });

   const productSwiper2 = new Swiper(productGallerySlider2, {
      direction: 'vertical',
      spaceBetween: 10,
      thumbs: {
         swiper: productSwiper,
      },
      mousewheel: {
         releaseOnEdges: false,
         sensitivity: 2,
      },
      pagination: {
         el: 'office__gallery-pagination',
         clickable: true,
      },
      pagination: {
         el: '.office__gallery-pagination',
         clickable: true,
      },
      breakpoints: {
         320: {
            direction: 'horizontal',
            slidesPerView: 'auto',
            spaceBetween: 10,
         },
         1000: {
            direction: 'vertical',
            slidesPerView: 1,
            spaceBetween: 10,
         },
      },
   });

}


/*==========================================================================
Офис галерея
============================================================================*/
document.addEventListener('DOMContentLoaded', () => {
   const openBtn = document.querySelector('.office__gallery-open');

   if (!openBtn) return;
   if (typeof Fancybox === 'undefined' || !Fancybox.show) return;

   openBtn.addEventListener('click', () => {
      const slides = document.querySelectorAll(
         '.office__gallery-slider-2 .office__gallery-item'
      );

      if (!slides.length) return;

      const items = Array.from(slides)
         .map(slide => {
            const img = slide.querySelector('img');
            if (!img || !img.src) return null;

            return {
               src: img.src,
               type: 'image',
               caption: ''
            };
         })
         .filter(Boolean);

      if (!items.length) return;

      Fancybox.show(items, {
         Thumbs: false,
         Toolbar: true,
      });
   });
});


/*==========================================================================
NEW BC PAGE SLIDER
============================================================================*/
let bcSwiper = null;

function updateBcSwiper() {
   const bcContainer = document.querySelector('.bc-hero__slider');
   if (!bcContainer) return;

   const bcWrapper = bcContainer.querySelector('.bc-hero__slider-wrapper');
   const bcSlides = bcWrapper.querySelectorAll('.bc-hero__slide');
   const paginationElement = document.querySelector('.bc-hero__fraction');

   if (window.innerWidth >= 1200) {
      if (!bcSwiper) {
         bcContainer.classList.add('swiper');
         bcWrapper.classList.add('swiper-wrapper');
         bcSlides.forEach(slide => slide.classList.add('swiper-slide'));

         bcSwiper = new Swiper('.bc-hero__slider', {
            loop: false,
            direction: 'vertical',
            slidesPerView: 1,
            watchOverflow: true,
            simulateTouch: true,
            noSwipingClass: '.swiper-no-swiping',
            mousewheel: {
               forceToAxis: true,
               releaseOnEdges: true,
               sensitivity: 1
            },
            allowTouchMove: true,
            nested: true,
            grabCursor: false,
            slideToClickedSlide: false,
            speed: 1500,
            pagination: {
               el: '.bc-hero__fraction',
               type: 'custom',
               clickable: true,
               renderCustom: function (swiper, current, total) {
                  let paginationHtml = '';
                  for (let i = 1; i <= total; i++) {
                     paginationHtml += `<span class="swiper-pagination-item ${i === current ? 'active' : ''}" data-index="${i}">${i.toString().padStart(2, '0')}.</span>`;
                  }
                  return paginationHtml;
               },
            },
            on: {
               init(swiper) {
                  updateActiveSlideLink(swiper);
               },
               slideChange(swiper) {
                  updateActiveSlideLink(swiper);
               }
            }
         });

         if (paginationElement) {
            paginationElement.addEventListener('click', (e) => {
               if (e.target.classList.contains('swiper-pagination-item')) {
                  const index = parseInt(e.target.getAttribute('data-index'), 10);
                  bcSwiper.slideTo(index - 1);
               }
            });
         }

      }
   } else {
      if (bcSwiper) {
         bcSwiper.destroy(true, true);
         bcSwiper = null;
      }

      bcContainer.classList.remove('swiper');
      bcWrapper.classList.remove('swiper-wrapper');
      bcSlides.forEach(slide => {
         slide.classList.remove(
            'swiper-slide',
            'swiper-slide-active',
            'swiper-slide-next',
            'swiper-slide-prev'
         );
      });

      if (paginationElement) paginationElement.innerHTML = '';
   }
}

window.addEventListener('load', updateBcSwiper);
window.addEventListener('resize', updateBcSwiper);

function updateActiveSlideLink(swiper) {
   const links = document.querySelectorAll('.js-slide-link');

   links.forEach(link => link.classList.remove('active'));

   const activeIndex = swiper.activeIndex;
   const activeLink = document.querySelector(
      `.js-slide-link[data-slide="${activeIndex}"]`
   );

   if (activeLink) {
      activeLink.classList.add('active');
   }
}

document.addEventListener('DOMContentLoaded', () => {
   document.querySelectorAll('.js-slide-link').forEach(link => {
      link.addEventListener('click', e => {
         if (bcSwiper && window.innerWidth >= 1200) {
            e.preventDefault();

            const index = Number(link.dataset.slide);
            if (!Number.isNaN(index)) {
               bcSwiper.slideTo(index, 1500);
            }
         }
      });
   });
});


/*==========================================================================
Office tabs in bc page
============================================================================*/
document.addEventListener('DOMContentLoaded', () => {
   const officesPopup = document.querySelector('.offices-popup');
   const tabs = officesPopup.querySelectorAll('.offices-popup__tab');
   const items = officesPopup.querySelectorAll('.offices-popup__items');
   const loader = officesPopup.querySelector('.loading-icon');

   if (!tabs.length || !items.length || !loader) return;

   tabs.forEach(tab => {
      tab.addEventListener('click', () => {
         const target = tab.dataset.offices;

         if (tab.classList.contains('active')) return;

         tabs.forEach(t => t.classList.remove('active'));
         tab.classList.add('active');

         loader.classList.add('active');

         items.forEach(item => item.classList.remove('active'));

         setTimeout(() => {
            loader.classList.remove('active');

            const targetItem = document.querySelector(`.offices-popup__items[data-offices="${target}"]`);
            if (targetItem) {
               targetItem.classList.add('active');
            }
         }, 600);
      });
   });
});
})();

/******/ })()
;