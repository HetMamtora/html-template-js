function createWelcomeSlide(slide, index) {
    return `
        <div class="slide" style="background-image: url('${slide.image}');">
            <div class="overlay">
                <div class="curved-edge">
                    <p><span>Welcome to Lavish Living</span><br/>
                        <img src="./images/bedroom.svg"/> 2
                        &nbsp; <img src="./images/livingroom.svg"/> 1
                        &nbsp; <img src="./images/kitchen.svg"/> 1
                        &nbsp; <img src="./images/bathtub.svg"/> 2
                    </p>
                </div>
                <div class="corner-only">
                    <p><span class="material-symbols-outlined" style="color: red;">home_pin</span>
                        Star Society, A-123, Ahmedabad<br/><br/>
                        Welcome to your dream home
                    </p>
                </div>
                <div class="slanted-edge-bottom"></div>
                <div class="caption">
                    <span><img src="${slide.icon}"/></span>
                    ${slide.caption}
                </div>
            </div>
        </div>
    `;
}

function createContactSlide(slide) {
    return `
        <div class="slide" style="background-image: url('${slide.image}');">
            <div class="contact-us">
                <div class="contact-avatar">
                    <img src="./images/avatar.jpg" alt="Contact Avatar">
                </div>
                <div class="contact-info">
                    <div class="info-item">
                        <p class="icon-email"></p>
                        <span>contact@luxuryhomes.com</span>
                    </div>
                    <div class="info-item">
                        <p class="icon-phone"></p>
                        <span>+1 (555) 123-4567</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getOverlayPattern(index, totalSlides) {
    if (index === 0 || index === totalSlides - 1) return null;
    
    const patterns = [
        ['top-arrow', 'bottom-arrow'],
        ['top-rect', 'bottom-rect'],
        ['bottom-triangle', 'top-triangle'],
        ['curtain-left', 'curtain-right']
    ];
    
    const adjustedIndex = index - 1;
    const patternIndex = adjustedIndex % patterns.length;
    return patterns[patternIndex];
}

function getRectangleBarPosition(index, totalSlides) {

    if (index === 0 || index === totalSlides - 1) return null;
    return (index % 2 === 0) ? 'rectangle-bar-top' : 'rectangle-bar-bottom';
}

function getSlantedEdgePosition(index, totalSlides) {
    if (index === totalSlides - 1) return null;
    return (index % 2 === 0) ? 'slanted-edge-bottom' : 'slanted-edge-top';
}

function createRegularSlide(slide, index, totalSlides) {
    const overlayPattern = getOverlayPattern(index, totalSlides);
    const rectangleBar = getRectangleBarPosition(index, totalSlides);
    const slantedEdge = getSlantedEdgePosition(index, totalSlides);

    return `
        <div class="slide" style="background-image: url('${slide.image}');">
            <div class="overlay">
                ${overlayPattern ? `
                    <div class="${overlayPattern[0]}"></div>
                    <div class="${overlayPattern[1]}"></div>
                ` : ''}
                ${slantedEdge ? `<div class="${slantedEdge}"></div>` : ''}
                ${rectangleBar && slide.quote ? `<div class="${rectangleBar}"><i>${slide.quote}</i></div>` : ''}
                <div class="caption">
                    <img src="${slide.icon}"/>
                    ${slide.caption}
                </div>
            </div>
        </div>
    `;
}

// Initialize Slideshow
function initSlideshow() {
    const slideshow = document.getElementById('slideshow');
    const totalSlides = slides.length;
    
    // Update CSS variables
    document.documentElement.style.setProperty('--total-slides', slides.length);
    document.documentElement.style.setProperty('--slide-duration', `${SLIDE_DURATION}s`);
    document.documentElement.style.setProperty('--animation-cycle', `${totalSlides * SLIDE_DURATION}s`);

    // Generate slides
    const slidesHTML = slides.map((slide, index) => {
        if (slide.type === 'welcome') return createWelcomeSlide(slide, index);
        if (slide.type === 'contact') return createContactSlide(slide);
        return createRegularSlide(slide, index, totalSlides);
    }).join('');

    slideshow.innerHTML = slidesHTML;

    // Update animation delays
    const slideElements = document.querySelectorAll('.slide');
    slideElements.forEach((slideEl, index) => {
        slideEl.style.animationDelay = `${index * SLIDE_DURATION}s`;
    });
}

// Initialize when the page loads
window.addEventListener('load', initSlideshow);