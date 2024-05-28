import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import SearchBar from "./components/SearchBar";
// import Filter from "./components/Filter";
import TotalChallenges from "./components/TotalChallenges";
import challengesData from "./data/updated_repositorios_frontend.json";

const App = () => {
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [displayedChallenges, setDisplayedChallenges] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");

  const itemsPerPage = 60;

  useEffect(() => {
    const filterAndSearch = () => {
      return challengesData.filter((challenge) => {
        const matchesLanguage = filter ? challenge.language === filter : true;
        const matchesSearch = searchQuery
          ? challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            challenge.company.toLowerCase().includes(searchQuery.toLowerCase())
          : true;
        return matchesLanguage && matchesSearch;
      });
    };

    const filtered = filterAndSearch();
    setFilteredChallenges(filtered);
    setPage(1); // Reset page to 1 on new filter or search
  }, [searchQuery, filter]);

  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedChallenges = filteredChallenges.slice(
      startIndex,
      startIndex + itemsPerPage
    );
    setDisplayedChallenges(paginatedChallenges);
  }, [page, filteredChallenges]);

  const totalPages = Math.ceil(filteredChallenges.length / itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-x-2 items-center justify-start w-full h-20 mb-10 mt-10">
        <div className="flex flex-col gap-y-2 justify-start items-start">
          <div className="flex gap-x-2 items-center justify-center">
            <img
              src="/logo-black.svg"
              width={32}
              alt="Logo Desafios Front-end"
            />
            <h1 className="text-xl font-bold">Desafios Front-end</h1>
          </div>
          <p>Busque por repositórios do GitHub com desafios front-end.</p>
        </div>
      </div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="flex justify-between items-end">
        {/* <Filter filter={filter} setFilter={setFilter} /> */}
        <TotalChallenges total={filteredChallenges.length} />
      </div>
      {filteredChallenges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedChallenges.map((challenge, index) => (
            <Card key={index} challenge={challenge} />
          ))}
        </div>
      ) : (
        <div className="text-gray-700 text-center mt-4">
          Nenhum repositório encontrado
        </div>
      )}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded"
          disabled={page === 1}>
          Anterior
        </button>
        <span className="text-gray-700">
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          className="text-white bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded"
          disabled={page === totalPages}>
          Próximo
        </button>
      </div>
    </div>
  );
};

export default App;
