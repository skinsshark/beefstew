import './App.css';
import ShowImage from './ShowImage';
import {useEffect, useRef, useState} from 'react';

const STEP = {
  1: {
    title: 'Prepare the meat',
    instructions: [
      'Cut the meat into 1-inch cubes',
      'Soak them in a pot of cold water for around 30 minutes',
      'Drain water but leave meat in pot'
    ]
  },
  2: {
    title: 'Cook meat',
    instructions: [
      'Fill pot with enough cold water to submerge the meat',
      'Place on high heat with lid off',
      'Wait until water comes to a boil and dirty meat foam forms. Give it a minute more',
      'Pour contents into a colander and rinse with WARM water'
    ]
  },
  3: {
    title: 'Add ingredients',
    instructions: [
      'do this',
      'then that'
    ]
  },
  4: {
    title: 'Simmer',
    instructions: [
      'do this',
      'then that'
    ]
  },
  5: {
    title: 'Serve',
    instructions: [
      'do this',
      'then that'
    ]
  },
}

const FILE_NAME = {
  B: 'beef-stew',
  S: 'beef-shank',
  I: 'daikon',
  A: 'star-anise',
  R: 'rock-sugar',
  P: 'peppercorn',
  G: 'ginger',
  C: 'scallions',
  W: 'cooking-wine',
  O: 'oyster-sauce',
  D: 'dark-soy-sauce',
  L: 'light-soy-sauce',
}

function App() {
  const [openStep, setOpenStep] = useState(1);
  const [showImage, setShowImage] = useState('');
  const timer = useRef(false);
  let img;

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      const { keyCode } = e;
      if (
        ((keyCode > 64 && keyCode < 91)
        || (keyCode > 96 && keyCode < 123))
        && FILE_NAME.hasOwnProperty(String.fromCharCode(keyCode))
      ) {
        setShowImage(FILE_NAME[String.fromCharCode(keyCode)])

        if (!timer.current) {
          timer.current = true;
          setTimeout(() => {
            setShowImage('')
            timer.current = false;
          }, 2000)
        }
      }
    });
  }, [])

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className="page-wrapper">
        {/* eslint-disable jsx-a11y/no-distracting-elements */}
        <marquee className="banner" scrollamount={5}>
          Use keyboard to hit italicized letters for images
        </marquee>
        <div className="main-content">
          <section className="title"><h1>炖牛肉</h1></section>
          <section className="ingredients">
            <h2><ShowImage>B</ShowImage>eef Stew with Daikon</h2>
            <h3>Ingredients List—10 servings</h3>
            <ul>
              <li>1 lb beef <ShowImage>s</ShowImage>hank</li>
              <li>1 da<ShowImage>i</ShowImage>kon</li>
              <li>1 star <ShowImage>a</ShowImage>nise</li>
              <li>2 <ShowImage>r</ShowImage>ock sugar pieces</li>
              <li>8 sichuan <ShowImage>p</ShowImage>eppercorns</li>
              <li>3 slices of <ShowImage>g</ShowImage>inger</li>
              <li>3 s<ShowImage>c</ShowImage>allions (the green parts)</li>
              <li>1/2 tbsp cooking <ShowImage>w</ShowImage>ine</li>
              <li>2 tbsp <ShowImage>o</ShowImage>yster sauce</li>
              <li>1 tbsp <ShowImage>d</ShowImage>ark soy sauce</li>
              <li>1/2 tbsp <ShowImage>l</ShowImage>ight soy sauce</li>
              <li>white pepper</li>
              <li>salt</li>
            </ul>
            {showImage !== '' && (
              <div className="previewImageWrapper">
                <img className="previewImage" alt={showImage}
                  src={require(`./img/${showImage}.png`).default}
                />
              </div>
            )}
          </section>
          <section className="steps">
            {[1,2,3,4,5].map((num, i) => {
              const isOpen = num === openStep;
              return (
                <div key={`step-${i}`}
                  className={`step step-${num}`}
                  style={isOpen ? {flexGrow: 1} : {}}
                >
                  <div className="step-header" onClick={() => setOpenStep(num)}>
                    <div><h4>STEP {num}: </h4><p>{STEP[num].title}</p></div>
                    <div className={`toggler ${isOpen ? 'hidden' : 'shown'}`} />
                  </div>
                  <ul className={`step-content ${isOpen ? 'shown' : 'hidden'}`}>
                    {STEP[num].instructions.map((instr, i) => {
                      return <li key={`instr-${i}`}>{instr}</li>
                    })}
                  </ul>
                </div>
              )
            })}
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
