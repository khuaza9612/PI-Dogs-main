
import React, {useState} from "react";
import "./Pagination.css";


export default function Paginado({dogsPerPage, allDogs, paginado, currentPage, setCurrentPage}) {

  const [pageNumberLimit,/*  setPageNumberLimit */] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // console.log(currentPage)
  // console.log(setCurrentPage)
  
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
                      // redondear hacia arriba
    pageNumbers.push(i)
  }

  function handleNext() {
    if(currentPage !== pageNumbers.length){
      setCurrentPage(currentPage + 1)
    }

    if(currentPage + 1 >maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  }

  function handlePrev() {
    if(currentPage !== 1) {
      setCurrentPage(currentPage - 1)

      if((currentPage - 1) % pageNumberLimit === 0) {
        setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }

    }
  }


  return(
    <div className="pagination_component">
      <ul className="pagination">
        <button className="page" onClick={handlePrev}>Prev</button>
        {pageNumbers && pageNumbers.map((page, i) => {
          if(page < maxPageNumberLimit+1 && page > minPageNumberLimit) {
            return(
              <li key={i} className="pagination_item">
                <span className={currentPage === page ? "page active" : "page"} onClick={() => paginado(page)}>{page}</span>
              </li>
            )
          } else {
            return null
          }
        })}
        <button className="page" onClick={handleNext}>Next</button>
      </ul>
    </div>
  )
}

