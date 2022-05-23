import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import CandidateCard from "./components/CandidateCard";
import "./App.css";
import axios from "axios";
export default function App() {
  const [data, setData] = useState([]);
  const [sortPrice, setSortPrice] = useState("ASC");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchData({ sortPrice, page });
  }, [sortPrice, page]);
  const fetchData = async ({ sortPrice, page }) => {
    setLoading(true);
    axios({
      method: "GET",
      url: "http://localhost:8080/candidates",
      params: {
        _page: page,
        _limit: 5,
        _sort: "salary",
        _order: `${sortPrice}`,
      },
    })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  };
  console.log(data);
  return (
    <div className="App">
      <div>
        {loading && <div id="loading-container">...Loading</div>}

        <Button
          id="SORT_BUTTON"
          onClick={
            sortPrice === "DESC"
              ? () => setSortPrice("ASC")
              : () => setSortPrice("DESC")
          }
          title={
            sortPrice === "DESC"
              ? `Sort by Ascending Salary`
              : `Sort by Descending Salary`
          }
        />
        <Button
          title="PREV"
          id="PREV"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        />
        <Button
          id="NEXT"
          title="NEXT"
          onClick={() => setPage((prev) => prev + 1)}
        />
      </div>
      {data.map((item) => {
        return <CandidateCard key={item.id} {...item} />;
      })}
    </div>
  );
}
