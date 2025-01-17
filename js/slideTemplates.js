import { createCaptionElement } from './slideGenerator.js';

export function createWelcomeSlide(slide, index, duration, delay) {
    const { propertyDetails } = slide;
    const { bedrooms, livingRooms, kitchens, bathrooms } = propertyDetails.amenities;
    
    return `
        <div class="slide" style="background-image: url('${slide.image_url}'); --slide-duration: ${duration}s;">
            <div class="overlay">
                <div class="curved-edge" style="animation: none; transition: none;">
                    <p><span>Welcome to ${propertyDetails.title}</span><br/>
                        <img src="./images/bedroom.svg"/> ${bedrooms}
                        &nbsp; <img src="./images/livingroom.svg"/> ${livingRooms}
                        &nbsp; <img src="./images/kitchen.svg"/> ${kitchens}
                        &nbsp; <img src="./images/bathtub.svg"/> ${bathrooms}
                    </p>
                </div>
                <div class="corner-only">
                    <p><span class="material-symbols-outlined" style="color: red;">home_pin</span>
                        ${propertyDetails.address}<br/><br/>
                        ${propertyDetails.subtitle}
                    </p>
                </div>
                ${slide.slantedEdge ? `
                    <div class="${slide.slantedEdge.class}" style="animation-duration: ${duration}s; animation-delay: ${delay}s">
                        ${createCaptionElement(slide)}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

export function createRegularSlide(slide, index, duration, delay) {
    const { overlay_animation, rectangleBar, overlay_text } = slide;

    return `
        <div class="slide" style="background-image: url('${slide.image_url}'); --slide-duration: ${duration}s;">
            <div class="overlay">
                ${overlay_animation ? `
                    <div class="${overlay_animation.top}" style="animation-duration: ${duration}s; animation-delay: ${delay}s; animation-fill-mode: both;"></div>
                    <div class="${overlay_animation.bottom}" style="animation-duration: ${duration}s; animation-delay: ${delay}s; animation-fill-mode: both;"></div>
                ` : ''}
                ${slide.slantedEdge ? `
                    <div class="${slide.slantedEdge.class}" style="animation-duration: ${duration}s;">
                        ${createCaptionElement(slide)}
                    </div>
                ` : ''}
                ${overlay_text ? `
                    <div class="${rectangleBar === 'rectangle-bar-top' ? 'rectangle-bar-top' : 'rectangle-bar-bottom'}" style="animation-duration: ${duration}s; animation-delay: ${delay + 1}s;">
                        <i>${overlay_text}</i>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

/*export function createContactSlide(slide, index, duration, delay) {
    return `
        <div class="slide" style="background-image: url('${slide.image}'); --slide-duration: ${duration}s;">
            <div class="contact-us">
                <div class="contact-avatar">
                    <img src="${slide.contactInfo.avatar}" alt="Contact Avatar">
                </div>
                <div class="contact-info">
                    <div class="info-item">
                        <p class="icon-email"></p>
                        <span>${slide.contactInfo.email}</span>
                    </div>
                    <div class="info-item">
                        <p class="icon-phone"></p>
                        <span>${slide.contactInfo.phone}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}*/

export function createContactSlide(slide, index, duration, delay) {
    return `
        <div class="slide" style="background-image: url('${slide.image_url}'); --slide-duration: ${duration}s;">
            <div class="contact-us">
                <div class="contact-avatar">
                    <div class="avatar-glow"></div>
                    <img src="${slide.contactInfo.avatar}" alt="Contact Avatar">
                </div>
                <div class="contact-info">
                    <div class="info-item">
                        <div class="icon icon-email"></div>
                        <span>${slide.contactInfo.email}</span>
                    </div>
                    <div class="info-item">
                        <div class="icon icon-phone"></div>
                        <span>${slide.contactInfo.phone}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}