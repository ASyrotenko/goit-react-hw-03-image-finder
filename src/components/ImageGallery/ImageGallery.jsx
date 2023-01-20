import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './image-gallery.module.css';

const ImageGallery = ({ query, page, items, onSearch }) => {
  return (
    <ul className={css.ImageGallery}>
      <ImageGalleryItem
        query={query}
        page={page}
        items={items}
        onSearch={onSearch}
      />
    </ul>
  );
};

export default ImageGallery;
