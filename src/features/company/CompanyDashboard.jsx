import { useState } from 'react';
import styled from 'styled-components';
import CompanyLayout from './CompanyLayout';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line
} from 'recharts';

const CompanyDashboard = () => {
  // 임시 데이터
  const [stats] = useState({
    totalApplications: 158,
    activeJobs: 5,
    interviewScheduled: 12,
    hiredCandidates: 3
  });

  const applicationData = [
    { date: '3/1', count: 12 },
    { date: '3/2', count: 15 },
    { date: '3/3', count: 8 },
    { date: '3/4', count: 20 },
    { date: '3/5', count: 16 }
  ];

  const jobStats = [
    { name: '프론트엔드 개발자', applications: 45 },
    { name: '백엔드 개발자', applications: 38 },
    { name: 'DevOps 엔지니어', applications: 25 }
  ];

  return (
    <CompanyLayout>
      <Container>
        <Title>대시보드</Title>

        <StatsGrid>
          <StatCard>
            <StatLabel>총 지원자</StatLabel>
            <StatValue>{stats.totalApplications}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>진행중인 공고</StatLabel>
            <StatValue>{stats.activeJobs}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>면접 예정</StatLabel>
            <StatValue>{stats.interviewScheduled}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>채용 완료</StatLabel>
            <StatValue>{stats.hiredCandidates}</StatValue>
          </StatCard>
        </StatsGrid>

        <ChartGrid>
          <ChartCard>
            <ChartTitle>일별 지원자 현황</ChartTitle>
            <LineChart width={500} height={300} data={applicationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ChartCard>

          <ChartCard>
            <ChartTitle>공고별 지원자 현황</ChartTitle>
            <BarChart width={500} height={300} data={jobStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applications" fill="#82ca9d" />
            </BarChart>
          </ChartCard>
        </ChartGrid>
      </Container>
    </CompanyLayout>
  );
};

const Container = styled.div`
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      `;

const Title = styled.h1`
  font-size: 2rem;
  color: #1a365d;
  margin-bottom: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatLabel = styled.div`
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  color: #1a365d;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`;

const ChartCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChartTitle = styled.h2`
  font-size: 1.25rem;
  color: #1a365d;
  margin-bottom: 1.5rem;
`;

export default CompanyDashboard;