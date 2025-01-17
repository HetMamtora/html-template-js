import { slides, BASE_DURATION, PAN_EFFECTS } from './slideConfig.js';
import { calculateDelayForSlide } from './slideGenerator.js';

export function createDynamicStyles(totalDuration) {
    const style = document.createElement('style');
    const totalSlides = slides.length;
    
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
            transform-style:
        }
    `;

    // Create individual slide animations
    slides.forEach((slide, index) => {
        const delay = calculateDelayForSlide(index);
        const duration = slide.duration || BASE_DURATION;
        const startPercent = (delay / totalDuration) * 100;
        const durationPercent = (duration / totalDuration) * 100;
        const endPercent = startPercent + durationPercent;

        const panEffect = slide.image_animation || PAN_EFFECTS.RIGHT;

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
            
            ${slide.rectangleBar || '.rectangle-bar-bottom'} {
                animation: rectangleRight ${duration}s ease-in-out;
                animation-delay: ${delay + 1}s;
            }

             @keyframes slide${index} {
                0%, ${startPercent}% { opacity: 0; }
                ${startPercent + 0.1}% { opacity: 1; }
                ${endPercent - 0.1}% { opacity: 1; }
                ${endPercent}%, 100% { opacity: 0; }
            }
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
    `;

    // Add the dynamic styles to the document
    style.textContent = dynamicStyles;
    return style;
}


export function createStyleTag(index, slideDuration) {
    const style = document.createElement('style');
    style.textContent = createDynamicKeyframes(index, slideDuration);
    return style;
}