import { 
    slides, 
    BASE_DURATION, 
    totalDuration, 
    OVERLAY_PATTERNS, 
    SLANTED_EDGES 
} from './slideConfig.js';
import { createWelcomeSlide, createContactSlide } from './slideTemplates.js';

async function getAudioDuration(audioUrl) {
    return new Promise((resolve) => {
        const audio = new Audio(audioUrl);
        audio.addEventListener('loadedmetadata', () => {
            resolve(Math.ceil(audio.duration));
        });
        audio.addEventListener('error', () => {
            console.warn(`Error loading audio: ${audioUrl}`);
            resolve(BASE_DURATION); // Fallback to base duration
        });
    });
}

function calculateDelayForSlide(index) {
    return slides
        .slice(0, index)
        .reduce((sum, slide) => sum + (slide.duration || BASE_DURATION), 0);
}

function createDynamicStyles(totalDuration) {
    const style = document.createElement('style');
    const totalSlides = slides.length;
    
    let dynamicStyles = `
        .slideshow {
            --total-slides: ${totalSlides};
            --animation-cycle: ${totalDuration}s;
        }
        
        .slide {
            position: absolute;
            inset: 0;
            background-size: cover;
            background-position: center;
            opacity: 0;
            z-index: 1;
            background-repeat: no-repeat;
            transform-origin: center;
            will-change: opacity, transform;
        }
    `;

    // Create individual slide animations
    slides.forEach((slide, index) => {
        const delay = calculateDelayForSlide(index);
        const duration = slide.duration || BASE_DURATION;
        const startPercent = (delay / totalDuration) * 100;
        const durationPercent = (duration / totalDuration) * 100;
        const endPercent = startPercent + durationPercent;

        dynamicStyles += `
            .slide:nth-child(${index + 2}) {
                animation: 
                    slide${index} ${totalDuration}s infinite ease-in-out,
                    ${index % 2 === 0 ? 'panImageLeft' : 'panImageBottom'} ${duration}s infinite ease-out,
                    zoomEffect ${duration}s infinite ease-in-out;
                animation-delay: 0s;
                animation-play-state: paused;
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
        @keyframes panImageLeft {
            0% { background-position: 100% center; }
            100% { background-position: 0% center; }
        }

        @keyframes panImageBottom {
            0% { background-position: center 100%; }
            100% { background-position: center 0%; }
        }

        @keyframes zoomEffect {
            0%, 100% { transform: scale(1.05); }
            50% { transform: scale(1.15); }
        }
    `;

    style.textContent = dynamicStyles;
    return style;
}

function createStyleTag(index, slideDuration) {
    const style = document.createElement('style');
    style.textContent = createDynamicKeyframes(index, slideDuration);
    return style;
}

export function createCaptionElement(slide) {
    return `
        <div class="caption ${slide.slantedEdge?.captionPosition || ''}">
            <img src="${slide.icon}"/>
            ${slide.caption}
        </div>
    `;
}


function createRegularSlide(slide, index, duration, delay) {
    const { overlay } = slide;

    return `
        <div class="slide" style="background-image: url('${slide.image}'); --slide-duration: ${duration}s;">
            <div class="overlay">
                ${overlay ? `
                    <div class="${overlay.top}" style="animation-duration: ${duration}s; animation-delay: ${delay}s"></div>
                    <div class="${overlay.bottom}" style="animation-duration: ${duration}s; animation-delay: ${delay}s"></div>
                ` : ''}
                ${slide.slantedEdge ? `
                    <div class="${slide.slantedEdge.class}" style="animation-duration: ${duration}s; animation-delay: ${delay}s">
                        ${createCaptionElement(slide)}
                    </div>
                ` : ''}
                ${slide.quote ? `
                    <div class="${slide.rectangleBar || 'rectangle-bar-bottom'}" style="animation-duration: ${duration}s; animation-delay: ${delay}s">
                        <i>${slide.quote}</i>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

async function initSlideshow() {
    console.log('InitSlideshow called');
    
    // First, let's get all audio durations and update slide durations
    const audioPromises = slides.map(async (slide, index) => {
        if (slide.audio) {
            const duration = await getAudioDuration(slide.audio);
            slides[index].duration = duration;
            console.log(`Slide ${index} audio duration:`, duration);
        }
    });

    // Wait for all audio durations to be calculated
    await Promise.all(audioPromises);
    
    // Calculate total duration
    const totalDuration = slides.reduce((sum, slide) => sum + (slide.duration || BASE_DURATION), 0);
    console.log('Total duration:', totalDuration);

    const slideshow = document.getElementById('slideshow');
    
    // Create and preload audio elements
    const audioElements = slides.map(slide => {
        if (slide.audio) {
            const audio = new Audio(slide.audio);
            audio.preload = 'auto';
            return audio;
        }
        return null;
    });

    // Generate slides HTML
    const slidesHTML = slides.map((slide, index) => {
        const duration = slide.duration || BASE_DURATION;
        const delay = calculateDelayForSlide(index);
        
        let slideContent;
        if (slide.type === 'welcome') {
            slideContent = createWelcomeSlide(slide, index, duration, delay);
        } else if (slide.type === 'contact') {
            slideContent = createContactSlide(slide, index, duration, delay);
        } else {
            slideContent = createRegularSlide(slide, index, duration, delay);
        }
        
        return slideContent;
    }).join('');

    // Add play button and slides to DOM
    slideshow.innerHTML = `
        <div id="playButtonOverlay" class="play-button-overlay">
            <button id="startButton" class="start-button">
                <span>▶</span>
                <span>Start Slideshow</span>
            </button>
        </div>
        ${slidesHTML}
    `;

    // Add dynamic styles
    document.head.appendChild(createDynamicStyles(totalDuration));

    let currentSlideIndex = 0;
    let slideshowStartTime;

    function playSlideAudio(index) {
        // Stop any currently playing audio
        audioElements.forEach(audio => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        });

        // Play audio for current slide if it exists
        if (audioElements[index]) {
            audioElements[index].play().catch(error => {
                console.warn('Audio playback failed:', error);
            });
        }
    }

    function startSlideshow() {
        const playButtonOverlay = document.getElementById('playButtonOverlay');
        playButtonOverlay.style.display = 'none';

        // Start all animations
        document.querySelectorAll('.slide').forEach(slide => {
            slide.style.animationPlayState = 'running';
        });

        slideshowStartTime = Date.now();
        playSlideAudio(0);

        // Set up audio timing
        function checkSlideChange() {
            const elapsed = (Date.now() - slideshowStartTime) / 1000;
            const nextSlideIndex = slides.findIndex((_, index) => {
                const slideStart = calculateDelayForSlide(index);
                const slideDuration = slides[index].duration || BASE_DURATION;
                return elapsed >= slideStart && elapsed < (slideStart + slideDuration);
            });

            if (nextSlideIndex !== -1 && nextSlideIndex !== currentSlideIndex) {
                currentSlideIndex = nextSlideIndex;
                playSlideAudio(currentSlideIndex);
            }

            // Reset if we've reached the end
            if (elapsed >= totalDuration) {
                slideshowStartTime = Date.now();
                currentSlideIndex = 0;
                playSlideAudio(0);
            }

            requestAnimationFrame(checkSlideChange);
        }

        requestAnimationFrame(checkSlideChange);
    }

    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', startSlideshow);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    initSlideshow();
});

window.addEventListener('load', () => {
    console.log('Window Loaded');
});