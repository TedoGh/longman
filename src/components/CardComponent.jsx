import React, {useState, useRef} from 'react'
import { styled } from 'styled-components'
import { SlOptions } from "react-icons/sl";
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import useLocalStorageCards from '../hooks/useLocalStorage';
import { Input } from 'postcss';
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import RecycleBin from '../assets/images/RecycleBin.png';
import Circle from '../assets/images/Circle.png'
import { useCardsDataContext } from '../pages/Context/CardsContext';

const CardDiv = styled.div`
position: relative;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 79px;
width: 267px;
border-radius: 5px;
background-color: ${({mainSide}) => mainSide ? '#04AA6D' : '#FFF4A3' };

& p {
  font-size: 24px;
  font-weight: 700;
  color: ${({mainSide}) => mainSide ? '#FFFFFF' : '#282A35'}
  
}

& button {
  width: 17.5px;
  height: 3.5px;
  position: absolute;
  top: 10px;
  right: 20px;
  color: ${({mainSide}) => mainSide ? '#FFFFFF' : '#282A35'}
}
`

const MenuDiv = styled.div`
background-color: #F9F9F9;
padding-top: 5px;
height: 106px;
width: 175px;
position: absolute;
right: -135px;
top: 30px;
display: flex;
flex-direction: column;
gap: 5px;
z-index: 40;


& button {
  font-size: 18px;
  font-weight: 400; 
  
}

& .editBtn {
position: relative;
color: #282A35;
left: 35px;
}

& .editIcon {
  position: absolute;
  right: 20px;
  top: 5px;

}

& .deleteBtn {
color: #E10000;
left: 35px;
top: 40px;
white-space: nowrap;
position: relative;
}

& .deleteIcon {
  position: absolute;
  right: 20px;
  top: 5px;
}

`

const EditDiv = styled.div`

position: relative;
& input {
  position: absolute;
  top: -40px;
  left: -134px;
  height: 40px;
  width: 265px;
  background-color: ${({mainSide}) => mainSide ? '#04AA6D' : '#FFF4A3' };
  color: ${({mainSide}) => mainSide ? '#FFFFFF' : '#282A35'};
  border: none;
  padding-left: 100px;
  font-size: 18px;
  letter-spacing: 2px;
 
}



& button {
position: absolute;
top: 5px;
font-size: 30px;
}

& div {
  position: relative;
}

& .cancelBtn {
position: absolute;
left: 40px;
}

& .editBtn {
  left: 40px;
}

`

const ModalDiv = styled.div`
  & .mainDiv {
  position: absolute;
  width: 678px;
  height: 400px;
  top: 300px;
  left: 381px;
  background-color: white;
  z-index: 40;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;;
  justify-items: center;
  align-items: center;
  padding-top: 50px;
  border-radius: 10px;

  & h2 {
    
    font-size: 30px;
    font-weight: 700;
    line-height: 34px;
    letter-spacing: 0em;
    text-align: left;
    color: #282A35;
    padding-top: 18px;
    
  }

  & p {
font-size: 24px;
font-weight: 700;
line-height: 28px;
letter-spacing: 0em;
text-align: left;
color: #8C8C8C;
padding-top: 25px;

  }

  & .buttonsDiv {
    padding-top: 28px;
    display: flex;
    flex-direction: row;
    gap: 28px;

    & button {
font-family: Helvetica;
font-size: 18px;
font-weight: 400;
line-height: 21px;
letter-spacing: 0em;
text-align: left;
width: 294px;
height: 47px;
border-radius: 30px;
text-align: center;
    }

    & .back {

color: #FFFFFF;
background-color: #ACACAC;

 }

   & .delete {
color: #FFFFFF;
background-color: #E10000;

    }

  }

    & .Circle {
      width: 135px;
      height: 135px;
    }

    & .RecycleBin {
      position: absolute;
      top: 83px;
      
    }

  }

  & .overlay {
  width: 100vw; 
  height: 100vh; 
  position: fixed;
  top: 0;
  left: 0;
  z-index: 12;
  backdrop-filter: blur(2px); 
  }
`;

