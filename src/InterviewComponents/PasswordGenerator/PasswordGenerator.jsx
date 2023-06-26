import { useState } from 'react';
import './PasswordStyles.css';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [strengthVal, setStrengthVal] = useState(4);
  const [passwordChecklist, setPasswordChecklist] = useState([
    {
      type: 'include capital',
      state: false,
    },
    {
      type: 'include lowercase',
      state: false,
    },
    {
      type: 'include numbers',
      state: false,
    },
  ]);
  const updateChecklist = (type, state) => {
    let oldChecklist = [...passwordChecklist].map((item) => {
      if (item.type === type) {
        return {
          ...item,
          state: !state,
        };
      } else {
        return item;
      }
    });
    setPasswordChecklist(oldChecklist);
  };

  // main password generator function that passes on the required parameters to generate the password
  const generatePassword = (checklistData, strengthVal) => {
    let finalPassword = '';
    let checklistDataTypes = checklistData
      .map((item) => {
        if (item.state) {
          return item.type;
        } else {
          return;
        }
      })
      .filter((item) => item !== undefined);

    checklistDataTypes.map((item) => {
      switch (item) {
        case 'include capital':
          finalPassword += 'abcdefghijkl?nopqrstuvwxy'.toUpperCase();
          break;
        case 'include lowercase':
          finalPassword += 'abcdefghijklnopqrstuvwxy';
          break;
        case 'include numbers':
          finalPassword += '0987654321';
          break;
      }
    });
    let strengthParamsCheck = checklistData.map((item) => item.state === true);
    setPassword(getPassword(finalPassword, strengthVal, strengthParamsCheck));
  };

  // main function to generate password
  const getPassword = (password, length, strengthParams) => {
    let cutPassword = '';
    for (let index = 0; index < length; index++) {
      const passwordIndex = Math.floor(Math.random() * password.length);
      cutPassword += password[passwordIndex];
    }
    // deciding strength params
    let counter = 0;
    strengthParams.map((item) => {
      if (item === true) {
        counter++;
      }
    });
    if (counter === 2) {
      setPasswordStrength('Strong');
    }
    return cutPassword;
  };

  return (
    <div className="password-container">
      <div className="password-block">
        <div className="password-content">
          <div className="password-headers">
            <span className="password">{password}</span>
            <span>{passwordStrength}</span>
          </div>

          <div className="password-strength">
            <input
              type="range"
              min="0"
              max="20"
              onChange={(e) => setStrengthVal(e.target.value)}
            />
            <span>{strengthVal}</span>
          </div>

          <div className="password-checklist">
            {passwordChecklist.map((checklist, index) => {
              const { type, state } = checklist;
              return (
                // eslint-disable-next-line react/jsx-key
                <div
                  key={index}
                  style={{ display: 'flex', marginRight: '2em' }}
                >
                  <input
                    type="checkbox"
                    name={type}
                    value={type}
                    checked={state}
                    onChange={() => updateChecklist(type, state)}
                  />
                  <span style={{ fontSize: '1.05em' }}>{type}</span>
                </div>
              );
            })}
          </div>

          <button
            className="generate-button"
            onClick={() => generatePassword(passwordChecklist, strengthVal)}
          >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
