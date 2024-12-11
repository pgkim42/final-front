import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 40px 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
`;

const FooterTitle = styled.h3`
  color: #3498db;
  font-size: 18px;
  margin-bottom: 15px;
`;

const FooterList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const FooterListItem = styled.li`
  margin-bottom: 10px;
`;

const FooterLink = styled.a`
  color: #ecf0f1;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #3498db;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
`;

const SocialIcon = styled.a`
  color: #ecf0f1;
  font-size: 20px;
  transition: color 0.3s ease;

  &:hover {
    color: #3498db;
  }
`;

const Copyright = styled.p`
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #34495e;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterSection>
          <FooterTitle>회사 소개</FooterTitle>
          <FooterList>
            <FooterListItem>
              <FooterLink href="/about">About Us</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="/careers">채용정보</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="/contact">문의하기</FooterLink>
            </FooterListItem>
          </FooterList>
        </FooterSection>
        <FooterSection>
          <FooterTitle>서비스</FooterTitle>
          <FooterList>
            <FooterListItem>
              <FooterLink href="/job-search">채용공고 검색</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="/resume-builder">이력서 작성</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="/career-advice">커리어 조언</FooterLink>
            </FooterListItem>
          </FooterList>
        </FooterSection>
        <FooterSection>
          <FooterTitle>고객지원</FooterTitle>
          <FooterList>
            <FooterListItem>
              <FooterLink href="/faq">자주 묻는 질문</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="/privacy">개인정보처리방침</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="/terms">이용약관</FooterLink>
            </FooterListItem>
          </FooterList>
        </FooterSection>
        <FooterSection>
          <FooterTitle>팔로우</FooterTitle>
          <SocialIcons>
            <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </SocialIcon>
            <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </SocialIcon>
            <SocialIcon href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </SocialIcon>
          </SocialIcons>
        </FooterSection>
      </FooterContent>
      <Copyright>
        © 2023 채용사이트. All rights reserved.
      </Copyright>
    </FooterWrapper>
  );
};

export default Footer;

