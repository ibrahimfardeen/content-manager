"use client";
import { useState } from "react";
import Modal from "./components/Modal";
import SigninButton from "./components/SigninButton";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import AddEntry from "./components/AddEntry";
import Edit from "./components/Edit";

export default function Home() {
  const [data, setData] = useState([]);
  const [source, setSource] = useState(null);
  const [header, setHeader] = useState("Click any of the above buttons");
  const [alldata, setAlldata] = useState(false);
  const [product, setProduct] = useState(null);

  const sendMail = async() => {

    const res = await fetch("./api/mailer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        'message': 'mail',
      }),
    });
    const response = await res.json();
    console.log(JSON.stringify(response.data));
  };
  const getData = async () => {
    setAlldata(false);
    setHeader("Loading, Please wait...");
    setData([]);
    const res = await fetch("./api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        'message': 'getAll',
      }),
    });
    const response = await res.json();
    console.log(JSON.stringify(response.data.data));
    setData(response.data.data);
    setHeader(" Total Products : " + response.data.data.length);
  };
  const date = (x) => {
    return new Date(x).toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  };
  const handleclose = () => {
    setSource(null);
    setProduct(null)
  };
  const verify = async (event, verify) => {
    setHeader("Loading, Please wait...");
    setData([]);
    const res = await fetch("./api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: event,
        verify: verify,
      }),
    });
    const response = await res.json();
    getData("");
  };
  const deleteData = async (product) => {
    if(confirm('Are you sure you want to delete this product')){
      setHeader("Loading, Please wait...");
      setData([]);
      const res = await fetch("./api/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: product,
        }),
      });
      const response = await res.json();
      getData();
    }
  };
  const { data: session } = useSession();
  if (session && session.user && session.user.email == 'ibrahimfardeen.n@gmail.com') {
    return (
      <>
        <div className="border-spacing-y-2 ml-3 mr-3">
          <span>
            <button
              type="button"
              onClick={() => signOut()}
              className="text-lg font-bold bg-red-500 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-700 dark:border-red-700"
            >
              Sign Out
            </button>
          </span>
          <span>
              <button
                type="button"
                onClick={() => setSource(true)}
                className="border-spacing-y-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Add Product
              </button>
            </span>
            <span>
                <button
                  type="button"
                  onClick={() => getData()}
                  className="border-spacing-y-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Get Products
                </button>
              </span>
        </div>
        <div className="flex items-center sm:justify-center ml-3 mr-3 border-spacing-y-2 text-2xl font-bold bg-red-800 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-red-500">
          {header ? header : ""}
        </div>
        <div className="flex items-center sm:justify-center ml-3 mr-3 sm:ml-3">
          <table className="text-sm border-separate border-spacing-y-1">
            {data && data.length > 0 && (
              <thead className="sr-only text-left font-medium text-lg sm:not-sr-only">
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Photo</th>
                  <th>Updated</th>
                  <th>Created</th>
                </tr>
              </thead>
            )}
            <tbody>
              {data &&
                data.map((product, index) => (
                  <tr key={index} className="tr-class">
                    {(
                      <>
                        <td className="td-class">{index + 1}</td>
                        <td className="td-class">{product.attributes.Name}</td>
                        <td className="td-class">{product.attributes.Price}</td>
                        <td className="td-class">{product.attributes.Desc}</td>
                        <td className="td-class"><img src={product.attributes.img.data.attributes.url}/></td>
                        <td className="td-class">{date(product.attributes.updatedAt)}</td>
                        <td className="td-class">{date(product.attributes.createdAt)}</td>
                        <td className="td-class">
                          <button
                            type="button"
                            onClick={() => setProduct(product)}
                            className="border-spacing-y-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteData(product)}
                            className="border-spacing-y-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
            </tbody>  
          </table>
        </div>
        {source && <AddEntry onclose={handleclose} />}
        {product && <Edit product={product} onclose={handleclose} />}
      </>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-800">
        <div>
          <p className="text-white">You are not authorized to view this page</p>
          <br />
        </div>
        <button
          onClick={() => signIn()}
          className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
        >
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          <span>Sign in</span>
        </button>
      </div>
    );
  }
}
