import React from "react";

export default function Pagination({ postsPerPage, totalPosts,paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="w-full p-4 ">
      <ul className="pagination flex-wrap justify-center items-center flex gap-2">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className="page-item border-orange-500 bg-[#FC8112] text-white text-lg font-bold  border-2 rounded-md text-center w-8 h-8"
          >
            <a onClick={()=>paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
