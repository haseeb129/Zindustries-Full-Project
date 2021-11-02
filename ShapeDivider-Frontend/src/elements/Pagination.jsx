import React, { Component } from 'react'
import { Link } from 'react-scroll'
const Pagination = ({ postPerPage, totalPosts, paginate }) => {
  const pageNumber = []
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumber.push(i)
  }
  //   console.log(pageNumber);
  return (
    <div className="row justify-content-center">
      <ul className="pagination centered">
        {pageNumber.map((number) => (
          <li key={number} className="page-item">
            <Link to="Main" spy={true} smooth={true}>
              <a onClick={() => paginate(number)} className="page-link">
                {number}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Pagination
