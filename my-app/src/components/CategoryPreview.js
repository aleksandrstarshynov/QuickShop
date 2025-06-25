import React, { useState, useEffect } from 'react';
import '../styles/CategoryPreview.css';

const BASE = process.env.REACT_APP_API_BASE_URL || '';

export default function CategoryPreview({ category }) {
  const [images, setImages]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    async function fetchImages() {
      // Raw category as passed
      const raw = category.trim();
      console.log('[CategoryPreview] raw category prop:', raw);

      // Tokenize: commas or whitespace
      const tokens = raw.includes(',')
        ? raw.split(/\s*,\s*/)
        : raw.split(/\s+/);
      console.log('[CategoryPreview] tokens:', tokens);

      const queryCategory = tokens.map(t => t.toLowerCase()).join(',');
      console.log('[CategoryPreview] queryCategory:', queryCategory);

      const url = `${BASE}/products?category=${encodeURIComponent(queryCategory)}&limit=4&skip=0`;
      console.log('[CategoryPreview] Fetch URL:', url);

      try {
        const response = await fetch(url);
        console.log('[CategoryPreview] Response status:', response.status);
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }
        const json = await response.json();
        console.log('[CategoryPreview] Raw JSON:', json);

        const prods = Array.isArray(json.products) ? json.products : [];
        console.log('[CategoryPreview] Number of products fetched:', prods.length);

        const urls = prods.map(p => p.imageURL).filter(u => !!u);
        console.log('[CategoryPreview] Filtered URLs:', urls);

        setImages(urls);
      } catch (err) {
        console.error('[CategoryPreview] Error fetching products for', raw, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, [category]);

  return (
    <section className="category-preview">
      <h3 className="category-preview__title">{category}</h3>

      {loading && <p className="category-preview__loading">Loading…</p>}

      {!loading && error && (
        <p className="category-preview__error">Error: {error}</p>
      )}

      {!loading && !error && images.length > 0 && (
        <div className="category-preview__images">
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`${category} ${idx + 1}`}
              className="category-preview__image"
            />
          ))}
        </div>
      )}

      {!loading && !error && images.length === 0 && (
        <p className="category-preview__empty">No images to display</p>
      )}
    </section>
  );
}
