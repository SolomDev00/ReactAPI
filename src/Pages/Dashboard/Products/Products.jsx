import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";
import React, { useContext, useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [runUseEffect, setRun] = useState(0);
  const context = useContext(User);
  const token = context.auth.token;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => setProducts(data.data));
  }, [runUseEffect]);

  async function deleteProduct(id) {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/product/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        setRun((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const showProducts = products.map((product, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{product.title}</td>
      <td>{product.description}</td>
      <td>
        <Link to={`${product.id}`}>
          <i id="products" className="fa-solid fa-pen-to-square"></i>
        </Link>
        <i
          onClick={() => deleteProduct(product.id)}
          id="products"
          className="fa-solid fa-trash"
        ></i>
      </td>
    </tr>
  ));

  return (
    <div style={{ padding: "20px" }}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showProducts}</tbody>
      </table>
    </div>
  );
}
