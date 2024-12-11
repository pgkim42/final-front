import StyledCarousel from '../components/StyledCarousel';
import { Grid, Paper, Typography, Button } from '@mui/material';

const jobTitle = [
  "소프트웨어 엔지니어", "서버 개발자", "웹 개발자", "자바 개발자", "프론트엔드 개발자", "파이썬 개발자", "C,C++ 개발자", "머신러닝 엔지니어", "데이터 엔지니어",
  "시스템,네트워크 관리자", "Node.js 개발자", "DevOps / 시스템 관리자", "안드로이드 개발자", "임베디드 개발자", "개발 매니저", "QA,테스트 엔지니어", "데이터 사이언티스트",
  "iOS 개발자", "보안 엔지니어", "하드웨어 엔지니어", "기술지원", "빅데이터 엔지니어", "프로덕트 매니저", "웹 퍼블리셔", "블록체인 플랫폼 엔지니어", "영상,음성 엔지니어",
  "크로스플랫폼 앱 개발자", "그래픽스 엔지니어", "CTO,Chief Technology Officer", "DBA", "PHP 개발자", ".NET 개발자", "ERP전문가", "BI 엔지니어", "VR 엔지니어",
  "루비온레일즈 개발자", "CIO,Chief Information Officer"
]

const skills = [
  "JavaScript", "Python", "Java", "C++", "TypeScript",
  "React", "Angular", "Vue.js", "Node.js", "Spring",
  "AWS", "Docker", "Kubernetes", "Git", "MySQL",
  "MongoDB", "Redis", "GraphQL", "REST API", "HTML/CSS",
  "Django", "Flask", "TensorFlow", "PyTorch", "Linux",
  "Jenkins", "Elasticsearch", "Go", "Scala", "Swift",
  "PostgreSQL", "Ruby", "PHP", "C#", ".NET Core",
  "RabbitMQ", "Kafka", "CI/CD", "Microservices", "System Design",
  "DevOps", "Android", "iOS", "React Native", "Flutter",
  "Rust", "WebAssembly", "Next.js", "Azure", "GCP"
];

const jobListings = [
  ...Array(12).fill().map(() => ({
    title: jobTitle[Math.floor(Math.random() * jobTitle.length)],
    companyName: "테크스타트",
    location: "서울 강남구",
    companyLogo: "https://via.placeholder.com/150",
    skills:
      [...new Set([...Array(5)].map(() => skills[Math.floor(Math.random() * skills.length)]))]
  })),
]

const Home = () => (
  <div className="home">
    <section className="hero">
      <div className="banner-carousel">
        <StyledCarousel />
      </div>
    </section>
    <section className="job-list">
      <Grid container spacing={3} style={{ marginTop: '2rem' }}>
        {jobListings.map((job, index) => (
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
              <img
                src={job.companyLogo}
                alt={job.companyName}
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
              <Typography variant="h6" style={{ margin: '1rem 0' }}>
                {job.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {job.companyName}
              </Typography>
              <Typography variant="body2" style={{ margin: '0.5rem 0' }}>
                {job.location}
              </Typography>
              <div style={{ marginTop: '1rem' }}>
                {job.skills.map((skill, idx) => (
                  <Button
                    key={idx}
                    variant="outlined"
                    size="small"
                    style={{
                      margin: '4px',
                      textTransform: 'none',
                    }}
                  >
                    {skill}
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

export default Home;