import { useState } from 'react';
import styled from 'styled-components';
import CompanyLayout from "./CompanyLayout";
import { useNavigate } from 'react-router-dom';

// 더미데이터
const dummyJobs = [
  {
    id: 1,
    title: "프론트엔드 개발자",
    status: "진행중",
    deadline: "2024-03-31",
    applicants: 5,
    views: 120,
    created_at: "2024-02-15"
  },
  {
    id: 2,
    title: "백엔드 개발자",
    status: "마감",
    deadline: "2024-02-29",
    applicants: 8,
    views: 200,
    created_at: "2024-02-01"
  }
];

const CompanyJobManagement = () => {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState(dummyJobs);
  const [filter, setFilter] = useState('all');

  const filteredJobs = filter === 'all'
    ? jobs
    : jobs.filter(job => job.status === filter);

  const stats = {
    total: jobs.length,
    active: jobs.filter(job => job.status === "진행중").length,
    closed: jobs.filter(job => job.status === "마감").length
  };

  const handleViewApplicants = (jobId) => {
    navigate(`/company/jobs/${jobId}/applicants`);
  };

  return (
    <CompanyLayout>
      <Container>
        <Header>
          <h1>채용공고 관리</h1>
          <PostButton onClick={() => navigate('/jobs/post')}>새 공고 등록</PostButton>
        </Header>

        <Dashboard>
          <StatBox>
            <h3>전체 공고</h3>
            <span>{stats.total}</span>
          </StatBox>
          <StatBox>
            <h3>진행중</h3>
            <span>{stats.active}</span>
          </StatBox>
          <StatBox>
            <h3>마감</h3>
            <span>{stats.closed}</span>
          </StatBox>
        </Dashboard>

        <FilterSection>
          <FilterButton
            active={filter === 'all'}
            onClick={() => setFilter('all')}>
            전체
          </FilterButton>
          <FilterButton
            active={filter === '진행중'}
            onClick={() => setFilter('진행중')}>
            진행중
          </FilterButton>
          <FilterButton
            active={filter === '마감'}
            onClick={() => setFilter('마감')}>
            마감
          </FilterButton>
        </FilterSection>

        <JobList>
          {filteredJobs.map(job => (
            <JobCard key={job.id}>
              <JobHeader>
                <h2>{job.title}</h2>
                <StatusBadge status={job.status}>
                  {job.status}
                </StatusBadge>
              </JobHeader>
              <JobInfo>
                <InfoItem>
                  <label>마감일</label>
                  <span>{job.deadline}</span>
                </InfoItem>
                <InfoItem>
                  <label>지원자</label>
                  <span>{job.applicants}명</span>
                </InfoItem>
                <InfoItem>
                  <label>조회수</label>
                  <span>{job.views}</span>
                </InfoItem>
              </JobInfo>
              <ButtonGroup>
                <ActionButton onClick={() => handleViewApplicants(job.id)}>
                  지원자 보기 ({job.applicants}명)
                </ActionButton>
                <ActionButton>수정</ActionButton>
                <ActionButton variant="danger">마감</ActionButton>
              </ButtonGroup>
            </JobCard>
          ))}
        </JobList>
      </Container>
    </CompanyLayout>
  );
};

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;


const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const PostButton = styled.button`
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
`;

const Dashboard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatBox = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  text-align: center;

  h3 {
    color: #666;
    margin: 0;
  }

  span {
    font-size: 2rem;
    font-weight: bold;
    color: #2563eb;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: ${props => props.active ? '#2563eb' : '#f3f4f6'};
  color: ${props => props.active ? 'white' : '#4b5563'};
`;

const JobList = styled.div`
  display: grid;
  gap: 1rem;
`;

const JobCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const StatusBadge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  background: ${props => props.status === '진행중' ? '#dcfce7' : '#fee2e2'};
  color: ${props => props.status === '진행중' ? '#166534' : '#991b1b'};
`;

const JobInfo = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  label {
    color: #666;
    margin-right: 0.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: ${props => props.variant === 'danger' ? '#dc2626' : '#f3f4f6'};
  color: ${props => props.variant === 'danger' ? 'white' : '#4b5563'};
`;

export default CompanyJobManagement;