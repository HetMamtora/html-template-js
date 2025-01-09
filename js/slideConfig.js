// Define available overlay patterns
const OVERLAY_PATTERNS = {
    ARROWS: {
        top: 'top-arrow',
        bottom: 'bottom-arrow'
    },
    RECTANGLES: {
        top: 'top-rect',
        bottom: 'bottom-rect'
    },
    TRIANGLES: {
        top: 'bottom-triangle',
        bottom: 'top-triangle'
    },
    CURTAINS: {
        left: 'curtain-left',
        right: 'curtain-right'
    },
    BLINDS: {
        top: 'top-blinds',
        bottom: 'bottom-blinds'
    },
    ZIGZAG: {
        top: 'top-zigzag',
        bottom: 'bottom-zigzag'
    },
    SHUTTER: {
        top: 'top-shutter',
        bottom: 'bottom-shutter'
    },
    CIRCLES: {
        top: 'top-circle',
        bottom: 'bottom-circle'
    }
};

// SLANTED EDGE WITH CAPTIONS
const SLANTED_EDGES = {
    BOTTOM: {
        class: 'slanted-edge-bottom',
        captionPosition: 'bottom'
    },
    TOP: {
        class: 'slanted-edge-top',
        captionPosition: 'top'
    }
};

// Add rectangle bar positions to configuration
const RECTANGLE_BARS = {
    TOP: 'rectangle-bar-top',
    BOTTOM: 'rectangle-bar-bottom'
};

// Property details for welcome slide
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

// Main image array (excluding welcome and contact slides)
const images = [
    {
        image: '../images/2.jpg',
        caption: 'Living Room',
        quote: 'Where comfort meets style – your perfect gathering space awaits!',
        icon: '../images/livingroom.svg',
        overlay: OVERLAY_PATTERNS.BLINDS,
        slantedEdge: SLANTED_EDGES.TOP,
        rectangleBar: RECTANGLE_BARS.BOTTOM
    },
    {
        image: '../images/3.jpg',
        caption: 'Dinning Space',
        quote: 'Dine, laugh, and celebrate in a space that brings everyone together.',
        icon: '../images/dinning.svg',
        overlay: OVERLAY_PATTERNS.ZIGZAG,
        slantedEdge: SLANTED_EDGES.TOP,
        rectangleBar: RECTANGLE_BARS.BOTTOM
    },
    {
        image: '../images/4.jpg',
        caption: 'Kitchen',
        quote: 'Cook up memories in a kitchen designed for culinary perfection.',
        icon: '../images/kitchen.svg',
        overlay: OVERLAY_PATTERNS.SHUTTER,
        slantedEdge: SLANTED_EDGES.TOP,
        rectangleBar: RECTANGLE_BARS.BOTTOM
    },
    {
        image: '../images/5.jpg',
        caption: 'Bathroom',
        quote: 'Indulge in luxury every day – a serene oasis just for you.',
        icon: '../images/bathroom.svg',
        overlay: OVERLAY_PATTERNS.CIRCLES,
        slantedEdge: SLANTED_EDGES.TOP,
        rectangleBar: RECTANGLE_BARS.BOTTOM,
    },
    {
        image: '../images/6.jpg',
        caption: 'Master Bed Room',
        quote: 'Your personal retreat – rest, recharge, and relax in pure tranquility.',
        icon: '../images/bedroom.svg',
        overlay: OVERLAY_PATTERNS.ARROWS,
        slantedEdge: SLANTED_EDGES.TOP,
        rectangleBar: RECTANGLE_BARS.BOTTOM,
    },
    {
        image: '../images/7.jpg',
        caption: 'Guest Bathroom',
        quote: 'A sanctuary of relaxation and rejuvenation.',
        icon: '../images/bathroom.svg',
        overlay: OVERLAY_PATTERNS.RECTANGLES,
        slantedEdge: SLANTED_EDGES.TOP,
        rectangleBar: RECTANGLE_BARS.BOTTOM,
    },
    {
        image: '../images/8.jpg',
        caption: 'Guest Bed Room',
        quote: 'A cozy retreat for your guests, ensuring comfort and relaxation.',
        icon: '../images/bedroom.svg',
        overlay: OVERLAY_PATTERNS.TRIANGLES,
        slantedEdge: SLANTED_EDGES.TOP,
        rectangleBar: RECTANGLE_BARS.TOP,
    }
];

// Combine all slides
const slides = [
    {
        image: '../images/1.jpg',
        type: 'welcome',
        caption: 'Property View',
        icon: '../images/property.svg',
        propertyDetails: PROPERTY_DETAILS,
        slantedEdge: SLANTED_EDGES.BOTTOM
    },
    ...images,
    {
        image: '../images/background.jpg',
        type: 'contact',
        contactInfo: {
            email: 'contact@luxuryhomes.com',
            phone: '+1 (555) 123-4567',
            avatar: './images/avatar.jpg'
        }
    }
];

const SLIDE_DURATION = 6;

// Export for use in other files
export { slides, SLIDE_DURATION, OVERLAY_PATTERNS, SLANTED_EDGES };