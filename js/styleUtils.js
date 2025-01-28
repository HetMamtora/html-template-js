import { slides, BASE_DURATION, PAN_EFFECTS, ACTIVE_TEMPLATE } from './slideConfig.js';
import { calculateDelayForSlide } from './slideGenerator.js';
import { applyTemplate } from './templates.js';

export function createDynamicStyles(totalDuration) {
    const style = document.createElement('style');
    const totalSlides = slides.length;
    const templatedSlides = applyTemplate(slides, ACTIVE_TEMPLATE);
    
    let dynamicStyles = `
        .slideshow {
            --total-slides: ${totalSlides};
            --animation-cycle: ${totalDuration}s;
        }
        .overlay {
            position: absolute;
            inset: 0;
            z-index: 2;
            pointer-events: none;
        }
        
        .slide {
            position: absolute;
            inset: 0;
            background-size: 100%;
            background-position: center;
            opacity: 0;
            z-index: 1;
            background-repeat: no-repeat;
            transform-origin: center;
            will-change: opacity, transform, background-position;
            overflow: hidden;
            transform-style: preserve-3d;
        }
    `;

    // Create individual slide animations
    templatedSlides.forEach((slide, index) => {
        const delay = calculateDelayForSlide(index);
        const duration = slide.duration || BASE_DURATION;
        const startPercent = (delay / totalDuration) * 100;
        const durationPercent = (duration / totalDuration) * 100;
        const endPercent = startPercent + durationPercent;
        
        // Get the correct pan effect based on slide type and template
        let panEffect;
        if (index === 0) {
            // Welcome slide
            panEffect = slide.image_animation || PAN_EFFECTS.TOP;
        } else if (index === slides.length - 1) {
            // Contact slide
            panEffect = slide.image_animation || PAN_EFFECTS.BOTTOM;
        } else {
            // Regular slides
            panEffect = slide.image_animation || PAN_EFFECTS.RIGHT;
        }

        dynamicStyles += `
            .slide:nth-child(${index + 2}) {
                animation-name: slide${index}, ${panEffect};
                animation-duration: ${totalDuration}s, ${duration}s;
                animation-timing-function: ease-in-out, ease-in-out;
                animation-iteration-count: infinite, infinite;
                animation-delay: 0s, ${delay}s;
                animation-play-state: paused, paused;
            }
            
            .slide:nth-child(${index + 2}) .caption {
                animation: captionFade ${duration}s ease-in-out;
                animation-delay: ${delay}s;
                animation-play-state: paused;
                animation-fill-mode: forwards;
            }
            
            ${slide.rectangleBar ? `.${slide.rectangleBar}` : '.rectangle-bar-bottom'} {
                animation: rectangleRight ${duration}s ease-in-out;
                animation-delay: ${delay + 1}s;
                animation-play-state: paused;
            }

            @keyframes slide${index} {
                0%, ${startPercent}% { opacity: 0; }
                ${startPercent + 0.1}% { opacity: 1; }
                ${endPercent - 0.1}% { opacity: 1; }
                ${endPercent}%, 100% { opacity: 0; }
            }
            
            ${slide.overlay_animation ? `
                .slide:nth-child(${index + 2}) .${slide.overlay_animation.top} {
                    animation: overlayTop ${duration}s ease-in-out;
                    animation-delay: ${delay}s;
                    animation-play-state: paused;
                }
                .slide:nth-child(${index + 2}) .${slide.overlay_animation.bottom} {
                    animation: overlayBottom ${duration}s ease-in-out;
                    animation-delay: ${delay}s;
                    animation-play-state: paused;
                }
            ` : ''}
        `;
    });

    // Add the pan and zoom animations
    dynamicStyles += `
        @keyframes panAndZoomRight {
            0% { transform: translateX(-5%) scale(1.15); }
            100% { transform: translateX(5%) scale(1.3); }
        }
        @keyframes panAndZoomLeft {
            0% { transform: translateX(5%) scale(1.15); }
            100% { transform: translateX(-5%) scale(1.3); }
        }

        @keyframes panAndZoomTop {
            0% { background-position: 50% 100%; transform: scale(1); }
            100% { background-position: 50% 0%; transform: scale(1.15); }
        }
        @keyframes panAndZoomBottom {
            0% { background-position: 50% 0%; transform: scale(1); }
            100% { background-position: 50% 100%; transform: scale(1.15); }
        }
        
        .slantedEdge {
            animation: none !important;
            transform: none !important; /* Ensure no transformation occurs */
        }
    `;

    console.log('Generated Dynamic Styles:', dynamicStyles);
    style.textContent = dynamicStyles;
    return style;
}