import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { User } from "../../Website/Context/UserContext";

export default function UpdateProduct() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [accept, setAccept] = useState(false);

  const context = useContext(User);
  const token = context.auth.token;
  const nav = useNavigate();
  const id = window.location.pathname.split("/").slice(-1)[0];

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/products/showbyid/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => {
        setTitle(data.data[0].title);
        setDescription(data.data[0].description);
      });
  }, []);

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", image);
      formData.append("description", description);
      let res = await axios.post(
        `http://127.0.0.1:8000/api/product/update/${id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      nav("/dashboard/products");
    } catch (err) {
      setAccept(true);
    }
  }
  return (
    <div>
      <div className="parent">
        <div style={{ width: "95%" }} className="form-light">
          <form onSubmit={Submit}>
            <div className="inputs">
              <label htmlFor="name">Title</label>
              <input
                id="name"
                type="text"
                htmlinputelement={title}
                placeholder="Title ..."
                onChange={(e) => setTitle(e.target.value)}
              />
              {title.length < 1 && accept && (
                <p className="error">Title Must be more 2 letters!</p>
              )}
              <label htmlFor="email">Description</label>
              <input
                required
                id="email"
                type="text"
                htmlinputelement={description}
                placeholder="Description ..."
                onChange={(e) => setDescription(e.target.value)}
              />
              {/* {accept && emailError && (
                <p className="error">Email is been Taken</p>
              )} */}
              <label htmlFor="pass">Product Image</label>
              <input
                id="pass"
                type="file"
                htmlinputelement={image}
                onChange={(e) => setImage(e.target.files.item(0))}
              />
              {/* {password.length < 8 && accept && (
                <p className="error">Password must been 8 letters!</p>
              )} */}
            </div>
            <button id="btn" type="submit">
              Update Product!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
