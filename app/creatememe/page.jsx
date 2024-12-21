"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";

const CreateMeme = () => {
  const [image, setImage] = useState(null);
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const id = searchParams.get("id");
  const text1 = useRef();
  const text2 = useRef();

  const generate = async (e) => {
    e.preventDefault();

    const data = await fetch(
      `https://api.imgflip.com/caption_image?template_id=${id}&username=AbdulHadi123&password=ahadi123&text0=${text1.current?.value}&text1=${text2.current?.value}`,
      {
        method: "POST",
      }
    );
    const response = await data.json();
    setImage(response.data.url);
    document.getElementById("my_modal_3").showModal();
  };

  return (
    <>
      <div className="text-4xl font-bold text-center my-10 text-gray-800">
        Make Your Fun <span className="text-3xl">🥳</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 px-5 lg:px-20">
        {/* Meme Image Section */}
        <div className="flex justify-center items-center">
          <Image
            className="rounded-lg shadow-lg"
            src={url}
            width={400}
            height={300}
            alt="meme-image"
          />
        </div>

        {/* Form Section */}
        <div className="flex justify-center items-center">
          <form
            className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border"
            onSubmit={generate}
          >
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-5">
              Customize Your Meme
            </h2>
            <input
              type="text"
              placeholder="Top Text"
              className="border-2 w-full py-2 px-4 rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ref={text1}
            />
            <input
              type="text"
              placeholder="Bottom Text"
              className="border-2 w-full py-2 px-4 rounded-md mb-6 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ref={text2}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white w-full py-2 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Generate
            </button>
          </form>
        </div>
      </div>

      {/* Modal Section */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box relative">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("my_modal_3").close()}
          >
            ✕
          </button>
          {image ? (
            <Image
              src={image}
              alt="Generated Meme"
              width={400}
              height={300}
              className="rounded-lg"
            />
          ) : null}
        </div>
      </dialog>
    </>
  );
};

export default CreateMeme;
