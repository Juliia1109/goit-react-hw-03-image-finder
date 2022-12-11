import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images, openModal }) {
  return (
<>
<ul className={css.ImageGallery}>
{images.map(( image, id ) => (
        <ImageGalleryItem
          key={id}
          image={image}
          openModal={openModal}
        />
    ))}
</ul>
</>
  )
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
}