import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { createGalleryCards } from "./js/render-functions";
import { findPhotoByQuery } from "./js/pixabay-api";

const searchForm = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loader = document.querySelector('.js-loader');
const loadMoreBtn = document.querySelector('.js-load-more');


let query = '';
let currentPage = 1;

const showLoader = () => {
  loader.classList.remove('is-hidden');
};

const hideLoader = () => {
  loader.classList.add('is-hidden');
};

const showLoadMoreButton = () => {
  loadMoreBtn.classList.remove('is-hidden');
};

const hideLoadMoreButton = () => {
  loadMoreBtn.classList.add('is-hidden');
};


const scrollGallery = () => {
  const firstCard = galleryEl.querySelector('.gallery-item');

  if (firstCard) {
    const { height } = firstCard.getBoundingClientRect();
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth'
    });
  }
}

const formSubmit = async event => {
  event.preventDefault();
  
  query = event.currentTarget.elements.user_search.value.trim();
  
  if (query === '') {
    iziToast.error({ title: 'Error', message: 'Sorry, search field cannot be empty. Please try again!' });
    return;
  }
  
  currentPage = 1;
  showLoader();
  galleryEl.innerHTML = '';
  
  try {
    const data = await findPhotoByQuery(query, currentPage);
    
    if (data.hits.length === 0) {
      iziToast.warning({ title: 'Error', message: 'Sorry, there are no images matching your search query. Please try again!' });
      searchForm.reset();
      return;
    }
    
    const galleryMarkup = data.hits.map(createGalleryCards).join('');
    galleryEl.innerHTML = galleryMarkup;
  
    if (data.totalHits > 15) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  
    const lightbox = new SimpleLightbox('.js-gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
      captionPosition: 'bottom',
    });
    lightbox.refresh();
  }
  catch (err) {
    iziToast.error({ title: 'Error', message: 'Sorry, something went wrong!' });
    console.error(err);
  }
  finally {
    hideLoader()
  }
};
    


const loadMoreImg = async () => {
  currentPage++;
  showLoader();
  
  try {
    const data = await findPhotoByQuery(query, currentPage);
  
    if (data.hits.length === 0) {
      iziToast.warning({ title: 'End of Results', message: 'We\'re sorry, but you\'ve reached the end of search results.' });
      hideLoadMoreButton();
      return;
    }
  
    const galleryMarkup = data.hits.map(createGalleryCards).join('');
    galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);
  
    const lightbox = new SimpleLightbox('.js-gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
      captionPosition: 'bottom',
    });
    lightbox.refresh();
  
    scrollGallery();
  
    if (data.totalHits <= currentPage * 15) {
      hideLoadMoreButton();
    }
  }
  catch (err) {
    iziToast.error({ title: 'Error', message: 'Sorry, something went wrong!' });
  }  
  finally {
    hideLoader();
  }
};


searchForm.addEventListener('submit', formSubmit);
loadMoreBtn.addEventListener('click', loadMoreImg);