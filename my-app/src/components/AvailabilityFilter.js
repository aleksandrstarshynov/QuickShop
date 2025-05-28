import React from 'react';

function AvailabilityFilter({ availability, setAvailability }) {
  return (
    <div className="availability-filter" style={{ marginTop: '20px'}}>
      <h3>Availability</h3>

      <label style={{ display: 'block', marginBottom: '0.5rem' }}>
        <input
          type="radio"
          name="availability"
          value=""
          checked={availability === ''}
          onChange={() => setAvailability('')}
        />
        All products
      </label>

      <label style={{ display: 'block', marginBottom: '0.5rem' }}>
        <input
          type="radio"
          name="availability"
          value="in_stock"
          checked={availability === 'in_stock'}
          onChange={() => setAvailability('in_stock')}
        />
        In Stock
      </label>

      <label style={{ display: 'block' }}>
        <input
          type="radio"
          name="availability"
          value="preorder"
          checked={availability === 'preorder'}
          onChange={() => setAvailability('preorder')}
        />
        To order
      </label>
    </div>
  );
}

export default AvailabilityFilter;
