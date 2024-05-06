import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "./navigate";

const AddProduct = (props) => {
  const [list, setList] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:5000")
  //     .then((e) => {
  //       console.log(e);
  //       return e.json();
  //     })
  //     .then((result) => {
  //       console.log(result);
  //       setList(result);
  //     });
  // }, []);

  // const renderList = (
  //   <ul>
  //     {list.map((e) => {
  //       return <li key={e}>{e}</li>;
  //     })}
  //   </ul>
  // );

  return (
    <Fragment>
      <Navigation path={props.path}></Navigation>
    </Fragment>
  );
};

export default AddProduct;
