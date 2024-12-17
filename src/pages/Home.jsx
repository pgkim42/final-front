import { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import axios from 'axios';
import StyledCarousel from '../components/StyledCarousel';


// const jobTitle = [
//   "소프트웨어 엔지니어", "서버 개발자", "웹 개발자", "자바 개발자", "프론트엔드 개발자", "파이썬 개발자", "C,C++ 개발자", "머신러닝 엔지니어", "데이터 엔지니어",
//   "시스템,네트워크 관리자", "Node.js 개발자", "DevOps / 시스템 관리자", "안드로이드 개발자", "임베디드 개발자", "개발 매니저", "QA,테스트 엔지니어", "데이터 사이언티스트",
//   "iOS 개발자", "보안 엔지니어", "하드웨어 엔지니어", "기술지원", "빅데이터 엔지니어", "프로덕트 매니저", "웹 퍼블리셔", "블록체인 플랫폼 엔지니어", "영상,음성 엔지니어",
//   "크로스플랫폼 앱 개발자", "그래픽스 엔지니어", "CTO,Chief Technology Officer", "DBA", "PHP 개발자", ".NET 개발자", "ERP전문가", "BI 엔지니어", "VR 엔지니어",
//   "루비온레일즈 개발자", "CIO,Chief Information Officer"
// ]

// const skills = [
//   "JavaScript", "Python", "Java", "C++", "TypeScript",
//   "React", "Angular", "Vue.js", "Node.js", "Spring",
//   "AWS", "Docker", "Kubernetes", "Git", "MySQL",
//   "MongoDB", "Redis", "GraphQL", "REST API", "HTML/CSS",
//   "Django", "Flask", "TensorFlow", "PyTorch", "Linux",
//   "Jenkins", "Elasticsearch", "Go", "Scala", "Swift",
//   "PostgreSQL", "Ruby", "PHP", "C#", ".NET Core",
//   "RabbitMQ", "Kafka", "CI/CD", "Microservices", "System Design",
//   "DevOps", "Android", "iOS", "React Native", "Flutter",
//   "Rust", "WebAssembly", "Next.js", "Azure", "GCP"
// ];

// const jobListings = [
//   ...Array(12).fill().map(() => ({
//     title: jobTitle[Math.floor(Math.random() * jobTitle.length)],
//     companyName: "테크스타트",
//     location: "서울 강남구",
//     companyLogo: "https://via.placeholder.com/150",
//     skills:
//       [...new Set([...Array(5)].map(() => skills[Math.floor(Math.random() * skills.length)]))]
//   })),
// ]



const Home = () => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const ITEM_PER_PAGE = 5; // 페이지당 표시할 아이템 수

  const fetchJobListings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/jobposting/list'); // Job 데이터 가져오기
      if (!response.data) throw new Error('데이터가 없습니다.');

      // 이미지 경로 추가(imgPath 사용)
      const jobWithImage = response.data.map(job => ({
        ...job,
        companyLogo: job.imgPath || 'https://via.placeholder.com/150',
        companyName: job.profile.companyName || '기업명 미상',
        
      }));

      setJobListings(jobWithImage);
    } catch (err) {
      setError(err.message || '데이터를 가져오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }

  };

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchJobListings();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류: {error}</p>;

  return (
    <div className="home">
      <section className="hero">
        <div className="banner-carousel">
          <StyledCarousel />
        </div>
      </section>

      {/* 채용공고 리스트 */}
      <section className="job-list">
        <Grid container spacing={3} style={{ marginTop: '2rem' }}>
          {jobListings.slice(0, ITEM_PER_PAGE).map((job, index) => ( // 첫 페이지 아이템만 표시
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={3}
                style={{
                  padding: '1.5rem',
                  textAlign: 'center',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                {/* 공고 이미지 */}
                <img
                  src={job.companyLogo} // 연동된 이미지 경로
                  alt={job.companyName}
                  style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                />
                공고 정보
                <Typography variant="h6" style={{ margin: '1rem 0' }}>
                  {job.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {job.companyName || '기업명 미상'}
                </Typography>
                <Typography variant="body2" style={{ margin: '0.5rem 0' }}>
                  {job.address || '위치 정보 없음'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  급여: {job.salary || '협의 후 결정'}
                </Typography>
                {/* 기술 스택 */}
                <div style={{ marginTop: '1rem' }}>
                  {job.skill?.split(',').map((skill, idx) => (
                    <Button
                      key={idx}
                      variant="outlined"
                      size="small"
                      style={{ margin: '4px', textTransform: 'none' }}
                    >
                      {skill.trim()}
                    </Button>
                  ))}
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </section>
    </div>
  );
};


// const Home = () => (
//   <div className="home">
//     <section className="hero">
//       <div className="banner-carousel">
//         <StyledCarousel />
//       </div>
//     </section>
//     <section className="job-list">
//       <Grid container spacing={3} style={{ marginTop: '2rem' }}>
//         {jobListings.map((job, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <Paper
//               elevation={3}
//               style={{
//                 padding: '1.5rem',
//                 textAlign: 'center',
//                 borderRadius: '8px',
//                 backgroundColor: '#f9f9f9',
//               }}
//             >
//               <img
//                 src={job.companyLogo}
//                 alt={job.companyName}
//                 style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
//               />
//               <Typography variant="h6" style={{ margin: '1rem 0' }}>
//                 {job.title}
//               </Typography>
//               <Typography variant="body2" color="textSecondary">
//                 {job.companyName}
//               </Typography>
//               <Typography variant="body2" style={{ margin: '0.5rem 0' }}>
//                 {job.location}
//               </Typography>
//               <div style={{ marginTop: '1rem' }}>
//                 {job.skills.map((skill, idx) => (
//                   <Button
//                     key={idx}
//                     variant="outlined"
//                     size="small"
//                     style={{
//                       margin: '4px',
//                       textTransform: 'none',
//                     }}
//                   >
//                     {skill}
//                   </Button>
//                 ))}
//               </div>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </section>
//   </div>
// );

export default Home;