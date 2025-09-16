import styled from "styled-components";

function TextInputWithLabel({ elementId, ref, onChange, labelText, value }) {

  const StyledLabel = styled.label`
    font-weight: bold;
    color: darkblue;
    padding: 4px;
  `;

  const StyledInput = styled.input`
    margin: 2px;
    border: 1px solid gray;
    border-radius: 3px;
  `;

  return (
    <>
      <StyledLabel htmlFor={elementId}>{labelText}</StyledLabel>
      <StyledInput
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default TextInputWithLabel;
