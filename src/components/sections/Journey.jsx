import React, {Suspense} from "react";
import styled from "styled-components";
import { journey } from "../../data/constants";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
const JourneyCard = React.lazy(() => import("../cards/JourneyCard"));

const Container = styled.div`
margin-top: 100px;
display: flex;
flex-direction: column;
justify-content: center;
position: relative;
z-index: 1;
align-items: center;
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Journey = () => {
  return (
    <Container id="Journey">
      <Wrapper>
        <Title>Journey</Title>
        <Desc
          style={{
            marginBottom: "40px",
          }}
        >
          My education has been a journey of self-discovery and growth. My
          educational details are as follows.
        </Desc>

        <VerticalTimeline
        style={{ maxHeight: "80vh", overflowY: "auto", scrollBehavior: "smooth" }} >
          <Suspense fallback={<div>Loading...</div>}>
            {journey.map((item, index) => (
          <JourneyCard key={index} journey={item} />
          ))}
</Suspense>
        </VerticalTimeline>
      </Wrapper>
    </Container>
  );
};

export default React.memo(Journey);
