import palette from '../../palette';
import styled from 'styled-components';

export default (props) => {
  const { primary, bg } = palette.lotusTheme;
  
  const InputContainer = styled.div`
    width: ${props.width},
    height: 20px;
  `;

  const Input = styled.input`
    width: 100%;
    height: 90%;
    border-bottom: 3px solid ${primary};
    color: ${bg};
  `;

  return (
    <InputContainer>
      <Input></Input>
    </InputContainer>
  )
}