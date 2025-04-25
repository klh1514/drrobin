import React, { useState } from 'react';
import { 
  PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
  AreaChart, Area
} from 'recharts';

// 올리브 테마 색상
const themeColors = {
  primary: '#64662E',    // 올리브 그린
  secondary: '#E9A70E',  // 골드 옐로우
  tertiary: '#F2E8CE',   // 라이트 베이지
  darkPrimary: '#4A4B22', // 어두운 올리브
  lightPrimary: '#8A8D3C', // 밝은 올리브
  darkSecondary: '#B27C0B', // 어두운 골드
  lightSecondary: '#F4C542', // 밝은 골드
  background: '#FEFCF8',  // 매우 밝은 베이지 (배경)
  cardBg: '#FFFFFF',     // 카드 배경
  textDark: '#3C3C3C',   // 어두운 텍스트
  textMuted: '#6D6D6D',  // 중간 텍스트
  border: '#E5E0D5',     // 테두리
  accent1: '#8A9436',    // 긍정 색상 (올리브 계열)
  accent2: '#CF2A28',    // 부정 색상 (빨간색)
  accent3: '#E9A70E'     // 중립 색상 (골드 계열)
};

// 대시보드 데이터
const dashboardData = {
  // 1. 감성 분석
  sentimentData: [
    { name: '긍정', value: 435, percent: 87.9, color: themeColors.accent1 },
    { name: '중립', value: 55, percent: 11.1, color: themeColors.accent3 },
    { name: '부정', value: 5, percent: 1.0, color: themeColors.accent2 }
  ],
  
  // 리뷰 모음
  sampleReviews: {
    positive: [
      { author: "하늘바다맘 서울", text: "맛있고 건강한 메뉴가 생각나서 찾은 곳이에요! 그리고 역시.. 기대한 것처럼 맛있고, 먹으면서 왠지 건강해지는 느낌이 들어요 💪🏻💪🏻", date: "4.21.월", link: "https://m.place.naver.com/my/5b9b9c84cdb280e63d705948/review?v=2" },
      { author: "lees71", text: "오랜만에 배는 고픈데 속은 안좋고\r\n그럴땐 건강하고 편한 음식~ 로빈!!! 신메뉴나와서 시금치 파스타. 최애 관자구이~", date: "4.1.화", link: "https://m.place.naver.com/my/5f11c5259ec8258e4ad382a1/review?v=2" },
      { author: "달리달리맘", text: "여러 식당 중 오랜만에 여기로 선택. 아이와 셋이서 즐거운 시간. 적절한 양과 맛. 건강식을 지향하는 닥터로빈.", date: "2.21.수", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" },
      { author: "에덴꿈나무", text: "혼자 갔어도 그냥 입에 맞고 편안해서 좋았어요~^^ 맛있어요~", date: "3.8.금", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" },
      { author: "김맛집", text: "음식이 정말 맛있어요! 특히 샐러드가 신선하고 좋았습니다.", date: "1.15.월", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" }
    ],
    neutral: [
      { author: "huang131", text: "매콤새우파스타 식감이 좋고 새로운 맛이에요. 고사리페스토파스타는 간이 짠 편이어서 아쉬웠습니다.", date: "4.14.일", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" },
      { author: "꽃해리", text: "테이블 거리가 좁아서 옆사람 대화가 잘 들려요. 닥터로빈 음식이 짜지가 않은데 한남점은 저번에 갔을 때보다 간이 센 것 같아요.", date: "4.14.일", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" },
      { author: "오중간", text: "맛은 괜찮은데 가격이 조금 비싸요. 특별한 날에 방문하기 좋을 것 같아요.", date: "1.22.월", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" },
      { author: "김가희", text: "닥터로빈 다른 지점도 가봤는데 한남점은 조금 더 조용한 느낌이네요. 맛은 비슷해요.", date: "2.14.수", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" },
      { author: "좋은날", text: "음식이 나오는데 시간이 조금 걸렸어요. 그래도 맛은 나쁘지 않아요.", date: "3.22.금", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" }
    ],
    negative: [
      { author: "서롱2", text: "다른 닥터로빈이랑 다른 메뉴들이 있어요. 단호박 스프 작게 나와서 좀 아쉬워요.", date: "4.13.토", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" },
      { author: "블루걸57", text: "인스타에서 보고 갔는데 그냥 그랬어요. 매장은 넓고 사람은 별로 없는데 테이블 작은곳으로 안내해 주셔서 그게 조금 아쉬웠어요.", date: "4.14.일", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" },
      { author: "다이어트해얃", text: "통단호박스프를 먹으러왔는데 저녁에만 판다고 해서 그걸 못먹은건 아쉽네요.", date: "12.28.목", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" },
      { author: "실망이84", text: "기대했던 것보다 맛이 평범해서 아쉬웠어요. 가격이 조금 있는데 음식량이 적어요.", date: "2.17.토", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" },
      { author: "김여울", text: "주차가 정말 불편해요. 음식은 괜찮았지만 주차 때문에 다시 방문하기는 어려울 것 같네요.", date: "3.10.일", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" }
    ]
  },
  
  // 2. 카테고리 분석
  categoryData: [
    { name: "음식 맛", count: 441, percent: 42.2, color: themeColors.primary },
    { name: "분위기", count: 203, percent: 19.4, color: themeColors.lightPrimary },
    { name: "건강식", count: 167, percent: 16.0, color: themeColors.secondary },
    { name: "서비스", count: 88, percent: 8.4, color: themeColors.lightSecondary },
    { name: "가격", count: 80, percent: 7.6, color: themeColors.darkSecondary },
    { name: "위생", count: 67, percent: 6.4, color: themeColors.darkPrimary }
  ],
  
  // 카테고리별 감성 데이터
  categoryBulletData: [
    { name: "음식 맛", positive: 91.6, neutral: 7.3, negative: 1.1 },
    { name: "분위기", positive: 94.1, neutral: 4.9, negative: 1.0 },
    { name: "건강식", positive: 98.8, neutral: 1.2, negative: 0.0 },
    { name: "서비스", positive: 90.9, neutral: 6.8, negative: 2.3 },
    { name: "가격", positive: 90.0, neutral: 10.0, negative: 0.0 },
    { name: "위생", positive: 100.0, neutral: 0.0, negative: 0.0 }
  ],
  
  // 카테고리별 리뷰
  categoryReviews: {
    "음식 맛": [
      { author: "하늘바다맘", text: "맛있고 건강한 메뉴가 생각나서 찾은 곳이에요! 기대한 것처럼 맛있고, 먹으면서 왠지 건강해지는 느낌이 들어요", date: "4.21.월", link: "https://m.place.naver.com/my/5b9b9c84cdb280e63d705948/review?v=2" },
      { author: "lees71", text: "미국에서 친한언니 건강때문에 음식 가려야하는데 생각난 닥터로빈!!! 스테이크도 해산물도 넘넘 맛있어요", date: "4.14.월", link: "https://m.place.naver.com/my/5f11c5259ec8258e4ad382a1/review?v=2" },
      { author: "달리달리맘", text: "적절한 양과 맛. 건강식을 지향하는 닥터로빈. 적절한 가격과, 무성한 쌈채소와 입안 가득 꽉 채워지는 맛.", date: "2.21.수", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" }
    ],
    "서비스": [
      { author: "김**", text: "건강한 식단으로 구성되어 있어 자주 방문하게 됩니다. 직원분들도 친절해요.", date: "2.3.토", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" },
      { author: "한**", text: "주문부터 서빙까지 친절하고 빠른 응대가 인상적이었어요.", date: "3.15.금", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" },
      { author: "정**", text: "매니저님이 추천해주신 메뉴가 정말 맛있었습니다. 서비스가 좋아요.", date: "1.20.토", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" }
    ],
    "가격": [
      { author: "박**", text: "가격 대비 퀄리티가 좋고 인테리어도 깔끔해서 좋아요.", date: "1.28.일", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" },
      { author: "김지영", text: "건강식이라 가격이 조금 있는 편이지만 그만한 가치가 있어요.", date: "2.5.월", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" },
      { author: "이**", text: "런치 세트가 가성비 좋았어요. 다음에도 이용할 것 같습니다.", date: "3.2.토", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" }
    ],
    "분위기": [
      { author: "하늘바다맘", text: "맛있고 건강한 메뉴가 생각나서 찾은 곳이에요! 공간도 넓고 좋아요!", date: "4.21.월", link: "https://m.place.naver.com/my/5b9b9c84cdb280e63d705948/review?v=2" },
      { author: "정소셜", text: "친구들과 함께 방문했는데 모두 만족했습니다. 분위기가 아늑하고 대화하기 좋았어요.", date: "2.15.목", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" },
      { author: "강**", text: "인테리어가 예쁘고 식사하기 편안한 공간이에요.", date: "1.10.수", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" }
    ],
    "위생": [
      { author: "최**", text: "매장이 깨끗하고 주방도 오픈되어 있어 위생적인 느낌이 들어요.", date: "3.5.화", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" },
      { author: "한지은", text: "테이블과 수저, 컵 모두 깨끗하게 관리되어 있었어요.", date: "2.23.금", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" },
      { author: "김**", text: "음식뿐만 아니라, 화장실까지 청결하게 관리되어 있어서 좋았습니다.", date: "1.14.일", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" }
    ],
    "건강식": [
      { author: "lees71", text: "오랜만에 배는 고픈데 속은 안좋고 그럴땐 건강하고 편한 음식~ 로빈!!!", date: "4.1.화", link: "https://m.place.naver.com/my/5f11c5259ec8258e4ad382a1/review?v=2" },
      { author: "최**", text: "채식 옵션이 다양해서 좋았어요. 다음에도 방문할 예정입니다.", date: "3.5.화", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" },
      { author: "김건강", text: "건강식을 찾는 사람에게 강추합니다. 다이어트 중인데도 맛있게 먹었어요.", date: "2.10.토", link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" }
    ]
  },
  
  // 3. 월별 방문자 (2024-2025)
  monthlyVisits: [
    { month: "2024-05", visitors: 6, label: "2024.5" },
    { month: "2024-06", visitors: 98, label: "2024.6" },
    { month: "2024-07", visitors: 149, label: "2024.7" },
    { month: "2024-08", visitors: 53, label: "2024.8" },
    { month: "2024-09", visitors: 34, label: "2024.9" },
    { month: "2024-10", visitors: 71, label: "2024.10" },
    { month: "2024-11", visitors: 29, label: "2024.11" },
    { month: "2024-12", visitors: 31, label: "2024.12" },
    { month: "2025-01", visitors: 15, label: "2025.1" },
    { month: "2025-02", visitors: 23, label: "2025.2" },
    { month: "2025-03", visitors: 2, label: "2025.3" },
    { month: "2025-04", visitors: 10, label: "2025.4" }
  ],
  
  // 4. 방문 빈도
  visitFrequencyDistribution: [
    { frequency: "1회", count: 445, percentage: 92.1 },
    { frequency: "2회", count: 30, percentage: 6.2 },
    { frequency: "3회", count: 5, percentage: 1.0 },
    { frequency: "4회", count: 2, percentage: 0.4 },
    { frequency: "5회 이상", count: 1, percentage: 0.2 }
  ],
  
  // 상위 방문자
  topVisitors: [
    { name: "lees71", visits: 15, link: "https://m.place.naver.com/my/5f11c5259ec8258e4ad382a1/review?v=2" },
    { name: "둘아이맘", visits: 3, link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" },
    { name: "goldrosy", visits: 3, link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" },
    { name: "jin****", visits: 3, link: "https://m.place.naver.com/restaurant/1864969019/review/visitor" },
    { name: "하늘바다맘", visits: 2, link: "https://m.place.naver.com/my/5b9b9c84cdb280e63d705948/review?v=2" }
  ],
  
  // lees71의 전체 리뷰
  lees71Reviews: [
    { date: "4.1.화", text: "오랜만에 배는 고픈데 속은 안좋고 그럴땐 건강하고 편한 음식~ 로빈!!! 신메뉴나와서 시금치 파스타. 최애 관자구이~ 다욧으로 애사비, 역시 커피 ☕️👍 나오면서 빵 구입은 필수!!!! 오늘도 혼자 다 먹고 속도 편하고 ~ 아 좋다 ❤️", visitCount: "14번째 방문", link: "https://m.place.naver.com/my/5f11c5259ec8258e4ad382a1/review?v=2" },
    { date: "4.14.월", text: "미국에서 친한언니 건강때문에 음식 가려야하는데 생각난 닥터로빈!!! msg는 절대 못먹고 소화도 잘못하고 맛도 있어야하고 근데 로빈이 딱!!! 스테이크도 해산물도 넘넘 맛있다고 신선하고 특히 사진의 대구김페스토리조토!!!", visitCount: "15번째 방문", link: "https://m.place.naver.com/my/5f11c5259ec8258e4ad382a1/review?v=2" },
    { date: "24.12.23.월", text: "자주가지만 첨 주문한 관자구이 헉 냄새부터가 맛남 풍부한 향과 야들야들한 식감, 넘치지 않는 적당한 소스~ 완전 애정합니다.❤️", visitCount: "13번째 방문", link: "https://m.place.naver.com/my/5f11c5259ec8258e4ad382a1/review?v=2" },
    { date: "24.12.30.월", text: "최애 관자구이~~ 또 또 또 주문~~^^ 스테디 파스타 고사리파스타~~ 역시 마무리는 커피와 빵~", visitCount: "12번째 방문", link: "https://m.place.naver.com/my/5f11c5259ec8258e4ad382a1/review?v=2" },
    { date: "1.16.목", text: "매콤 파스타 오랜만에 크으으으 참 그전에 애사비~~ 최애 관자구이!!! 몸에 좋은 음식 역시 닥터로빈~~", visitCount: "11번째 방문", link: "https://m.place.naver.com/my/5f11c5259ec8258e4ad382a1/review?v=2" },
    { date: "24.11.28.목", text: "오랜만에 눈도 오고해서 따뜻한 커피 한잔하러 왔다가 새로 나온 폴드포크 샌드위치 ~ 오 이건 꽤 컬쳐보고 맛도 좋아!! 그냥 직원분들도 너무너무 친절하셔서 더 맛있게 먹고 나왔습니다.", visitCount: "10번째 방문", link: "https://m.place.naver.com/my/5f11c5259ec8258e4ad382a1/review?v=2" },
    { date: "24.10.22.화", text: "비오는 오후 늦은 점심 몸도 찌뿌둥하고 해서 트러플오일풍기리조또로 결정!!! 역시 탁월한 선택 완전 맛있어~~ 처음 먹어보는데 트러플 향 취향저격~", visitCount: "9번째 방문", link: "https://m.place.naver.com/my/5f11c5259ec8258e4ad382a1/review?v=2" },
    { date: "24.10.8.화", text: "건강한 먹거리 땡길때 들르는 닥터로빈 한남점♡♡♡ 몸 찌뿌둥 입맛없어 고민일때 들르는 닥터로빈~ 간도 좋고 몸도 산득해지는 느낌~", visitCount: "8번째 방문", link: "https://m.place.naver.com/my/5f11c5259ec8258e4ad382a1/review?v=2" },
    { date: "24.10.1.화", text: "닥터로빈 단골 한남점~~ 지나가는길에 빵도 사고 샌드위치도 사고 애사비도 마시고~ 친절한 직원들 건강한 먹거리~~", visitCount: "7번째 방문", link: "https://m.place.naver.com/my/5f11c5259ec8258e4ad382a1/review?v=2" },
    { date: "24.8.30.금", text: "빵이 자꾸 생각나 또 들렀고 시간이 안되서 포장하러~~아아랑 새로 나온 밤팥들은 깜파뉴랑 팥빙수맛나는 밤빙수맛~ 진짜 인생빵~", visitCount: "6번째 방문", link: "https://m.place.naver.com/my/5f11c5259ec8258e4ad382a1/review?v=2" },
    { date: "24.8.20.화", text: "더운 여름 몸이 이리저리 안좋아 기분다운 리프레시하러 기운내 몸에 좋고 맛도 좋은 닥터로빈 찾아가요~~ 점심먹고 아아마시고 너무좋아요~", visitCount: "5번째 방문", link: "https://m.place.naver.com/my/5f11c5259ec8258e4ad382a1/review?v=2" },
    { date: "24.7.21.일", text: "생일모임으로 다시 찾은 닥터로빈 ~~ 맛있고 맛있어서 과식해도 속 부담없어 자주 오게되네요~~ 사진 참 이쁘네요~^^ 올만에 와서 그런지 하나도 빠짐없이 촬영했네~~", visitCount: "4번째 방문", link: "https://m.place.naver.com/my/5f11c5259ec8258e4ad382a1/review?v=2" },
    { date: "24.6.29.토", text: "빵이 맛있어서 단체모임을 위해 미리 전화포장 주문하고 찾으러 간김에 점심을 못먹어 오픈 샌드위치 페스트리 먹으니 맛있네요~~", visitCount: "3번째 방문", link: "https://m.place.naver.com/my/5f11c5259ec8258e4ad382a1/review?v=2" },
    { date: "24.5.31.금", text: "닥터로빈이 한남동에 !!!!~~ 근처에 생겨서 방문~ 가오픈 기간이라 빵과 커피만이라 포장 아아도 진하고 겁나 맛있고 얼그레이스콘이랑 휘낭시에, 포도타르트 너무 맛있어요~", visitCount: "1번째 방문", link: "https://m.place.naver.com/my/5f11c5259ec8258e4ad382a1/review?v=2" },
    { date: "24.6.22.토", text: "정식오픈하고 기다렸다 드뎌 와 봤네요 오늘은 주말이라 브런치!!! 시그니쳐 아보카도 커피 명불허전 빵들도 먹었어요~~ 근데 다 너무 맛있어요~ 스시까지 맛나게 잘먹었네요~", visitCount: "2번째 방문", link: "https://m.place.naver.com/my/5f11c5259ec8258e4ad382a1/review?v=2" }
  ]
};

// 카드 스타일
const cardStyle = {
  backgroundColor: themeColors.cardBg,
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  padding: '20px',
  margin: '0 0 24px 0',
  borderTop: `3px solid ${themeColors.primary}`
};

// 리뷰 카드 스타일
const reviewCardStyle = {
  backgroundColor: themeColors.tertiary,
  borderRadius: '8px',
  padding: '12px',
  marginBottom: '10px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.2s ease',
  cursor: 'pointer'
};

// 대시보드 컴포넌트
const DrRobinDashboardOlive = () => {
  const [activePeriod, setActivePeriod] = useState('all');
  
  // 필터링 함수
  const getFilteredData = (period) => {
    if (period === 'all') {
      return dashboardData.monthlyVisits;
    }
    
    const currentDate = new Date();
    let startMonth = 0;
    
    if (period === '3months') {
      startMonth = currentDate.getMonth() - 3;
    } else if (period === '6months') {
      startMonth = currentDate.getMonth() - 6;
    }
    
    const startDate = new Date(currentDate.getFullYear(), startMonth, 1);
    
    return dashboardData.monthlyVisits.filter(item => {
      const [year, month] = item.month.split('-').map(Number);
      const itemDate = new Date(year, month - 1, 1);
      return itemDate >= startDate;
    });
  };
  
  // 리뷰 클릭 핸들러
  const handleReviewClick = (link) => {
    // 링크 확인 및 보정
    if (!link) {
      alert("리뷰 링크가 존재하지 않습니다.");
      return;
    }
    
    try {
      // 링크 열기 시도
      window.open(link, '_blank', 'noopener,noreferrer');
      
      // 링크가 열리지 않을 경우 안내 메시지 표시
      console.log("리뷰 링크로 이동합니다:", link);
    } catch (error) {
      console.error("링크 열기 오류:", error);
      alert("리뷰 페이지를 열 수 없습니다. 브라우저 설정을 확인해주세요.");
    }
  };
  
  return (
    <div style={{ 
      backgroundColor: themeColors.background, 
      padding: '20px',
      fontFamily: "'Noto Sans KR', 'Segoe UI', sans-serif",
      color: themeColors.textDark
    }}>
      {/* 헤더 */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: themeColors.primary }}>
          닥터로빈 한남점 리뷰 분석 대시보드
        </h1>
        <p className="text-sm" style={{ color: themeColors.textMuted }}>
          데이터 범위: 2024년 5월 - 2025년 4월 • 총 리뷰 수: 522개
        </p>
      </header>
      
      {/* 주요 지표 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow" style={{ borderLeft: `4px solid ${themeColors.primary}` }}>
          <h3 className="text-gray-500 text-sm">전체 리뷰 수</h3>
          <p className="text-3xl font-bold" style={{ color: themeColors.primary }}>522</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow" style={{ borderLeft: `4px solid ${themeColors.accent1}` }}>
          <h3 className="text-gray-500 text-sm">긍정 리뷰 비율</h3>
          <p className="text-3xl font-bold" style={{ color: themeColors.accent1 }}>{dashboardData.sentimentData[0].percent}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow" style={{ borderLeft: `4px solid ${themeColors.secondary}` }}>
          <h3 className="text-gray-500 text-sm">최고 방문 월</h3>
          <p className="text-3xl font-bold" style={{ color: themeColors.secondary }}>2024년 7월</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow" style={{ borderLeft: `4px solid ${themeColors.lightPrimary}` }}>
          <h3 className="text-gray-500 text-sm">최다 방문 고객</h3>
          <p className="text-3xl font-bold" style={{ color: themeColors.lightPrimary }}>15회</p>
        </div>
      </div>
      
      {/* 감성 분석 섹션 */}
      <div style={cardStyle} className="mb-6">
        <h2 className="text-xl font-semibold mb-4" style={{ color: themeColors.primary }}>
          리뷰 감성 분석
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dashboardData.sentimentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${percent}%`}
                  >
                    {dashboardData.sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value}개 (${dashboardData.sentimentData.find(item => item.name === name)?.percent}%)`, name]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <div className="mb-6">
              <h3 className="font-semibold mb-2" style={{ color: themeColors.primary }}>감성 비율</h3>
              {dashboardData.sentimentData.map((item, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span style={{ color: item.color }}>{item.name}</span>
                    <span className="font-semibold">{item.percent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full" 
                      style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm">
                전체 리뷰 중 <strong style={{ color: themeColors.accent1 }}>{dashboardData.sentimentData[0].percent}%</strong>가 긍정적인 리뷰로, 
                고객 만족도가 매우 높습니다. 부정적인 리뷰는 <strong style={{ color: themeColors.accent2 }}>1%</strong>에 불과합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 리뷰 모음 섹션 */}
      <div style={cardStyle} className="mb-6">
        <h2 className="text-xl font-semibold mb-4" style={{ color: themeColors.secondary }}>
          리뷰 모음 (클릭 시 원문 확인)
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {/* 긍정 리뷰 */}
          <div>
            <h3 className="font-semibold mb-3 text-center pb-2" style={{ color: themeColors.accent1, borderBottom: `2px solid ${themeColors.accent1}` }}>
              긍정 리뷰
            </h3>
            <div className="space-y-2">
              {dashboardData.sampleReviews.positive.slice(0, 3).map((review, index) => (
                <div 
                  key={index}
                  style={reviewCardStyle}
                  onClick={() => handleReviewClick(review.link)}
                  className="hover:shadow-md"
                >
                  <p className="text-sm mb-2">{review.text.length > 70 ? `${review.text.substring(0, 70)}...` : review.text}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{review.author}</span>
                    <span>{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 중립 리뷰 */}
          <div>
            <h3 className="font-semibold mb-3 text-center pb-2" style={{ color: themeColors.accent3, borderBottom: `2px solid ${themeColors.accent3}` }}>
              중립 리뷰
            </h3>
            <div className="space-y-2">
              {dashboardData.sampleReviews.neutral.slice(0, 3).map((review, index) => (
                <div 
                  key={index}
                  style={reviewCardStyle}
                  onClick={() => handleReviewClick(review.link)}
                  className="hover:shadow-md"
                >
                  <p className="text-sm mb-2">{review.text.length > 70 ? `${review.text.substring(0, 70)}...` : review.text}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{review.author}</span>
                    <span>{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 부정 리뷰 */}
          <div>
            <h3 className="font-semibold mb-3 text-center pb-2" style={{ color: themeColors.accent2, borderBottom: `2px solid ${themeColors.accent2}` }}>
              부정 리뷰
            </h3>
            <div className="space-y-2">
              {dashboardData.sampleReviews.negative.slice(0, 3).map((review, index) => (
                <div 
                  key={index}
                  style={reviewCardStyle}
                  onClick={() => handleReviewClick(review.link)}
                  className="hover:shadow-md"
                >
                  <p className="text-sm mb-2">{review.text.length > 70 ? `${review.text.substring(0, 70)}...` : review.text}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{review.author}</span>
                    <span>{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* 카테고리 분석 섹션 */}
      <div style={cardStyle} className="mb-6">
        <h2 className="text-xl font-semibold mb-4" style={{ color: themeColors.primary }}>
          카테고리별 분석
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dashboardData.categoryData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={themeColors.border} />
                  <XAxis type="number" />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fontSize: 12 }} 
                  />
                  <Tooltip formatter={(value) => [`${value}개`, '언급 수']} />
                  <Bar dataKey="count" name="언급 수">
                    {dashboardData.categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dashboardData.categoryBulletData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={themeColors.border} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="positive" name="긍정" stackId="a" fill={themeColors.accent1} />
                  <Bar dataKey="neutral" name="중립" stackId="a" fill={themeColors.accent3} />
                  <Bar dataKey="negative" name="부정" stackId="a" fill={themeColors.accent2} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* 카테고리별 리뷰 */}
        <h3 className="font-semibold mb-3" style={{ color: themeColors.secondary }}>카테고리별 추천 리뷰 (클릭 시 원문 확인)</h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(dashboardData.categoryReviews).slice(0, 3).map(([category, reviews]) => (
            <div key={category}>
              <h4 className="font-semibold mb-2 text-center" style={{ 
                color: dashboardData.categoryData.find(c => c.name === category)?.color || themeColors.primary,
                borderBottom: `2px solid ${dashboardData.categoryData.find(c => c.name === category)?.color || themeColors.primary}`,
                paddingBottom: '4px'
              }}>
                {category}
              </h4>
              <div className="space-y-2">
                {reviews.map((review, index) => (
                  <div 
                    key={index} 
                    style={reviewCardStyle}
                    onClick={() => handleReviewClick(review.link)}
                    className="hover:shadow-md"
                  >
                    <p className="text-sm mb-2">{review.text.length > 70 ? `${review.text.substring(0, 70)}...` : review.text}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{review.author}</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {Object.entries(dashboardData.categoryReviews).slice(3, 6).map(([category, reviews]) => (
            <div key={category}>
              <h4 className="font-semibold mb-2 text-center" style={{ 
                color: dashboardData.categoryData.find(c => c.name === category)?.color || themeColors.primary,
                borderBottom: `2px solid ${dashboardData.categoryData.find(c => c.name === category)?.color || themeColors.primary}`,
                paddingBottom: '4px'
              }}>
                {category}
              </h4>
              <div className="space-y-2">
                {reviews.map((review, index) => (
                  <div 
                    key={index} 
                    style={reviewCardStyle}
                    onClick={() => handleReviewClick(review.link)}
                    className="hover:shadow-md"
                  >
                    <p className="text-sm mb-2">{review.text.length > 70 ? `${review.text.substring(0, 70)}...` : review.text}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{review.author}</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 방문 추이 분석 섹션 */}
      <div style={cardStyle} className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold" style={{ color: themeColors.primary }}>
            방문 추이 분석
          </h2>
          <div className="flex bg-gray-100 rounded-lg">
            <button 
              className={`px-3 py-1 text-sm font-medium rounded-l-lg transition-colors ${activePeriod === 'all' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-200'}`}
              style={activePeriod === 'all' ? { backgroundColor: themeColors.primary, color: 'white' } : {}}
              onClick={() => setActivePeriod('all')}
            >
              전체
            </button>
            <button 
              className={`px-3 py-1 text-sm font-medium transition-colors ${activePeriod === '6months' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-200'}`}
              style={activePeriod === '6months' ? { backgroundColor: themeColors.primary, color: 'white' } : {}}
              onClick={() => setActivePeriod('6months')}
            >
              6개월
            </button>
            <button 
              className={`px-3 py-1 text-sm font-medium rounded-r-lg transition-colors ${activePeriod === '3months' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-200'}`}
              style={activePeriod === '3months' ? { backgroundColor: themeColors.primary, color: 'white' } : {}}
              onClick={() => setActivePeriod('3months')}
            >
              3개월
            </button>
          </div>
        </div>
        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={getFilteredData(activePeriod)}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={themeColors.primary} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={themeColors.primary} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={themeColors.border} />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}명`, '방문자 수']} />
              <Legend />
              <Area type="monotone" dataKey="visitors" name="방문자 수" stroke={themeColors.primary} fillOpacity={1} fill="url(#colorVisitors)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 rounded-lg text-center" style={{ backgroundColor: themeColors.tertiary }}>
            <div className="text-sm text-gray-600">전체 방문자 수</div>
            <div className="text-2xl font-bold" style={{ color: themeColors.primary }}>
              {getFilteredData(activePeriod).reduce((sum, item) => sum + item.visitors, 0)}명
            </div>
          </div>
          <div className="p-3 rounded-lg text-center" style={{ backgroundColor: themeColors.tertiary }}>
            <div className="text-sm text-gray-600">평균 월별 방문자</div>
            <div className="text-2xl font-bold" style={{ color: themeColors.primary }}>
              {Math.round(getFilteredData(activePeriod).reduce((sum, item) => sum + item.visitors, 0) / getFilteredData(activePeriod).length)}명
            </div>
          </div>
          <div className="p-3 rounded-lg text-center" style={{ backgroundColor: themeColors.tertiary }}>
            <div className="text-sm text-gray-600">최고 방문 월</div>
            <div className="text-2xl font-bold" style={{ color: themeColors.primary }}>
              2024년 7월
            </div>
          </div>
        </div>
      </div>
      
      {/* 방문 빈도 분석 섹션 */}
      <div style={cardStyle} className="mb-6">
        <h2 className="text-xl font-semibold mb-4" style={{ color: themeColors.secondary }}>
          방문 빈도 분석
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold mb-3" style={{ color: themeColors.primary }}>방문 빈도 분포</h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboardData.visitFrequencyDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke={themeColors.border} />
                  <XAxis dataKey="frequency" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}명`, '고객 수']} />
                  <Bar dataKey="count" name="고객 수" fill={themeColors.primary}>
                    {dashboardData.visitFrequencyDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? themeColors.primary : themeColors.secondary} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3" style={{ color: themeColors.primary }}>상위 방문자 TOP 5</h3>
            <div className="space-y-3">
              {dashboardData.topVisitors.map((visitor, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: themeColors.tertiary }}>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 font-bold text-lg" style={{ 
                      width: '28px', 
                      height: '28px', 
                      lineHeight: '28px', 
                      textAlign: 'center',
                      borderRadius: '50%',
                      backgroundColor: index === 0 ? themeColors.primary : themeColors.secondary,
                      color: 'white'
                    }}>
                      {index + 1}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">{visitor.name}</p>
                      <p className="text-sm text-gray-600">{visitor.visits}회 방문</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleReviewClick(visitor.link)}
                    className="px-3 py-1 text-sm font-medium rounded-lg text-white"
                    style={{ backgroundColor: themeColors.primary }}
                  >
                    리뷰 보기
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 최다 방문자 리뷰 */}
        <div>
          <h3 className="font-semibold mb-3" style={{ color: themeColors.secondary }}>최다 방문자 'lees71'님의 최신 리뷰 (클릭 시 원문 확인)</h3>
          <div className="grid grid-cols-3 gap-3">
            {dashboardData.lees71Reviews.slice(0, 3).map((review, index) => (
              <div 
                key={index} 
                className="p-3 rounded-lg hover:shadow-md cursor-pointer"
                style={{ backgroundColor: themeColors.tertiary }}
                onClick={() => handleReviewClick(review.link)}
              >
                <p className="text-sm mb-2">{review.text.length > 120 ? `${review.text.substring(0, 120)}...` : review.text}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{review.date}</span>
                  <span className="font-semibold" style={{ color: themeColors.primary }}>{review.visitCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 종합 분석 섹션 */}
      <div style={cardStyle} className="mb-6">
        <h2 className="text-xl font-semibold mb-4" style={{ color: themeColors.primary }}>
          종합 분석
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-3 text-lg" style={{ color: themeColors.primary }}>주요 인사이트</h3>
            <ul className="space-y-2 list-disc pl-5">
              <li>전체 리뷰 중 <strong style={{ color: themeColors.accent1 }}>{dashboardData.sentimentData[0].percent}%</strong>가 긍정적인 리뷰로, 전반적인 고객 만족도가 매우 높습니다.</li>
              <li>리뷰에서 가장 많이 언급된 카테고리는 <strong style={{ color: themeColors.primary }}>음식 맛</strong>으로, 전체 언급의 42.2%를 차지합니다.</li>
              <li><strong style={{ color: themeColors.secondary }}>건강식</strong> 관련 언급이 16.0%로 높게 나타나, 건강한 식사를 중시하는 고객들이 많이 방문하는 것으로 보입니다.</li>
              <li>모든 카테고리에서 긍정적 평가가 90% 이상으로 매우 높으며, 특히 <strong style={{ color: themeColors.darkPrimary }}>위생</strong>은 100% 긍정 평가를 받았습니다.</li>
              <li>월별 방문자 수는 2024년 7월에 최고치(149명)를 기록했으며, 이후 다소 감소 추세를 보이고 있습니다.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-lg" style={{ color: themeColors.secondary }}>개선 기회</h3>
            <ul className="space-y-2 list-disc pl-5">
              <li>재방문율은 약 8%로 다소 낮은 편이므로, <strong>충성 고객 확보 전략</strong>이 필요합니다.</li>
              <li>일부 리뷰에서 언급된 '가격', '메뉴 다양성', '테이블 간격' 등에 대한 개선이 필요합니다.</li>
              <li>월별 방문이 계절에 따라 변동이 큰 편으로, <strong>비수기 프로모션</strong>을 통한 방문자 수 안정화가 필요합니다.</li>
              <li>단골 고객의 선호 메뉴인 '관자구이'와 '파스타'를 활용한 <strong>특별 메뉴</strong> 개발을 고려해볼 수 있습니다.</li>
              <li>주중 방문객 증가를 위한 <strong>런치 또는 디너 특선</strong> 메뉴 개발이 효과적일 것으로 보입니다.</li>
            </ul>
          </div>
        </div>
      </div>
      
      <footer className="text-center text-sm mb-4" style={{ color: themeColors.textMuted }}>
        <p>* 이 대시보드는 "drrobinHannam.xlsx" 파일의 522개 리뷰 데이터를 기반으로 작성되었습니다. (데이터 범위: 2024년 5월 - 2025년 4월)</p>
        <p className="mt-2">© 2025 닥터로빈 한남점 리뷰 분석 대시보드 | 마지막 업데이트: 2025년 4월 25일</p>
      </footer>
    </div>
  );
};

export default DrRobinDashboardOlive;
