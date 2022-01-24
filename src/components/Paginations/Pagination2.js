import React, { useState } from "react";
import "../../style/login.css";

//import { getAllAdmin } from "./../../actions/admin";

function Pagination({ pages, setAdmin, getList, setSize, setNewPage }) {
  const [clicked, setClicked] = useState(0);
  const [current, setCurrent] = useState(0);
  setNewPage(current);
  return (
    <div>
      <nav>
        <ul className="d-flex justify-content-center">
          <div
            className="pagination-item"
            onClick={(e) => {
              getList(1).then((res) => {
                setAdmin(res.data);
                setClicked(0);
                setCurrent(0);
                setSize(res.data.length);
              });
            }}
          >
            First
          </div>
          <div
            className="pagination-item"
            onClick={(e) => {
              clicked > 0 &&
                getList(clicked).then((res) => {
                  setAdmin(res.data);
                  setClicked(clicked - 1);
                  setSize(res.data.length);
                  setCurrent(current - 1);
                });
            }}
          >
            Previous
          </div>
          {Array.from(Array(pages), (e, i) => {
            return (
              <div
                className={
                  i === clicked ? "pagination-item-active" : "pagination-item"
                }
                key={i}
                tabIndex={i}
                onClick={(e) => {
                  getList(i + 1).then((res) => {
                    setAdmin(res.data);
                    setClicked(i);
                    setSize(res.data.length);
                    setCurrent(i);
                  });
                }}
              >
                {i + 1}
              </div>
            );
          })}
          <div
            className="pagination-item"
            onClick={(e) => {
              clicked <= pages - 2 &&
                getList(clicked + 2).then((res) => {
                  setAdmin(res.data);
                  setClicked(clicked + 1);
                  setCurrent(current + 1);
                });
            }}
          >
            Next
          </div>
          <div
            className="pagination-item"
            onClick={(e) => {
              getList(pages).then((res) => {
                setAdmin(res.data);
                setClicked(pages - 1);
                setSize(res.data.length);
                setCurrent(pages - 1);
              });
            }}
          >
            Last
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
