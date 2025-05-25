"use client";
import { useState, useEffect } from "react";

export default function AddEntry({ onclose }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");

  const handleCloseOnOverlayClick = (e) => {
    onclose();
    if (!e.target.closest(".popup-card-content")) {
      onclose();
    }
  };
  const convertTobase64 = async (e) => {
    console.log("Converting ");
    let file = e.target.files[0];
    let reader = new FileReader();
    try {
      reader.onload = function (e) {
        setPhoto(e.target.result.toString());
      };
      reader.readAsDataURL(file);
      console.log("Converted ");
    } catch (err) {
      console.log("err : " + err);
    }
  };
  const handleSelectVal = (e) => {
    setCategory(e.target.value);
  };
  const handleSubmit = async (e) => {
    console.log("Submitted");
    const res = await fetch("../api/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ category: { name, price, description, photo } }),
    });
    const { msg, success } = await res.json();
    console.log("msg : " + msg);
    console.log("success : " + success);
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 backdrop-blur-sm rounded-lg z-50"
        // onClick={handleCloseOnOverlayClick}
      >
        <div className="fixed flex-col top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden z-50">
          <div className="mt-0">
            <button onClick={handleCloseOnOverlayClick}>
              Click here to close
            </button>
          </div>
          <div className="w-[500px] h-[550px] bg-white overflow-y-auto p-8 popup-card-content relative">
            <form
              // action={handleSubmit}
              onSubmit={handleSubmit}
              className="py-4 mt-1 flex flex-col gap-5 bg-[white] overflow-auto relative"
            >
              <div>
                <select
                  className="border-2 border-gray-300 rounded-md w-full p-2"
                  onChange={handleSelectVal}
                >
                  <option>Cement</option>
                  <option>Steel</option>
                  <option>Brick</option>
                  <option>Sand</option>
                </select>
              </div>
              <div>
                {/* <label htmlFor="name">Name</label> */}
                <input
                  className="border-2 border-gray-300 rounded-md w-full p-2"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  id="name"
                  placeholder="Name"
                />
              </div>

              <div>
                {/* <label htmlFor="price">Price</label> */}
                <input
                  className="border-2 border-gray-300 rounded-md p-2 w-full"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  type="text"
                  id="price"
                  placeholder="Price"
                />
              </div>
              <div>
                {/* <label htmlFor="description">Description</label> */}
                <input
                  className="border-2 border-gray-300 rounded-md p-2 w-full "
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  type="text"
                  id="description"
                  placeholder="Description"
                />
              </div>
              <div className="flex flex-col justify-center">
                <label
                  htmlFor="file"
                  className="flex justify-center mb-2.5 bg-black px-4 py-2 text-white cursor-pointer mt-5 p-2 rounded-[0.5rem]"
                >
                  Photo
                </label>
                <input
                  className="hidden"
                  onChange={(e) => convertTobase64(e)}
                  type="file"
                  id="file"
                  accept="image/*"
                />
              </div>
              <div>
                {/* <label htmlFor="description">Description</label> */}
                <img src={photo} alt="Upload Photo" />
              </div>
              <div>
                {/* <label htmlFor="description">Description</label> */}
                <button
                  className="border-2 border-gray-300 rounded-md p-2 w-full"
                  type="submit"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
