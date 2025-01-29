//PAN EFFECTS
const PAN_EFFECTS = {
	LEFT: "panAndZoomLeft",
	RIGHT: "panAndZoomRight",
	TOP: "panAndZoomTop",
	BOTTOM: "panAndZoomBottom",
};

//OVERLAY PATTERNS
const OVERLAY_PATTERNS = {
	ARROWS: { top: "top-arrow", bottom: "bottom-arrow" },
	RECTANGLES: { top: "top-rect", bottom: "bottom-rect" },
	TRIANGLES: { top: "bottom-triangle", bottom: "top-triangle" },
	CURTAINS: { left: "curtain-left", right: "curtain-right" },
	BLINDS: { top: "top-blinds", bottom: "bottom-blinds" },
	ZIGZAG: { top: "top-zigzag", bottom: "bottom-zigzag" },
	SHUTTER: { top: "top-shutter", bottom: "bottom-shutter" },
	CIRCLES: { top: "top-circle", bottom: "bottom-circle" },
};

// SLANTED EDGE WITH CAPTIONS
const SLANTED_EDGES = {
	BOTTOM: { class: "slanted-edge-bottom", captionPosition: "bottom" },
	TOP: { class: "slanted-edge-top", captionPosition: "top" },
};

//RECTANGLE BAR FOR QUOTE LINES
const RECTANGLE_BARS = {
	TOP: "rectangle-bar-top",
	BOTTOM: "rectangle-bar-bottom",
};

//WELCOME SLIDE PROPERTY DETAILS
const PROPERTY_DETAILS = {
	title: "Lavish Living",
	address: "Star Society, A-123, Ahmedabad",
	subtitle: "Welcome to your dream home",
	amenities: {
		bedrooms: 2,
		livingRooms: 1,
		kitchens: 2,
		bathrooms: 2,
	},
};

//IMAGE SLIDES ARRAY WITH OPTIONS
export function transformJsonToSlides(jsonData) {
	const welcomeSlide = {
		image_url: jsonData[1].image_url, // Using the first exterior shot
		type: "welcome",
		propertyDetails: PROPERTY_DETAILS,
		duration: jsonData[1].duration,
	};

	const regularSlides = jsonData.slice(1, -2).map((item) => ({
		type: "regular",
		image_url: item.image_url,
		overlay_text: item.overlay_text,
		duration: item.duration,
		image: item.image,
		icon: `../images/${item.image.toLowerCase()}.svg`,
	}));

	const contactSlide = {
		type: "contact",
		image_url: "./images/background.jpg",
		contactInfo: {
			email: "davidbrocker@luxuryhomes.com",
			phone: "+1 (555) 123-4567",
			avatar: jsonData[jsonData.length - 1].image_url,
		},
		duration: jsonData[jsonData.length - 1].duration,
	};

	return [welcomeSlide, ...regularSlides, contactSlide];
}

let slides = [];
const ACTIVE_TEMPLATE = "template2";
let totalDuration = 0;
// Export configuration initialization function
export async function initializeConfig() {
	try {
		const response = await fetch("./js/script_1.json");
		const jsonData = await response.json();
		slides = transformJsonToSlides(jsonData);
		totalDuration = slides.reduce((sum, slide) => sum + slide.duration, 0);

		return {
			slides,
			totalDuration,
			PAN_EFFECTS,
			OVERLAY_PATTERNS,
			SLANTED_EDGES,
			RECTANGLE_BARS,
			PROPERTY_DETAILS,
			ACTIVE_TEMPLATE,
		};
	} catch (error) {
		console.error("Error loading slide data:", error);
		throw error;
	}
}

export { slides, totalDuration };
// Export constants that don't depend on JSON data
export {
	PAN_EFFECTS,
	OVERLAY_PATTERNS,
	SLANTED_EDGES,
	RECTANGLE_BARS,
	PROPERTY_DETAILS,
	ACTIVE_TEMPLATE,
};
