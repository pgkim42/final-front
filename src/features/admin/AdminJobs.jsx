import { useState } from 'react';
import styled from 'styled-components';
import AdminLayout from './AdminLayout';

const AdminJobs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // 임시 데이터
  const [jobPostings, setJobPostings] = useState([
    { id: 1, title: "프론트엔드 개발자", company: "테크컴퍼니", status: "모집중" },
    { id: 2, title: "백엔드 개발자", company: "IT기업", status: "마감" },
    { id: 3, title: "데이터 엔지니어", company: "데이터컴퍼니", status: "모집중" },
    { id: 4, title: "시스템 관리자", company: "시스템솔루션", status: "모집중" },
    { id: 5, title: "DevOps 엔지니어", company: "클라우드테크", status: "마감" },
    { id: 6, title: "웹 디자이너", company: "디자인스튜디오", status: "모집중" },
    { id: 7, title: "Java 개발자", company: "소프트웨어하우스", status: "모집중" },
    { id: 8, title: "QA 엔지니어", company: "퀄리티테크", status: "마감" },
    { id: 9, title: "보안 전문가", company: "시큐리티프로", status: "모집중" },
    { id: 10, title: "모바일 개발자", company: "앱스튜디오", status: "모집중" },
    { id: 11, title: "UI/UX 디자이너", company: "사용자경험랩", status: "마감" },
    { id: 12, title: "Python 개발자", company: "AI솔루션즈", status: "모집중" },
    { id: 13, title: "프로덕트 매니저", company: "프로덕트컴퍼니", status: "모집중" },
    { id: 14, title: "네트워크 엔지니어", company: "네트워크테크", status: "마감" },
    { id: 15, title: "클라우드 아키텍트", company: "클라우드서비스", status: "모집중" },
    { id: 16, title: "데이터 사이언티스트", company: "데이터랩스", status: "모집중" },
    { id: 17, title: "블록체인 개발자", company: "블록테크놀로지", status: "마감" }
  ]);

  const handleDeletePosting = (id, title) => {
    if (window.confirm(`'${title}' 공고를 삭제하시겠습니까?`)) {
      setJobPostings(jobPostings.filter(job => job.id !== id));
    }
  };

  const handleView = (id) => {
    window.location.href = `/jobs/${id}`;
  };

  // 페이지네이션 로직
  const indexOfLastJob = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstJob = indexOfLastJob - ITEMS_PER_PAGE;
  const currentJobs = jobPostings.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobPostings.length / ITEMS_PER_PAGE);

  return (
    <AdminLayout>
      <Container>
        <Title>채용공고 관리</Title>
        <Table>
          <thead>
            <tr>
              <Th>제목</Th>
              <Th>기업명</Th>
              <Th>상태</Th>
              <Th>관리</Th>
            </tr>
          </thead>
          <tbody>
            {currentJobs.map(job => (
              <Tr key={job.id}>
                <Td>{job.title}</Td>
                <Td>{job.company}</Td>
                <Td>
                  <Status status={job.status}>{job.status}</Status>
                </Td>
                <Td>
                  <ButtonGroup>
                    <ActionButton onClick={() => handleView(job.id)}>조회</ActionButton>
                    <ActionButton danger onClick={() => handleDeletePosting(job.id, job.title)}>
                      삭제
                    </ActionButton>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>

        <Pagination>
          {[...Array(totalPages)].map((_, i) => (
            <PageButton
              key={i + 1}
              active={currentPage === i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </PageButton>
          ))}
        </Pagination>
      </Container>
    </AdminLayout>
  );
};

const Container = styled.div`
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      `;

const Table = styled.table`
width: 100%;
border-collapse: collapse;
margin-bottom: 1rem;
`;

const Th = styled.th`
padding: 1rem;
text-align: left;
border-bottom: 2px solid #e2e8f0;
color: #2d3748;
`;

const Td = styled.td`
padding: 1rem;
border-bottom: 1px solid #e2e8f0;
`;

const Tr = styled.tr`
&:hover {
  background - color: #f8fafc;
}
`;

const Title = styled.h2`
      font-size: 1.5rem;
      color: #2d3748;
      margin-bottom: 1.5rem;
      `;

const Status = styled.span`
padding: 0.25rem 0.75rem;
border-radius: 9999px;
font-size: 0.875rem;
font-weight: 500;

${props => props.status === "모집중"
    ? `
background-color: #e6fffa;
color: #047857;
`
    : `
background-color: #fee2e2;
color: #dc2626;
`
  }
`;

const ButtonGroup = styled.div`
      display: flex;
      gap: 0.5rem;
      `;

const ActionButton = styled.button`
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;

      ${props => props.danger
    ? `
      background-color: #fee2e2;
      color: #dc2626;
      &:hover { background-color: #fecaca; }
    `
    : `
      background-color: #e2e8f0;
      color: #475569;
      &:hover { background-color: #cbd5e1; }
    `
  }
      `;

const Pagination = styled.div`
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 2rem;
      `;

const PageButton = styled.button`
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      background: ${props => props.active ? '#3b82f6' : '#e2e8f0'};
      color: ${props => props.active ? 'white' : '#475569'};
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: ${props => props.active ? '#2563eb' : '#cbd5e1'};
  }
      `;

export default AdminJobs;