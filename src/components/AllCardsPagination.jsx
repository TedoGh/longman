import React from 'react'
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { styled } from 'styled-components';

const MainDiv = styled.div`
height: 75px;
width: 225px;
display: flex;
flex-direction: row;
color: #FFFFFF;
background-color: #393C49;
align-items: center;
justify-content: center;
margin-top: 100px;
position: absolute;
left: 550px;

& p {
font-size: 24px;
line-height: 27.6px;
font-weight: 700;

margin-left: 30px;
margin-right: 30px;
justify-self: flex-start;
}

& button {
 
  font-size: 24px;

  & :hover {
    color: #04AA6D;
  }
}

`
const AllCardsPagination = ({pages, currentPage, searchParams, setSearchParams , prevPage, nextPage}) => {
  return (
    <MainDiv>
     <button onClick={prevPage}><MdKeyboardDoubleArrowLeft /></button> 
      <p>{currentPage} / {pages}</p>
      <button onClick={nextPage}><MdKeyboardDoubleArrowRight /></button>
    </MainDiv>
  )
}

export default AllCardsPagination