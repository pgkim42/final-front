import { useState } from 'react';
import styled from 'styled-components';
import CompanyLayout from './CompanyLayout';
import { useNavigate } from 'react-router-dom';

const CompanyProfileManage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "테크스타트",
    logo: "https://via.placeholder.com/150",
    description: "혁신적인 기술 솔루션을 제공하는 기업입니다.",
    industry: "IT/소프트웨어",
    website: "https://techstart.co.kr",
    address: "서울시 강남구",
    employees: "100-200명",
    foundedYear: "2018"
  });

  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(formData.logo);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({ ...formData, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API 호출 로직
    navigate('/company/profile');
  };

  return (
    <CompanyLayout>
      <Container>
        <Title>기업 정보 수정</Title>
        <Form onSubmit={handleSubmit}>
          <Section>
            <SectionTitle>기본 정보</SectionTitle>

            <LogoSection>
              <LogoPreview src={previewImage} alt="Company Logo" />
              <LogoUpload>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="logo-upload"
                  hidden
                />
                <UploadButton htmlFor="logo-upload">
                  로고 이미지 변경
                </UploadButton>
              </LogoUpload>
            </LogoSection>

            <FormGroup>
              <Label>회사명</Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <Label>업종</Label>
              <Input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <Label>웹사이트</Label>
              <Input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </FormGroup>
          </Section>

          <Section>
            <SectionTitle>상세 정보</SectionTitle>
            <FormGroup>
              <Label>회사 소개</Label>
              <TextArea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={5}
              />
            </FormGroup>

            <FormGroup>
              <Label>주소</Label>
              <Input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <Label>직원수</Label>
              <Input
                type="text"
                value={formData.employees}
                onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
              />
            </FormGroup>

            <FormGroup>
              <Label>설립연도</Label>
              <Input
                type="text"
                value={formData.foundedYear}
                onChange={(e) => setFormData({ ...formData, foundedYear: e.target.value })}
              />
            </FormGroup>
          </Section>

          <ButtonGroup>
            <SaveButton type="submit">저장하기</SaveButton>
            <CancelButton type="button" onClick={() => navigate('/company/profile')}>
              취소
            </CancelButton>
          </ButtonGroup>
        </Form>
      </Container>
    </CompanyLayout>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #1a365d;
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Section = styled.section`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const LogoPreview = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 12px;
  object-fit: cover;
`;

const LogoUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UploadButton = styled.label`
  padding: 0.75rem 1.5rem;
  background: #e2e8f0;
  color: #4a5568;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #cbd5e0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const SaveButton = styled.button`
  padding: 0.75rem 2rem;
  background: #3182ce;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #2c5282;
  }
`;

const CancelButton = styled.button`
  padding: 0.75rem 2rem;
  background: white;
  color: #4a5568;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f7fafc;
  }
`;

export default CompanyProfileManage;