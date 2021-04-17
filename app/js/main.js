$(function () {

	$(".header__fon-mouse").click(function () {
		$("html, body").animate({
			scrollTop: $($(this).attr("href")).offset().top + "px"
		},
			{
				duration: 1000,
				easing: "swing"
			});
		return false;
	});

	$(".btn__up").click(function () {
		$("html, body").animate({
			scrollTop: $($(this).attr("href")).offset().top + "px"
		},
			{
				duration: 1000,
				easing: "swing"
			});
		return false;
	});

	var $grid = $('.grid').imagesLoaded(function () {
		$grid.masonry({
			itemSelector: '.grid-item',
			columnWidth: '.grid-sizer',
			gutter: '.gutter-sizer',
			percentPosition: true,
		});
	});

});

window.addEventListener('DOMContentLoaded', function () {

	var videos = document.querySelectorAll('.portfolio__video-video');

	videos.forEach(function (video) {
		video.addEventListener('click', function () {

			if (video.classList.contains('ready')) {

				return;

			}

			video.classList.add('ready');

			var resource = video.dataset.src;

			video.insertAdjacentHTML('afterbegin', '<iframe src="' + resource + '" title="YouTube video player"frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')

		});
	});

});

$(function () {
	$('.portfolio__slider-block').slick({
		dots: true,
		infinite: true,
		speed: 900,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		responsive: [{
			breakpoint: 981,
			settings: {
				arrows: false
			}
		}]
	});
});

$(document).ready(function () {
	$('.header__burger').click(function (event) {
		$('.header__burger, .header__menu').toggleClass('active');
		$('body').toggleClass('lock');
		$('.header__menu').slideToggle();
	});
});
