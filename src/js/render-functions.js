export const createGalleryCards = imgInfo => {
    const altInfo = `
        <b>Likes:</b> ${imgInfo.likes} |
        <b>Views:</b> ${imgInfo.views} |
        <b>Comments:</b> ${imgInfo.comments} |
        <b>Downloads:</b> ${imgInfo.downloads}
    `.trim();

    return `
        <li class="gallery-item">
            <a class="gallery-link" title="${altInfo}" href="${imgInfo.largeImageURL}">
                <img
                    class="gallery-image"
                    src="${imgInfo.webformatURL}"
                    alt="${altInfo}" 
                    title="${altInfo}"
                />
            </a>
             <div class="gallery-overlay">${altInfo}</div>
        </li>
    `;
};