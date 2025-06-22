import React from "react";
import styled, { useTheme } from "styled-components";
import { VerticalTimelineElement } from "react-vertical-timeline-component";

const Top = styled.div`
  width: 100%;
  display: flex;
  max-width: 100%;
  gap: 12px;
`;

const Image = styled.img`
  height: 50px;
  border-radius: 10px;
  margin-top: 4px;

  @media only screen and (max-width: 768px) {
    height: 40px;
  }
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};

  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const Degree = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Date = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 80};

  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const Description = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 0px;

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const Span = styled.div``;

const Skills = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  flex-direction: column;
  margin-top: 10px;
`;

const ItemWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Skill = styled.div`
  padding: 6px 12px;
  background-color: ${({ theme }) => theme.primary + 20};
  font-size: 15px;
  font-weight: 400;
  user-select: none;
  border-radius: 20px;
  color: ${({ theme }) => theme.primary};

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const JourneyCard = ({ journey }) => {
  const theme = useTheme();

  return (
    <VerticalTimelineElement
      icon={
        <img
          width="100%"
          height="100%"
          alt={journey.heading}
          style={{
            borderRadius: "50%",
            backgroundColor: "black",
          }}
          src={journey.img}
        />
      }
      contentStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: theme.card_bg, 
        color: theme.text_primary,
        boxShadow: "rgba(23, 92, 230, 0.3) 0px 4px 24px",
        border: `1px solid rgba(255, 255, 255, 0.125)`,
        borderRadius: "15px",
      }}
      contentArrowStyle={{
        borderRight: `8px solid ${theme.text_secondary}`,
      }}
      date={journey.date}
    >
      <Top>
        <Image src={journey.img} loading="lazy" alt={journey.heading} />
        <Body>
          <Name>{journey.heading}</Name>
          <Degree>{journey.sub_heading}</Degree>
          <Date>{journey.date}</Date>
        </Body>
      </Top>
      <Description>
        <Span>{journey.desc}</Span>
        {journey?.skills && (
          <>
            <br />
            <Skills>
              <b>Skills:</b>
              <ItemWrapper>
                {journey.skills.map((skill, index) => (
                  <Skill key={index}>{skill}</Skill>
                ))}
              </ItemWrapper>
            </Skills>
          </>
        )}
      </Description>
    </VerticalTimelineElement>
  );
};

export default JourneyCard;
