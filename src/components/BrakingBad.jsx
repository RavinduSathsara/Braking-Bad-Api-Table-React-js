import React from "react";
import { useState, useEffect } from "react";

const BrakingBad = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://www.breakingbadapi.com/api/characters")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Nick name</th>
            <th>job</th>
            <th>Other</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.nickname}</td>
              <td>{item.occupation}</td>
              <td>{item.portrayed}</td>
              <td>
                <button className="btn btn-danger btn-sm">Delete</button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      //   <ul>
      //     {items.map((item) => (
      //       <li key={item.name}>{item.name}</li>
      //     ))}
      //   </ul>
    );
  }
};

export default BrakingBad;
