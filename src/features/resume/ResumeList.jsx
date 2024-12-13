import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 상태값 상수 정의
  const RESUME_STATUS = {
    ALL: 'all',
    PENDING: 'pending',
    COMPLETED: 'completed',
    REJECTED: 'rejected'
  };

  // 데이터 가져오기
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("토큰값:", token);
    
        if (!token) {
          alert("로그인이 필요합니다.");
          navigate("/auth/sign-in");
          return;
        }
    
        const response = await fetch("http://localhost:8080/apply/list", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log("응답 데이터:", data); // 응답 데이터 로그 출력
          setResumes(data); // 데이터를 상태로 저장
        } else {
          const errorData = await response.json();
          console.error("오류 응답 데이터:", errorData);
          setError(errorData.message || "지원서 목록을 가져오지 못했습니다.");
        }
      } catch (error) {
        console.error("지원서 데이터를 가져오는 중 오류:", error);
        setError("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    };    

    fetchApplications();
  }, [navigate]);



const filterHandler = (status) => {
  setFilter(status);
};

const handleDelete = async (applyCode) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:8080/apply/remove/${applyCode}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      alert("이력서가 삭제되었습니다.");
      setResumes(null); // 삭제 후 데이터 초기화
    } else {
      const errorData = await response.json();
      alert(errorData.message || "이력서 삭제에 실패했습니다.");
    }
  } catch (error) {
    console.error("이력서 삭제 중 오류:", error);
    alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
  }
};

const getFilteredResumes = () => {
  if (!Array.isArray(resumes)) {
    return []; // resumes가 배열이 아니면 빈 배열 반환
  }

  console.log("현재 필터:", filter); // 현재 필터 상태 확인
  console.log("전체 이력서:", resumes); // 원본 데이터 확인

  switch (filter) {
    case RESUME_STATUS.PENDING:
      return resumes.filter((resume) => resume.applyStatus === "PENDING");
    case RESUME_STATUS.COMPLETED:
      return resumes.filter((resume) => resume.applyStatus === "COMPLETED");
    case RESUME_STATUS.REJECTED:
      return resumes.filter((resume) => resume.applyStatus === "REJECTED");
    default:
      return resumes; // 기본적으로 전체 배열 반환
  }
};

useEffect(() => {
  console.log("필터링된 이력서:", getFilteredResumes());
}, [resumes, filter]);

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
              <h3>회사: {resume.companyName}</h3>
              <StatusBadge status={resume.status}>{resume.status}</StatusBadge>
            </ResumeHeader>
            <ResumeContent>
              <p><strong>직무:</strong> {resume.jobTitle}</p>
              <p><strong>제출일:</strong> {new Date(resume.submissionDate).toLocaleDateString()}</p>
            </ResumeContent>
            <ActionButtons>
              <ActionButton onClick={() => window.open(`/resume/${resume.resumeCode}`)}>
                조회
              </ActionButton>
              <ActionButton
                onClick={() => window.confirm('정말 삭제하시겠습니까?') && handleDelete(resume.applyCode)}>
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