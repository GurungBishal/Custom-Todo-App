import styled from "styled-components";

import spinner from "../assets/images/spinner.gif";

const Spinner = () => (
  <SpinnerWrapper>
    <img src={spinner} alt="loading" />
  </SpinnerWrapper>
);

export default Spinner;

const SpinnerWrapper = styled.div`
  height: 55vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
