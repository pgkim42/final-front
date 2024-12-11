import { useState } from 'react';
import styled from 'styled-components';

const dummyResumes = [
  {
    id: 1,
    title: "프론트엔드 개발자 이력서",
    company: "테크기업",
    submissionDate: "2024-02-15",
    status: "검토중",
    jobTitle: "시니어 프론트엔드 개발자"
  },
  {
    id: 2,
    title: "백엔드 개발자 이력서",
    company: "스타트업",
    submissionDate: "2024-01-20",
    status: "합격",
    jobTitle: "주니어 백엔드 개발자"
  },
  {
    id: 3,
    title: "데이터 사이언티스트 이력서",
    company: "금융회사",
    submissionDate: "2024-03-10",
    status: "불합격",
    jobTitle: "데이터 사이언티스트"
  },
  {
    id: 4,
    title: "풀스택 개발자 이력서",
    company: "IT솔루션",
    submissionDate: "2024-03-15",
    status: "검토중",
    jobTitle: "풀스택 개발자"
  },
  {
    id: 5,
    title: "모바일 앱 개발자 이력서",
    company: "모바일커머스",
    submissionDate: "2024-03-18",
    status: "합격",
    jobTitle: "iOS 개발자"
  },
  {
    id: 6,
    title: "DevOps 엔지니어 이력서",
    company: "클라우드서비스",
    submissionDate: "2024-03-20",
    status: "검토중",
    jobTitle: "DevOps 엔지니어"
  }
];



const ResumeList = () => {
  const [resumes, setResumes] = useState(dummyResumes);
  const [filter, setFilter] = useState('all');

  // 상태값 상수 정의
  const RESUME_STATUS = {
    ALL: 'all',
    PENDING: 'pending',
    COMPLETED: 'completed',
    REJECTED: 'rejected'
  };

  const filterHandler = (status) => {
    setFilter(status);
  };

  const handleDelete = (id) => {
    setResumes(resumes.filter(resume => resume.id !== id));
  };

  const getFilteredResumes = () => {
    switch (filter) {
      case RESUME_STATUS.PENDING:
        return resumes.filter(resume => resume.status === '검토중');
      case RESUME_STATUS.COMPLETED:
        return resumes.filter(resume => resume.status === '합격');
      case RESUME_STATUS.REJECTED:
        return resumes.filter(resume => resume.status === '불합격');
      default:
        return resumes;
    }
  };

  return (
    <Container>
      <Header>
        <h1>제출한 이력서</h1>
        <FilterContainer>
          <FilterButton
            active={filter === RESUME_STATUS.ALL}
            onClick={() => filterHandler(RESUME_STATUS.ALL)}>
            전체
          </FilterButton>
          <FilterButton
            active={filter === RESUME_STATUS.PENDING}
            onClick={() => filterHandler(RESUME_STATUS.PENDING)}>
            검토중
          </FilterButton>
          <FilterButton
            active={filter === RESUME_STATUS.COMPLETED}
            onClick={() => filterHandler(RESUME_STATUS.COMPLETED)}>
            합격
          </FilterButton>
          <FilterButton
            active={filter === RESUME_STATUS.REJECTED}
            onClick={() => filterHandler(RESUME_STATUS.REJECTED)}>
            불합격
          </FilterButton>
        </FilterContainer>
      </Header>

      <ResumeGrid>
        {getFilteredResumes().map(resume => (
          <ResumeCard key={resume.id}>
            <ResumeHeader>
              <h3>{resume.title}</h3>
              <StatusBadge status={resume.status}>{resume.status}</StatusBadge>
            </ResumeHeader>
            <ResumeContent>
              <p><strong>회사:</strong> {resume.company}</p>
              <p><strong>직무:</strong> {resume.jobTitle}</p>
              <p><strong>제출일:</strong> {resume.submissionDate}</p>
            </ResumeContent>
            <ActionButtons>
              <ActionButton onClick={() => window.open(`/resume/${resume.id}`)}>
                조회
              </ActionButton>
              <ActionButton onClick={() => handleDelete(resume.id)}>
                삭제
              </ActionButton>
            </ActionButtons>
          </ResumeCard>
        ))}
      </ResumeGrid>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: ${props => props.active ? '#2563eb' : '#f3f4f6'};
  color: ${props => props.active ? 'white' : '#4b5563'};
  cursor: pointer;
  
  &:hover {
    background: ${props => props.active ? '#1d4ed8' : '#e5e7eb'};
  }
`;

const ResumeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ResumeCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 1.5rem;
`;

const ResumeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  background: ${props => {
    switch (props.status) {
      case '검토중': return '#fef3c7';
      case '합격': return '#d1fae5';
      case '불합격': return '#fee2e2';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case '검토중': return '#92400e';
      case '합격': return '#065f46';
      case '불합격': return '#991b1b';
      default: return '#1f2937';
    }
  }};
`;

const ResumeContent = styled.div`
  margin-bottom: 1rem;
  
  p {
    margin: 0.5rem 0;
    color: #4b5563;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: white;
  color: #4b5563;
  cursor: pointer;
  
  &:hover {
    background: #f9fafb;
  }
`;

export default ResumeList;