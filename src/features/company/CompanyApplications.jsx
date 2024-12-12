import { useState } from 'react';
import styled from 'styled-components';
import CompanyLayout from './CompanyLayout';

const CompanyApplications = () => {
  const [selectedJob, setSelectedJob] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // 임시 데이터
  const jobs = [
    { id: 1, title: "프론트엔드 개발자" },
    { id: 2, title: "백엔드 개발자" },
    { id: 3, title: "DevOps 엔지니어" }
  ];

  const applications = [
    {
      id: 1,
      jobId: 1,
      applicantName: "홍길동",
      email: "hong@mail.com",
      status: "서류심사",
      applyDate: "2024-03-15",
      experience: "5년",
      resumeUrl: "#"
    },
    {
      id: 2,
      jobId: 1,
      applicantName: "김철수",
      email: "kim@mail.com",
      status: "1차면접",
      applyDate: "2024-03-14",
      experience: "3년",
      resumeUrl: "#"
    }
  ];

  const handleStatusChange = (applicationId, newStatus) => {
    // API 호출 로직
    console.log(`Application ${applicationId} status changed to ${newStatus}`);
  };

  const filteredApplications = selectedJob === 'all'
    ? applications
    : applications.filter(app => app.jobId === parseInt(selectedJob));

  return (
    <CompanyLayout>
      <Container>
        <Header>
          <Title>지원자 관리</Title>
          <JobFilter>
            <Select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
            >
              <option value="all">전체 공고</option>
              {jobs.map(job => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </Select>
          </JobFilter>
        </Header>

        <Table>
          <thead>
            <tr>
              <Th>지원자</Th>
              <Th>이메일</Th>
              <Th>지원공고</Th>
              <Th>경력</Th>
              <Th>지원일</Th>
              <Th>상태</Th>
              <Th>관리</Th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map(app => (
              <Tr key={app.id}>
                <Td>{app.applicantName}</Td>
                <Td>{app.email}</Td>
                <Td>{jobs.find(job => job.id === app.jobId)?.title}</Td>
                <Td>{app.experience}</Td>
                <Td>{app.applyDate}</Td>
                <Td>
                  <StatusBadge status={app.status}>
                    {app.status}
                  </StatusBadge>
                </Td>
                <Td>
                  <ButtonGroup>
                    <ActionButton onClick={() => window.open(app.resumeUrl)}>
                      이력서
                    </ActionButton>
                    <StatusSelect
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    >
                      <option value="서류심사">서류심사</option>
                      <option value="1차면접">1차면접</option>
                      <option value="2차면접">2차면접</option>
                      <option value="최종합격">최종합격</option>
                      <option value="불합격">불합격</option>
                    </StatusSelect>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </CompanyLayout>
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

const Title = styled.h1`
  font-size: 2rem;
  color: #1a365d;
`;

const JobFilter = styled.div`
  width: 300px;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid #e2e8f0;
  color: #1a365d;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f8fafc;
  }
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  
  ${props => {
    switch (props.status) {
      case '서류심사':
        return 'background: #e2e8f0; color: #1a365d;';
      case '1차면접':
        return 'background: #e6fffa; color: #047857;';
      case '2차면접':
        return 'background: #ede9fe; color: #6d28d9;';
      case '최종합격':
        return 'background: #dcfce7; color: #166534;';
      default:
        return 'background: #fee2e2; color: #991b1b;';
    }
  }}
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
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

const StatusSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  color: #1a365d;
`;

export default CompanyApplications;