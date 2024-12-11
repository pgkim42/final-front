import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { getResume } from '../../mockApi';
import PropTypes from 'prop-types';
import {
  GlobalStyle,
  Container,
  Title,
  Label
} from '../../styles/ResumeStyles';

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

const ResumeRead = ({ resumeId, onNext }) => {
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const data = await getResume(resumeId);
        setResumeData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('이력서 데이터를 불러오는 중 오류가 발생했습니다:', error);
        setIsLoading(false);
      }
    };

    fetchResumeData();
  }, [resumeId]);

  if (isLoading) {
    return (
      <LoadingOverlay>
        <LoadingText>이력서 정보를 불러오는 중...</LoadingText>
      </LoadingOverlay>
    );
  }

  if (!resumeData) {
    return <div>이력서를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>이력서 상세 정보</Title>

        <Section>
          <SectionTitle>상세 내용</SectionTitle>
          <ReactQuill
            value={resumeData.content}
            readOnly={true}
            theme="bubble"
          />
        </Section>

        <Section>
          <SectionTitle>경력</SectionTitle>
          {resumeData.careers.map((career, index) => (
            <ItemContainer key={index}>
              <Label>회사명</Label>
              <Value>{career.company}</Value>
              <Label>직위</Label>
              <Value>{career.position}</Value>
              <Label>근무 기간</Label>
              <Value>{career.period}</Value>
              <Label>주요 업무</Label>
              <Value>{career.duties}</Value>
            </ItemContainer>
          ))}
        </Section>

        <Section>
          <SectionTitle>학력</SectionTitle>
          {resumeData.educations.map((education, index) => (
            <ItemContainer key={index}>
              <Label>학교명</Label>
              <Value>{education.school}</Value>
              <Label>전공</Label>
              <Value>{education.major}</Value>
              <Label>학위</Label>
              <Value>{education.degree}</Value>
              <Label>졸업년도</Label>
              <Value>{education.graduationYear}</Value>
            </ItemContainer>
          ))}
        </Section>

        <Section>
          <SectionTitle>자격증</SectionTitle>
          {resumeData.certifications.map((certification, index) => (
            <ItemContainer key={index}>
              <Label>자격증명</Label>
              <Value>{certification.name}</Value>
              <Label>취득일</Label>
              <Value>{certification.date}</Value>
              <Label>발급기관</Label>
              <Value>{certification.issuer}</Value>
            </ItemContainer>
          ))}
        </Section>

        <Section>
          <SectionTitle>스킬</SectionTitle>
          <Value>{resumeData.skills}</Value>
        </Section>

        <Section>
          <SectionTitle>이력서 파일</SectionTitle>
          <Value>{resumeData.resumePdf ? resumeData.resumePdf : '파일 없음'}</Value>
        </Section>

        <Section>
          <SectionTitle>언어능력</SectionTitle>
          <Value>{resumeData.languageSkills}</Value>
        </Section>
      </Container>
      {onNext && <button onClick={onNext}>다음 단계로</button>}
    </>
  );
};



ResumeRead.propTypes = {
  resumeId: PropTypes.string.isRequired,
  onNext: PropTypes.func
};

export default ResumeRead;