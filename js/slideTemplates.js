import { createCaptionElement } from './slideGenerator.js';
import { applyTemplate } from './templates.js';
import { ACTIVE_TEMPLATE } from './slideConfig.js';

export function createWelcomeSlide(slide, index, duration, delay) {
    const { propertyDetails } = slide;
    
    return `
        <div class="slide" style="background-image: url('${slide.image_url}'); --slide-duration: ${duration}s;">
            <div class="overlay">
                <div class="corner-only">
                    <p><i class="fa fa-map-marker" style="font-size:24px"></i>
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
    const templatedSlide = applyTemplate([slide], ACTIVE_TEMPLATE)[0];
    const { overlay_animation, rectangleBar, overlay_text, slantedEdge } = templatedSlide;

    return `
    <div class="slide" style="background-image: url('${slide.image_url}'); --slide-duration: ${duration}s;">
        <div class="overlay">
            ${overlay_animation ? `
                <div class="${overlay_animation.top}" style="animation-duration: ${duration}s; animation-delay: ${delay}s;"></div>
                <div class="${overlay_animation.bottom}" style="animation-duration: ${duration}s; animation-delay: ${delay}s;"></div>
            ` : ''}
            ${slantedEdge ? `
                <div class="${slantedEdge.class}">
                    ${createCaptionElement(slide)}
                </div>
            ` : ''}
            ${rectangleBar ? `
                <div class="${rectangleBar}" style="animation-delay: ${delay + 1}s;">
                    <i>${overlay_text || ''}</i>
                </div>
            ` : ''}
        </div>
    </div>
    `;
}

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