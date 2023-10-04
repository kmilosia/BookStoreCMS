export const sortItems = (items, selectedOption, isAscending) => {
    if (selectedOption){
      const { value, type } = selectedOption;
      //copy array into new sortedcategories array - immutable
      const sortedItems = [...items];
      sortedItems.sort((a, b) => {
        const aValue = a[value];
        const bValue = b[value];
        if (type === 'string') {
          const aValueAsString = String(aValue);
          const bValueAsString = String(bValue);
          if (isAscending) {
            return aValueAsString.localeCompare(bValueAsString);
          } else {
            return bValueAsString.localeCompare(aValueAsString);
          }
        } else if (type === 'number') {
          if (isAscending) {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }
        }
      });
      return sortedItems;
    } else {
      return items;
    }
  };