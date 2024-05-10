import React, { useState } from 'react';
import clsx from 'clsx';
import { Copy } from 'lucide-react';
import * as Styled from './styled';

const lowercaseCharsets = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseCharsets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbersCharsets = '0123456789';
const symbolsCharsets = '!@#$%^&*()_+-=[]{};:\'\",./<>?|';

export const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(10);
  const [passwordOptions, setPasswordOptions] = useState({
    lowercase: true,
    uppercase: false,
    numbers: false,
    symbols: false
  })
  const [isCopyPassword, setIsCopyPassword] = useState(false)
  
  const generatePassword = () => {
    const characterSets = [];
    const { lowercase, uppercase, numbers, symbols } = passwordOptions
    if (lowercase) characterSets.push(lowercaseCharsets);
    if (uppercase) characterSets.push(uppercaseCharsets);
    if (numbers) characterSets.push(numbersCharsets);
    if (symbols) characterSets.push(symbolsCharsets);

    let newPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomSetIndex = Math.floor(Math.random() * characterSets.length);
      const randomCharIndex = Math.floor(Math.random() * characterSets[randomSetIndex].length);
      newPassword += characterSets[randomSetIndex][randomCharIndex];
    }

    setPassword(newPassword);
  }

  const CopyToClipboard = () => {
    setIsCopyPassword(true);
    navigator.clipboard.writeText(password);

    setTimeout(() => {
      setIsCopyPassword(false);
    }, 600)
  }

  const handlePasswordOptions = (event) => {
    const option = event.target.name;
    const lengthOfCheckedOptions = Object.values(passwordOptions).filter(option => !!option).length;
    if (lengthOfCheckedOptions === 1 && !!passwordOptions[option]) {
      return;
    }

    setPasswordOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }))
  }
  
  return (
    <Styled.FormContainer>
      <Styled.PasswordInputContainer>
        <Styled.PasswordInput 
          readOnly
          disabled={!password.length}
          type="text"
          id="password"
          defaultValue={password}
          data-testid="password-input"
        />
        <Styled.CopyButton 
          onClick={CopyToClipboard}
          className={clsx(
            !password.length && 'disabled',
            isCopyPassword && 'copying'
          )}
          data-testid="copy-button"
        >
          <Copy />
        </Styled.CopyButton>
      </Styled.PasswordInputContainer>
      <div>
        <Styled.RangeLabel htmlFor='range'>Character length {passwordLength}</Styled.RangeLabel>
        <Styled.RangeInput 
          type="range"
          id="range"
          name="range"
          min="1"
          max="20"
          defaultValue="10"
          onChange={e => setPasswordLength(e.target.value)}
          data-testid="range-input"
        />
      </div>
      <div>
        <Styled.FormGroup>
          <input
            type="checkbox"
            id="lowercase"
            checked={passwordOptions.lowercase}
            onChange={handlePasswordOptions}
            name="lowercase"
            data-testid="lowercase-input"
          />
          <label htmlFor="lowercase">Include lowercase</label>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <input
            type="checkbox"
            id="uppercase"
            checked={passwordOptions.uppercase}
            onChange={handlePasswordOptions}
            name="uppercase"
            data-testid="uppercase-input"
          />
          <label htmlFor="uppercase">Include uppercase</label>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <input
            type="checkbox"
            id="numbers"
            checked={passwordOptions.numbers}
            onChange={handlePasswordOptions}
            name="numbers"
            data-testid="numbers-input"
          />
          <label htmlFor="numbers">Include numbers</label>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <input
            type="checkbox"
            id="symbols"
            checked={passwordOptions.symbols}
            onChange={handlePasswordOptions}
            name="symbols"
            data-testid="symbols-input"
          />
          <label htmlFor="symbols">Include symbols</label>
        </Styled.FormGroup>
      </div>
      <Styled.Button data-testid="generate-button" onClick={generatePassword}>Generate</Styled.Button>
    </Styled.FormContainer>
  )
}