const CardComponent = ({CardObject, onDelete, language}) => {
  const {t} = useTranslation();
  const[side, setSide] = useState(language);
  const [mainSide, setMainSide] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editSession, setEditSession] = useState(false);
  const [inputValue, setInputValue] = useState(side === 'ENG' ? CardObject.english : CardObject.georgian);
  const [card, setCard] = useState(CardObject);
  const [deletePermission, setDeletePermission] = useState(false);
  const menuBtnRef = useRef(null);
  const menuDivRef = useRef(null);
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const {deleteCard,editCard} = useLocalStorageCards("languageCards", []);
  const {cards, updateCards, editCardContext} = useCardsDataContext();

  
  
  const handleRotate = (e) => {
 if(!menuBtnRef.current.contains(e.target) && !menuDivRef.current?.contains(e.target) && !editSession) {  if(side === 'ENG') {
      setSide('GEO')
    } else {
      setSide('ENG')
    }
    setMainSide(prev => !prev)
  }}

  const handleClickMenu = (e) => {
    if(menuBtnRef.current.contains(e.target)) setMenuOpen(prev => !prev)
  }

  const handleClickOutsideMenu = (e) => {
    if(!menuDivRef.current.contains(e.target)) setMenuOpen(false);
  }

  const handleClickOutsideModal = (e) => {
    if(!modalRef.current.contains(e.target)) setDeletePermission(false);
  }

  const handleEditClick = () => {
    setEditSession(true);
    setMenuOpen(false);
    
  }

  const handleInputChange = () => {
    setInputValue(inputRef.current.value)
  }

  const handleFinishEditing = () => {
    setCard((prevCard) => {
      const updatedCard = side === 'GEO'
        ? { ...prevCard, georgian: inputValue }
        : { ...prevCard, english: inputValue };
      editCardContext(CardObject, updatedCard);
      return updatedCard;
    });
    setEditSession(false);
  };

  const cancelEditing = () => {
    setEditSession(false)
  }

  const handleClickOnDelete = () => {
    setMenuOpen(false);
    setDeletePermission(true);
  }

  useEffect(() => {
    setInputValue(side === 'ENG' ? card.english : card.georgian)
  }, [side])

  useEffect(() => {
    if(menuOpen) {
      document.addEventListener('mousedown', handleClickOutsideMenu)
    }
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMenu)
    }
  }, [menuOpen])

 

  const handleDelete = () => {
    onDelete()
    setDeletePermission(false);
    };
  
  
  useEffect(() => {
    if (editSession && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editSession]);
  
  useEffect(() => {
    if(deletePermission) {
    document.addEventListener('mousedown', handleClickOutsideModal)}
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModal)
    }
  }, [deletePermission])

  useEffect(() => {setSide(language)}, [language
  ])

  
  return (
    <div>
    <CardDiv onClick={(e) => handleRotate(e)} mainSide={mainSide}  >
      <button onClick={(e)=> handleClickMenu(e)} ref={menuBtnRef} disabled={editSession}><SlOptions /></button>
      {menuOpen && <MenuDiv ref={menuDivRef} >
        <button onClick={handleEditClick}  className='editBtn'><FiEdit2 className='editIcon' />{t('edit')} </button>
        <button className='deleteBtn' onClick={handleClickOnDelete}> <RiDeleteBinLine className='deleteIcon'/> {t('deleteCard')}</button>
      </MenuDiv>}
      {!editSession && <p>{side === 'ENG' ? card.english : card.georgian}</p>}
      {editSession && <EditDiv mainSide={mainSide}>
        <input ref={inputRef} value={inputValue} onChange = {handleInputChange} />
        <div>
        <button className='cancelBtn' onClick={cancelEditing}><MdCancel /></button>
        <button className='checkBtn' onClick = {handleFinishEditing}><FaCheck /></button>
        </div>
        </EditDiv>}
    </CardDiv>
    
    {deletePermission && <ModalDiv >
      
      <div className='overlay'></div>
      <div className='mainDiv' ref={modalRef}>
      <img src={RecycleBin} className='RecycleBin' alt="" />
      <img src={Circle} className='Circle' alt="" />
      <h2>{t('deleteCardText')}</h2>
      <p>{t('deleteCautionText')}</p>
      <div className='buttonsDiv'>
      <button className='back' onClick={() => setDeletePermission(false)}>{t('backText')}</button>
      <button className='delete' onClick={handleDelete}>{t('delete')}</button>
      </div>
      </div>
      </ ModalDiv > }
      
      </div>
  )

}

export default CardComponent