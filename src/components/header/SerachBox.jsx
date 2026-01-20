import { li } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

function SerachBox() {
  const [serachTerm, setSerachTerm] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

  const location = useLocation()

  const handleSbumit = (e) => {
    e.preventDefault();
    if (serachTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(serachTerm.trim())}`);
    }
    setSuggestions([]);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!serachTerm.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${serachTerm}`
        );
        const data = await res.json();
        setSuggestions(data.products.slice(0, 5) || []);
      } catch (error) {
        console.error("Search Error :", error);
        setSuggestions([]);
      }
    };

    const debonuce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debonuce);
  }, [serachTerm]);



  useEffect(() => {
    setSuggestions([]);
  }, [location])

  return (
    <div className="serachBox_Contaienr">
      <form onSubmit={handleSbumit} className="search_box">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search For Products"
          onChange={(e) => setSerachTerm(e.target.value)}
          autoComplete="off"
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((item) => (
            <Link to={`/products/${item.id}`}><li key={item.id}>
                <img src={item.images[0]} alt="" /> <span>{item.title}</span> 
                </li></Link>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SerachBox;
