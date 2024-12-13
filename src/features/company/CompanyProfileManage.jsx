import { useState } from 'react';
import styled from 'styled-components';
import CompanyLayout from './CompanyLayout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/AuthContent';

const CompanyProfileManage = () => {
  const navigate = useNavigate();
  const { companyName, companyAddress, ceoName, companyType } = useAuth();

  const [formData, setFormData] = useState({
    name: companyName,
    address: companyAddress,
    ceo: ceoName,
    type: companyType,
  });

  const [isEditMode, setIsEditMode] = useState(false); // 수정/저장 모드 상태
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('로그인이 필요합니다.');
        navigate('/auth/sign-in');
        return;
      }

      const response = await fetch('http://localhost:8080/api/v1/company/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`저장 중 오류가 발생했습니다: ${errorData.message}`);
        return;
      }

      alert('정보가 성공적으로 저장되었습니다.');
      setIsEditMode(false); // 저장 후 수정 모드 종료
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
      alert('저장 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <CompanyLayout>
      <Container>
        <Title>기업 정보 관리</Title>
        <Form onSubmit={handleSubmit}>
          <Section>
            <SectionTitle>기본 정보</SectionTitle>

            <FormGroup>
              <Label>회사명</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                readOnly={!isEditMode}
              />
            </FormGroup>

            <FormGroup>
              <Label>기업형태</Label>
              <Input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                readOnly={!isEditMode}
              />
            </FormGroup>

            <FormGroup>
              <Label>대표명</Label>
              <Input
                type="text"
                name="ceo"
                value={formData.ceo}
                onChange={handleInputChange}
                readOnly={!isEditMode}
              />
            </FormGroup>

            <FormGroup>
              <Label>주소</Label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                readOnly={!isEditMode}
              />
            </FormGroup>
          </Section>

          <ButtonGroup>
            {isEditMode ? (
              <SaveButton type="submit">저장하기</SaveButton>
            ) : (
              <EditButton type="button" onClick={() => setIsEditMode(true)}>
                수정하기
              </EditButton>
            )}
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

const EditButton = styled.button`
  background: #48bb78;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #2f855a;
  }
`;

export default CompanyProfileManage;