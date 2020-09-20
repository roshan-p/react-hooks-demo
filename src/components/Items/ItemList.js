import React from 'react';

import './ItemList.css';

const ItemList = props => {
  return (
    <section className="item-list">
      <h2>Items List</h2>
      <ul>
        {props.items.map(item => (
          <li key={item.id} onClick={props.onRemoveItem.bind(this, item.id)}>
            <span>{item.title}</span>
            <span>{item.amount} items</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ItemList;
