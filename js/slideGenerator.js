import { slides, BASE_DURATION, PAN_EFFECTS, totalDuration } from './slideConfig.js';
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
            ${slide.image}
        </div>
    `;
}

async function initSlideshow(slide) {
    console.log('InitSlideshow called');

    const slideshow = document.getElementById('slideshow');

    //CURVED EDGE Property Data
    const { propertyDetails } = slide;

    if (propertyDetails) {
        const { title, amenities } = propertyDetails;
        const { bedrooms = 0, livingRooms = 0, kitchens = 0, bathrooms = 0 } = amenities || {};

        //
        const curvedEdge = document.createElement('div');
        curvedEdge.className = 'curved-edge';
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
        console.warn('No property details available for this slide.');
    }

    //AUDIO
    const audioPromises = slides.map(async (slide, index) => {
        if (slide.audio_url) {
            const duration = await getAudioDuration(slide.audio_url);
            slides[index].duration = duration;
            console.log(`Slide ${index} audio duration:`, duration);
        }
    });
    await Promise.all(audioPromises);
    
    //TOTAL DURATION
    const totalDuration = slides.reduce((sum, slide) => sum + (slide.duration || BASE_DURATION), 0);
    console.log('Total duration:', totalDuration);
    
    const audioElements = slides.map(slide => {
        if (slide.audio_url) {
            const audio = new Audio(slide.audio_url);
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

        const curvedEdge = document.querySelector('.curved-edge');
        curvedEdge.style.display = 'block';

        document.querySelectorAll('.slide, .image').forEach(slide => {
            slide.style.animationPlayState = 'running';
        });

        document.querySelectorAll('.overlay div, .rectangle-bar').forEach(element => {
            element.style.animationPlayState = 'running';
        });

        let currentSlideIndex = 0;
        slideshowStartTime = Date.now();
        playSlideAudio(0);

        function updateCurvedEdge(slideIndex) {
            if (slideIndex === 0) {
                curvedEdge.style.display = 'block';
            } else {
                curvedEdge.style.display = 'none';
            }
        }

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
                updateCurvedEdge(currentSlideIndex);
            }

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

    function updateCurvedEdgeContent(slide) {
        const { propertyDetails } = slide;
        document.getElementById('curvedEdgeTitle').innerText = `Welcome to ${propertyDetails.title}`;
        document.getElementById('bedrooms').innerText = propertyDetails.amenities.bedrooms;
        document.getElementById('livingRooms').innerText = propertyDetails.amenities.livingRooms;
        document.getElementById('kitchens').innerText = propertyDetails.amenities.kitchens;
        document.getElementById('bathrooms').innerText = propertyDetails.amenities.bathrooms;
    }

    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', startSlideshow);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    const firstSlide = slides[0];
    initSlideshow(firstSlide);
});

window.addEventListener('load', () => {
    console.log('Window Loaded');
});