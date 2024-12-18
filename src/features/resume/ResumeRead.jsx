import { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'react-quill/dist/quill.bubble.css';
import {
  GlobalStyle,
  Container,
  Title,
  Label
} from '../../styles/ResumeStyles';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  color: #34495e;
  font-size: 20px;
  margin-bottom: 16px;
`;

const Value = styled.p`
  color: #2c3e50;
  font-size: 16px;
  margin: 0 0 12px 0;
`;

const ItemContainer = styled.div`
  border: 1px solid #bdc3c7;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingText = styled.p`
  color: white;
  font-size: 24px;
`;

// 이력서 상세

const ResumeRead = () => {
  // URL 주소에서 파라미터 추출? 이력서코드
  const { resumeCode } = useParams();
  console.log(resumeCode);

  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apicall = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found. Please log in.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/resume/read/${resumeCode}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          setResumeData(response.data);
        } else {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error fetching resume:', error);
      } finally {
        setIsLoading(false);
      }
    };

    apicall();
  }, [resumeCode]); // 이력서코드 변경되면 API 호출

  if (isLoading) {
    return (
      <LoadingOverlay>
        <LoadingText>이력서 정보를 불러오는 중...</LoadingText>
      </LoadingOverlay>
    );
  }

  if (!resumeData) {
    return <Container>이력서를 찾을 수 없습니다.</Container>;
  }

  return (
    <Container>
      <Value><h1>{resumeData.work}</h1></Value>
      <Section>
        <SectionTitle>자기소개</SectionTitle>
        <Value>{resumeData.introduce}</Value>
      </Section>

      <Section>
        <SectionTitle>경력</SectionTitle>
        {resumeData.experienceDetail.map((exp, index) => (
          <ItemContainer key={index}>
            <Value><strong>회사:</strong> {exp.company}</Value>
            <Value><strong>부서:</strong> {exp.department}</Value>
            <Value><strong>포지션:</strong> {exp.position}</Value>
            <Value><strong>담당업무:</strong> {exp.responsibility}</Value>
            <Value><strong>연봉:</strong> {exp.salary}</Value>
            <Value><strong>재직기간:</strong> {exp.startDate} - {exp.endDate}</Value>
          </ItemContainer>
        ))}
      </Section>

      <Section>
        <SectionTitle>학력</SectionTitle>
        {resumeData.education.map((edu, index) => (
          <ItemContainer key={index}>
            <Value><strong>학교명:</strong> {edu.school}</Value>
            <Value><strong>전공:</strong> {edu.major}</Value>
            <Value><strong>날짜:</strong> {edu.date}</Value>
          </ItemContainer>
        ))}
      </Section>

      <Section>
        <SectionTitle>자격증</SectionTitle>
        {resumeData.certifications.map((cert, index) => (
          <ItemContainer key={index}>
            <Value><strong>자격증명:</strong> {cert.certificationName}</Value>
            <Value><strong>발급일:</strong> {cert.issueDate}</Value>
            <Value><strong>발급기관:</strong> {cert.issuer}</Value>
          </ItemContainer>
        ))}
      </Section>

      <Section>
        <SectionTitle>언어</SectionTitle>
        {resumeData.languageSkills.map((lang, index) => (
          <ItemContainer key={index}>
            <Value><strong>언어:</strong> {lang.language}</Value>
            <Value><strong>수준:</strong> {lang.level}</Value>
          </ItemContainer>
        ))}
      </Section>

      <Section>
        <SectionTitle>기술</SectionTitle>
        <Value>{resumeData.skill}</Value>
      </Section>

      <Section>
        <SectionTitle>직무</SectionTitle>
        <Value>{resumeData.jobCategory}</Value>
      </Section>

      <Section>
        <SectionTitle>이력서</SectionTitle>
        <Value>
          {resumeData.uploadFileName ? (
            <>
              현재 첨부된 이력서:{" "}
              <a
                href={resumeData.uploadFileName}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                {resumeData.uploadFileName.split('/').pop() || "다운로드"}
              </a>
            </>
          ) : (
            "이력서가 첨부되지 않았습니다."
          )}

        </Value>
      </Section>

      <Section>
        <SectionTitle>마지막 수정일</SectionTitle>
        <Value>
          {resumeData.updateDate && !isNaN(new Date(resumeData.updateDate))
            ? format(new Date(resumeData.updateDate), 'yyyy-MM-dd')
            : "수정일이 없습니다."}
        </Value>
      </Section>
    </Container>
  );
};

export default ResumeRead;
