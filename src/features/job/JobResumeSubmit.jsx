import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const dummyResumes = [
  {
    id: 1,
    title: "신입 프론트엔드 개발자 이력서",
    createdAt: "2024-03-15",
    content: "React, JavaScript 중심의 웹 개발 경험",
    status: "active"
  },
  {
    id: 2,
    title: "포트폴리오 이력서",
    createdAt: "2024-03-10",
    content: "다수의 프로젝트 경험 보유",
    status: "active"
  },
  {
    id: 3,
    title: "경력 기술서",
    createdAt: "2024-03-05",
    content: "3년차 웹 개발자 경력 기술",
    status: "active"
  }
];


const JobResumeSubmit = () => {
  const { code } = useParams(); // URL의 code 파라미터 받기
  const { jobCode } = useParams();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // API 연동 전 더미데이터 사용
    setResumes(dummyResumes);

    /* API 연동 코드 (나중에 사용)
    const fetchResumes = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/resume/list', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setResumes(response.data);
      } catch (err) {
        setError('이력서 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
    */
  }, []);

  const handleSubmit = async () => {
    if (!selectedResume) {
      alert('이력서를 선택해주세요.');
      return;
    }

    // API 연동 전 테스트용 알림
    alert(`선택된 이력서(ID: ${selectedResume})로 지원이 완료되었습니다.`);
    navigate(`/jobs/${jobCode}`);

    /* API 연동 코드 (나중에 사용)
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:8080/application/submit/${jobCode}`, 
        { resumeId: selectedResume },
        { headers: { 'Authorization': `Bearer ${token}` }}
      );
      alert('지원이 완료되었습니다.');
      navigate(`/jobs/${jobCode}`);
    } catch (err) {
      setError('지원에 실패했습니다.');
    } finally {
      setLoading(false);
    }
    */
  };

  if (loading) return <LoadingWrapper>로딩 중...</LoadingWrapper>;
  if (error) return <ErrorWrapper>{error}</ErrorWrapper>;

  return (
    <Container>
      <Title>이력서 선택</Title>
      <ResumeList>
        {resumes.map(resume => (
          <ResumeItem
            key={resume.id}
            selected={selectedResume === resume.id}
          >
            <ResumeContent onClick={() => setSelectedResume(resume.id)}>
              <ResumeTitle>{resume.title}</ResumeTitle>
              <ResumeDate>
                작성일: {new Date(resume.createdAt).toLocaleDateString()}
              </ResumeDate>
            </ResumeContent>
            <ViewButton
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/resume/${resume.id}`);
              }}
            >
              이력서 보기
            </ViewButton>
          </ResumeItem>
        ))}
      </ResumeList>
      <ButtonGroup>
        <SubmitButton
          onClick={handleSubmit}
          disabled={!selectedResume || loading}
        >
          지원하기
        </SubmitButton>
        <CancelButton onClick={() => navigate(`/jobs/${jobCode}`)}>
          취소
        </CancelButton>
      </ButtonGroup>
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #2c3e50;
`;

const ResumeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ResumeItem = styled.div`
  padding: 1rem;
  border: 2px solid ${props => props.selected ? '#3498db' : '#e9ecef'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border-color: #3498db;
    background: ${props => props.selected ? '#f8f9fa' : '#fff'};
  }
`;


const ResumeTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const ResumeContent = styled.div`
  flex: 1;
`;

const ResumeDate = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
`;

const SubmitButton = styled(Button)`
  background: #3498db;
  color: white;
  border: none;
  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background: white;
  color: #e74c3c;
  border: 1px solid #e74c3c;
`;

const LoadingWrapper = styled.div`
  text-align: center;
  padding: 2rem;
`;

const ErrorWrapper = styled.div`
  color: #e74c3c;
  text-align: center;
  padding: 2rem;
`;

const ViewButton = styled.button`
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  border: 1px solid #3498db;
  border-radius: 4px;
  background: white;
  color: #3498db;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #3498db;
    color: white;
  }
`;

export default JobResumeSubmit;