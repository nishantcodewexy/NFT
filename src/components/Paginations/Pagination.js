import React, { useState } from "react";

function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumber = [];
  let page;

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <a onClick={() => paginate(1)} className="page-link">
            {"First"}
          </a>
        </li>

        <li className="page-item">
          <a onClick="#" className="page-link">
            {"Pre"}
          </a>
        </li>

        {pageNumber.map(
          (number) => (
            (page = number),
            (
              <li key={number} className="page-item">
                <a onClick={() => paginate(number)} className="page-link">
                  {number}
                </a>
              </li>
            )
          )
        )}

        <li className="page-item">
          <a onClick="#" className="page-link">
            {"Next"}
          </a>
        </li>

        <li className="page-item">
          <a onClick={() => paginate(pageNumber.length)} className="page-link">
            {"End"}
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
