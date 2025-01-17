const BASE_DURATION = 6;

//AUDIO FILES
const AUDIO_FILES = {
    WELCOME: '/Audio/Audio-1.mp3',
    BATHROOM: '/Audio/Audio-2.mp3',
    CONTACT: '/Audio/Audio-3.mp3'
};
//[audio duration is primary for slides having audio and will overlap default duration]

//PAN EFFECTS
const PAN_EFFECTS = {
    LEFT: 'panAndZoomLeft',
    RIGHT: 'panAndZoomRight',
    TOP: 'panAndZoomTop',
    BOTTOM: 'panAndZoomBottom',
};

//OVERLAY PATTERNS
const OVERLAY_PATTERNS = {
    ARROWS: { top: 'top-arrow', bottom: 'bottom-arrow' },
    RECTANGLES: { top: 'top-rect', bottom: 'bottom-rect' },
    TRIANGLES: { top: 'bottom-triangle', bottom: 'top-triangle' },
    CURTAINS: { left: 'curtain-left', right: 'curtain-right' },
    BLINDS: { top: 'top-blinds', bottom: 'bottom-blinds' },
    ZIGZAG: { top: 'top-zigzag', bottom: 'bottom-zigzag' },
    SHUTTER: { top: 'top-shutter', bottom: 'bottom-shutter' },
    CIRCLES: { top: 'top-circle', bottom: 'bottom-circle' }
};

// SLANTED EDGE WITH CAPTIONS
const SLANTED_EDGES = {
    BOTTOM: { class: 'slanted-edge-bottom', captionPosition: 'bottom' },
    TOP: { class: 'slanted-edge-top', captionPosition: 'top' }
};

//RECTANGLE BAR FOR QUOTE LINES
const RECTANGLE_BARS = {
    TOP: 'rectangle-bar-top',
    BOTTOM: 'rectangle-bar-bottom'
};

//WELCOME SLIDE PROPERTY DETAILS
const PROPERTY_DETAILS = {
    title: 'Lavish Living',
    address: 'Star Society, A-123, Ahmedabad',
    subtitle: 'Welcome to your dream home',
    amenities: {
        bedrooms: 2,
        //livingRooms: 1,
        kitchens: 2,
        bathrooms: 2
    }
};

