import React from "react";

const objectSearcher = (datas, query) => {
  let result = datas.filter((obj) => {
    return obj.airport_location == query;
  });
  return query;
};

export default objectSearcher;
