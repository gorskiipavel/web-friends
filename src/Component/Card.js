import React from "react";


export default function Card(props) {
  return (

    <div className='col-xl-3 col-md-4 col-sm-6 col-12'>
      <img
        srcSet={props.card.Poster}
        alt="..." className="img-thumbnail m-3 mh-100 mw-100" style={{height: '367px'}} />
      <div className='col'>
        <div>Name: {props.card.Title}</div>
        <div>Year: {props.card.Year}</div>
        <div>imdbID: {props.card.imdbID}</div>
        <div>Type: {props.card.Type}</div>
      </div>
    </div>

  );
}