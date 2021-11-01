import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import '../css/BadFoods.css';
import PropTypes from 'prop-types';

export default function BadFoods({ foods, sortOrder, filterLevel }) {
  const [sortedFood, setSortedFood] = useState([]);

  const colorStyle = ["", "noneFd", "mildFD", "moderateFD", "severeFD"];


  useEffect(() => {
    const symptomSort = (a, b) =>
      sortOrder === "up" ?
        b.data.symptomColor - a.data.symptomColor :
        a.data.symptomColor - b.data.symptomColor

    setSortedFood(foods.filter(({ data }) => data.symptomColor > filterLevel).sort(symptomSort));

  }, [foods, sortOrder, filterLevel])


  return (
    <>
      <Table>
        <thead>
          <tr className="header">
            <th style={{ borderRadius: "10px 10px 0px 0px" }}>
              Foods
            </th>
          </tr>
        </thead>
        <tbody>
          {!!sortedFood
            ? sortedFood.map(el =>
              <tr key={el.id}>
                <td className={colorStyle[el.data.symptomColor]}>
                  {el.data.amFoods} <br />
                  {el.data.pmFoods}
                </td>
              </tr>
            )
            : <tr><td>loading...</td></tr>}
          <tr>
            <td style={{ backgroundColor: " rgb(8, 99, 78)", borderRadius: "0px 0px 10px 10px" }}></td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

BadFoods.propTypes = {
  foods: PropTypes.array.isRequired,
  sortOrder: PropTypes.string.isRequired,
  filterLevel: PropTypes.string.isRequired
}