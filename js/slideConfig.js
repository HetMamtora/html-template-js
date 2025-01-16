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

//RECTANGLE BAR FOR PUNCH LINES
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
        livingRooms: 1,
        kitchens: 2,
        bathrooms: 2
    }
};

//IMAGE SLIDES ARRAY WITH OPTIONS
const images = [
    {
        image: '../images/2.jpg',
        panEffect: PAN_EFFECTS.BOTTOM,
        overlay: OVERLAY_PATTERNS.ZIGZAG,
        slantedEdge: SLANTED_EDGES.TOP,
        icon: '../images/livingroom.svg',
        caption: 'Living Room',
        rectangleBar: RECTANGLE_BARS.BOTTOM,
        quote: 'Where comfort meets style – your perfect gathering space awaits!',
        duration: 6
    },
    {
        image: '../images/3.jpg',
        panEffect: PAN_EFFECTS.TOP,
        overlay: OVERLAY_PATTERNS.CURTAINS,
        slantedEdge: SLANTED_EDGES.BOTTOM,
        icon: '../images/dinning.svg',
        caption: 'Dinning Space',
        rectangleBar: RECTANGLE_BARS.TOP,
        quote: 'Dine, laugh, and celebrate in a space that brings everyone together.',
        duration:6
    },
    {
        image: '../images/4.jpg',
        panEffect: PAN_EFFECTS.BOTTOM,
        overlay: OVERLAY_PATTERNS.RECTANGLES,
        slantedEdge: SLANTED_EDGES.TOP,
        icon: '../images/kitchen.svg',
        caption: 'Kitchen',
        rectangleBar: RECTANGLE_BARS.BOTTOM,
        quote: 'Cook up memories in a kitchen designed for culinary perfection.',
        duration:10
    },
    {
        image: '../images/5.jpg',
        panEffect: PAN_EFFECTS.TOP,
        overlay: OVERLAY_PATTERNS.CIRCLES,
        slantedEdge: SLANTED_EDGES.BOTTOM,
        icon: '../images/bathroom.svg',
        caption: 'Bathroom',
        rectangleBar: RECTANGLE_BARS.TOP,
        quote: 'Indulge in luxury every day – a serene oasis just for you.',
        audio: AUDIO_FILES.BATHROOM,
        duration:6,
        
    },
    {
        image: '../images/6.jpg',
        panEffect: PAN_EFFECTS.BOTTOM,
        overlay: OVERLAY_PATTERNS.SHUTTER,
        slantedEdge: SLANTED_EDGES.TOP,
        icon: '../images/bedroom.svg',
        caption: 'Master Bed Room',
        rectangleBar: RECTANGLE_BARS.BOTTOM,
        quote: 'Your personal retreat – rest, recharge, and relax in pure tranquility.',
        duration:6,
    },
    {
        image: '../images/7.jpg',
        panEffect: PAN_EFFECTS.TOP,
        overlay: OVERLAY_PATTERNS.RECTANGLES,
        slantedEdge: SLANTED_EDGES.BOTTOM,
        icon: '../images/bathroom.svg',
        caption: 'Guest Bathroom',
        rectangleBar: RECTANGLE_BARS.BOTTOM,
        quote: 'A sanctuary of relaxation and rejuvenation.',
        audio: AUDIO_FILES.BATHROOM,
        duration:6
    },
    {
        image: '../images/8.jpg',
        panEffect: PAN_EFFECTS.BOTTOM,
        overlay: OVERLAY_PATTERNS.BLINDS,
        slantedEdge: SLANTED_EDGES.TOP,
        icon: '../images/bedroom.svg',
        caption: 'Guest Bed Room',
        rectangleBar: RECTANGLE_BARS.BOTTOM,
        quote: 'A cozy retreat for your guests, ensuring comfort and relaxation.',
        duration:6
    },
    {
        image: '../images/9.jpg',
        panEffect: PAN_EFFECTS.TOP,
        overlay: OVERLAY_PATTERNS.CURTAINS,
        slantedEdge: SLANTED_EDGES.BOTTOM,
        icon: '../images/gallary.svg',
        caption: 'Corridor',
        rectangleBar: RECTANGLE_BARS.BOTTOM,
        quote: 'Connecting spaces with elegance and style.',
        duration:6
    },
    {
        image: '../images/10.jpg',
        panEffect: PAN_EFFECTS.BOTTOM,
        overlay: OVERLAY_PATTERNS.CIRCLES,
        slantedEdge: SLANTED_EDGES.TOP,
        icon: '../images/cinema.svg',
        caption: 'Home Theatre',
        rectangleBar: RECTANGLE_BARS.BOTTOM,
        quote: 'Experience cinematic magic from the comfort of your home.',
        duration:6
    },
    {
        image: '../images/11.jpg',
        panEffect: PAN_EFFECTS.TOP,
        overlay: OVERLAY_PATTERNS.BLINDS,
        slantedEdge: SLANTED_EDGES.BOTTOM,
        icon: '../images/bedroom.svg',
        caption: 'Retreat Dinning Space',
        rectangleBar: RECTANGLE_BARS.BOTTOM,
        quote: 'A dining experience that feels like a getaway.',
        duration:6
    },
    {
        image: '../images/12.jpg',
        panEffect: PAN_EFFECTS.BOTTOM,
        overlay: OVERLAY_PATTERNS.SHUTTER,
        slantedEdge: SLANTED_EDGES.TOP,
        icon: '../images/bedroom.svg',
        caption: 'Kids Bed Room',
        rectangleBar: RECTANGLE_BARS.BOTTOM,
        quote: 'Luxury meets playfulness in a space designed for endless fun.',
        duration:6
    },
    {
        image: '../images/13.jpg',
        panEffect: PAN_EFFECTS.TOP,
        overlay: OVERLAY_PATTERNS.RECTANGLES,
        slantedEdge: SLANTED_EDGES.BOTTOM,
        icon: '../images/bedroom.svg',
        caption: 'Bed Room',
        rectangleBar: RECTANGLE_BARS.BOTTOM,
        quote: 'Bedroom with a view – wake up to the cityscape that inspires.',
        duration:6
    },
    {
        image: '../images/14.jpg',
        panEffect: PAN_EFFECTS.BOTTOM,
        overlay: OVERLAY_PATTERNS.ARROWS,
        slantedEdge: SLANTED_EDGES.TOP,
        icon: '../images/bedroom.svg',
        caption: 'Office Space',
        rectangleBar: RECTANGLE_BARS.BOTTOM,
        quote: 'Work in style – a workspace that inspires and energizes.',
        duration:6
    }
];

// Combine all slides
const slides = [
    {
        image: '../images/1.jpg',
        type: 'welcome',
        panEffect: PAN_EFFECTS.TOP,
        icon: '../images/property.svg',
        caption: 'Property View',
        propertyDetails: PROPERTY_DETAILS,
        
        slantedEdge: SLANTED_EDGES.BOTTOM,
        audio: AUDIO_FILES.WELCOME,
        duration:6,
    },
    ...images,
    {
        image: '../images/background.jpg',
        type: 'contact',
        contactInfo: {
            email: 'davidbrocker@luxuryhomes.com',
            phone: '+1 (555) 123-4567',
            avatar: './images/avatar.jpg'
        },
        panEffect: PAN_EFFECTS.TOP,
        audio: AUDIO_FILES.CONTACT,
        duration:6,
        
    }
];

const totalDuration = slides.reduce((sum, slide) => sum + (slide.duration || BASE_DURATION), 0);

export { slides, BASE_DURATION, totalDuration, OVERLAY_PATTERNS, SLANTED_EDGES, AUDIO_FILES, PAN_EFFECTS };