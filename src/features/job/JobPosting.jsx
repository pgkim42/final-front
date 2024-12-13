import { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f0f2f5;
    font-family: 'Noto Sans KR', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

const Container = styled.div`
  max-width: 950px;
  margin: 40px auto;
  padding: 40px;
  background-color: #ffffff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #34495e;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid ${props => props.hasError ? '#e74c3c' : '#bdc3c7'};
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }
`;

const Button = styled.button`
  padding: 14px 24px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #27ae60;
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 4px;
`;

const QuillWrapper = styled.div`
  .ql-container {
    min-height: 300px; 
    font-size: 1rem;
  }
  
  .ql-editor {
    min-height: 300px;
  }
`;

const MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean']
  ]
};

const experienceOptions = [
  { label: '경력무관', value: -1 },
  { label: '신입', value: 0 },
  { label: '경력', value: 1 },
];


const JobPosting = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    position: '',
    numberOfPositions: '',
    salary: '',
    deadline: '',
    experience: '',
    experienceYears: '', // 경력 연수 필드 추가
    skills: '',
    image: null // 이미지 파일 필드 추가
  });
  const [experienceType, setExperienceType] = useState(''); // 경력 유형 상태 추가

  // handleChange 함수 정의
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = '제목을 입력해주세요';
    if (!formData.description.trim()) newErrors.description = '내용을 입력해주세요';
    if (!formData.position.trim()) newErrors.position = '모집직무를 입력해주세요';
    if (!formData.numberOfPositions) newErrors.numberOfPositions = '모집인원을 입력해주세요';
    if (!formData.deadline) newErrors.deadline = '마감일을 선택해주세요';
    return newErrors;
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleQuillChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      description: content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        // API 호출 여기에 넣을 예정
        // await submitJobPosting(formData);

        console.log('폼 제출됨:', formData);
        // 폼 초기화 또는 리다이렉트
      } catch (error) {
        console.error('제출 오류:', error);
        alert('채용공고 등록 중 오류가 발생했습니다.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>채용 공고 등록</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">제목 *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              hasError={!!errors.title}
              placeholder="채용 공고 제목을 입력해주세요"
            />
            {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">상세 내용 *</Label>
            <QuillWrapper>
              <ReactQuill
                theme="snow"
                value={formData.description}
                onChange={handleQuillChange}
                modules={MODULES}
                placeholder="상세 내용을 입력해주세요"
              />
            </QuillWrapper>
            {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="position">모집직무 *</Label>
            <Input
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              hasError={!!errors.position}
              placeholder="예) 프론트엔드 개발자"
            />
            {errors.position && <ErrorMessage>{errors.position}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="numberOfPositions">모집인원 *</Label>
            <Input
              id="numberOfPositions"
              name="numberOfPositions"
              type="number"
              value={formData.numberOfPositions}
              onChange={handleChange}
              hasError={!!errors.numberOfPositions}
              min="1"
              placeholder="숫자만 입력"
            />
            {errors.numberOfPositions && <ErrorMessage>{errors.numberOfPositions}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="salary">급여</Label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="radio"
                id="salaryInput"
                name="salaryType"
                value="direct"
                checked={!formData.salary.includes('면접 후 결정')}
                onChange={() => setFormData(prev => ({ ...prev, salary: '' }))}
              />
              <label htmlFor="salaryInput">직접입력</label>
              <input
                type="radio"
                id="salaryNegotiable"
                name="salaryType"
                value="negotiable"
                checked={formData.salary === '면접 후 결정'}
                onChange={() => setFormData(prev => ({ ...prev, salary: '면접 후 결정' }))}
              />
              <label htmlFor="salaryNegotiable">면접 후 결정</label>
            </div>
            {!formData.salary.includes('면접 후 결정') && (
              <Input
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="예) 3,500만원"
                style={{ marginTop: '10px' }}
              />
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="deadline">공고마감일 *</Label>
            <Input
              id="deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              hasError={!!errors.deadline}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.deadline && <ErrorMessage>{errors.deadline}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="experience">경력 *</Label>
            <div>
              {experienceOptions.map(option => (
                <div key={option.value} style={{ marginBottom: '10px' }}>
                  <input
                    type="radio"
                    id={`experience-${option.value}`}
                    name="experience"
                    value={option.value}
                    checked={experienceType === option.value}
                    onChange={e => {
                      const value = parseInt(e.target.value);
                      setExperienceType(value);
                      setFormData(prev => ({ ...prev, experience: value }));
                    }}
                  />
                  <label htmlFor={`experience-${option.value}`}>{option.label}</label>
                </div>
              ))}
            </div>
            {experienceType === 1 && (
              <Input
                id="experienceYears"
                name="experienceYears"
                type="number"
                value={formData.experienceYears}
                onChange={e => setFormData(prev => ({ ...prev, experienceYears: e.target.value }))}
                placeholder="경력 연수 (숫자 입력)"
                style={{ marginTop: '10px' }}
              />
            )}
            {errors.experience && <ErrorMessage>{errors.experience}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="skills">보유스킬</Label>
            <Input
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="예) React, JavaScript, Node.js (쉼표로 구분)"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="image">공고 이미지</Label>
            <Input
              id="image"
              name="image"
              type="file"
              onChange={handleFileChange}
              style={{ marginTop: '10px' }}
            />
          </FormGroup>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '등록 중...' : '채용공고 등록하기'}
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default JobPosting;