import React, { Component } from 'react';
import Notiflix from 'notiflix';
import { fetchImages } from './services/pixabayAPI';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import css from './App.module.css'

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    showModal: false,
    largeImageURL: '',
    tags: '',
    page: 1,
    searchInput: '',
    error: null,
  }


  componentDidUpdate(prevProps, prevState) {
  if(prevState.searchInput !== this.state.searchInput|| (prevState.page !== this.state.page && this.state.page !==1)) {
    this.getImages()
  }
}


getImages = () => {
  const { searchInput, page } = this.state;
  this.setState({ isLoading: true });

fetchImages(searchInput, page)
.then(({ hits, totalHits }) => {

  if (hits.length === 0) {
    return  Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  if (page === 1) {
    Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
  }

  const arrayImages = hits.map(({ webformatURL, largeImageURL, tags }) => {
    return {
      webformatURL,
      largeImageURL,
      tags,
    };
  });
  this.setState(({ images }) => ({
    images: [...images, ...arrayImages],
    total: totalHits,
  }));
})
.catch(error => this.setState({ error }))
.finally(() => this.setState({ isLoading: false }));
}



  handleOnSubmit= searchInput => {
    this.setState({ searchInput, page: 1 });
  };

  openModal = e => {
  const largeImageUrl = e.target.dataset.large;
  const tags = e.target.alt;
  this.setState({ largeImageUrl, tags });
  this.toggleModal();
  }

  showImages  = () => {
    this.setState(({ page }) => ({
      page: page + 1,
      isLoading: true,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  
  render() {
const { images, isLoading, showModal, largeImageUrl, tags } = this.state;
const { handleOnSubmit, openModal, showImages, toggleModal } = this;
  
    return (
      <div className={css.Container}>
    <Searchbar onSubmit={handleOnSubmit}/> 
    {images && <ImageGallery images={images} openModal={openModal} />}  
    {isLoading && <Loader />}  
    {images.length > 0 ? (<Button text="Load more" handleClick={showImages} />) : null}
    {showModal && (<Modal src={largeImageUrl} alt={tags} onClose={toggleModal}/>)}
      </div>
    );
  }
}

