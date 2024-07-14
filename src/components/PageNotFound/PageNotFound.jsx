import React from 'react';
import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";
import './PageNotFound.scss';


function PageNotFound() {
    const error = useRouteError();
    console.error(error);
  return (
    
    <div id="error-page">
      <h1>Oops!</h1>
      <p className='error-title'>Sorry, an unexpected error has occurred.</p>
      <p className='error-msg'>
        <i>{error?.statusText || error?.message}</i>
      </p>
	  <Link to="/" className='home-btn'>Go to home</Link>
    </div>
  )
}

export default PageNotFound