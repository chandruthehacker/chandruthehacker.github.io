import React, { useRef, useState, Suspense } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import EarthCanvas from "../canvas/Earth";
import { Bio } from "../../data/constants";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import GmailIcon from "@mui/icons-material/Email";

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
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
  max-width: 600px;
  padding: 0 15px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;
const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;
const ContactTitle = styled.div`
  font-size: 28px;
  text-align: center;
  margin-bottom: 10px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? 'red' : theme.text_secondary + 50)};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? 'red' : theme.text_secondary + 50)};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.button`
  width: 100%;
  text-decoration: none;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -moz-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -webkit-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  display: flex; /* Key for centering content */
  justify-content: center; /* Centers horizontally */
  align-items: center; /* Centers vertically */
  gap: 8px; /* Space between spinner and text (if both are present) */
`;
const SocialMediaIcons = styled.div`
  display: flex;
@media(max-width: 400px){
  width: 100%;
  justify-content: space-evenly;
  padding: 0 10px;
}
`;
const SocialMediaIcon = styled.a`
  display: inline-block;
  font-size: 1.5rem;
  margin: 10px 1rem 0;
  color: ${({ theme }) => theme.text_primary};
  transition: color 0.2s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  @media(max-width: 400px){
  margin: 0;
  }
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid ${({ theme }) => theme.text_primary};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const FormMessage = styled.p`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 12px;
  color: ${({ type }) => (type === 'error' ? 'red' : 'green')};
`;


const Contact = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [formMessageType, setFormMessageType] = useState('');

  const [validationErrors, setValidationErrors] = useState({
    from_email: false,
    from_name: false,
    message: false,
  });

  const clearValidationError = (fieldName) => {
    if (validationErrors[fieldName]) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: false,
      }));
      if (formMessageType === 'error' && formMessage.includes('required fields')) {
          setFormMessage('');
          setFormMessageType('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormMessage('');
    setFormMessageType('');

    let hasError = false;
    const errors = {
      from_email: false,
      from_name: false,
      message: false,
    };

    const emailInput = form.current.elements.from_email;
    const nameInput = form.current.elements.from_name;
    const messageInput = form.current.elements.message;

    if (!nameInput.value.trim()) {
      errors.from_name = true;
      hasError = true;
    }
    if (!emailInput.value.trim()) {
      errors.from_email = true;
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
      errors.from_email = true;
      hasError = true;
    }
    if (!messageInput.value.trim()) {
      errors.message = true;
      hasError = true;
    }

    setValidationErrors(errors);

    if (hasError) {
      setFormMessage('Please fill in all required fields and ensure email is valid.');
      setFormMessageType('error');
      return;
    }

    setIsSending(true);

    try {
      const result = await emailjs.sendForm(
        "service_j8n2w7r",
        "template_k34okyh",
        form.current,
        "CPqsd_WoFyuxo09lw"
      );

      console.log('EmailJS Result:', result.text);
      setFormMessage('Message Sent Successfully!');
      setFormMessageType('success');
      form.current.reset();
      setValidationErrors({
        from_email: false,
        from_name: false,
        message: false,
      });

    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormMessage(`Failed to send message: ${error.text || 'An unexpected error occurred.'}`);
      setFormMessageType('error');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Suspense fallback={<div>Loading 3D...</div>}>
          <EarthCanvas />
        </Suspense>
        <Title>Contact</Title>
        <Desc>
          Feel free to reach out to me for any questions or opportunities!
        </Desc>
        <SocialMediaIcons>
        <SocialMediaIcon href={`https://mail.google.com/mail/?view=cm&fs=1&to=${Bio.gmail}&su=Subject%20Here&body=Your%20message%20here`} target="_blank" aria-label="Gmail">
          <GmailIcon />
        </SocialMediaIcon>
        <SocialMediaIcon href={Bio.facebook} target="_blank" aria-label="Facebook">
          <FacebookIcon />
        </SocialMediaIcon>
        <SocialMediaIcon href={Bio.twitter} target="_blank" aria-label="Twitter">
          <TwitterIcon />
        </SocialMediaIcon>
        <SocialMediaIcon href={Bio.linkedin} target="_blank" aria-label="LinkedIn">
          <LinkedInIcon />
        </SocialMediaIcon>
        <SocialMediaIcon href={Bio.insta} target="_blank" aria-label="Instagram">
          <InstagramIcon />
        </SocialMediaIcon>
        <SocialMediaIcon href={Bio.telegram} target="_blank" aria-label="Telegram">
          <TelegramIcon />
        </SocialMediaIcon>
        </SocialMediaIcons>
        <ContactForm onSubmit={handleSubmit} ref={form}>
          <ContactTitle>Email Me 🚀</ContactTitle>

          {formMessage && (
            <FormMessage type={formMessageType}>{formMessage}</FormMessage>
          )}

          <ContactInput
            placeholder="Your Email"
            name="from_email"
            type="email"
            $hasError={validationErrors.from_email}
            onFocus={() => clearValidationError('from_email')} 
            onChange={() => clearValidationError('from_email')}
          />
          <ContactInput
            placeholder="Your Name"
            name="from_name"
            $hasError={validationErrors.from_name}
            onFocus={() => clearValidationError('from_name')} 
            onChange={() => clearValidationError('from_name')}
          />
          <ContactInput
            placeholder="Subject"
            name="subject"
          />
          <ContactInputMessage
            placeholder="Message"
            name="message"
            rows={4}
            $hasError={validationErrors.message}
            onFocus={() => clearValidationError('message')}
            onChange={() => clearValidationError('message')}
          />
          
          <ContactButton 
            type="submit" 
            disabled={isSending}
          >
            {isSending ? <LoadingSpinner /> : "Send"}
          </ContactButton>
        </ContactForm>
      </Wrapper>
    </Container>
  );
};

export default Contact;