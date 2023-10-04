export const filterItems = (list, value) => list.filter((item) => {
    if (!value) {
        return true;
    }
    const itemName = item.name.toLowerCase();
    return itemName.includes(value.toLowerCase());
});