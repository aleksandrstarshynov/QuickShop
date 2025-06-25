import React from 'react';
import '../styles/ProductIdea.css';
import exampleImage1 from '../images/exmpl_img_1.jpg';
import exampleImage2 from '../images/exmpl_img_2.png';

/**
 * Компонент ProductIdea
 * Отображает информацию о продукте и две иллюстрации с описаниями.
 */
export default function ProductIdea() {
  return (
    <section className="product-idea">
      <p className="product-idea__block product-idea__block--first">
        Selecting works of art has never been easier. No more endlessly browsing through the catalog. Moreover, you don’t need to know the styles of painting and eras. Just enter in the search what brought you to us. Mood, image of the person who will receive the gift, new interior style, development of the collection? Describe what you are looking for in words, and we will offer you options.
      </p>

      <div className="product-idea__content">
        <img
          src={exampleImage1}
          alt="abstract painting"
          className="product-idea__image"
        />
        <div className="product-idea__description">
          Modern abstract painting in a soft but contrasting palette. In the center is a large vertical white silhouette block, on the sides of which are smaller color spots: on the left are soft turquoise-mint and sand-beige fragments, on the right is a deep black "section", partially surrounded by turquoise and dark blue inclusions. The general background is pale beige with subtle transitions to green-blue, creating a feeling of airy, almost architectural space. Keywords for search: abstract painting, geometric highlights, turquoise and white composition, vertical white silhouette, contrast of black and pastel beige
        </div>
      </div>

      <div className="product-idea__content">
        <img
          src={exampleImage2}
          alt="watercolor city canal"
          className="product-idea__image"
        />
        <div className="product-idea__description">
          A delicate watercolor study of a view of a European city canal. In the foreground is calm water, on which two small barge boats float. In the middle of the composition is an elegant arched stone bridge, behind it is a tall ancient spire of a church or town hall. The background is filled with warm pink-peach and light blue tones of the sky, and at the edges appear light strokes of green and red leaves, giving the scene a shade of autumn. Keywords for search: watercolor landscape, city canal, boats and arched bridge, church spire, pastel sky, European architecture in watercolor
        </div>
      </div>
    </section>
  );
}
