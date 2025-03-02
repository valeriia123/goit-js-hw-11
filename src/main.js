import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { createGalleryCards } from "./js/render-functions";
import { findPhotoByQuery } from "./js/pixabay-api";

const searchForm = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loader = document.querySelector('.js-loader');


const showLoader = () => {
  loader.classList.remove('is-hidden');
};
const hideLoader = () => {
  loader.classList.add('is-hidden');
};


const formSubmit = event => {
    event.preventDefault();

    const searchQuery = event.currentTarget.elements.user_search.value.trim();
    if (searchQuery === '') {
        iziToast.error({ title: 'Error', message: 'Sorry, search field cannot be empty. Please try again!' });
        return;
    }
    showLoader();

    findPhotoByQuery(searchQuery)
        .then(data => {
            if (data.hits.length === 0) {
                iziToast.warning({ title: 'Error', message: 'Sorry, there are no images matching your search query. Please try again!' });
                galleryEl.innerHTML = '';
                searchForm.reset();
                return;
            }

            
            const galleryMarkup = data.hits.map(el => createGalleryCards(el)).join('');
            galleryEl.innerHTML = galleryMarkup; 

           
            const lightbox = new SimpleLightbox('.js-gallery a', {
                captionsData: 'alt',
                captionDelay: 250,
                captionPosition: 'bottom',
              });
            lightbox.refresh();  
            
        })
        .catch(err => {
            iziToast.error({ title: 'Error', message: 'Sorry, something went wrong!' });
            console.error(err);
        })
        .finally(() => hideLoader());
};
    

         searchForm.addEventListener('submit', formSubmit);

