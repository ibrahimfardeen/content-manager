"use client";
import { useState, useEffect } from "react";
// import Select from "react-select";

const Register = ({ success, error, onClose }) => {
  const handleCloseOnOverlayClick = (e) => {
    if (!e.target.closest(".register-content")) {
      onClose();
    }
  };

  return (
    <div
      className="fixed top-[-13px] left-0 w-full h-full flex items-center justify-center bg-opacity-50 backdrop-blur-sm rounded-lg z-50"
      onClick={handleCloseOnOverlayClick}
    >
      <div
        className={
          success
            ? "relative sm:w-[440px] h-[350px] bg-white bg-opacity-500 p-8 register-content border-2 border-green-500 rounded-lg"
            : "relative sm:w-[440px] h-[100px] bg-white bg-opacity-500 overflow-y-auto p-8 register-content border-2 border-red-500 rounded-lg"
        }
      >
        <button
          className="absolute top-6 right-4 text-xl font-bold cursor-pointer bg-orange-500 rounded-lg px-2 py-1 mt-[7.6px]"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");

  const convertTobase64 = async (e) => {
    console.log("Converting ");
    let file = e.target.files[0];
    let reader = new FileReader();
    try {
      reader.onload = function (e) {
        setPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
      console.log("Converted ");
    } catch (err) {
      console.log("err : " + err);
    }
  };

  const handleSubmit = async (e) => { 
    console.log('Submitted');
    const res = await fetch("../api/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        description,
        photo,
      }),
    });
    const { msg, success } = await res.json();
    console.log("msg : " + msg);
    console.log("success : " + success);

  };

  return (
    <>
        <div className="w-[500px] h-[550px] bg-white overflow-y-auto p-8 popup-card-content relative">
          <form
            // action={handleSubmit}
            onSubmit={handleSubmit}
            className="py-4 mt-1 flex flex-col gap-5 bg-[white] overflow-auto relative"
          >
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
              <img src={photo} alt="Upload Photo"/>
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
    </>
  );
}