// AdminMain.jsx
import { useState } from 'react';
import styled from 'styled-components';
import AdminLayout from './AdminLayout';
import {
  PieChart, Pie, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, Cell
} from 'recharts';

const AdminMain = () => {

  // Dummy data
  const [jobPostings] = useState([
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

  const [users] = useState([
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


  // 통계 데이터 준비
  const stats = {
    users: {
      total: users.length,
      jobSeeker: users.filter(u => u.type === "구직자").length,
      company: users.filter(u => u.type === "기업회원").length
    },
    jobs: {
      total: jobPostings.length,
      active: jobPostings.filter(j => j.status === "모집중").length,
      closed: jobPostings.filter(j => j.status === "마감").length
    }
  };

  const userTypeData = [
    { name: '구직자', value: stats.users.jobSeeker },
    { name: '기업회원', value: stats.users.company }
  ];

  const jobStatusData = [
    { name: '모집중', value: stats.jobs.active },
    { name: '마감', value: stats.jobs.closed }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const closedPostings = jobPostings.filter(post => post.status === "마감").length;
  const activePostings = jobPostings.filter(post => post.status === "모집중").length;
  const companyUsers = users.filter(user => user.type === "기업회원").length;
  const jobSeekers = users.filter(user => user.type === "구직자").length;

  return (
    <AdminLayout>
      <Container>
        <DashboardSection>
          <h2>전체 현황</h2>
          <StatContainer>
            <StatsSection>
              <ChartContainer>
                <ChartTitle>회원 구분</ChartTitle>
                <PieChart width={400} height={300}>
                  <Pie
                    data={userTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {userTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ChartContainer>

              <ChartContainer>
                <ChartTitle>채용공고 현황</ChartTitle>
                <BarChart width={400} height={300} data={jobStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ChartContainer>
            </StatsSection>

            <StatSection>
              <h3>공고 현황</h3>
              <StatRow>
                <StatBox>
                  <h4>전체 공고</h4>
                  <span>{jobPostings.length}</span>
                </StatBox>
                <StatBox>
                  <h4>진행중인 공고</h4>
                  <span>{activePostings}</span>
                </StatBox>
                <StatBox>
                  <h4>마감된 공고</h4>
                  <span>{closedPostings}</span>
                </StatBox>
              </StatRow>
            </StatSection>

            <StatSection>
              <h3>회원 현황</h3>
              <StatRow>
                <StatBox>
                  <h4>기업회원</h4>
                  <span>{companyUsers}</span>
                </StatBox>
                <StatBox>
                  <h4>구직자회원</h4>
                  <span>{jobSeekers}</span>
                </StatBox>
              </StatRow>
            </StatSection>
          </StatContainer>
        </DashboardSection>
      </Container>
    </AdminLayout>
  );
};

const Container = styled.div`
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      `;

const Section = styled.section`
      margin: 2rem 0;
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      `;

const DashboardSection = styled(Section)`
      background: #f8f9fa;
      `;

const StatContainer = styled.div`
      display: flex;
      flex-direction: column;
      gap: 2rem;
      `;

const StatSection = styled.div`
      h3 {
        margin - bottom: 1rem;
      color: #333;
  }
      `;

const StatRow = styled.div`
      display: flex;
      gap: 1rem;
      `;

const StatBox = styled.div`
      flex: 1;
      padding: 1.5rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);

      h4 {
        margin: 0;
      color: #666;
  }

      span {
        display: block;
      margin-top: 0.5rem;
      font-size: 1.8rem;
      font-weight: bold;
      color: #2563eb;
  }
      `;

const StatsSection = styled.div`
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      `;

const ChartContainer = styled.div`
      text-align: center;
      `;

const ChartTitle = styled.h3`
      margin-bottom: 1rem;
      color: #2c3e50;
      `;

export default AdminMain;