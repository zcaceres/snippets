import React, { ChangeEvent } from "react";
import styled, { css } from "styled-components";

interface LabeledInputProps {
  isValid: boolean;
}

const StyledLabeledInput = styled.div.attrs({
  className: "LabeledInput",
})<LabeledInputProps>`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0.75rem;

  label {
    padding: 0.25rem 0;
    margin-right: 1rem;
    white-space: nowrap;
    height: 1rem;
  }

  input {
    flex: 1;
    font-size: 1rem;
    border: none;
    background: transparent;
    color: #fff;

    padding: 0.25rem;

    height: 1rem;

    ${({ isValid }) =>
      !isValid &&
      css`
        /* Prevents border from shifting the div's height */
        height: calc(1rem - 1px);
        border-bottom: 1px solid red;
      `}

    :focus {
      outline-color: var(--medium-purple);
    }

    ::placeholder {
      color: #fff;
      opacity: 0.4;
    }
  }
`;

export default function LabeledInput({
  onChange,
  onBlur,
  label,
  name,
  type = "text",
  value,
  maxLength,
  min,
  max,
  placeholder,
  // Treat all inputs as valid, unless we choose to control them from the outside
  isValid = true,
  required = false,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => any;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => any;
  label: string;
  name: string;
  type?: string;
  value: string | number | undefined;
  maxLength?: number;
  min?: number;
  max?: number;
  placeholder?: string;
  isValid?: boolean;
  required?: boolean;
}) {
  return (
    <StyledLabeledInput isValid={isValid}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        min={min}
        max={max}
        value={value}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
      />
    </StyledLabeledInput>
  );
}
