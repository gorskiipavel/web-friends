import React, {useState, useEffect} from "react";
import Card from "./Component/Card";
import Loading from "./Component/loading";
import Pagination from "react-js-pagination";

function App() {
  const [cardsToShow, setCardsToShow] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalResults, setTotalResults] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const style = {
    loader: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    },
  };

  async function fetchData(searchQuery, page) {
    setLoading(true);
    const url = `https://www.omdbapi.com/?i=tt3896198&apikey=8523cbb8&s=${searchQuery}&page=${page}`;
    const res = await fetch(url);
    res.json().then((res) => {
      setLoading(false);
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
    }
  };

  useEffect(() => {
    submitHandler();
  }, [activePage, totalResults]);


  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="https://www.linkedin.com/company/web-friedns/">
          <img
            src="https://media-exp1.licdn.com/dms/image/C4D0BAQF_BaxcSbfO9Q/company-logo_200_200/0?e=2159024400&v=beta&t=B1bJCP1NGx-jRxHJUNwj5vWRHvvHUW3O9DoyY9c1xIA"
            width="60" height="60"
            className="d-inline-block align-content-center mr-3" alt="" loading="lazy"/>
        </a>
        <a className="navbar-brand text-info" href="https://brymonsoft.com/">Movie Catalog</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"/>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex justify-content-around w-100 m-3"  onSubmit={submitHandler}>
              <input className="w-100 m-1 form-control" type="text" placeholder="Search" aria-label="Search"
                     value={searchQuery} onChange={searchHandler}/>
            <button className="m-1 btn btn-outline-info"  type="submit">Search</button>
          </form>
        </div>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle ml-1 text-info" id="navbarDropdown" role="button" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              Pavel Horski
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="https://docs.google.com/document/d/1lYF2n7TRc160ikLFaUR4b-RhtZHnmdTR4PSECxley7Q/edit?usp=sharing">Resume
                <img
                  src="https://img.icons8.com/bubbles/2x/resume.png"
                  width='60px' height='60px' alt=""/>
              </a>
              <a className="dropdown-item" href="https://www.linkedin.com/in/pavel-horski-9446251b0/">
                LinkedIn
                <img src="https://img.icons8.com/clouds/2x/linkedin.png" width='60px'
                     height='60px' alt=""/>
              </a>
              <div className="dropdown-item disabled ">
                gorskiipavel@gmail.com
                <img src="https://img.icons8.com/clouds/2x/gmail.png" width='60px' height='60px' alt=""/>
              </div>
              <a className="dropdown-item disabled" href="#">
                +375(44)795-30-71
                <img src="https://img.icons8.com/clouds/2x/phone.png" width='60px' height='60px' alt=""/>
              </a>
            </div>
          </li>
        </ul>
      </nav>
      {cardsToShow && cardsToShow.length ? search() : <h1 className='d-flex justify-content-center col-10'>You searched for:
        <span className="badge badge-secondary">
        {totalResults}
      </span> results found
      </h1>}
      <div className="row" style={style.div}>
        {cardsToShow && cardsToShow.length ? (
          cardsToShow.map((card, id) =>
            <Card card={card} key={id}/>)
        ) : null
        }
        {loading ? (<div style={style.loader}>
            <Loading type='spin' color='#A8BDAB'/>
          </div>)
          : null}
      </div>
      <div className='d-flex justify-content-center'>
        <Pagination activePage={activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={totalResults}
                    pageRangeDisplayed={8}
                    onChange={paginationClickHandler}
                    innerClass="pagination"
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
