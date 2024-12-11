import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ListHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const CompanySection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
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
  margin-bottom: 1.5rem;
`;

const JobTitle = styled.h2`
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillTag = styled.span`
  background: #f0f2f5;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  color: #2c3e50;
`;


const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const JobGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const JobCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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

const JobListBar = ({ jobs, type }) => {
  const getTitleAndDescription = () => {
    if (type === 'similarJobs') {
      return {
        title: '유사 채용 공고',
        description: '해당 포지션과 유사한 채용 공고를 확인하세요.',
      };
    } else if (type === 'Jobs') {
      return {
        title: '모든 채용 공고',
        description: '현재 모든 채용 정보를 확인하세요.',
      };
    } else {
      return {
        title: '채용 공고',
        description: '현재 모집 중인 포지션을 확인하세요.',
      };
    }
  };

  const { title, description } = getTitleAndDescription();

  return (
    <Container>
      <ListHeader>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </ListHeader>

      <JobGrid>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard key={job.id}>
              <Link to={`/jobs/${job.id || ''}`}>
                <CompanySection>
                  <CompanyLogo src={job.companyLogo} alt={job.companyName} />
                  <CompanyInfo>
                    <CompanyName>{job.companyName}</CompanyName>
                    <Location>{job.location}</Location>
                  </CompanyInfo>
                </CompanySection>
                <JobInfo>
                  <JobTitle>{job.title}</JobTitle>
                  <SkillList>
                    {(job.skills || []).map((skill, index) => (
                      <SkillTag key={index}>{skill}</SkillTag>
                    ))}
                  </SkillList>
                </JobInfo>
              </Link>
            </JobCard>
          ))
        ) : (
          <p>채용 공고가 없습니다.</p>
        )}
      </JobGrid>
    </Container>
  );
};

JobListBar.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      companyLogo: PropTypes.string,
      companyName: PropTypes.string.isRequired,
      location: PropTypes.string,
      title: PropTypes.string.isRequired,
      skills: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  type: PropTypes.oneOf(['similarJobs', 'Jobs']).isRequired,
};

export default JobListBar;