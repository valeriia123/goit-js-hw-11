export const findPhotoByQuery = query => {
    return fetch(`https://pixabay.com/api/?key=49122647-aca4436714a1b5873bcd0147f&image_type=photo&orientation=horizontal&safesearch=true&q=${encodeURIComponent(query)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        
}