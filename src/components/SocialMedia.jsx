import youtube from '../imgs/youtube.svg';
import github from '../imgs/github.svg';
import linkedin from '../imgs/linkedin.svg';
import reddit from '../imgs/reddit.svg';
import instagram from '../imgs/instagram.svg';
import facebook from '../imgs/facebook.svg';
import { FaThreads } from 'react-icons/fa6';

export default function SocialMedia() {
  return (
    <div className='fixed bottom-[54px] right-[120px] flex gap-1'>
      <a
        href='https://www.youtube.com/@LanguageFlashcardsGE'
        target='_blank'
        rel='noreferrer'
      >
        <img src={youtube} alt='YouTube Channel' />
      </a>
      <a
        href='https://github.com/LanguageFlashcards'
        target='_blank'
        rel='noreferrer'
      >
        <img src={github} alt='GitHub Profile' />
      </a>
      <a
        href='https://www.linkedin.com/in/languageflashcards'
        target='_blank'
        rel='noreferrer'
      >
        <img src={linkedin} alt='Linkedin' />
      </a>
      <a
        href='https://www.reddit.com/user/LanguageFlashcards'
        target='_blank'
        rel='noreferrer'
      >
        <img src={reddit} alt='Reddit' />
      </a>
      <a
        href='https://www.instagram.com/languageflashcardsge'
        target='_blank'
        rel='noreferrer'
      >
        <img src={instagram} alt='IG' />
      </a>
      <a
        href='https://www.threads.net/@languageflashcardsge'
        target='_blank'
        rel='noreferrer'
      >
        <FaThreads
          style={{ color: '#04aa6d', top: '4px', position: 'relative' }}
        />
      </a>
      <a
        href='https://www.facebook.com/LanguageLearningWithFlashcards'
        target='_blank'
        rel='noreferrer'
      >
        <img src={facebook} alt='Facebook Page' />
      </a>
    </div>
  );
}
