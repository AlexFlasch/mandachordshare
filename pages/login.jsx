import styled from 'styled-components';
import palette from '../palette';
import TextInput from '../components/form-elements/text-input';

const PageContainer = styled.div`
  align-items: center;
  background-color: ${palette.lotusTheme.bg};
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;

const LoginContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 50vh;
  justify-content: center;
  width: 50vw;
`;

const SiteIconContainer = styled.div`
  width: 60%;
  height: 100%;
`;

const LoginFormContainer = styled.div`

`

export default () => (
  <PageContainer>
    <LoginContainer>
      <SiteIconContainer></SiteIconContainer>
      <LoginFormContainer>
        <TextInput></TextInput>
      </LoginFormContainer>
    </LoginContainer>
  </PageContainer>
)