import styled from "styled-components";

const Container = styled.div`
  padding: 1.5em;
  h1 {
    font-weight: 600;
    font-size: 18px;
    text-align: center;
    padding: 0.5em 0;
  }
`;
interface IerrorMsg{
    errorMsg : string
}

const ErrorView = ({errorMsg}:IerrorMsg) => {
  return (
    <Container>
      <h1>{errorMsg}</h1>
      <h1>Sorry. There is no chart data.</h1>
    </Container>
  );
};

export default ErrorView;
