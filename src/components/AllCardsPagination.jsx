import React from 'react'
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { styled } from 'styled-components';

const MainDiv = styled.div`
height: 75px;
width: 225px;
display: flex;
flex-direction: row;
alijustify-self: flex-end;
color: #FFFFFF;
background-color: #393C49;
align-items: center;
justify-content: center;
margin-top: 60px;
margin-bottom: 50px;
border-radius: 7px;

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

@media(max-width: 1024px) {
height: 60px;
width: 182px;
margin-top: 60px;
left: 406px;

& p {
font-size: 19.41px;
line-height: 22.3px;
font-weight: 700;

margin-left: 20px;
margin-right: 20px;

}

& button {
 
  font-size: 19.41px;

}
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