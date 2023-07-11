import { useState } from 'react';
import './StepperStyles.css';
import { AiOutlineCheckCircle, AiFillCheckCircle } from 'react-icons/ai';

const Stepper = () => {
  const [stepperLabel, setStepperLabel] = useState([
    {
      id: 0,
      label: 'Step 1',
      active: true,
    },
    {
      id: 1,
      label: 'Step 2',
      active: false,
    },
    {
      id: 2,
      label: 'Step 3',
      active: false,
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState([
    {
      id: 0,
      data: `Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque quis molestie, facilisis metus porta mollis fermentum ornare pulvinar ante himenaeos erat sollicitudin, fringilla ultrices accumsan 
      praesent placerat commodo purus cras diam. Fringilla vulputate sociis lobortis sem non est felis elementum, 
      egestas aliquet ultricies orci curae ante dictum dis praesent, vestibulum donec sagittis nascetur convallis 
      natoque purus. Taciti pretium nostra tristique, lobortis dictum facilisis cursus, proin morbi.`,
    },
    {
      id: 1,
      data: `Aliquam per taciti pellentesque pharetra eleifend porttitor nec in dictum, 
      tortor primis senectus morbi rutrum arcu himenaeos. Congue id sapien hac lacinia mollis, odio sed rhoncus pulvinar aliquet non,`,
    },
    {
      id: 2,
      data: `cras diam. Fringilla vulputate sociis lobortis sem non est felis elementum, 
        egestas aliquet ultricies orci curae ante dictum dis praesent, vestibulum donec sagittis nascetur convallis 
        natoque purus. Taciti pretium nostra tristique, lobortis dictum facilisis cursus, proin morbi.`,
    },
  ]);
  const [showAddStepInput, setShowAddStepInput] = useState(false);
  const [newStepInput, setNewStepInput] = useState('');

  // function to update steps
  const switchSteps = (currentStep) => {
    const dataId = data[currentStep].id;
    const updateStepper = [...stepperLabel].map((step) => {
      if (step.id === dataId) {
        return {
          ...step,
          active: true,
        };
      } else {
        return {
          ...step,
          active: false,
        };
      }
    });
    setStepperLabel(updateStepper);
  };

  const nextStep = () => {
    let currentStep = currentIndex;
    if (currentStep === data.length - 1) {
      return;
    }
    if (currentStep < data.length) {
      currentStep++;
    }
    setCurrentIndex(currentStep);
    switchSteps(currentStep);
  };

  const prevStep = () => {
    let currentStep = currentIndex;
    if (currentStep === 0) {
      return;
    }
    if (currentStep > 0) {
      currentStep--;
    }
    setCurrentIndex(currentStep);
    switchSteps(currentStep);
  };

  // direct control when clicking the label
  const controlLabelStep = (labelId) => {
    setCurrentIndex(labelId);
    switchSteps(labelId);
  };

  // adding a new step
  const addNewStep = () => {
    let prevShow = showAddStepInput;
    setShowAddStepInput(!prevShow);
  };
  // adding a new step;
  const add = () => {
    if (newStepInput === '' || undefined) {
      throw new Error('There is no input');
    }
    let commonNewid = data[data.length - 1].id + 1;
    if (newStepInput) {
      const newData = {
        ...data[data.length - 1],
        id: commonNewid,
        data: newStepInput,
      };
      setData((prevData) => [...prevData, newData]);
      setStepperLabel((prevStep) => [
        ...prevStep,
        {
          ...stepperLabel[setStepperLabel.length - 1],
          id: commonNewid,
          label: `Step ${commonNewid + 1}`,
          active: false,
        },
      ]);
      setNewStepInput('');
    }
  };

  return (
    <div className="stepper-container">
      <h2 style={{ padding: '1em' }}>Stepper</h2>
      <div className="stepper-content">
        <div className="stepper">
          <ul>
            {stepperLabel.map((step) => {
              const { label, id, active } = step;
              return (
                <li
                  key={id}
                  className={active ? 'step highlight' : 'step'}
                  onClick={() => controlLabelStep(id)}
                >
                  <span>{label}</span>
                  <span>
                    {!active ? <AiOutlineCheckCircle /> : <AiFillCheckCircle />}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="content">
          <div className="content-para">{data[currentIndex].data}</div>
          <div className="step-buttons">
            {currentIndex > 0 && (
              <button onClick={() => prevStep()}>Previous</button>
            )}
            {currentIndex < data.length - 1 && (
              <button onClick={() => nextStep()}>Next</button>
            )}
            <button onClick={() => addNewStep()}>Add New Step</button>
            {showAddStepInput && (
              <textarea
                value={newStepInput}
                onChange={(e) => setNewStepInput(e.target.value)}
                placeholder="Enter some stuff"
              />
            )}
            {showAddStepInput && <button onClick={() => add()}>Add</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
