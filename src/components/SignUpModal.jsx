import React, {useState, useEffect, useRef} from 'react'
import { styled } from 'styled-components'
import LogoMain from '../assets/images/LogoMain.png'
import { useTranslation } from 'react-i18next'




const P = styled.p`
font-family: 'Helvetica', sans-serif;
  font-weight: 700;
  font-size: 25px;
  line-height: 28.75px;
`

const ErrorText = styled.p`
  font-family: 'Helvetica', sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 17.25px;
  color: #E10000;
  padding-top: 5px
  
  
`

const SignUpBtn = styled.button`
background-color: #04AA6D;
width: 389px;
height: 45.15px;
color: white;
border-radius: 22.55px;
margin-top: 10px;
`

const TextDiv = styled.div`



& p {
  color: #ACACAC;
  font-weight: 400;
  font-size: 16.59px;

}

& button {
  color: #04AA6D;
  border: none;
  background: none;
  font-size: 16.59px;
}

`



const Input = styled.input`
border: ${({error}) => error ? '1px solid red' : '' };
`

const Img = styled.img`
margin-top: 20px;
margin-bottom: 10px;
justify-self: flex-start;
`

const SignUpModal = ({setAuthorizationModal, authorizationModal}) => {
  const {t} = useTranslation();
  const modalRef = useRef(null)
  const [validationError, setValidationError] = useState({nameInput: false, surnameInput: false, emailInput: false, passwordInput: false})

  const [formData, setFormData] = useState({
    Name: '',
    Surname: '',
    Email: '',
    Password: ''
  }); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError({ nameInput: false, surnameInput: false });

    if (
      formData.Email.trim().length < 1
    ) {
      setValidationError((prev) => ({...prev, nameInput: true}))
     
    }

    if(
      formData.Password.trim().length < 1
    ) {
      setValidationError((prev) => ({...prev, surnameInput: true}))
      
    } if( formData.georgian.trim().length >= 1 && formData.english.trim().length  >= 1) {

    try {
      const response = await fetch(`${API}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchCards();
        setFormData({
         Email: '',
         Password: ''
        });
      } else {
        console.error("Failed to add card");
      }
    } catch (error) {
      console.error(error);
    }
  }
  };

  const handleClickOutside = (e) => {
    if(modalRef.current && !modalRef.current.contains(e.target)) {
      setAuthorizationModal('')
      console.log('outside')
    }

    console.log('inside')
  }
  
  useEffect(() => {
    if(authorizationModal === 'signUp') {
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }

  }, [authorizationModal])

  return (
    
    <div>
      <div className='w-screen h-screen fixed top-0 left-0 z-40 backdrop-filter backdrop-blur-sm'></div>
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50  rounded-lg overflow-hidden'>
        <form className=  'w-[455px] h-[538px] bg-[white] flex flex-col justify-start items-center gap-5 rounded-lg' onSubmit={handleSubmit} ref={modalRef}>
        <Img src={LogoMain} alt="" />
      <div className='flex flex-row gap-3'>
        <input className='rounded-lg border-bgPlaceBorder border-solid border placeholder:text-bgPlaceBorder focus:outline-none focus:border-green w-[187px] h-[47px] p-2' type="text" placeholder={t('firstName')} name='Name' value={formData.Name} />
        <input className='rounded-lg border-bgPlaceBorder border-solid border placeholder:text-bgPlaceBorder focus:outline-none focus:border-green w-[187px] h-[47px] p-2' type="text" placeholder={t('surname')} name='Surname' value={formData.Surname} />
      </div>
      <input className='rounded-lg border-bgPlaceBorder border-solid border placeholder:text-bgPlaceBorder focus:outline-none focus:border-green w-[388px] h-[47px] p-2' type="text" placeholder={t('mail')} name='Email' value={formData.Email} />
      <input className='rounded-lg border-bgPlaceBorder border-solid border placeholder:text-bgPlaceBorder focus:outline-none focus:border-green w-[388px] h-[47px] p-2' type="text" placeholder={t('password')} name='Password' value={formData.Password} />
      <SignUpBtn>{t('signUp')}</SignUpBtn>
      <TextDiv>
        <p>{t('registeredText')} <span><button>{t('login')}</button></span></p>
        
      </TextDiv>
      <TextDiv>
        <p><span className='ml-4' >{t('agreement')}</span> <br /> <span><button>{t('terms')}</button></span> <span>{t('and')}</span> <span><button>{t('conditions')}</button></span></p>
      </TextDiv>
      </form>
      </div>
    </div>
  )
}

export default SignUpModal