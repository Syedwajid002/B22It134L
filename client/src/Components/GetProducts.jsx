import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './g.css'

const GetProducts = () => {
  const [data, setData] = useState([]);
  const {company, category } = useParams();
    console.log(company+"come")
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${company}/${category}?top=10&minPrice=1&maxPrice=10000`);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getProducts();
  }, []); 

  return (
    <div>
      <h1>Products</h1>
      <div>
        {data.length === 0 ? (
          <p>No products found</p>
        ) : (
          data.map((product, index) => (
            <div key={index} className="product">
              <h2>{product.productName}</h2>
              <p>Price: ${product.price}</p>
              <p>Description: {product.rating}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GetProducts;
