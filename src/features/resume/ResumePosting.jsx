import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  GlobalStyle,
  Container,
  Title,
  Form,
  FormGroup,
  Input,
  Button,
  QuillWrapper
} from '../../styles/ResumeStyles';

const AddButton = styled(Button)`
  background-color: #3498db;
  &:hover {
    background-color: #2980b9;
  }
`;

const RemoveButton = styled(Button)`
  background-color: #e74c3c;
  &:hover {
    background-color: #c0392b;
  }
`;

const ItemContainer = styled.div`
  border: 1px solid #ced4da;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean']
  ]
};

FormGroup.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

// Main Component
const ResumePosting = ({ onSubmit }) => {
  const createEmptyCareer = () => ({ company: '', position: '', period: '', duties: '' });
  const createEmptyEducation = () => ({ school: '', major: '', degree: '', graduationYear: '' });
  const createEmptyCertification = () => ({ name: '', date: '', issuer: '' });

  const [content, setContent] = useState('');
  const [careers, setCareers] = useState([createEmptyCareer()]);
  const [educations, setEducations] = useState([createEmptyEducation()]);
  const [certifications, setCertifications] = useState([createEmptyCertification()]);
  const [skills, setSkills] = useState('');
  const [languageSkills, setLanguageSkills] = useState('');
  const [resumePdf, setResumePdf] = useState(null);

  const handleInputChange = (setter) => (index, field, value) => {
    setter((prevState) => {
      const updatedState = [...prevState];
      updatedState[index][field] = value;
      return updatedState;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumePdf(file);
    } else {
      alert('PDF 파일만 업로드할 수 있습니다.');
    }
  };

  const validateResume = (data) => {
    if (!data.content.trim()) return '상세 내용을 입력해주세요.';
    if (!data.skills.trim()) return '스킬을 입력해주세요.';
    if (data.careers.some((career) => !career.company.trim())) return '경력의 회사명을 입력해주세요.';
    return null;
  };

  const handleSubmit = async (e) => {
    console.log('Received resume data:', resumeData);
    e.preventDefault();
    const resumeData = { content, careers, educations, certifications, skills, languageSkills, resumePdf };
    const error = validateResume(resumeData);
    if (error) {
      alert(error);
      return;
    }
    onSubmit(resumeData);
  };


  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>이력서 등록</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup label="상세 내용">
            <QuillWrapper>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={MODULES}
                placeholder="상세 내용을 입력해주세요"
              />
            </QuillWrapper>
          </FormGroup>

          <FormGroup label="경력">
            {careers.map((career, index) => (
              <ItemContainer key={index}>
                <Input
                  placeholder="회사명"
                  value={career.company}
                  onChange={(e) => handleInputChange(setCareers)(index, 'company', e.target.value)}
                />
                <Input
                  placeholder="직위"
                  value={career.position}
                  onChange={(e) => handleInputChange(setCareers)(index, 'position', e.target.value)}
                />
                <Input
                  placeholder="근무 기간"
                  value={career.period}
                  onChange={(e) => handleInputChange(setCareers)(index, 'period', e.target.value)}
                />
                <Input
                  placeholder="주요 업무"
                  value={career.duties}
                  onChange={(e) => handleInputChange(setCareers)(index, 'duties', e.target.value)}
                />
                <RemoveButton type="button" onClick={() => setCareers(careers.filter((_, i) => i !== index))}>
                  삭제
                </RemoveButton>
              </ItemContainer>
            ))}
            <AddButton type="button" onClick={() => setCareers([...careers, createEmptyCareer()])}>
              경력 추가
            </AddButton>
          </FormGroup>

          <FormGroup label="학력">
            {educations.map((education, index) => (
              <ItemContainer key={index}>
                <Input
                  placeholder="학교명"
                  value={education.school}
                  onChange={(e) => handleInputChange(setEducations)(index, 'school', e.target.value)}
                />
                <Input
                  placeholder="전공"
                  value={education.major}
                  onChange={(e) => handleInputChange(setEducations)(index, 'major', e.target.value)}
                />
                <Input
                  placeholder="학위"
                  value={education.degree}
                  onChange={(e) => handleInputChange(setEducations)(index, 'degree', e.target.value)}
                />
                <Input
                  placeholder="졸업년도"
                  value={education.graduationYear}
                  onChange={(e) => handleInputChange(setEducations)(index, 'graduationYear', e.target.value)}
                />
                <RemoveButton type="button" onClick={() => setEducations(educations.filter((_, i) => i !== index))}>
                  삭제
                </RemoveButton>
              </ItemContainer>
            ))}
            <AddButton type="button" onClick={() => setEducations([...educations, createEmptyEducation()])}>
              학력 추가
            </AddButton>
          </FormGroup>

          <FormGroup label="자격증">
            {certifications.map((certification, index) => (
              <ItemContainer key={index}>
                <Input
                  placeholder="자격증명"
                  value={certification.name}
                  onChange={(e) => handleInputChange(setCertifications)(index, 'name', e.target.value)}
                />
                <Input
                  placeholder="취득일"
                  value={certification.date}
                  onChange={(e) => handleInputChange(setCertifications)(index, 'date', e.target.value)}
                />
                <Input
                  placeholder="발급기관"
                  value={certification.issuer}
                  onChange={(e) => handleInputChange(setCertifications)(index, 'issuer', e.target.value)}
                />
                <RemoveButton type="button" onClick={() => setCertifications(certifications.filter((_, i) => i !== index))}>
                  삭제
                </RemoveButton>
              </ItemContainer>
            ))}
            <AddButton type="button" onClick={() => setCertifications([...certifications, createEmptyCertification()])}>
              자격증 추가
            </AddButton>
          </FormGroup>

          <FormGroup label="스킬">
            <Input
              placeholder="보유 기술을 입력하세요"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </FormGroup>

          <FormGroup label="이력서 파일(PDF)">
            <Input type="file" accept=".pdf" onChange={handleFileChange} />
          </FormGroup>

          <FormGroup label="언어능력">
            <Input
              placeholder="언어능력을 입력하세요"
              value={languageSkills}
              onChange={(e) => setLanguageSkills(e.target.value)}
            />
          </FormGroup>

          <Button type="submit">이력서 등록하기</Button>
        </Form>
      </Container>
    </>
  );
};
ResumePosting.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ResumePosting;