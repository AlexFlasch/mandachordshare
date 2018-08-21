import palette from '../../palette';
import styled from 'styled-components';

export default (props) => {
  const { primary, bg } = palette.lotusTheme;
  
  const InputContainer = styled.div`
    width: ${props.width},
    height: 20px;
  `;

  const Input = styled.input`
    background: none;
    border: none;
    border-bottom: 3px solid ${primary};
    color: ${bg};
    height: 90%;
    width: 100%;
  `;

  return (
    <InputContainer>
      <Input></Input>
    </InputContainer>
  )
}