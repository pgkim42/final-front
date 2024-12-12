import { useState } from "react";
import styled from "styled-components";
import AdminLayout from "./AdminLayout";

const AdminMember = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const [users, setUsers] = useState([
    { id: 1, name: "김사용", email: "user1@mail.com", type: "구직자" },
    { id: 2, name: "이기업", email: "company1@mail.com", type: "기업회원" },
    { id: 3, name: "박지원", email: "user2@mail.com", type: "구직자" },
    { id: 4, name: "최기업", email: "company2@mail.com", type: "기업회원" },
    { id: 5, name: "정민수", email: "user3@mail.com", type: "구직자" },
    { id: 6, name: "한상우", email: "user4@mail.com", type: "구직자" },
    { id: 7, name: "이서연", email: "user5@mail.com", type: "구직자" },
    { id: 8, name: "강기업", email: "company3@mail.com", type: "기업회원" },
    { id: 9, name: "윤지혜", email: "user6@mail.com", type: "구직자" },
    { id: 10, name: "송민재", email: "user7@mail.com", type: "구직자" },
    { id: 11, name: "오기업", email: "company4@mail.com", type: "기업회원" },
    { id: 12, name: "임현우", email: "user8@mail.com", type: "구직자" },
    { id: 13, name: "장미경", email: "user9@mail.com", type: "구직자" },
    { id: 14, name: "백승호", email: "company5@mail.com", type: "기업회원" },
    { id: 15, name: "황민지", email: "user10@mail.com", type: "구직자" }
  ]);

  const handleWithdrawUser = (id, name) => {
    if (window.confirm(`'${name}' 회원을 강제 탈퇴시키겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const indexOfLastUser = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - ITEMS_PER_PAGE;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

  return (
    <AdminLayout>
      <Container>
        <Title>회원 관리</Title>
        <Table>
          <thead>
            <tr>
              <Th>이름</Th>
              <Th>이메일</Th>
              <Th>회원구분</Th>
              <Th>관리</Th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <Tr key={user.id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <UserType type={user.type}>{user.type}</UserType>
                </Td>
                <Td>
                  <DeleteButton onClick={() => handleWithdrawUser(user.id, user.name)}>
                    강제탈퇴
                  </DeleteButton>
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
}


const Container = styled.div`
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      `;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #2d3748;
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
    background-color: #f8fafc;
  }
`;

const UserType = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  
  ${props => props.type === "구직자"
    ? `
      background-color: #e6fffa;
      color: #047857;
    `
    : `
      background-color: #ede9fe;
      color: #6d28d9;
    `
  }
`;

const DeleteButton = styled.button`
  background: #dc2626;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #b91c1c;
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
  border-radius: 4px;
  background: ${props => props.active ? '#3b82f6' : '#e2e8f0'};
  color: ${props => props.active ? 'white' : '#475569'};
  cursor: pointer;

  &:hover {
    background: ${props => props.active ? '#2563eb' : '#cbd5e1'};
  }
`;

export default AdminMember;