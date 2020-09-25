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
    navBar: {
      position: 'absolute',
      width: '100%',
      top: '0',
      right: '0',
      display: 'flex',
      justifyContent: 'center',

    },
    nav: {
      display: 'block'
    },
    navbarCollapse: {
      flexGrow: 'unset'
    },
    container: {
      paddingTop: '100px',
      textAlign: 'center'
    },
    input: {
      width: '20rem'
    },
    button: {
      width: '5rem'
    },
    a: {
      color: '#fbdeaa'
    },
    div: {
      border: 'none'
    }
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
    <div className="container" style={style.container}>
      <div className="d-flex navbar navbar-expand-lg bg-light" style={style.navBar}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={style.nav}>
          <a className="navbar-brand" href="https://www.linkedin.com/company/web-friedns/">
            <img
              src="https://media-exp1.licdn.com/dms/image/C4D0BAQF_BaxcSbfO9Q/company-logo_200_200/0?e=2159024400&v=beta&t=B1bJCP1NGx-jRxHJUNwj5vWRHvvHUW3O9DoyY9c1xIA"
              width="60" height="60"
              className="d-inline-block align-content-center mr-3" alt="" loading="lazy"/>
            Movie Catalog
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent"  style={style.navbarCollapse}>
          <ul className="navbar-nav">
            <li className='nav-item active'>
              <form className="form-inline" onSubmit={submitHandler}>
                <input
                  className="form-control mx-auto"
                  style={style.input}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={searchHandler}
                />
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                  style={style.button}
                >
                  Search
                </button>
              </form>
              <div className="nav-item dropdown">
                <a className="nav-link dropdown-toggle bg-info border-dark rounded" style={style.a}
                   href="https://resume.io/r/87Qp7zhpt" data-toggle="dropdown">
                  Pavel Horski
                </a>
              </div>
            </li>
          </ul>
        </div>
        </nav>
      </div>
      {cardsToShow && cardsToShow.length ? search() : <h1 className='m-3'>You searched for: <span
        className="badge badge-secondary">{totalResults}</span> results found</h1>}
      <div className="row" style={style.div}>
        {cardsToShow && cardsToShow.length ? (
          cardsToShow.map((card, id) => <Card card={card} key={id}/>)
        ) : null
        }
        {loading ? (<div className='col-10 d-flex justify-content-center align-items-center'>
          <Loading type='spin' color='#A8BDAB'/>
        </div>) : null}
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
