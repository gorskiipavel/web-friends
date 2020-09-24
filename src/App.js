import React, {useState, useEffect} from "react";
import Card from "./Component/Card";
import Loading from "./Component/loading";
import Pagination from "react-js-pagination";

function App() {
  const [cardsToShow, setCardsToShow] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalResults, setTotalResults] = useState(undefined);


  async function fetchData(searchQuery, page) {
    const url = `https://www.omdbapi.com/?i=tt3896198&apikey=8523cbb8&s=${searchQuery}&page=${page}`;
    const res = await fetch(url);
    res.json().then((res) => {
      setTotalResults(res.totalResults);
      setCardsToShow(res.Search ? res.Search.slice(0, 8) : null);
    });
  }

  const searchHandler = (event) => {
    if (event) {
      setSearchQuery(event.target.value);
    }

  };

  const submitHandler = (event) => {
    if (event) {
      event.preventDefault();
    }
    fetchData(searchQuery, activePage);
  };

  const paginationClickHandler = (pageNumber) => {
    setActivePage(pageNumber);
  };
  const search = () => {
    if (!totalResults) {
      return (
        <h1 className='m-3'>You searched for: <span className="badge badge-secondary"> nothing found</span></h1>
      )
    } else {
      return (
        <h1 className='m-3'>You searched for: <span
          className="badge badge-secondary">{totalResults}</span> results found</h1>
      )
    }
  };

  useEffect(() => {
    submitHandler();
  }, [activePage, totalResults]);


  return (
    <div className="container">
      <div className="navbar navbar-expand-lg bg-light">
        <div className="navbar-brand">Movie Catalog</div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <form className="form-inline my-2 my-lg-0" onSubmit={submitHandler}>
              <input
                className="form-control mx-auto"
                style={{width: "40rem"}}
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={searchHandler}
              />
              <button
                className="btn btn-outline-success mx-3 "
                type="submit"
                style={{width: "7rem"}}
              >
                Search
              </button>
            </form>
            <li className="nav-item ">
              <div className="nav-link dropdown-toggle mx- 3">Pavel Horski</div>
            </li>
          </ul>
        </div>
      </div>
      {cardsToShow && cardsToShow.length ? search() : null }
      <div className="row" style={{border: "none"}}>
        {cardsToShow && cardsToShow.length ? (
          cardsToShow.map((card, id) => <Card card={card} key={id}/>)
        ) : (
          <div className='col-10 d-flex justify-content-center align-items-center'>
            <Loading type='spin' color='#A8BDAB'/>
          </div>
        )}
      </div>
      <div className='m-3'>
        <Pagination activePage={activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={totalResults}
                    pageRangeDisplayed={10}
                    onChange={paginationClickHandler}
                    innerClass="pagination justify-content-center"
                    itemClass='page-item'
                    linkClass="page-link"
                    prevPageText='Previous'
                    nextPageText='Next'
                    hideDisabled={true}
        />
      </div>
    </div>
  );
}

export default App;
