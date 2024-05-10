import styled from 'styled-components';

export const FormContainer = styled.div`
  display: grid;
  row-gap: 10px;

  * > label {
    font-size: 0.75em;
  }
`;

export const CopyButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 3px;
  right: 5px;
  z-index: 2;
  
  &.disabled {
    cursor: default;
    color: #757ba9;
    pointer-events: none;
  }

  &:hover:not(.disabled) {
    color: #005c8f;
  }

  svg {
    width: 18px;
    opacity: 1;
    transform: translate(0, 0);
  }

  &.copying {
    svg {
      color: #005c8f;
      animation: copying 0.5s linear;
    }
  }

  @keyframes copying {
    to {
      opacity: 0;
      transform: translate(0, -5px);
    }
  }
  
`

export const Button = styled.button`
  width: 100%;
  border-radius: 10px;
  font-size: 1em;
  font-weight: 600;
  padding: 10px;
  transition: background .3s ease;
  background: #005c8f;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: #004e7a;
  }
`

export const RangeLabel = styled.label`
  display: block;
`

export const RangeInput = styled.input`
  width: 100%;
`

export const FormGroup = styled.div`
  display: flex;
  align-items: center;
`

export const PasswordInput = styled.input`
  width: 100%;
  padding: 5px 24px 5px 5px;
`

export const PasswordInputContainer = styled.div`
  position: relative;
  max-width: 100%;
`