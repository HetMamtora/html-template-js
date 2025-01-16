import { 
    slides, 
    BASE_DURATION, 
    PAN_EFFECTS,
    totalDuration,
} from './slideConfig.js';
import { createWelcomeSlide, createContactSlide, createRegularSlide } from './slideTemplates.js';
import { getAudioDuration } from './audioUtils.js';
import { createDynamicStyles, createStyleTag } from './styleUtils.js';

export function calculateDelayForSlide(index) {
    return slides
        .slice(0, index)
        .reduce((sum, slide) => sum + (slide.duration || BASE_DURATION), 0);
}

export function createCaptionElement(slide) {
    return `
        <div class="caption ${slide.slantedEdge?.captionPosition || ''}">
            <img src="${slide.icon}"/>
            ${slide.caption}
        </div>
    `;
}

async function initSlideshow() {
    console.log('InitSlideshow called');
    
    const audioPromises = slides.map(async (slide, index) => {
        if (slide.audio) {
            const duration = await getAudioDuration(slide.audio);
            slides[index].duration = duration;
            console.log(`Slide ${index} audio duration:`, duration);
        }
    });

    //ALL AUDIO DURATIONS CALCULATIONS
    await Promise.all(audioPromises);
    
    //TOTAL DURATION
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
        audioElements.forEach(audio => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        });

        if (audioElements[index]) {
            audioElements[index].play().catch(error => {
                console.warn('Audio playback failed:', error);
            });
        }
    }

    function startSlideshow() {
        const playButtonOverlay = document.getElementById('playButtonOverlay');
        playButtonOverlay.style.display = 'none';

        document.querySelectorAll('.slide, .caption').forEach(slide => {
            slide.style.animationPlayState = 'running';
        });

        document.querySelectorAll('.overlay div, .rectangle-bar').forEach(element => {
            element.style.animationPlayState = 'running';
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

            //RESET FROM START
            if (elapsed >= totalDuration) {
                //BELOW LOGIC IS TO KEEP ANIMATION ON REPEAT AFTER PLAY
                // slideshowStartTime = Date.now();
                // currentSlideIndex = 0;
                // playSlideAudio(0);
                location.reload();
                return;
            }

            requestAnimationFrame(checkSlideChange);
        }

        requestAnimationFrame(checkSlideChange);
    }

    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', startSlideshow);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    initSlideshow();
});

window.addEventListener('load', () => {
    console.log('Window Loaded');
});