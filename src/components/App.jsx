import React, { Component } from 'react';
import Notiflix from 'notiflix';
import { fetchImages } from 'services/pixabayAPI';
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
    // showModal: false,
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

  const arrayImages = hits.map(({id, webformatURL, largeImageURL, tags }) => {
    return {
      id,
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


  handleOnSubmit= (searchInput)=> {
    if (searchInput=== this.state.searchInput)
    return;
    this.setState({ images: [], searchInput, page: 1 });
  };

 
  openModal = e => {
    this.setState(() => ({
      largeImageURL: e.target.dataset.large,
      tags: e.target.alt,
    }));
    // this.toggleModal();
  };


  showImages  = () => {
      this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

 closeModal = () => {
    this.setState({largeImageURL: ''});
  };

  render() {
const { images, isLoading, largeImageURL, tags } = this.state;
const { handleOnSubmit, showImages,  openModal, closeModal} = this;
    return (
    <div className={css.Container}>

    <Searchbar onSubmit={handleOnSubmit}/> 

    {images.length > 0 && 
    (<ImageGallery images={images} openModal={openModal} />)}

    {isLoading && <Loader />} 

    {images.length > 0 && !isLoading && images.length !== this.state.total && 
    (<Button text="Load more" handleClick={showImages} />)}

    {largeImageURL && 
    (<Modal onClose={closeModal} img={largeImageURL} alt={tags} />)}

    </div>
    );
  }
}

