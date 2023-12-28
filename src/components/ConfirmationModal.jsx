import React from 'react'
import AlertCircle from '../../src/assets/images/AlertCircle.png'
import AlertIcon from '../../src/assets/images/AlertIcon.png'
import { styled } from 'styled-components'
import { useTranslation } from 'react-i18next'
const MainDiv = styled.div`
width: 678px;
height: 456px;
border-radius: 10px;
background-color: #FFFFFF;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
  border-radius: 10px;
  overflow: hidden;

& h2 {
font-family: Helvetica;
font-size: 30px;
font-weight: 700;
line-height: 34px;
letter-spacing: 0em;
text-align: left;
color: #282A35;
margin-top: 19px;
margin-bottom: 23px;


}
 & p {
  font-family: Helvetica;
font-size: 24px;
font-weight: 700;
line-height: 28px;
letter-spacing: 0em;
text-align: center;
 color: #8C8C8C;
 margin-bottom: 38px;
 }

 & img {

 }
 & .circle {
  width: 135px;
  height: 135px;
  margin-top: 59px;
 }
 & .icon {
  position: absolute;
  top: 90px;
  height: 70px;
  width: 70px;
  
 }
 & div {
  display: flex;
  flex-direction: row;
  gap: 26px;

  & button {
    width: 294px;
    height: 56px;
    border-radius: 30px;
    font-family: Helvetica;
    border: 1px solid #04AA6D;
font-size: 18px;
font-weight: 400;
line-height: 21px;
letter-spacing: 0em;
text-align: center;

  }
  & .continue {
      color: #04AA6D;
      background-color:#FFFFFF ;
  }

  & .leave {
    color: #FFFFFF;
    background-color: #04AA6D ;
  }
 }
`
const ConfirmationModal = ({setActive, setExitModalOpen}) => {
  const {t} = useTranslation();
  const handleContinue = () => {
    setExitModalOpen(false)
  }

  const handleFinish = () => {
    setActive(false)
  }
  return (
    <MainDiv>
    
      <img className='circle' src={AlertCircle} alt="" />
      <img className='icon' src={AlertIcon} alt="" />
      <h2>{t('cancelTrainingPromptText')}</h2>
      <p>{t('resultsNotSavedText')}</p>
      <div>
      <button onClick={handleContinue} className='continue'>{t('continue')}</button>
      <button onClick={handleFinish} className='leave'>{t('leave')}</button>
      </div>
    </MainDiv>
  )
}

export default ConfirmationModal