//IMAGE SLIDES ARRAY WITH OPTIONS
const images = [
    {
        image_url: '../images/2.jpg',
        image_animation: PAN_EFFECTS.BOTTOM,
        overlay_animation: OVERLAY_PATTERNS.ARROWS,
        slantedEdge: SLANTED_EDGES.TOP,
        icon: '../images/livingroom.svg',
        image: 'Living Room',
        rectangleBar: RECTANGLE_BARS.BOTTOM,
        overlay_text: 'Where comfort meets style – your perfect gathering space awaits!',
        audio_url: false,
        duration: 6
    },
    {
        image_url: '../images/3.jpg',
        image_animation: PAN_EFFECTS.TOP,
        overlay_animation: OVERLAY_PATTERNS.ZIGZAG,
        slantedEdge: SLANTED_EDGES.BOTTOM,
        icon: '../images/dinning.svg',
        image: 'Dinning Space',
        rectangleBar: RECTANGLE_BARS.TOP,
        overlay_text: 'Dine, laugh, and celebrate in a space that brings everyone together.',
        audio_url: false,
        duration:6
    },
    {
        image_url: '../images/4.jpg',
        image_animation: PAN_EFFECTS.BOTTOM,
        overlay_animation: OVERLAY_PATTERNS.RECTANGLES,
        slantedEdge: SLANTED_EDGES.TOP,
        icon: '../images/kitchen.svg',
        image: 'Kitchen',
        rectangleBar: RECTANGLE_BARS.BOTTOM,
        overlay_text: 'Cook up memories in a kitchen designed for culinary perfection.',
        audio_url: false,
        duration:6
    },
    {
        image_url: '../images/5.jpg',
        image_animation: PAN_EFFECTS.TOP,
        overlay_animation: OVERLAY_PATTERNS.TRIANGLES,
        slantedEdge: SLANTED_EDGES.BOTTOM,
        icon: '../images/bathroom.svg',
        image: 'Bathroom',
        rectangleBar: RECTANGLE_BARS.TOP,
        overlay_text: 'Indulge in luxury every day – a serene oasis just for you.',
        audio_url: AUDIO_FILES.BATHROOM,
        duration:6,
    },
    {
        image_url: '../images/6.jpg',
        image_animation: PAN_EFFECTS.BOTTOM,
        overlay_animation: OVERLAY_PATTERNS.SHUTTER,
        slantedEdge: SLANTED_EDGES.TOP,
        icon: '../images/bedroom.svg',
        image: 'Master Bed Room',
        rectangleBar: RECTANGLE_BARS.BOTTOM,
        overlay_text: 'Your personal retreat – rest, recharge, and relax in pure tranquility.',
        audio_url: false,
        duration:6,
    },
    {
        image_url: '../images/7.jpg',
        image_animation: PAN_EFFECTS.TOP,
        overlay_animation: OVERLAY_PATTERNS.RECTANGLES,
        slantedEdge: SLANTED_EDGES.BOTTOM,
        icon: '../images/bathroom.svg',
        image: 'Guest Bathroom',
        rectangleBar: RECTANGLE_BARS.TOP,
        overlay_text: 'A sanctuary of relaxation and rejuvenation.',
        audio_url: AUDIO_FILES.BATHROOM,
        duration:6
    },
    {
        image_url: '../images/8.jpg',
        image_animation: PAN_EFFECTS.BOTTOM,
        overlay_animation: OVERLAY_PATTERNS.BLINDS,
        slantedEdge: SLANTED_EDGES.TOP,
        icon: '../images/bedroom.svg',
        image: 'Guest Bed Room',
        rectangleBar: RECTANGLE_BARS.BOTTOM,
        overlay_text: 'A cozy retreat for your guests, ensuring comfort and relaxation.',
        audio_url: false,
        duration:6
    },
    {
        image_url: '../images/9.jpg',
        image_animation: PAN_EFFECTS.TOP,
        overlay_animation: OVERLAY_PATTERNS.CURTAINS,
        slantedEdge: SLANTED_EDGES.BOTTOM,
        icon: '../images/gallary.svg',
        image: 'Corridor',
        rectangleBar: RECTANGLE_BARS.TOP,
        overlay_text: 'Connecting spaces with elegance and style.',
        audio_url: false,
        duration:6
    },
    {
        image_url: '../images/10.jpg',
        image_animation: PAN_EFFECTS.BOTTOM,
        overlay_animation: OVERLAY_PATTERNS.CIRCLES,
        slantedEdge: SLANTED_EDGES.TOP,
        icon: '../images/cinema.svg',
        image: 'Home Theatre',
        rectangleBar: RECTANGLE_BARS.BOTTOM,
        overlay_text: 'Experience cinematic magic from the comfort of your home.',
        audio_url: false,
        duration:6
    },
    {
        image_url: '../images/11.jpg',
        image_animation: PAN_EFFECTS.TOP,
        overlay_animation: OVERLAY_PATTERNS.BLINDS,
        slantedEdge: SLANTED_EDGES.BOTTOM,
        icon: '../images/bedroom.svg',
        image: 'Retreat Dinning Space',
        rectangleBar: RECTANGLE_BARS.TOP,
        overlay_text: 'A dining experience that feels like a getaway.',
        audio_url: false,
        duration:6
    },
    {
        image_url: '../images/12.jpg',
        image_animation: PAN_EFFECTS.BOTTOM,
        overlay_animation: OVERLAY_PATTERNS.SHUTTER,
        slantedEdge: SLANTED_EDGES.TOP,
        icon: '../images/bedroom.svg',
        image: 'Kids Bed Room',
        rectangleBar: RECTANGLE_BARS.BOTTOM,
        overlay_text: 'Luxury meets playfulness in a space designed for endless fun.',
        audio_url: false,
        duration:6
    },
    {
        image_url: '../images/13.jpg',
        image_animation: PAN_EFFECTS.TOP,
        overlay_animation: OVERLAY_PATTERNS.RECTANGLES,
        slantedEdge: SLANTED_EDGES.BOTTOM,
        icon: '../images/bedroom.svg',
        image: 'Bed Room',
        rectangleBar: RECTANGLE_BARS.TOP,
        overlay_text: 'Bedroom with a view – wake up to the cityscape that inspires.',
        audio_url: false,
        duration:6
    },
    {
        image_url: '../images/14.jpg',
        image_animation: PAN_EFFECTS.BOTTOM,
        overlay_animation: OVERLAY_PATTERNS.ARROWS,
        slantedEdge: SLANTED_EDGES.TOP,
        icon: '../images/bedroom.svg',
        image: 'Office Space',
        rectangleBar: RECTANGLE_BARS.BOTTOM,
        overlay_text: 'Work in style – a workspace that inspires and energizes.',
        duration:6
    }
];

// Combine all slides
const slides = [
    {
        image_url: '../images/1.jpg',
        type: 'welcome',
        image_animation: PAN_EFFECTS.TOP,
        icon: '../images/property.svg',
        image: 'Property View',
        propertyDetails: PROPERTY_DETAILS,
        slantedEdge: SLANTED_EDGES.BOTTOM,
        audio_url: AUDIO_FILES.WELCOME,
        duration:2,
    },
    ...images,
    {
        image_url: '../images/background.jpg',
        type: 'contact',
        contactInfo: {
            email: 'davidbrocker@luxuryhomes.com',
            phone: '+1 (555) 123-4567',
            avatar: './images/avatar.jpg'
        },
        image_animation: PAN_EFFECTS.TOP,
        audio_url: AUDIO_FILES.CONTACT,
        duration:3,
        
    }
];

const totalDuration = slides.reduce((sum, slide) => sum + (slide.duration || BASE_DURATION), 0);

export { slides, BASE_DURATION, totalDuration, OVERLAY_PATTERNS, SLANTED_EDGES, AUDIO_FILES, PAN_EFFECTS };