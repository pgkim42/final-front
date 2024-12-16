import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, Legend } from 'recharts';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

// 메인 컴포넌트
const CompanyOverview = () => {
  const navigate = useNavigate();
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    logo: "https://via.placeholder.com/150",
    address: "",
    ceo: "",
    companyType: "",
    description: "",
    industry: "",
    website: "",
    activeJobs: [],
  });

  const { companyProfileCode } = useParams(); // URL 파라미터 가져오기  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const [applyStats] = useState({
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


  const recruitmentStages = [
    { name: '서류심사', value: 75 },
    { name: '1차면접', value: 45 },
    { name: '2차면접', value: 28 },
    { name: '최종합격', value: 15 }
  ];

  // 지원자 학력 분포
  const educationStats = [
    { name: '고졸', value: 15 },
    { name: '전문대졸', value: 25 },
    { name: '대졸', value: 45 },
    { name: '석사', value: 10 },
    { name: '박사', value: 5 }
  ];

  // 월별 지원자 추이
  const monthlyApplications = [
    { month: '1월', count: 35 },
    { month: '2월', count: 42 },
    { month: '3월', count: 58 },
    { month: '4월', count: 45 }
  ];

  // 직무별 경쟁률
  const competitionRate = [
    { position: '프론트엔드', rate: 15.2 },
    { position: '백엔드', rate: 12.8 },
    { position: 'DevOps', rate: 8.5 },
    { position: '데이터 분석', rate: 10.3 }
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  useEffect(() => {
    if (!companyProfileCode) {
      setError("회사 프로필 코드가 제공되지 않았습니다.");
      setIsLoading(false);
      return;
    }

    const fetchCompanyData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // JWT 토큰 가져오기
        const token = localStorage.getItem("token");

        // API 요청
        const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
        const response = await axios.get(
          `http://localhost:8080/companyprofile/read/${companyProfileCode}`,
          { headers }
        );

        setCompanyInfo({
          name: response.data.companyName || "회사 이름 없음",
          logo: response.data.uploadFileName || "/default/logo.png",
          address: response.data.companyAddress || "주소 없음",
          ceo: response.data.ceoName || "대표 이름 없음",
          companyType: response.data.companyType || "기업 유형 없음",
          description: response.data.companyDescription || "기업 설명 없음",
          industry: response.data.industry || "업종 정보 없음",
          website: response.data.websiteUrl || "웹사이트 정보 없음",
          activeJobs: response.data.activeJobs || [],
        });
      } catch (error) {
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, [companyProfileCode]); // companyProfileCode가 변경될 때마다 실행

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (

    <Container>
      {/* 회사 프로필 */}
      <Section>
        <Logo src={companyInfo.logo} alt="회사 로고" />
        <Info>
          <h1>{companyInfo.name}</h1>
          <p>대표: {companyInfo.ceo}</p>
          <p>주소: {companyInfo.address}</p>
          <p>기업 유형: {companyInfo.companyType}</p>
          <p>업종: {companyInfo.industry}</p>
          <a href={companyInfo.website}>웹사이트 방문</a>
        </Info>
      </Section>

      {/* 채용 대시보드 */}

        <StatsGrid>
          <StatCard>
            <StatLabel>총 지원자</StatLabel>
            <StatValue>{applyStats.totalApplications}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>진행중인 공고</StatLabel>
            <StatValue>{applyStats.activeJobs}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>면접 예정</StatLabel>
            <StatValue>{applyStats.interviewScheduled}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>채용 완료</StatLabel>
            <StatValue>{applyStats.hiredCandidates}</StatValue>
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


      {/* 채용 공고 관리 */}
        <Header>
          <h1>채용공고 관리</h1>
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

        <Header>
          <h1>현재 채용중인 포지션</h1>
        </Header>

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
            </JobCard>
          ))}
        </JobList>

      {/* 통계 */}
        <Header>
          <h1>채용 통계</h1>
        </Header>
        <Grid>
          <Card>
            <CardTitle>채용 단계별 현황</CardTitle>
            <BarChart width={500} height={300} data={recruitmentStages}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </Card>

          <Card>
            <CardTitle>지원자 학력 분포</CardTitle>
            <PieChart width={500} height={300}>
              <Pie
                data={educationStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {educationStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Card>

          <Card>
            <CardTitle>월별 지원자 추이</CardTitle>
            <AreaChart width={500} height={300} data={monthlyApplications}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </Card>

          <Card>
            <CardTitle>직무별 경쟁률</CardTitle>
            <BarChart width={500} height={300} data={competitionRate} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="position" type="category" />
              <Tooltip />
              <Bar dataKey="rate" fill="#0088FE" />
            </BarChart>
          </Card>
        </Grid>
    </Container>
  );
};

// 스타일 정의
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
  display: flex;
  gap: 1rem;
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

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Section = styled.div`
  display: flex;
  gap: 3rem;
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 3rem;
  transition: all 0.3s ease;
`;

const Logo = styled.img`
  width: 160px;
  height: 180px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const Info = styled.div`
  flex: 1;
  color : #64748b;
`;

const Stats = styled.div`
  display: flex;
  gap: 1rem;
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

const JobCard = styled.div`
  max-width: 400px;
  background: #f9f9f9;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
`;

const ChartCard = styled.div`
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`;

const ChartTitle = styled.h2`
  font-size: 1.25rem;
  color: #1a365d;
  margin-bottom: 1.5rem;
`;


const Title = styled.h1`
  font-size: 2rem;
  color: #1a365d;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  color: #1a365d;
  margin-bottom: 1.5rem;
  text-align: center;
`;


export default CompanyOverview;