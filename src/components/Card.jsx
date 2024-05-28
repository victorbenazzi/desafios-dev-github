import React from "react";

const Card = ({ challenge }) => {
  const truncateTitle = (title, maxLength) => {
    if (title.length <= maxLength) {
      return title;
    }
    return title.slice(0, maxLength) + "...";
  };

  return (
    <div className="border p-4 rounded-lg shadow-md flex flex-col justify-between">
      <img
        src={challenge.image}
        alt={challenge.name}
        className="w-full h-60 object-cover rounded-lg border"
      />
      <a className="hover:text-blue-600 hover:underline" href={challenge.url}>
        <h2 className="text-xl font-bold mt-2">
          {truncateTitle(challenge.title, 110)}
        </h2>
      </a>
      <p className="text-gray-700 text-sm mt-1">{challenge.company}</p>
      <p className="text-gray-700 text-base mt-4">{challenge.description}</p>
      <a
        href={challenge.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 w-fit bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded">
        Acessar Desafio
      </a>
    </div>
  );
};

export default Card;
