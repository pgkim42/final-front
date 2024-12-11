import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContent';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Modal 접근성을 위한 설정

const JobseekerMyPage = () => {
  const {
    name,
    userType,
    email,
    userId,
    companyCode,
    companyType,
    companyName,
    ceoName,
    companyAddress,
  } = useAuth(); // 변경된 AuthContext에서 각 필드를 가져옴

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('MyPage 상태 확인:', {
      name,
      userType,
      email,
      userId,
      companyCode,
      companyType,
      companyName,
      ceoName,
      companyAddress,
    });
  }, [
    name,
    userType,
    email,
    userId,
    companyCode,
    companyType,
    companyName,
    ceoName,
    companyAddress,
  ]);

  const getUserTypeDisplay = (userType) => {
    switch (userType) {
      case 'dev':
        return '일반회원';
      case 'kakao':
      case 'naver':
        return '소셜회원';
      case 'company':
        return '기업회원';
      default:
        return '알 수 없음';
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const resetModalState = () => {
    setPassword('');
    setError('');
  };

  const handleCloseModal = () => {
    resetModalState();
    setIsModalOpen(false);
  };

  const handlePasswordSubmit = async (e) => {
    if (e) e.preventDefault();
  
    try {
      const token = localStorage.getItem('token');
      console.log("토큰값 : " , token);
      
      if (!token) {
        alert('로그인이 필요합니다.');
        navigate('/auth/sign-in'); // 로그인 페이지로 이동
        return;
      }
  
      const response = await fetch('http://localhost:8080/api/v1/check-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ password }), // 비밀번호 입력값 전송
      });
  
      const data = await response.json();
  
      if (response.ok && data.result === 'success') {
        alert('비밀번호 확인 완료');
        navigate('/profile/edit'); // 프로필 수정 페이지로 이동
      } else {
        setError(data.message || '비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('비밀번호 확인 중 오류:', error);
      setError('서버 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const stats = {
    totalApplications: 12,
    ongoingApplications: 5,
    savedJobs: 8,
    resumes: 2,
  };

  return (
    <Container>
      <Title>마이페이지</Title>

      <Grid>
        <Section>
          <SectionTitle>개인정보</SectionTitle>
          <ProfileCard>
            <ProfileInfo>
              <Name>이름: {name}</Name>
              <Type>회원유형: {getUserTypeDisplay(userType)}</Type>
              <Id>아이디: {userId}</Id>
              <Email>이메일: {email}</Email>
            </ProfileInfo>
          </ProfileCard>
          {['dev', 'company'].includes(userType) && (
            <EditButton onClick={handleOpenModal}>비밀번호 수정</EditButton>
          )}
        </Section>

        {userType === "company" && (
          <Section>
            <SectionTitle>기업정보</SectionTitle>
            <ProfileCard>
              <ProfileInfo>
                <CompanyInfo>회사명: {companyName || "정보 없음"}</CompanyInfo>
                <CompanyInfo>업종: {companyType || "정보 없음"}</CompanyInfo>
                <CompanyInfo>대표자명: {ceoName || "정보 없음"}</CompanyInfo>
                <CompanyInfo>주소: {companyAddress || "정보 없음"}</CompanyInfo>
              </ProfileInfo>
            </ProfileCard>
          </Section>
        )}

        <Section>
          <SectionTitle>지원 현황</SectionTitle>
          <StatsGrid>
            <StatCard>
              <StatNumber>{stats.totalApplications}</StatNumber>
              <StatLabel>전체 지원</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.ongoingApplications}</StatNumber>
              <StatLabel>진행중</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.savedJobs}</StatNumber>
              <StatLabel>관심공고</StatLabel>
            </StatCard>
          </StatsGrid>
          <ViewMoreButton as={Link} to="/profile/applications">
            지원 현황 보기
          </ViewMoreButton>
        </Section>

        {userType !== "company" && (
          <Section>
            <SectionTitle>이력서 관리</SectionTitle>
            <ResumeSection>
              <ResumeCount>총 {stats.resumes}개의 이력서</ResumeCount>
              <ResumeButton as={Link} to="/resumes/post">새 이력서 등록</ResumeButton>
              <ResumeButton as={Link} to="/resumes">이력서 관리</ResumeButton>
            </ResumeSection>
          </Section>
        )}
      </Grid>

      {/* 비밀번호 확인 모달 */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="비밀번호 확인"
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          content: {
            width: '400px',
            height: 'fit-content',
            maxHeight: '300px',
            margin: 'auto',
            padding: '20px',
            borderRadius: '8px',
            overflow: 'hidden',
          },
        }}
      >
        <ModalContent>
          <h2>비밀번호 확인</h2>
          {/* 폼으로 감싸고 onSubmit 사용 */}
          <form onSubmit={handlePasswordSubmit}>
            <PasswordInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <ButtonGroup>
              <SubmitButton type="submit">확인</SubmitButton>
              <CancelButton type="button" onClick={handleCloseModal}>취소</CancelButton>
            </ButtonGroup>
          </form>
        </ModalContent>
      </Modal>
    </Container>
  );
};

// 스타일 정의 부분
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const Section = styled.section`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const ProfileCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Name = styled.span`
  color: #000000;
`;

const Id = styled.span`
  color: #000000;
`;

const Email = styled.span`
  color: #000000;
`;

const Type = styled.span`
  color: #000000;
`;

const CompanyInfo = styled.span`
  color: #000000;
`;

const EditButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #3498db;
  border-radius: 6px;
  background: white;
  color: #3498db;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background: #f7f9fc;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
`;

const StatCard = styled.div`
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #7f8c8d;
  margin-top: 0.25rem;
`;

const ViewMoreButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;

  &:hover {
    background: #2980b9;
  }
`;

const ResumeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ResumeCount = styled.div`
  color: #7f8c8d;
  margin-bottom: 0.5rem;
`;

const ResumeButton = styled.button`
  padding: 0.75rem;
  border: 1px solid #3498db;
  border-radius: 6px;
  background: white;
  color: #3498db;
  cursor: pointer;
  text-decoration: none;
  text-align: center;

  &:hover {
    background: #f7f9fc;
  }
`;

const ModalContent = styled.div`
  text-align: center;
`;

const PasswordInput = styled.input`
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  background: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #2980b9;
  }
`;

const CancelButton = styled.button`
  background: #ccc;
  color: #333;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #aaa;
  }
`;

export default JobseekerMyPage;
