import React from "react";


export default function Card(props) {
  return (
    <div className='col-3 '>
      <img
        srcSet={props.card.Poster}
        alt="..." className="img-thumbnail m-3 mh-100" style={{height: '370px'}}/>
      <div className='ml-3 ml-0'>
        <div>Name: {props.card.Title}</div>
        <div>Year: {props.card.Year}</div>
        <div>imdbID: {props.card.imdbID}</div>
        <div>Type: {props.card.Type}</div>
      </div>
    </div>
  );
}