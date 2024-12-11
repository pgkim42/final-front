import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const dummyJobs = [
  {
    id: 1,
    title: "시니어 프론트엔드 개발자",
    companyName: "테크스타트",
    location: "서울 강남구",
    companyLogo: "https://via.placeholder.com/50",
    skills: ["React", "TypeScript", "Node.js"],
    deadline: "2024-04-30",
    salary: "6000만원 이상",
    experience: "5년 이상"
  },
  {
    id: 2,
    title: "백엔드 개발자",
    companyName: "네오테크",
    location: "서울 서초구",
    companyLogo: "https://via.placeholder.com/50",
    skills: ["Java", "Spring", "MySQL"],
    deadline: "2024-05-15",
    salary: "4500만원 이상",
    experience: "3년 이상"
  },
  {
    id: 3,
    title: "DevOps 엔지니어",
    companyName: "클라우드테크",
    location: "서울 성동구",
    companyLogo: "https://via.placeholder.com/50",
    skills: ["AWS", "Docker", "Kubernetes"],
    deadline: "2024-05-20",
    salary: "5000만원 이상",
    experience: "4년 이상"
  }
];

const ITEMS_PER_PAGE = 9;

const JobListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredJobs, setFilteredJobs] = useState(dummyJobs);

  const handleSkillFilter = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  useEffect(() => {
    const filtered = dummyJobs.filter(job => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSkills =
        selectedSkills.length === 0 ||
        selectedSkills.every(skill => job.skills.includes(skill));

      return matchesSearch && matchesSkills;
    });

    setFilteredJobs(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedSkills]);

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
        {currentJobs.map(job => (
          <JobCard key={job.id}>
            <Link to={`/jobs/${job.id}`}>
              <CompanySection>
                <CompanyLogo src={job.companyLogo} alt={job.companyName} />
                <CompanyInfo>
                  <CompanyName>{job.companyName}</CompanyName>
                  <Location>{job.location}</Location>
                </CompanyInfo>
              </CompanySection>
              <JobInfo>
                <JobTitle>{job.title}</JobTitle>
                <Salary>{job.salary}</Salary>
                <Experience>{job.experience}</Experience>
                <SkillTags>
                  {job.skills.map(skill => (
                    <SkillTag key={skill}>{skill}</SkillTag>
                  ))}
                </SkillTags>
                <Deadline>마감일: {job.deadline}</Deadline>
              </JobInfo>
            </Link>
          </JobCard>
        ))}
      </JobGrid>

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

const CompanySection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CompanyLogo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompanyName = styled.span`
  font-weight: 600;
  color: #2c3e50;
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

export default JobListPage;