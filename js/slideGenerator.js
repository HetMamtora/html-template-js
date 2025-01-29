import {
	slides,
	PAN_EFFECTS,
	totalDuration,
	ACTIVE_TEMPLATE,
	initializeConfig,
} from "./slideConfig.js";
import {
	createWelcomeSlide,
	createContactSlide,
	createRegularSlide,
} from "./slideTemplates.js";
import { createDynamicStyles } from "./styleUtils.js";
import { applyTemplate } from "./templates.js";

let config;

export function calculateDelayForSlide(index) {
	return slides
		.slice(0, index)
		.reduce((sum, slide) => sum + (slide.duration), 0);
}

export function createCaptionElement(slide) {
	return `
        <div class="caption ${slide.slantedEdge?.captionPosition || ""}">
            <img src="${slide.icon}"/>
            ${slide.image}
        </div>
    `;
}

async function initSlideshow(slide) {
	console.log("InitSlideshow called");

	const slideshow = document.getElementById("slideshow");
	const templatedSlides = applyTemplate(
		config.slides,
		config.ACTIVE_TEMPLATE
	);

	if (!templatedSlides || templatedSlides.length === 0) {
		console.error("Templated slides are empty or undefined.");
		return;
	}

	console.log("Templated Slides:", templatedSlides);

	// Create curved edge but keep it hidden initially
	const { propertyDetails } = slide;
	if (propertyDetails) {
		const { title, amenities } = propertyDetails;
		const {
			bedrooms = 0,
			livingRooms = 0,
			kitchens = 0,
			bathrooms = 0,
		} = amenities || {};

		const curvedEdge = document.createElement("div");
		curvedEdge.className = "curved-edge";
		// Add initial hidden state
		curvedEdge.style.display = "none";
		curvedEdge.innerHTML = `
            <p>
                <span>Welcome to ${title}</span> <br/>
                <img src="./images/bedroom.svg"/> ${bedrooms}
                &nbsp; <img src="./images/livingroom.svg"/> ${livingRooms}
                &nbsp; <img src="./images/kitchen.svg"/> ${kitchens}
                &nbsp; <img src="./images/bathtub.svg"/> ${bathrooms}
            </p>
        `;
		document.body.appendChild(curvedEdge);
	} else {
		console.warn("No property details available for this slide.");
	}

	const totalDuration = slides.reduce(
		(sum, slide) => sum + (slide.duration),
		0
	);
	console.log("Total duration:", totalDuration);

	const slidesHTML = slides
		.map((slide, index) => {
			const duration = slide.duration;
			const delay = calculateDelayForSlide(index);

			let slideContent;
			if (slide.type === "welcome") {
				slideContent = createWelcomeSlide(
					slide,
					index,
					duration,
					delay
				);
			} else if (slide.type === "contact") {
				slideContent = createContactSlide(
					slide,
					index,
					duration,
					delay
				);
			} else {
				slideContent = createRegularSlide(
					slide,
					index,
					duration,
					delay
				);
			}

			return slideContent;
		})
		.join("");

	slideshow.innerHTML = `
        <div id="playButtonOverlay" class="play-button-overlay">
            <button id="startButton" class="start-button">
                <span>▶</span>
                <span>Start Slideshow</span>
            </button>
        </div>
        ${slidesHTML}
    `;

	document.head.appendChild(createDynamicStyles(totalDuration));

	let currentSlideIndex = 0;
	let slideshowStartTime;

	function startSlideshow() {
		const playButtonOverlay = document.getElementById("playButtonOverlay");
		playButtonOverlay.style.display = "none";

		// Show curved edge only after slideshow starts
		const curvedEdge = document.querySelector(".curved-edge");
		if (curvedEdge) {
			curvedEdge.style.display = "block";
		}

		document.querySelectorAll(".slide, .image").forEach((slide) => {
			slide.style.animationPlayState = "running";
		});

		document
			.querySelectorAll(".overlay div, .rectangle-bar")
			.forEach((element) => {
				element.style.animationPlayState = "running";
			});

		currentSlideIndex = 0;
		slideshowStartTime = Date.now();

		function updateCurvedEdge(slideIndex) {
			const curvedEdge = document.querySelector(".curved-edge");
			if (curvedEdge) {
				curvedEdge.style.display = slideIndex === 0 ? "block" : "none";
			}
		}

		function checkSlideChange() {
			const elapsed = (Date.now() - slideshowStartTime) / 1000;
			const nextSlideIndex = slides.findIndex((_, index) => {
				const slideStart = calculateDelayForSlide(index);
				const slideDuration = slides[index].duration ;
				return (
					elapsed >= slideStart &&
					elapsed < slideStart + slideDuration
				);
			});

			if (nextSlideIndex !== -1 && nextSlideIndex !== currentSlideIndex) {
				currentSlideIndex = nextSlideIndex;
				updateCurvedEdge(currentSlideIndex);
			}

			if (elapsed >= totalDuration) {
				location.reload();
				return;
			}

			requestAnimationFrame(checkSlideChange);
		}

		requestAnimationFrame(checkSlideChange);
	}

	const startButton = document.getElementById("startButton");
	startButton.addEventListener("click", startSlideshow);
}

document.addEventListener("DOMContentLoaded", async () => {
	console.log("DOM Content Loaded");
	try {
		config = await initializeConfig();
		const firstSlide = config.slides[0];
		initSlideshow(firstSlide);

		console.log("Slides:", config.slides);
		console.log("Total Duration:", config.totalDuration);
	} catch (error) {
		console.error("Error initializing slideshow:", error);
	}
});

window.addEventListener("load", () => {
	console.log("Window Loaded");
});
