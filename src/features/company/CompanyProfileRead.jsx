import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CompanyLayout from './CompanyLayout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/AuthContent';
import axios from 'axios';


const CompanyProfileRead = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    logo: "https://via.placeholder.com/150", // 기본 로고 경로
    address: "",
    ceo: "",
    companyType: "",
    description: "",
    industry: "",
    website: "",
    activeJobs: [],
  });

  const [companyProfileCode, setCompanyProfileCode] = useState(null); // 추가: 회사 프로필 코드 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchCompanyData = async () => {
      const token = localStorage.getItem("token");
      console.log("Fetching company profile code...");
      console.log("Token:", token);

      try {
        setIsLoading(true);
        setError(null);

        const profileCodeResponse = await axios.get("http://localhost:8080/companyprofile/current", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Profile code response:", profileCodeResponse);

        const profileCode = profileCodeResponse.data;
        setCompanyProfileCode(profileCode); // 회사 프로필 코드 저장

        const response = await axios.get(`http://localhost:8080/companyprofile/read/${profileCode}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Company profile data:", response);

        setCompanyInfo({
          name: response.data.companyName || "회사 이름 없음",
          logo: response.data.uploadFileName || "/default/logo.png",
          address: response.data.companyAddress || "주소 없음",
          ceo: response.data.ceoName || "대표 이름 없음",
          companyType: response.data.companyType || "기업 유형 없음",
          description: response.data.companyDescription || "기업 설명 없음",
          industry: response.data.industry || "업종 정보 없음",
          website: response.data.websiteUrl || "웹사이트 정보 없음",
          activeJobs: response.data.activeJobs || [],
        });
      } catch (error) {
        console.error("Error fetching company data:", error);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        console.log("Finished fetching data. Setting isLoading to false.");
        setIsLoading(false);
      }
    };

    if (token || localStorage.getItem("token")) {
      fetchCompanyData();
    } else {
      console.error("Token is missing.");
    }
  }, [token, navigate]);

  return (
    <CompanyLayout>
      {isLoading ? (
        <div>로딩 중...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Container>
          <ProfileSection>
            <LogoSection>
              <Logo src={companyInfo.logo} alt={companyInfo.name || "로고"} />
            </LogoSection>

            <InfoSection>
              <CompanyName>{companyInfo.name || "회사 이름 없음"}</CompanyName>
              <CompanyType>기업 규모 : {companyInfo.companyType || "정보 없음"}</CompanyType>
              <CeoName>대표명 : {companyInfo.ceo || "정보 없음"}</CeoName>
              <CompanyAddress>주소 : {companyInfo.address || "정보 없음"}</CompanyAddress>
              <Industry>업종 : {companyInfo.industry || "정보 없음"}</Industry>
              <Website href={companyInfo.website || "#"} target="_blank">
                사이트 : {companyInfo.website || "정보 없음"}
              </Website>
              <Description>{companyInfo.description || "설명 없음"}</Description>
            </InfoSection>
          </ProfileSection>
        </Container>
      )}
    </CompanyLayout>
  );
};



const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;


const ProfileSection = styled.div`
  display: flex;
  gap: 3rem;
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 3rem;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  }
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  min-width: 200px;
`;

const Logo = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;


const InfoSection = styled.div`
  flex: 1;
`;

const CompanyName = styled.h1`
  font-size: 2.5rem;
  color: #1a365d;
  margin-bottom: 1rem;
  font-weight: 700;
`;


const Industry = styled.div`
  color: #64748b;
  margin-bottom: 0.5rem;
`;

const CompanyType = styled.div`
  color: #64748b;
  margin-bottom: 0.5rem;
`;

const CeoName = styled.div`
  color: #64748b;
  margin-bottom: 0.5rem;
`;

const CompanyAddress = styled.div`
  color: #64748b;
  margin-bottom: 0.5rem;
`;

const Website = styled.a`
  color: #3182ce;
  text-decoration: none;
  display: inline-block;
  margin-bottom: 1.5rem;
  padding: 0.5rem 1rem;
  background: #ebf8ff;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background: #bee3f8;
    transform: translateY(-1px);
  }
`;

const Description = styled.p`
  color: #1a365d;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;


export default CompanyProfileRead;