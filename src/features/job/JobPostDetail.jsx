import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import JobListBar from './JobListBar';
import { useRef } from 'react';

const { kakao } = window; // 카카오맵 SDK

const JobPostDetail = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [coordinates, setCoordinates] = useState(null); // 위도, 경도 상태 관리

  const mapContainerRef = useRef(null); // 지도 컨테이너 Ref  

  useEffect(() => {
    const checkAuthor = () => {
      const currentUser = localStorage.getItem('userCode');
      if (job && currentUser) {
        setIsAuthor(currentUser === job.userCode);
      }
    };

    checkAuthor();
  }, [job]);

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8080/jobposting/remove/${code}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        navigate('/jobs');
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:8080/jobposting/read?no=${code}`);
        setJob(response.data);

        // 좌표 가져오기
        if (response.data.address) {
          const coordResponse = await axios.get(`http://localhost:8080/kakao-map/coordinates/${response.data.jobCode}`);
          const coordData = coordResponse.data;

          if (coordData.documents.length > 0) {
            setCoordinates({
              lat: parseFloat(coordData.documents[0].y),
              lng: parseFloat(coordData.documents[0].x),
            });
          }
        }
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

  // 좌표 호출 및 지도 표시
  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!job || !job.jobCode) return;

      try {
        const response = await axios.get(`http://localhost:8080/kakao-map/coordinates/${job.jobCode}`);
        console.log('Coordinates response:', response.data); // 로그 확인

        if (response.data.documents.length > 0) {
          const { x: lng, y: lat } = response.data.documents[0];
          setCoordinates({ lat: parseFloat(lat), lng: parseFloat(lng) });

          if (mapContainerRef.current) {
            const map = new kakao.maps.Map(mapContainerRef.current, {
              center: new kakao.maps.LatLng(lat, lng),
              level: 3,
            });

            const marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(lat, lng),
            });

            marker.setMap(map);
          }
        } else {
          console.error('No coordinates found in response.');
        }
      } catch (err) {
        console.error('Error fetching coordinates:', err);
      }
    };

    fetchCoordinates();
  }, [job]);

  if (loading) return <LoadingWrapper>로딩 중...</LoadingWrapper>;
  if (error) return <ErrorWrapper>{error}</ErrorWrapper>;
  if (!job) return null;

  return (
    <Container>
      <MainContent>
        <DetailSection>
          <Header>
            <Title>{job.title}</Title>
            {isAuthor && (
              <ButtonGroup>
                <EditButton onClick={() => navigate(`/jobs/edit/${code}`)}>
                  수정
                </EditButton>
                <DeleteButton onClick={handleDelete}>
                  삭제
                </DeleteButton>
              </ButtonGroup>
            )}
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
              <SectionContent dangerouslySetInnerHTML={{ __html: job.content }} />
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

            <Content>
              {/* 근무지 섹션 */}
              <Section>
                <SectionTitle>근무지</SectionTitle>
                <SectionContent>
                  <p>{job?.address || '주소 정보 없음'}</p>
                  {coordinates && <KakaoMap lat={coordinates.lat} lng={coordinates.lng} />}
                </SectionContent>
              </Section>
            </Content>

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

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
`;

const EditButton = styled(Button)`
  background-color: #3498db;
  color: white;
  border: none;
  &:hover {
    background-color: #2980b9;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #e74c3c;
  color: white;
  border: none;
  &:hover {
    background-color: #c0392b;
  }
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 1rem;
  border: 1px solid #ddd;
`;

const KakaoMap = ({ lat, lng }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!window.kakao || !lat || !lng) return;

    const map = new window.kakao.maps.Map(mapContainerRef.current, {
      center: new window.kakao.maps.LatLng(lat, lng), // 중심 좌표
      level: 3, // 확대 레벨
    });

    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(lat, lng),
    });

    marker.setMap(map);
  }, [lat, lng]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: "100%",
        height: "300px",
        border: "1px solid #ddd",
        marginTop: "1rem",
      }}
    />
  );
};

export default JobPostDetail;