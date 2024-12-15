import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const ITEMS_PER_PAGE = 9;

const JobListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:8080/jobposting/list');
      if (!response.data) throw new Error('데이터가 없습니다.');

      // 데이터를 역순으로 정렬
      const reversedData = [...response.data].reverse();
      // 또는 jobCode 기준으로 정렬하려면:
      // const reversedData = [...response.data].sort((a, b) => b.jobCode - a.jobCode);

      setJobs(reversedData);
      setFilteredJobs(reversedData);
    } catch (err) {
      setError(err.message || '채용공고를 불러오는데 실패했습니다.');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSkillFilter = useCallback((skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  }, []);

  useEffect(() => {
    const filtered = jobs.filter(job => {
      const matchesSearch =
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.address?.toLowerCase().includes(searchTerm.toLowerCase());

      const jobSkills = job.skill?.split(',').map(s => s.trim()) || [];
      const matchesSkills = selectedSkills.length === 0 ||
        selectedSkills.every(skill => jobSkills.includes(skill));

      return matchesSearch && matchesSkills;
    });
    setFilteredJobs(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedSkills, jobs]);

  if (loading) return <LoadingWrapper>로딩 중...</LoadingWrapper>;
  if (error) return <ErrorWrapper>{error}</ErrorWrapper>;

  const pageCount = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Container>
      <Header>
        <Title>채용 공고</Title>
        <SearchBar
          type="text"
          placeholder="직무, 회사, 지역 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Header>

      <FilterSection>
        <SkillFilter>
          {["React", "Vue", "Angular", "Node.js", "Java", "Spring", "AWS"].map(skill => (
            <SkillButton
              key={skill}
              selected={selectedSkills.includes(skill)}
              onClick={() => handleSkillFilter(skill)}
            >
              {skill}
            </SkillButton>
          ))}
        </SkillFilter>
      </FilterSection>

      <JobGrid>
        {filteredJobs.length === 0 ? (
          <NoDataWrapper>검색 결과가 없습니다.</NoDataWrapper>
        ) : (
          currentJobs.map(job => (
            <JobCard key={job.jobCode}>
              <Link to={`/jobs/${job.jobCode}`}>
              {job.imageUrl && (
                <Thumbnail>
                  <img src={job.imageUrl} alt="공고 이미지" />
                </Thumbnail>
              )}
                <JobInfo>
                  <JobTitle>{job.title}</JobTitle>
                  <Location>{job.address}</Location>
                  <Salary>{job.salary}</Salary>
                  <Experience>
                    {job.workExperience === 0
                      ? '신입'
                      : job.workExperience === -1
                        ? '경력무관'
                        : `경력 ${job.workExperience}년`}
                  </Experience>
                  <SkillTags>
                    {job.skill && job.skill.split(',').map((skill, index) => (
                      <SkillTag key={index}>{skill.trim()}</SkillTag>
                    ))}
                  </SkillTags>
                  <Deadline>마감일: {format(new Date(job.postingDeadline), 'yyyy-MM-dd')}</Deadline>
                </JobInfo>
              </Link>
            </JobCard>
          ))
        )}
      </JobGrid>

      {filteredJobs.length > 0 && (
        <Pagination>
          {[...Array(pageCount)].map((_, i) => (
            <PageButton
              key={i + 1}
              active={currentPage === i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </PageButton>
          ))}
        </Pagination>
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
  margin-bottom: 1rem;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const FilterSection = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
`;

const SkillFilter = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const SkillButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: none;
  background: ${props => props.selected ? '#3498db' : '#e2e8f0'};
  color: ${props => props.selected ? 'white' : '#4a5568'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.selected ? '#2980b9' : '#cbd5e0'};
  }
`;

const JobGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const JobCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-4px);
  }
  
  a {
    text-decoration: none;
    color: inherit;
    display: block;
    padding: 1.5rem;
  }
`;

const Location = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const JobInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const JobTitle = styled.h2`
  font-size: 1.25rem;
  color: #2c3e50;
  margin: 0;
`;

const Salary = styled.span`
  color: #2ecc71;
  font-weight: 500;
`;

const Experience = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const SkillTag = styled.span`
  background: #f0f2f5;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  color: #2c3e50;
`;

const Deadline = styled.span`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
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
  background: ${props => props.active ? '#3498db' : '#e2e8f0'};
  color: ${props => props.active ? 'white' : '#4a5568'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.active ? '#2980b9' : '#cbd5e0'};
  }
`;

const LoadingWrapper = styled.div`
  text-align: center;
  padding: 2rem;
`;

const ErrorWrapper = styled.div`
  color: red;
  text-align: center;
  padding: 2rem;
`;

const NoDataWrapper = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 150px;
  overflow: hidden;
  border-bottom: 1px solid #e2e8f0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default JobListPage;