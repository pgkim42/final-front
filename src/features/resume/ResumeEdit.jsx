import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getResume } from '../../mockApi';
import {
  GlobalStyle,
  Container,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  QuillWrapper
} from '../../styles/ResumeStyles';


const FileInput = styled(Input)`
  padding: 10px;
  &::file-selector-button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #3498db;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #2980b9;
    }
  }
`;

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

const MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean']
  ]
};

const ResumeEdit = ({ resumeId, initialData, onSubmit }) => {
  const [content, setContent] = useState('');
  const [careers, setCareers] = useState([{ company: '', position: '', period: '', duties: '' }]);
  const [educations, setEducations] = useState([{ school: '', major: '', degree: '', graduationYear: '' }]);
  const [certifications, setCertifications] = useState([{ name: '', date: '', issuer: '' }]);
  const [skills, setSkills] = useState('');
  const [resumePdf, setResumePdf] = useState(null);
  const [languageSkills, setLanguageSkills] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (initialData) {
      setContent(initialData.content);
      setCareers(initialData.careers);
      setEducations(initialData.educations);
      setCertifications(initialData.certifications);
      setSkills(initialData.skills);
      setLanguageSkills(initialData.languageSkills);
      setResumePdf(initialData.resumePdf);
      setIsLoading(false);
    } else {
      const fetchResumeData = async () => {
        try {
          const data = await getResume(resumeId);
          setContent(data.content);
          setCareers(data.careers);
          setEducations(data.educations);
          setCertifications(data.certifications);
          setSkills(data.skills);
          setLanguageSkills(data.languageSkills);
          setResumePdf(data.resumePdf);
          setIsLoading(false);
        } catch (error) {
          console.error('이력서 데이터를 불러오는 중 오류가 발생했습니다:', error);
          setIsLoading(false);
        }
      };

      fetchResumeData();
    }
  }, [resumeId, initialData]);

  const handleCareerChange = (index, field, value) => {
    const newCareers = [...careers];
    newCareers[index][field] = value;
    setCareers(newCareers);
  };

  const handleEducationChange = (index, field, value) => {
    const newEducations = [...educations];
    newEducations[index][field] = value;
    setEducations(newEducations);
  };

  const handleCertificationChange = (index, field, value) => {
    const newCertifications = [...certifications];
    newCertifications[index][field] = value;
    setCertifications(newCertifications);
  };

  const addCareer = () => {
    setCareers([...careers, { company: '', position: '', period: '', duties: '' }]);
  };

  const addEducation = () => {
    setEducations([...educations, { school: '', major: '', degree: '', graduationYear: '' }]);
  };

  const addCertification = () => {
    setCertifications([...certifications, { name: '', date: '', issuer: '' }]);
  };

  const removeCareer = (index) => {
    const newCareers = careers.filter((_, i) => i !== index);
    setCareers(newCareers);
  };

  const removeEducation = (index) => {
    const newEducations = educations.filter((_, i) => i !== index);
    setEducations(newEducations);
  };

  const removeCertification = (index) => {
    const newCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(newCertifications);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const updatedData = {
      content,
      careers,
      educations,
      certifications,
      skills,
      languageSkills,
      resumePdf: resumePdf ? resumePdf.name : null
    };
    onSubmit(updatedData);
  };

  if (isLoading) {
    return (
      <LoadingOverlay>
        <LoadingText>이력서 정보를 불러오는 중...</LoadingText>
      </LoadingOverlay>
    );
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>이력서 수정</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="content">상세 내용</Label>
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

          <FormGroup>
            <Label>경력</Label>
            {careers.map((career, index) => (
              <ItemContainer key={index}>
                <Input
                  placeholder="회사명"
                  value={career.company}
                  onChange={(e) => handleCareerChange(index, 'company', e.target.value)}
                />
                <Input
                  placeholder="직위"
                  value={career.position}
                  onChange={(e) => handleCareerChange(index, 'position', e.target.value)}
                />
                <Input
                  placeholder="근무 기간"
                  value={career.period}
                  onChange={(e) => handleCareerChange(index, 'period', e.target.value)}
                />
                <Input
                  placeholder="주요 업무"
                  value={career.duties}
                  onChange={(e) => handleCareerChange(index, 'duties', e.target.value)}
                />
                <RemoveButton type="button" onClick={() => removeCareer(index)}>삭제</RemoveButton>
              </ItemContainer>
            ))}
            <AddButton type="button" onClick={addCareer}>경력 추가</AddButton>
          </FormGroup>

          <FormGroup>
            <Label>학력</Label>
            {educations.map((education, index) => (
              <ItemContainer key={index}>
                <Input
                  placeholder="학교명"
                  value={education.school}
                  onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                />
                <Input
                  placeholder="전공"
                  value={education.major}
                  onChange={(e) => handleEducationChange(index, 'major', e.target.value)}
                />
                <Input
                  placeholder="학위"
                  value={education.degree}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                />
                <Input
                  placeholder="졸업년도"
                  value={education.graduationYear}
                  onChange={(e) => handleEducationChange(index, 'graduationYear', e.target.value)}
                />
                <RemoveButton type="button" onClick={() => removeEducation(index)}>삭제</RemoveButton>
              </ItemContainer>
            ))}
            <AddButton type="button" onClick={addEducation}>학력 추가</AddButton>
          </FormGroup>

          <FormGroup>
            <Label>자격증</Label>
            {certifications.map((certification, index) => (
              <ItemContainer key={index}>
                <Input
                  placeholder="자격증명"
                  value={certification.name}
                  onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
                />
                <Input
                  placeholder="취득일"
                  value={certification.date}
                  onChange={(e) => handleCertificationChange(index, 'date', e.target.value)}
                />
                <Input
                  placeholder="발급기관"
                  value={certification.issuer}
                  onChange={(e) => handleCertificationChange(index, 'issuer', e.target.value)}
                />
                <RemoveButton type="button" onClick={() => removeCertification(index)}>삭제</RemoveButton>
              </ItemContainer>
            ))}
            <AddButton type="button" onClick={addCertification}>자격증 추가</AddButton>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="skills">스킬</Label>
            <Input
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="보유 기술을 입력하세요"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="resumePdf">이력서 파일(PDF)</Label>
            <FileInput
              id="resumePdf"
              type="file"
              accept=".pdf"
              onChange={(e) => setResumePdf(e.target.files[0])}
            />
            {resumePdf && <span>현재 파일: {resumePdf.name}</span>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="languageSkills">언어능력</Label>
            <Input
              id="languageSkills"
              value={languageSkills}
              onChange={(e) => setLanguageSkills(e.target.value)}
              placeholder="언어능력을 입력하세요"
            />
          </FormGroup>

          <Button type="submit">이력서 수정하기</Button>
        </Form>
      </Container>
    </>
  );
};
ResumeEdit.propTypes = {
  resumeId: PropTypes.string.isRequired,
  initialData: PropTypes.shape({
    content: PropTypes.string,
    careers: PropTypes.array,
    educations: PropTypes.array,
    certifications: PropTypes.array,
    skills: PropTypes.string,
    languageSkills: PropTypes.string,
    resumePdf: PropTypes.any
  }),
  onSubmit: PropTypes.func.isRequired
};

export default ResumeEdit;