import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ image, openModal }) {
  return (
    
    <li className={css.ImageGalleryItem} onClick={openModal}>
      <img
        className={css.ImageGalleryItemImage}
        src={image.webformatURL}
        alt={image.tags}
        data-large={image.largeImageURL}
      />
    </li>
  )
}


ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
}
