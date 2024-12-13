import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import JobListBar from './JobListBar';

const JobPostDetail = () => {
  const { code } = useParams();
  const [job, setJob] = useState(null);
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:8080/jobposting/read?no=${code}`);
        setJob(response.data);
      } catch (err) {
        setError(err.message || '상세 정보를 불러오는데 실패했습니다.');
        console.error('Error fetching job details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [code]);

  useEffect(() => {
    const fetchRecentJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/jobposting/list');
        const sortedJobs = response.data
          .filter(j => j.jobCode !== parseInt(code))
          .sort((a, b) => new Date(b.postingDate) - new Date(a.postingDate))
          .slice(0, 3);
        setRecentJobs(sortedJobs);
      } catch (err) {
        console.error('Error fetching recent jobs:', err);
      }
    };

    fetchRecentJobs();
  }, [code]);

  if (loading) return <LoadingWrapper>로딩 중...</LoadingWrapper>;
  if (error) return <ErrorWrapper>{error}</ErrorWrapper>;
  if (!job) return null;

  return (
    <Container>
      <MainContent>
        <DetailSection>
          <Header>
            <Title>{job.title}</Title>
            <SubInfo>
              <InfoItem>
                <Icon viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </Icon>
                {job.address}
              </InfoItem>
              <InfoItem>
                <Icon viewBox="0 0 24 24">
                  <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
                </Icon>
                {job.workExperience === 0
                  ? '신입'
                  : job.workExperience === -1
                    ? '경력무관'
                    : `경력 ${job.workExperience}년`}
              </InfoItem>
            </SubInfo>
          </Header>

          <Content>
            <Section>
              <SectionTitle>직무</SectionTitle>
              <SectionContent>{job.recruitJob}</SectionContent>
            </Section>

            <Section>
              <SectionTitle>상세내용</SectionTitle>
              <SectionContent>{job.content}</SectionContent>
            </Section>

            <Section>
              <SectionTitle>급여</SectionTitle>
              <SectionContent>{job.salary}</SectionContent>
            </Section>

            <Section>
              <SectionTitle>기술스택</SectionTitle>
              <SkillTags>
                {job.skill && job.skill.split(',').map((skill, index) => (
                  <SkillTag key={index}>{skill.trim()}</SkillTag>
                ))}
              </SkillTags>
            </Section>

            <Section>
              <SectionTitle>마감일</SectionTitle>
              <SectionContent>{format(new Date(job.postingDeadline), 'yyyy년 MM월 dd일')}</SectionContent>
            </Section>
          </Content>
        </DetailSection>

        <RecentJobsSection>
          <SectionTitle>최신 채용공고</SectionTitle>
          <RecentJobsGrid>
            {recentJobs.map(job => (
              <JobCard key={job.jobCode}>
                <Link to={`/jobs/${job.jobCode}`}>
                  <JobTitle>{job.title}</JobTitle>
                  <JobInfo>
                    <div>{job.recruitJob}</div>
                    <div>{job.address}</div>
                    <SkillTags>
                      {job.skill && job.skill.split(',').map((skill, index) => (
                        <SkillTag key={index}>{skill.trim()}</SkillTag>
                      ))}
                    </SkillTags>
                  </JobInfo>
                </Link>
              </JobCard>
            ))}
          </RecentJobsGrid>
        </RecentJobsSection>
      </MainContent>
      <SideBar>
        <JobListBar />
      </SideBar>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  gap: 2rem;
`;

const MainContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const SideBar = styled.div`
  width: 300px;
  flex-shrink: 0;
  position: sticky;
  top: 2rem;
  height: fit-content;
`;


const DetailSection = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const SubInfo = styled.div`
  display: flex;
  gap: 1.5rem;
  color: #666;
`;

const InfoItem = styled.span`
  display: flex;
  align-items: center;
  font-size: 1rem;
`;

const Icon = styled.svg`
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
  fill: currentColor;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const SectionContent = styled.div`
  font-size: 1rem;
  color: #4a4a4a;
  line-height: 1.6;
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const SkillTag = styled.span`
  background: #e9ecef;
  color: #495057;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #dee2e6;
  }
`;

const LoadingWrapper = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.25rem;
  color: #666;
`;

const ErrorWrapper = styled.div`
  color: #e74c3c;
  text-align: center;
  padding: 2rem;
  font-size: 1.25rem;
`;

const RecentJobsSection = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const RecentJobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const JobCard = styled.div`
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-4px);
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const JobTitle = styled.h3`
  font-size: 1.1rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
`;

const JobInfo = styled.div`
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

export default JobPostDetail;