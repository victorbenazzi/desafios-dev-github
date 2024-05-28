import React from "react";

const Filter = ({ filter, setFilter }) => {
  return (
    <>
      <div className="flex flex-col w-[20%] gap-y-2">
        <label htmlFor="select" className="text-sm">
          Filtrar por idioma
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 border rounded-lg mb-2 text-sm">
          <option value="">Todos</option>
          <option value="English">Inglês</option>
          <option value="Portuguese">Português</option>
        </select>
      </div>
    </>
  );
};

export default Filter;
