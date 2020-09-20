const itemReducer = (currentItems, action) => {
    switch (action.type) {
      case 'SET':
        return action.items;
      case 'ADD':
        return [...currentItems, action.item];
      case 'DELETE':
        return currentItems.filter(item => item.id !== action.id);
      default:
        throw new Error('Something wen wrong!');
    }
  };

  export default itemReducer