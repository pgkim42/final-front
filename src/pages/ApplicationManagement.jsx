import { useState } from 'react';
import styled from 'styled-components';

const dummyApplications = [
  {
    id: 1,
    jobTitle: "시니어 프론트엔드 개발자",
    companyName: "테크스타트",
    applyDate: "2024-03-15",
    status: "서류통과",
    nextStep: "1차 면접 예정",
    companyLogo: "https://via.placeholder.com/40"
  },
  {
    id: 2,
    jobTitle: "백엔드 개발자",
    companyName: "네오테크",
    applyDate: "2024-03-10",
    status: "지원완료",
    nextStep: "서류 검토중",
    companyLogo: "https://via.placeholder.com/40"
  },
  {
    id: 3,
    jobTitle: "DevOps 엔지니어",
    companyName: "클라우드테크",
    applyDate: "2024-03-08",
    status: "면접예정",
    nextStep: "기술면접 3/25",
    companyLogo: "https://via.placeholder.com/40"
  },
  {
    id: 4,
    jobTitle: "풀스택 개발자",
    companyName: "디지털솔루션즈",
    applyDate: "2024-03-05",
    status: "최종합격",
    nextStep: "입사예정 4/1",
    companyLogo: "https://via.placeholder.com/40"
  },
  {
    id: 5,
    jobTitle: "모바일 앱 개발자",
    companyName: "앱스튜디오",
    applyDate: "2024-03-01",
    status: "불합격",
    nextStep: "지원종료",
    companyLogo: "https://via.placeholder.com/40"
  },
  {
    id: 6,
    jobTitle: "데이터 엔지니어",
    companyName: "데이터랩스",
    applyDate: "2024-02-28",
    status: "서류통과",
    nextStep: "2차 면접 예정",
    companyLogo: "https://via.placeholder.com/40"
  }
];

const ApplicationManagement = () => {
  const [applications, setApplications] = useState(dummyApplications);
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);

  const handleWithdraw = (applicationId) => {
    setSelectedApplicationId(applicationId);
    setShowWithdrawModal(true);
  };

  const confirmWithdraw = () => {
    setApplications(applications.filter(app => app.id !== selectedApplicationId));
    setShowWithdrawModal(false);
  };

  const getFilteredApplications = () => {
    if (selectedStatus === '전체') {
      return applications;
    }
    return applications.filter(app => app.status === selectedStatus);
  };

  return (
    <Container>
      <Header>
        <Title>지원 현황 관리</Title>
        <StatusFilter>
          {['전체', '지원완료', '서류통과', '면접예정', '최종합격', '불합격'].map(status => (
            <FilterButton
              key={status}
              active={selectedStatus === status}
              onClick={() => setSelectedStatus(status)}
            >
              {status}
            </FilterButton>
          ))}
        </StatusFilter>
      </Header>

      <ApplicationGrid>
        {getFilteredApplications().map(application => (
          <ApplicationCard key={application.id}>
            <CompanyInfo>
              <CompanyLogo src={application.companyLogo} alt={application.companyName} />
              <div>
                <CompanyName>{application.companyName}</CompanyName>
                <JobTitle>{application.jobTitle}</JobTitle>
              </div>
            </CompanyInfo>

            <StatusSection>
              <StatusBadge status={application.status}>
                {application.status}
              </StatusBadge>
              <NextStep>{application.nextStep}</NextStep>
            </StatusSection>

            <Footer>
              <ApplyDate>지원일: {application.applyDate}</ApplyDate>
              <ButtonGroup>
                <ViewButton>상세보기</ViewButton>
                <WithdrawButton onClick={() => handleWithdraw(application.id)}>
                  지원취소
                </WithdrawButton>
              </ButtonGroup>
            </Footer>
          </ApplicationCard>
        ))}
      </ApplicationGrid>

      {showWithdrawModal && (
        <Modal>
          <ModalContent>
            <h3>지원 취소</h3>
            <p>정말로 지원을 취소하시겠습니까?</p>
            <ModalButtons>
              <ConfirmButton onClick={confirmWithdraw}>확인</ConfirmButton>
              <CancelButton onClick={() => setShowWithdrawModal(false)}>
                취소
              </CancelButton>
            </ModalButtons>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const StatusFilter = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background: ${props => props.active ? '#3498db' : '#f0f2f5'};
  color: ${props => props.active ? 'white' : '#2c3e50'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#2980b9' : '#e2e8f0'};
  }
`;

const ApplicationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const ApplicationCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const CompanyInfo = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CompanyLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 8px;
`;

const CompanyName = styled.div`
  font-weight: 600;
  color: #2c3e50;
`;

const JobTitle = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const StatusSection = styled.div`
  margin: 1rem 0;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  
  ${props => {
    switch (props.status) {
      case '서류통과':
        return 'background: #e8f5e9; color: #2e7d32;';
      case '불합격':
        return 'background: #ffebee; color: #c62828;';
      default:
        return 'background: #e3f2fd; color: #1565c0;';
    }
  }}
`;

const NextStep = styled.div`
  margin-top: 0.5rem;
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const ApplyDate = styled.span`
  color: #95a5a6;
  font-size: 0.875rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ViewButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #3498db;
  border-radius: 6px;
  background: white;
  color: #3498db;
  cursor: pointer;
  
  &:hover {
    background: #f7f9fc;
  }
`;

const WithdrawButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #e74c3c;
  border-radius: 6px;
  background: white;
  color: #e74c3c;
  cursor: pointer;
  
  &:hover {
    background: #fff5f5;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  text-align: center;

  h3 {
    margin: 0 0 1rem 0;
    color: #2c3e50;
  }

  p {
    margin-bottom: 1.5rem;
    color: #34495e;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const ConfirmButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 6px;
  background: #e74c3c;
  color: white;
  cursor: pointer;
  
  &:hover {
    background: #c0392b;
  }
`;

const CancelButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  background: white;
  color: #7f8c8d;
  cursor: pointer;
  
  &:hover {
    background: #f7f9fc;
  }
`;

export default ApplicationManagement;