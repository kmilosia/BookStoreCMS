import { url } from "./api-address";
import axios from "axios";
export const fetchAll = ({address}) => {
    // return fetch('https://random-data-api.com/api/v2/beers?size=4')
    return fetch(`${url}${address}`)
      .then(response => response.json());
  };

  // export const fetchItems = ({table, setItems}) => {
  //   axios.get(`${apiURL}${table}`)
  //   .then(response => {
  //     setItems(response.data)
  //     console.log(response.data);
  //   })
  //   .catch(error => {
  //     console.error(error)
  //   })
  // }

  // export const editItem = (id, name, table) => {
  //   axios.put(`${apiURL}${table}/${id}`, {
  //     name: name,
  //   })
  //   .then(response => {
  //       console.log(`Item of ID ${id} has been updated`);
  //       fetchItems()
  //     })
  //   .catch(error => {
  //       console.error(error)
  //     })
  // }
  
  // export const addItem = (name, table) => {
  //   axios.post(`${apiURL}${table}`, {
  //     name: name,
  //   })
  //   .then(response => {
  //     console.log(`New item has been added`);
  //     fetchItems()
  //   })
  // .catch(error => {
  //     console.error(error)
  //   })
  // }
  // export const deleteItem = (id, table) => {
    
  // }

  // const deleteMethod = (id) => {
  //   axios.delete(`https://localhost:7247/api/PaymentMethod/${id}`)
  //   .then(response => {
  //     console.log(`Payment method with ID ${id} has been deleted`);
  //     fetchMethods()
  //   })
  //   .catch(error => {
  //     console.error(error)
  //   })
  // }

