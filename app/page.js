import Image from "next/image";
import Link from "next/link";
import React from "react";

const Memmes = async () => {
  const data = await fetch("https://api.imgflip.com/get_memes");
  const response = await data.json();

  return (
    <>
      <h1 className="text-4xl font-bold text-center my-10 text-gray-800">
        Make a Meme, Make Fun
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-5 lg:px-20">
        {response.data.memes.map((item) => (
          <div
            className="card bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out border border-gray-200"
            key={item.id}
          >
            <figure className="overflow-hidden">
              <Image
                className="object-cover w-full h-64"
                src={item.url}
                width={300}
                height={300}
                alt="meme-image"
              />
            </figure>
            <div className="p-5 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {item.name.slice(0, 20)}
              </h2>
              <Link
                href={{
                  pathname: "/creatememe",
                  query: {
                    url: item.url,
                    id: item.id,
                  },
                }}
                className="bg-blue-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Generate Meme
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Memmes;
