// components/Preloader.jsx
import React from "react";
import styled, { keyframes } from "styled-components";
import { FaCheck } from "react-icons/fa"; // Importing FaCheck for the tick icon

// Keyframe for the water filling animation
// We animate transformY to move the fill from bottom to top
const fillAnimation = (progress) => keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(${100 - progress}%); /* Moves from 100% (bottom) to (100 - progress)% up */
  }
`;

// Keyframe for subtle glitch/glow effect for text
const glitchText = keyframes`
  0% {
    text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00;
    transform: translate(0, 0);
  }
  20% {
    text-shadow: 0 0 8px #00ff00, 0 0 12px #00ff00;
    transform: translate(-2px, 2px);
  }
  40% {
    text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00;
    transform: translate(2px, -2px);
  }
  60% {
    text-shadow: 0 0 8px #00ff00, 0 0 12px #00ff00;
  }
  80% {
    text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00;
    transform: translate(1px, -1px);
  }
  100% {
    text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00;
    transform: translate(0, 0);
  }
`;

// Keyframe for binary background animation
const binaryScroll = keyframes`
  from { background-position: 0% 0%; }
  to { background-position: 100% 100%; }
`;

// Keyframe for checkmark fade in
const fadeInCheck = keyframes`
  0% { opacity: 0; transform: scale(0.5);}
  100% { opacity: 1; transform: scale(1);}
`;

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  background-color: #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Share Tech Mono', monospace; /* Applying hacker-style font */

  /* Background binary code effect */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 10px,
      rgba(0, 255, 0, 0.05) 10px,
      rgba(0, 255, 0, 0.05) 20px
    ),
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(0, 255, 0, 0.05) 10px,
      rgba(0, 255, 0, 0.05) 20px
    );
    opacity: 0.2;
    z-index: 0;
    animation: ${binaryScroll} 30s linear infinite;
  }
`;

const ShieldContainer = styled.div`
  position: relative;
  width: 250px; /* Adjust size as needed */
  height: 280px; /* Adjust size as needed */
  margin-bottom: 20px;
`;

const ShieldSVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 15px #00ff00) drop-shadow(0 0 30px rgba(0, 255, 0, 0.4)); /* Green glow effect */
`;

const ShieldOutline = styled.path`
  fill: none;
  stroke: #00ff00; /* Hacker green outline */
  stroke-width: 4px;
`;

const FillLayer = styled.rect`
  fill: url(#waterGradient); /* Use a gradient for dynamic color */
  clip-path: url(#shieldClip); /* Clip to shield shape */
  transform-origin: bottom;
  /* Animation applied via style prop to ensure dynamic updates */
  filter: drop-shadow(0 0 10px #0000ff); /* Blue glow for water */
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 50%; /* Center vertically initially */
  left: 50%;
  transform: translate(-50%, -50%);
  color: #00ff00;
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.8rem;
  font-weight: bold;
  z-index: 2;
  text-shadow: 0 0 5px #00ff00;
  animation: ${glitchText} 1.5s infinite alternate;
  text-align: center;
  line-height: 1.2;
`;

const StatusText = styled.span`
  display: block;
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 5px;
`;

const CheckmarkIcon = styled(FaCheck)`
  position: absolute;
  font-size: 80px; /* Larger checkmark */
  color: #00ff88; /* Bright green */
  z-index: 3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${fadeInCheck} 0.5s ease-in-out forwards;
`;

const BottomLoadingText = styled.div`
  color: #00ffee;
  margin-top: 20px;
  font-size: 14px;
  font-family: monospace;
  opacity: 0.7;
  text-shadow: 0 0 5px #00ffee;
`;


const Preloader = ({ progress, heroLoaded }) => {
  // Ensure progress is between 0 and 100
  const fillPercentage = Math.min(100, Math.max(0, progress));
  const waterHeight = fillPercentage; // Height in SVG coordinates (0-100)
  const waterY = 100 - waterHeight; // Y position for the rect (moves up as height increases)

  return (
    <Wrapper>
      <ShieldContainer>
        <ShieldSVG viewBox="0 0 100 100">
          <defs>
            {/* Custom Shield Clip Path - This defines the shape of the shield */}
            <clipPath id="shieldClip">
              <path
                d="M50 0 C20 0 0 20 0 45 L0 75 C0 90 20 100 50 100 C80 100 100 90 100 75 L100 45 C100 20 80 0 50 0 Z"
              />
            </clipPath>
            {/* Gradient for the "water" fill, mimicking a digital, glowing effect */}
            <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor: '#00ccff', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#003366', stopOpacity: 0.8}} />
            </linearGradient>
          </defs>

          {/* Inner details for hacker aesthetic (simplified circuit lines/nodes) */}
          <g stroke="#00ff00" strokeWidth="0.5" opacity="0.6">
            <line x1="20" y1="20" x2="40" y2="30" />
            <line x1="80" y1="20" x2="60" y2="30" />
            <line x1="30" y1="60" x2="70" y2="60" />
            <circle cx="20" cy="20" r="1" fill="#00ff00" />
            <circle cx="40" cy="30" r="1" fill="#00ff00" />
            <circle cx="80" cy="20" r="1" fill="#00ff00" />
            <circle cx="60" cy="30" r="1" fill="#00ff00" />
            <circle cx="30" cy="60" r="1" fill="#00ff00" />
            <circle cx="70" cy="60" r="1" fill="#00ff00" />
          </g>

          {/* Shield Outline Path */}
          <ShieldOutline
            d="M50 0 C20 0 0 20 0 45 L0 75 C0 90 20 100 50 100 C80 100 100 90 100 75 L100 45 C100 20 80 0 50 0 Z"
          />

          {/* The filling "water" layer - its animation is driven by the progress prop */}
          <FillLayer
            x="0"
            y={waterY}
            width="100"
            height={waterHeight}
            // Apply animation as inline style for dynamic progress updates
            style={{ animation: `${fillAnimation(fillPercentage)} 0.5s ease-out forwards` }}
          />

        </ShieldSVG>

        {/* Conditional rendering for text or checkmark based on heroLoaded prop */}
        {heroLoaded ? (
          <CheckmarkIcon />
        ) : (
          <TextOverlay>
            {Math.round(fillPercentage)}%
            <StatusText>LOADING CYBER SECURITY PORTFOLIO...</StatusText>
          </TextOverlay>
        )}
      </ShieldContainer>
      <BottomLoadingText>
        Initializing secure connection...
      </BottomLoadingText>
    </Wrapper>
  );
};

export default Preloader;