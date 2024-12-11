import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const CompanyDetail = () => {
  const { id } = useParams();

  // 임시 데이터
  const companyData = {
    name: "테크스타트",
    logo: "https://via.placeholder.com/150",
    description: "혁신적인 기술 솔루션을 제공하는 기업",
    industry: "IT/소프트웨어",
    employeeCount: "100-200명",
    foundedYear: "2018",
    location: "서울특별시 강남구",
    website: "https://techstart.co.kr",
    benefits: [
      "유연근무제",
      "원격근무",
      "점심식사 제공",
      "의료보험 지원"
    ],
    openPositions: [
      {
        id: 1,
        title: "시니어 프론트엔드 개발자",
        department: "개발팀",
        deadline: "2024-04-30"
      },
      {
        id: 2,
        title: "백엔드 개발자",
        department: "개발팀",
        deadline: "2024-05-15"
      }
    ]
  };

  return (
    <Container>
      <Header>
        <LogoSection>
          <CompanyLogo src={companyData.logo} alt={companyData.name} />
          <div>
            <CompanyName>{companyData.name}</CompanyName>
            <Industry>{companyData.industry}</Industry>
          </div>
        </LogoSection>
        <CompanyWebsite href={companyData.website} target="_blank">
          회사 웹사이트
        </CompanyWebsite>
      </Header>

      <Section>
        <SectionTitle>기업 소개</SectionTitle>
        <Description>{companyData.description}</Description>

        <InfoGrid>
          <InfoItem>
            <InfoLabel>설립년도</InfoLabel>
            <InfoValue>{companyData.foundedYear}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>직원수</InfoLabel>
            <InfoValue>{companyData.employeeCount}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>위치</InfoLabel>
            <InfoValue>{companyData.location}</InfoValue>
          </InfoItem>
        </InfoGrid>
      </Section>

      <Section>
        <SectionTitle>복리후생</SectionTitle>
        <BenefitsList>
          {companyData.benefits.map((benefit, index) => (
            <BenefitItem key={index}>{benefit}</BenefitItem>
          ))}
        </BenefitsList>
      </Section>

      <Section>
        <SectionTitle>채용 중인 포지션</SectionTitle>
        <PositionGrid>
          {companyData.openPositions.map(position => (
            <PositionCard key={position.id}>
              <PositionTitle>{position.title}</PositionTitle>
              <PositionDepartment>{position.department}</PositionDepartment>
              <PositionDeadline>마감일: {position.deadline}</PositionDeadline>
            </PositionCard>
          ))}
        </PositionGrid>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const CompanyLogo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 12px;
  object-fit: cover;
`;

const CompanyName = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const Industry = styled.div`
  color: #7f8c8d;
  font-size: 1.1rem;
`;

const CompanyWebsite = styled.a`
  padding: 0.75rem 1.5rem;
  border: 2px solid #3498db;
  border-radius: 8px;
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: #3498db;
    color: white;
  }
`;

const Section = styled.section`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  color: #34495e;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InfoLabel = styled.span`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const InfoValue = styled.span`
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 500;
`;

const BenefitsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const BenefitItem = styled.div`
  padding: 0.75rem 1.5rem;
  background: #f8fafc;
  border-radius: 20px;
  color: #2c3e50;
  font-size: 0.9rem;
`;

const PositionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const PositionCard = styled.div`
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    border-color: #3498db;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
`;

const PositionTitle = styled.h3`
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const PositionDepartment = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const PositionDeadline = styled.div`
  color: #e74c3c;
  font-size: 0.9rem;
  font-weight: 500;
`;

export default CompanyDetail;