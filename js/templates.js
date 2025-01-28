import { PAN_EFFECTS, OVERLAY_PATTERNS, SLANTED_EDGES, RECTANGLE_BARS } from './slideConfig.js';

export const SLIDESHOW_TEMPLATES = {
    template1: {
        welcome: {
            image_animation: PAN_EFFECTS.TOP,
            slantedEdge: SLANTED_EDGES.BOTTOM
        },
        regular: {
            panEffects: [
                PAN_EFFECTS.BOTTOM,
                PAN_EFFECTS.TOP
            ],
            overlayPatterns: [
                OVERLAY_PATTERNS.RECTANGLES,
                OVERLAY_PATTERNS.CIRCLES,
                OVERLAY_PATTERNS.ARROWS
            ],
            slantedEdge: SLANTED_EDGES.BOTTOM,
            rectangleBar: RECTANGLE_BARS.TOP
        },
        contact: {
            image_animation: PAN_EFFECTS.RIGHT
        }
    },
    template2: {
        welcome: {
            image_animation: PAN_EFFECTS.TOP,
            slantedEdge: SLANTED_EDGES.BOTTOM
        },
        regular: {
            panEffects: [
                PAN_EFFECTS.BOTTOM,
                PAN_EFFECTS.TOP
            ],
            overlayPatterns: [
                OVERLAY_PATTERNS.TRIANGLES,
                OVERLAY_PATTERNS.BLINDS,
                OVERLAY_PATTERNS.SHUTTER
            ],
            slantedEdge: SLANTED_EDGES.TOP,
            rectangleBar: RECTANGLE_BARS.TOP
        },
        contact: {
            image_animation: PAN_EFFECTS.RIGHT
        }
    }
};

export function applyTemplate(slides, templateName) {
    if (!SLIDESHOW_TEMPLATES[templateName]) {
        console.error(`Template "${templateName}" not found`);
        return slides;
    }

    const template = SLIDESHOW_TEMPLATES[templateName];
    
    return slides.map((slide, index) => {
        const newSlide = { ...slide };

        if (index === 0) {
            // Welcome slide
            return { ...newSlide, ...template.welcome };
        }

        if (index === slides.length - 1) {
            // Contact slide
            return { ...newSlide, ...template.contact };
        }

        // Regular slides
        const regularConfig = template.regular;
        
        // Apply alternating pan effects
        const panEffectIndex = (index - 1) % regularConfig.panEffects.length;
        const overlayIndex = (index - 1) % regularConfig.overlayPatterns.length;

        const finalSlide = {
            ...newSlide,
            image_animation: regularConfig.panEffects[panEffectIndex],
            overlay_animation: regularConfig.overlayPatterns[overlayIndex],
            slantedEdge: regularConfig.slantedEdge,
            rectangleBar: regularConfig.rectangleBar,
        };

        console.log('Generated Slide:', finalSlide);
        return finalSlide;
    });
}