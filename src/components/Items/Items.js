import React, { useReducer, useEffect, useCallback } from 'react';

import httpReducer from '../reducers/httpRequest';
import itemReducer from '../reducers/items'
import ItemForm from './ItemForm';
import ItemList from './ItemList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';


const Items = () => {
  const [userItems, dispatch] = useReducer(itemReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null
  });

  useEffect(() => {
    console.log('RENDERING ITEMS', userItems);
  }, [userItems]);

  const filteredItemsHandler = useCallback(filteredItems => {

    dispatch({ type: 'SET', items: filteredItems });
  }, []);

  const addItemHandler = item => {
    dispatchHttp({ type: 'SEND' });
    fetch('https://react-hooks-update-ac150.firebaseio.com/items.json', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        dispatchHttp({ type: 'RESPONSE' });
        return response.json();
      })
      .then(responseData => {

        dispatch({
          type: 'ADD',
          item: { id: responseData.name, ...item }
        });
      });
  };

  const removeItemHandler = itemId => {
    dispatchHttp({ type: 'SEND' });
    fetch(
      `https://react-hooks-update-ac150.io.com/items/${itemId}.json`,
      {
        method: 'DELETE'
      }
    )
      .then(response => {
        dispatchHttp({ type: 'RESPONSE' });
        dispatch({ type: 'DELETE', id: itemId });
      })
      .catch(error => {
        dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' });
      });
  };

  const clearError = () => {
    dispatchHttp({ type: 'CLEAR' });
  };

  return (
    <div className="App">
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}

      <ItemForm
        onAddItem={addItemHandler}
        loading={httpState.loading}
      />

      <section>
        <Search onLoadItems={filteredItemsHandler} />
        <ItemList
          items={userItems}
          onRemoveItem={removeItemHandler}
        />
      </section>
    </div>
  );
};

export default Items;
