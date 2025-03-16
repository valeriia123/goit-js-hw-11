    import axios from 'axios'
    export const findPhotoByQuery = async (query, page = 1) => {
        const url = `https://pixabay.com/api/?key=49122647-aca4436714a1b5873bcd0147f&image_type=photo&orientation=horizontal&safesearch=true&q=${encodeURIComponent(query)}&page=${page}&per_page=15`;
    
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (err) {
            iziToast.error({ title: 'Error', message: 'Sorry, something went wrong!' });
            console.error(err);
        }
    };