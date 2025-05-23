import React from 'react';

function AvailabilityFilter({ availability, setAvailability }) {
  return (
    <div className="availability-filter">
      <h3>Наличие</h3>

      <label style={{ display: 'block', marginBottom: '0.5rem' }}>
        <input
          type="radio"
          name="availability"
          value=""
          checked={availability === ''}
          onChange={() => setAvailability('')}
        />
        Все
      </label>

      <label style={{ display: 'block', marginBottom: '0.5rem' }}>
        <input
          type="radio"
          name="availability"
          value="in_stock"
          checked={availability === 'in_stock'}
          onChange={() => setAvailability('in_stock')}
        />
        В наличии
      </label>

      <label style={{ display: 'block' }}>
        <input
          type="radio"
          name="availability"
          value="preorder"
          checked={availability === 'preorder'}
          onChange={() => setAvailability('preorder')}
        />
        Под заказ
      </label>
    </div>
  );
}

export default AvailabilityFilter;
