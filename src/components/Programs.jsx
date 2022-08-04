/** @format */

import React, { useEffect, useState } from 'react';

/**
 * Pagination.
 */
const Pagination = ({ currentPage, updatePage }) => {
  return (
    <ul className="simple-pagination">
      {currentPage > 1 && (
        <li onClick={() => updatePage(currentPage - 1)}>&lt;</li>
      )}
      <li>{currentPage}</li>
      <li onClick={() => updatePage(currentPage + 1)}>&gt;</li>
    </ul>
  );
};

/**
 * Programs.
 */
const Programs = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [countryFilter, setCountryFilter] = useState(null);

  /**
   * Fetch data.
   */
  useEffect(() => {
    const getApiData = async () => {
      const offset = (pageNum - 1) * 500;
      const regionName = 'Sub-Saharan Africa';

      // eslint-disable-next-line no-unused-vars
      const responseData = await fetch(
        `https://data.usaid.gov/resource/azij-hu6e.json?region_name=${regionName}&$limit=500&$offset=${offset}`
      )
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    };
    getApiData();
  }, [pageNum]);

  /**
   * Update Pagination.
   */
  const updatePage = (updatePageNum) => {
    setPageNum(updatePageNum);
    setCountryFilter(null);
  };

  if (data) {
    /**
     * Setup programs list.
     */
    let key = 0;
    let allCountries = [];
    const programsList = data.map((program) => {
      const {
        activity_description: description,
        activity_name: name,
        country_name: country,
      } = program;

      allCountries.push(country);

      if (!countryFilter) {
        return (
          <tr key={key++}>
            <td>{name}</td>
            <td>{description}</td>
            <td>{country}</td>
          </tr>
        );
      }

      if (countryFilter && country === countryFilter) {
        return (
          <tr key={key++}>
            <td>{name}</td>
            <td>{description}</td>
            <td>{country}</td>
          </tr>
        );
      }

      return null;
    });

    // Set unique countries
    const uniqueCountries = [...new Set(allCountries)];

    /**
     * Render.
     */
    return (
      <>
        <div className="countries-filter">
          {uniqueCountries &&
            uniqueCountries.map((country) => {
              return (
                <li key={country} onClick={() => setCountryFilter(country)}>
                  {country}
                </li>
              );
            })}
          {countryFilter && <li onClick={() => setCountryFilter(null)}>X</li>}
        </div>
        <Pagination currentPage={pageNum} updatePage={updatePage} />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Activity Name</th>
              <th scope="col">Activity Description</th>
              <th scope="col">Country</th>
            </tr>
          </thead>
          <tbody>{programsList}</tbody>
        </table>
      </>
    );
  }
  return <div>No programs found.</div>;
};
export default Programs;
