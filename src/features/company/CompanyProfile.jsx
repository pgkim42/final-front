import { useState } from 'react';
import styled from 'styled-components';
import CompanyLayout from './CompanyLayout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/AuthContent';

const CompanyProfile = () => {

  const navigate = useNavigate();

  const { companyName, companyAddress, ceoName, companyType } = useAuth();

  const [companyInfo, setCompanyInfo] = useState({
    name: companyName,
    logo: "https://via.placeholder.com/150",
    address : companyAddress,
    ceo : ceoName,
    companyType : companyType,
    description: "혁신적인 기술 솔루션을 제공하는 기업입니다. 우리는 최신 기술을 활용하여 고객의 문제를 해결하고, 더 나은 미래를 만들어가고 있습니다.",
    industry: "IT/소프트웨어",
    website: "https://techstart.co.kr",
    activeJobs: [
      {
        id: 1,
        title: "시니어 프론트엔드 개발자",
        department: "개발팀",
        deadline: "2024-04-30",
        status: "모집중"
      },
      {
        id: 2,
        title: "백엔드 개발자",
        department: "개발팀",
        deadline: "2024-05-15",
        status: "모집중"
      }
    ]
  });

  return (
    <CompanyLayout>
      <Container>
        <ProfileSection>
          <LogoSection>
            <Logo src={companyInfo.logo} alt={companyInfo.name} />
            <UploadButton>로고 변경</UploadButton>
          </LogoSection>

          <InfoSection>
            <CompanyName>{companyInfo.name}</CompanyName>
            <CompanyType>기업 규모 : {companyInfo.companyType}</CompanyType>
            <CeoName>대표명 : {companyInfo.ceo}</CeoName>
            <CompanyAddress>주소 : {companyInfo.address} </CompanyAddress>
            <Industry>업종 : {companyInfo.industry}</Industry>
            <Website href={companyInfo.website} target="_blank">
              사이트 : {companyInfo.website}
            </Website>
            <Description>{companyInfo.description}</Description>
            <EditButton onClick={() => navigate('/company/profile/edit')}>정보 수정</EditButton>
          </InfoSection>
        </ProfileSection>

        <JobSection>
          <SectionTitle>진행 중인 채용</SectionTitle>
          <JobGrid>
            {companyInfo.activeJobs.map(job => (
              <JobCard key={job.id}>
                <JobTitle>{job.title}</JobTitle>
                <JobInfo>
                  <Department>{job.department}</Department>
                  <Deadline>마감일: {job.deadline}</Deadline>
                </JobInfo>
                <Status>{job.status}</Status>
              </JobCard>
            ))}
          </JobGrid>
        </JobSection>
      </Container>
    </CompanyLayout>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;


const ProfileSection = styled.div`
  display: flex;
  gap: 3rem;
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 3rem;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  }
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  min-width: 200px;
`;

const Logo = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const UploadButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  color: #1a365d;
  cursor: pointer;

  &:hover {
    background: #f8fafc;
  }
`;

const InfoSection = styled.div`
  flex: 1;
`;

const CompanyName = styled.h1`
  font-size: 2.5rem;
  color: #1a365d;
  margin-bottom: 1rem;
  font-weight: 700;
`;


const Industry = styled.div`
  color: #64748b;
  margin-bottom: 0.5rem;
`;

const CompanyType = styled.div`
  color: #64748b;
  margin-bottom: 0.5rem;
`;

const CeoName = styled.div`
  color: #64748b;
  margin-bottom: 0.5rem;
`;

const CompanyAddress = styled.div`
  color: #64748b;
  margin-bottom: 0.5rem;
`;

const Website = styled.a`
  color: #3182ce;
  text-decoration: none;
  display: inline-block;
  margin-bottom: 1.5rem;
  padding: 0.5rem 1rem;
  background: #ebf8ff;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background: #bee3f8;
    transform: translateY(-1px);
  }
`;

const Description = styled.p`
  color: #1a365d;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const EditButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #3182ce;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #2c5282;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const JobSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #1a365d;
  margin-bottom: 1.5rem;
`;

const JobGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const JobCard = styled.div`
  padding: 2rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: white;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const JobTitle = styled.h3`
  font-size: 1.25rem;
  color: #1a365d;
  margin-bottom: 1rem;
`;

const JobInfo = styled.div`
  margin-bottom: 1rem;
`;

const Department = styled.div`
  color: #64748b;
  margin-bottom: 0.5rem;
`;

const Deadline = styled.div`
  color: #e53e3e;
  font-size: 0.875rem;
`;

const Status = styled.div`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #e6fffa;
  color: #047857;
  border-radius: 9999px;
  font-size: 0.875rem;
`;

export default CompanyProfile;