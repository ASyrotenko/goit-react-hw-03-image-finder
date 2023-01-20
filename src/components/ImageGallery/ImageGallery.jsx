import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './image-gallery.module.css';

const ImageGallery = ({ searchImg, page }) => {
  return (
    <ul className={css.ImageGallery}>
      <ImageGalleryItem searchImg={searchImg} page={page} />
    </ul>
  );
};

export default ImageGallery;
