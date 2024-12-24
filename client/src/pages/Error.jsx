import React from 'react'
import { useRouteError } from 'react-router-dom'
import img from "../assets/images/not-found.svg"
import Wrapper from "../assets/wrappers/ErrorPage"
import {Link} from "react-router-dom"

const Error = () => {

  const error = useRouteError()

  if (error) {
    console.log(error)
  }

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found"></img>
          <h3>Page Not Found</h3>
          <p>We could not find the page you are looking for</p>
          <Link to="/dashboard">Back Home</Link>
        </div>
      </Wrapper>
    )
  } return (
    <Wrapper>
      <div>
        <h3>Something Whent Wrong</h3>
      </div>
    </Wrapper>
  )

  
}

export default Error