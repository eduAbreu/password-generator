import { render, screen, fireEvent } from "@testing-library/react";
import { PasswordGenerator } from "./PasswordGenerator";

const writeText = jest.fn()

Object.assign(navigator, {
  clipboard: {
    writeText,
  },
});

describe("PasswordGenerator", () => {
  test('PasswordGenerator renders with initial state', () => {
    render(<PasswordGenerator />);
  
    expect(screen.getByTestId('password-input')).toHaveValue('');
    expect(screen.getByText('Character length 10')).toBeInTheDocument();
    expect(screen.getByTestId('lowercase-input')).toBeChecked();
    expect(screen.getByTestId('uppercase-input')).not.toBeChecked();
    expect(screen.getByTestId('numbers-input')).not.toBeChecked();
    expect(screen.getByTestId('symbols-input')).not.toBeChecked();
    expect(screen.getByText('Generate')).toBeInTheDocument();
    expect(screen.getByTestId('copy-button')).toHaveClass('disabled');
  });

  test('Password is generated on button click', () => {
    render(<PasswordGenerator />);
  
    const generateButton = screen.getByTestId('generate-button');
    fireEvent.click(generateButton);
  
    expect(screen.getByTestId('password-input').value).not.toBe('');
    expect(screen.getByText('Generate')).toBeInTheDocument(); // Button remains visible
    expect(screen.getByTestId('copy-button')).not.toHaveClass('disabled');
  });

  test('Password length updates on range input change', () => {
    render(<PasswordGenerator />);
  
    const rangeInput = screen.getByTestId('range-input');
    fireEvent.change(rangeInput, { target: { value: 15 } });
  
    expect(rangeInput).toHaveValue('15');
    expect(screen.getByText('Character length 15')).toBeInTheDocument();
  });

  test('Disallows unchecking last selected option', () => {
    render(<PasswordGenerator />);
  
    const lowercaseCheckbox = screen.getByTestId('lowercase-input');
    fireEvent.click(lowercaseCheckbox);
  
    expect(lowercaseCheckbox).toBeChecked(); // Should stay checked
  });
  
  test('Password options update on checkbox change', () => {
    render(<PasswordGenerator />);
  
    const uppercaseCheckbox = screen.getByTestId('uppercase-input');
    fireEvent.click(uppercaseCheckbox);
    const numbersCheckbox = screen.getByTestId('numbers-input');
    fireEvent.click(numbersCheckbox);
    const symbolsCheckbox = screen.getByTestId('symbols-input');
    fireEvent.click(symbolsCheckbox);
  
    expect(uppercaseCheckbox).toBeChecked(); 
    expect(numbersCheckbox).toBeChecked(); 
    expect(symbolsCheckbox).toBeChecked(); 
  });

  test('Password is copied to clipboard on copy button click', () => {
    navigator.clipboard.writeText.mockResolvedValue(undefined)
    render(<PasswordGenerator />);
  
    const generateButton = screen.getByTestId('generate-button');
    fireEvent.click(generateButton);
  
    const passwordValue = screen.getByTestId('password-input').value;

    const copyButton = screen.getByTestId('copy-button');
  
    fireEvent.click(copyButton);
  
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(passwordValue);
  });
  
});