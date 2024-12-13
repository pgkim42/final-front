import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import PropTypes from 'prop-types';
import {
  GlobalStyle,
  Container,
  Title,
  Label
} from '../../styles/ResumeStyles';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
    return <Container>No resume found.</Container>;
  }

  return (
    <Container>
      <h1>Resume Detail</h1>
      <Section>
        <SectionTitle>Introduction</SectionTitle>
        <Value>{resumeData.introduce}</Value>
      </Section>

      <Section>
        <SectionTitle>Work</SectionTitle>
        <Value>{resumeData.work}</Value>
      </Section>

      <Section>
        <SectionTitle>Experience</SectionTitle>
        {resumeData.experienceDetail.map((exp, index) => (
          <ItemContainer key={index}>
            <Value><strong>Company:</strong> {exp.company}</Value>
            <Value><strong>Department:</strong> {exp.department}</Value>
            <Value><strong>Position:</strong> {exp.position}</Value>
            <Value><strong>Responsibility:</strong> {exp.responsibility}</Value>
            <Value><strong>Salary:</strong> {exp.salary}</Value>
            <Value><strong>Duration:</strong> {exp.startDate} - {exp.endDate}</Value>
          </ItemContainer>
        ))}
      </Section>

      <Section>
        <SectionTitle>Education</SectionTitle>
        {resumeData.education.map((edu, index) => (
          <ItemContainer key={index}>
            <Value><strong>School:</strong> {edu.school}</Value>
            <Value><strong>Major:</strong> {edu.major}</Value>
            <Value><strong>Date:</strong> {edu.date}</Value>
          </ItemContainer>
        ))}
      </Section>

      <Section>
        <SectionTitle>Certifications</SectionTitle>
        {resumeData.certifications.map((cert, index) => (
          <ItemContainer key={index}>
            <Value><strong>Name:</strong> {cert.certificationName}</Value>
            <Value><strong>Issued Date:</strong> {cert.issueDate}</Value>
            <Value><strong>Issuer:</strong> {cert.issuer}</Value>
          </ItemContainer>
        ))}
      </Section>

      <Section>
        <SectionTitle>Language Skills</SectionTitle>
        {resumeData.languageSkills.map((lang, index) => (
          <ItemContainer key={index}>
            <Value><strong>Language:</strong> {lang.language}</Value>
            <Value><strong>Level:</strong> {lang.level}</Value>
          </ItemContainer>
        ))}
      </Section>

      <Section>
        <SectionTitle>Skills</SectionTitle>
        <Value>{resumeData.skill}</Value>
      </Section>

      <Section>
        <SectionTitle>Job Category</SectionTitle>
        <Value>{resumeData.jobCategory}</Value>
      </Section>

      <Section>
        <SectionTitle>Last Updated</SectionTitle>
        <Value>{new Date(resumeData.updateDate).toLocaleString()}</Value>
      </Section>

      <Section>
        <SectionTitle>Uploaded File</SectionTitle>
        <Value>{resumeData.uploadFileName || 'No file uploaded.'}</Value>
      </Section>
    </Container>
  );
};

export default ResumeRead;
