import './App.css';
import {useState} from 'react';

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
      'do this',
      'then that'
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

function App() {
  const [openStep, setOpenStep] = useState(1);

  return (
    <div className="page-wrapper">
      <div className="banner" />
      <div className="main-content">
        <section className="title"><h1>炖牛肉</h1></section>
        <section className="ingredients">
          <h2>Beef Stew with Daikon</h2>
        </section>
        <section className="steps">
          {[1,2,3,4,5].map((num, i) => {
            const isOpen = num === openStep;
            return (
              <div key={`step-${i}`}
                className={`step step-${num}`}
                style={isOpen ? {flexGrow: 1} : {}}
              >
                <div className="step-header">
                  <div><h3>STEP {num}: </h3><p>{STEP[num].title}</p></div>
                  <div className={`toggler ${isOpen ? 'hidden' : 'shown'}`}
                    onClick={() => setOpenStep(num)}
                  />
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
  );
}

export default App;
