import styled from 'styled-components';
import JobList from './JobListBar';
import { useNavigate } from 'react-router-dom';

const jobData = {
  id: 1,
  title: "시니어 프론트엔드 개발자",
  companyName: "테크스타트",
  location: "서울 강남구",
  companyLogo: "https://via.placeholder.com/50",
  description: "우리는 혁신적인 웹 애플리케이션을 개발하는 프론트엔드 개발자를 찾고 있습니다...",
  requirements: "- React, TypeScript 경험 5년 이상\n- 대규모 서비스 경험\n- 웹 표준 및 접근성 이해",
  deadline: "2024-04-30"
};

const similarJobs = [
  {
    id: 2,
    title: "프론트엔드 개발자",
    companyName: "네오테크",
    location: "서울 서초구",
    companyLogo: "https://via.placeholder.com/50",
    skills: ["React", "Vue.js", "JavaScript"],
    deadline: "2024-05-15"
  },
  {
    id: 3,
    title: "웹 프론트엔드 개발자",
    companyName: "디지털솔루션",
    location: "서울 강남구",
    companyLogo: "https://via.placeholder.com/50",
    skills: ["React", "TypeScript", "Next.js"],
    deadline: "2024-05-01"
  }
];

const DetailSection = styled.section`
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const JobTitle = styled.h1`
  font-size: 2rem;
  color: #1a1a1a;
  margin-bottom: 1rem;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
`;

const CompanyName = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: #2563eb;
`;

const Location = styled.p`
  color: #666;
  font-size: 1rem;
`;

const ContentSection = styled.div`
  margin: 2rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #1a1a1a;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #4a5568;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const Deadline = styled.p`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
  color: #2563eb;
  font-weight: 500;
`;

// 상단에 추가할 임시 데이터
const dummyJobs = [
  {
    id: 1,
    title: "시니어 프론트엔드 개발자",
    companyName: "테크스타트",
    location: "서울 강남구",
    companyLogo: "https://via.placeholder.com/50",
    skills: ["React", "TypeScript", "Node.js"],
    deadline: "2024-04-30"
  },
  {
    id: 2,
    title: "백엔드 개발자",
    companyName: "네오테크",
    location: "서울 서초구",
    companyLogo: "https://via.placeholder.com/50",
    skills: ["Java", "Spring", "MySQL"],
    deadline: "2024-05-15"
  },
  {
    id: 3,
    title: "DevOps 엔지니어",
    companyName: "클라우드솔루션",
    location: "서울 송파구",
    companyLogo: "https://via.placeholder.com/50",
    skills: ["AWS", "Docker", "Kubernetes"],
    deadline: "2024-05-01"
  }
];

const JobPostDetail = () => {
  const navigate = useNavigate();

  const CompanyButton = styled.button`
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  color: #495057;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #e9ecef;
    color: #212529;
  }
`;

  return (
    <PageContainer>
      <MainContent>
        <DetailSection>
          <JobTitle>{jobData.title}</JobTitle>
          <CompanyButton onClick={() => navigate(`/company/${jobData.companyId}`)}>
            회사 정보 보기
          </CompanyButton>
          <CompanyInfo>
            <CompanyName>{jobData.companyName}</CompanyName>
            <Location>{jobData.location}</Location>
          </CompanyInfo>

          <ContentSection>
            <SectionTitle>직무 내용</SectionTitle>
            <Description>{jobData.description}</Description>
          </ContentSection>

          <ContentSection>
            <SectionTitle>자격 요건</SectionTitle>
            <Description>{jobData.requirements}</Description>
          </ContentSection>

          <Deadline>마감일: {jobData.deadline}</Deadline>
        </DetailSection>

        <SimilarJobsSection>
          <JobList jobs={similarJobs} type="similarJobs" />
        </SimilarJobsSection>

        <DummyJobsSection>
          <JobList jobs={dummyJobs} type="Jobs" />
        </DummyJobsSection>
      </MainContent>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const MainContent = styled.div`
  display: grid;
  gap: 2rem;
`;

const SimilarJobsSection = styled.section`
  margin-top: 2rem;
`;

const DummyJobsSection = styled.section`
  margin-top: 2rem;
`;

export default JobPostDetail;