import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const JobPostEdit = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    recruitJob: '',
    recruitField: 3,
    salary: '',
    postingStatus: true,
    workExperience: '',
    tag: '',
    jobCategory: 'IT/개발',
    postingDeadline: '',
    companyProfileCode: 6,
    skill: '',
    address: ''
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/jobposting/read?no=${code}`);
        setFormData(response.data);
      } catch (err) {
        setError('채용공고를 불러오는데 실패했습니다.');
      }
    };
    fetchJob();
  }, [code]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('token');

      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      await axios.patch(
        `http://localhost:8080/jobposting/modify`,
        formDataToSend,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      navigate(`/jobs/${code}`);
    } catch (err) {
      setError(err.response?.data?.message || '수정에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuillChange = (value) => {
    setFormData(prev => ({
      ...prev,
      content: value
    }));
  };

  if (error) return <ErrorWrapper>{error}</ErrorWrapper>;

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>제목</Label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>상세내용</Label>
          <ReactQuill
            value={formData.content}
            onChange={handleQuillChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>직무</Label>
          <Input
            name="recruitJob"
            value={formData.recruitJob}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>급여</Label>
          <Input
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>기술스택</Label>
          <Input
            name="skill"
            value={formData.skill}
            onChange={handleChange}
          />
        </FormGroup>

        <ButtonGroup>
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? '수정 중...' : '수정하기'}
          </SubmitButton>
          <CancelButton type="button" onClick={() => navigate(`/jobs/${code}`)}>
            취소
          </CancelButton>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
`;

const SubmitButton = styled(Button)`
  background: #3498db;
  color: white;
  border: none;
  &:hover {
    background: #2980b9;
  }
`;

const CancelButton = styled(Button)`
  background: #e74c3c;
  color: white;
  border: none;
  &:hover {
    background: #c0392b;
  }
`;

const ErrorWrapper = styled.div`
  color: red;
  text-align: center;
  padding: 2rem;
`;

export default JobPostEdit;