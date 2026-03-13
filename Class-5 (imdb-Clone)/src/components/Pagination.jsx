import React, { useState } from "react";

function Pagination({decrementPage , incrementPage , pageNo}) {


  return (
    <div className="bg-gray-400 h-12 flex justify-center items-center gap-3 ">
      <div>
        <i onClick={decrementPage} class="fa-solid fa-arrow-left"></i>
      </div>
      <div>{pageNo}</div>
      <div>
        <i onClick={incrementPage} class="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  );
}

export default Pagination;
