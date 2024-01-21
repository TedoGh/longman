import React from 'react'
import { styled } from 'styled-components'
import CardComponent from './CardComponent';

const CardColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  @media (max-width: 1024px) {
    gap: 30px;
  }
`;

const CardsDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-self: ${(props) => {
    return props.cardsOnCurrentPage?.length > 2 ? "center" : "flex-start";
  }};
  justify-content: flex-start;
  gap: 160px;
  margin-top: 43px;
  margin-left: 100px;
  margin-right: 100px;

  @media (max-width: 1241px) {
    gap: 100px;
  }

  @media (max-width: 1241px) {
    gap: 90px;
  }

  @media (max-width: 1124px) {
    gap: 80px;
  }

  @media (max-width: 1077px) {
    gap: 70px;
  }

  @media (max-width: 1024px) {
    gap: 200px;
    margin-top: 60px;
    align-self: center;
  }

  @media (max-width: 1000px) {
    gap: 150px;
  }

  @media (max-width: 1000px) {
    gap: 120px;
  }

  @media (max-width: 885px) {
    gap: 90px;
  }

  @media (max-width: 845px) {
    gap: 70px;
  }
  @media (max-width: 767px) {
    align-self: center;
  }
`;

const Cards = ({cardsOnCurrentPage, handleDeleteCard, language}) => {
  return (
    <CardsDiv cardsOnCurrentPage={cardsOnCurrentPage}>
          {cardsOnCurrentPage.map((innerArray, index) => (
            <CardColumnDiv key={index}>
              {innerArray.map((card) => (
                <CardComponent
                  index={index}
                  key={card.id}
                  CardObject={card}
                  onDelete={() => handleDeleteCard(card)}
                  language={language}
                />
              ))}
            </CardColumnDiv>
          ))}
        </CardsDiv>
  )
}

export default Cards