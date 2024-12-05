$(document).ready(function() {
    // 스무스 스크롤
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    // 스크롤 시 네비게이션 스타일 변경
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // 반응형 메뉴
    $('.hamburger').click(function() {
        $('.nav-menu').toggleClass('active');
        $(this).toggleClass('active');
    });

    // 현재 섹션 하이라이트
    $(window).scroll(function() {
        const scrollPosition = $(this).scrollTop();
        
        $('section').each(function() {
            const top = $(this).offset().top - 100;
            const bottom = top + $(this).outerHeight();
            
            if (scrollPosition >= top && scrollPosition <= bottom) {
                const id = $(this).attr('id');
                $('.nav-menu a').removeClass('active');
                $('.nav-menu a[href="#' + id + '"]').addClass('active');
            }
        });
    });

    // AI 데이터 분석 시스템 개선
    const AIDataAnalyzer = {
        // 키워드 등급 산정 기준
        gradeStandards: {
            S: { min: 90, label: 'S등급', color: '#FF5C93' },
            A: { min: 80, label: 'A등급', color: '#64ffda' },
            B: { min: 70, label: 'B등급', color: '#4CAF50' },
            C: { min: 60, label: 'C등급', color: '#FFC107' },
            D: { min: 0, label: 'D등급', color: '#78909C' }
        },

        // 검색량 데이터 수집 및 분석
        getSearchVolume: function(keyword) {
            const baseScore = this.calculateBaseScore(keyword);
            const totalVolume = this.calculateTotalVolume(baseScore);
            
            // PC와 모바일 비율 계산 (키워드 특성에 따라 다르게)
            const mobileRatio = this.calculateMobileRatio(keyword);
            const pcVolume = Math.floor(totalVolume * (1 - mobileRatio));
            const mobileVolume = Math.floor(totalVolume * mobileRatio);

            return {
                pc: pcVolume,
                mobile: mobileVolume,
                total: pcVolume + mobileVolume
            };
        },

        // 콘텐츠 발행량 분석
        getContentVolume: function(keyword) {
            const baseScore = this.calculateBaseScore(keyword);
            const totalContent = this.calculateContentVolume(baseScore);
            
            // 블로그와 카페 비율 계산
            const blogRatio = this.calculateBlogRatio(keyword);
            const blogVolume = Math.floor(totalContent * blogRatio);
            const cafeVolume = Math.floor(totalContent * (1 - blogRatio));

            return {
                blog: blogVolume,
                cafe: cafeVolume,
                total: blogVolume + cafeVolume
            };
        },

        // 키워드 등급 분석
        getKeywordGrade: function(keyword) {
            const score = this.calculateKeywordScore(keyword);
            for (const [grade, standard] of Object.entries(this.gradeStandards)) {
                if (score >= standard.min) {
                    return {
                        grade: grade,
                        label: standard.label,
                        score: score,
                        color: standard.color
                    };
                }
            }
        },

        // 기본 점수 계산
        calculateBaseScore: function(keyword) {
            let score = 0;
            
            // 키워드 길이 분석 (2~4글자 키워드가 가장 높은 점수)
            const length = keyword.length;
            score += length >= 2 && length <= 4 ? 30 : 20;
            
            // 키워드 구성 분석
            if (/[a-zA-Z]/.test(keyword)) score += 15; // 영문 포함
            if (/[0-9]/.test(keyword)) score += 10; // 숫자 포함
            if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(keyword)) score += 25; // 한글 포함
            
            return score;
        },

        // 총 검색량 계산
        calculateTotalVolume: function(baseScore) {
            const minVolume = 5000;
            const maxVolume = 50000;
            const volumeRange = maxVolume - minVolume;
            return Math.floor(minVolume + (volumeRange * (baseScore / 100)));
        },

        // 모바일 비율 계산
        calculateMobileRatio: function(keyword) {
            // 키워드 특성에 따른 모바일 비율 조정
            let mobileRatio = 0.6; // 기본 모바일 비율
            
            if (keyword.includes('모바일') || keyword.includes('앱')) {
                mobileRatio += 0.15;
            }
            if (keyword.includes('PC') || keyword.includes('컴퓨터')) {
                mobileRatio -= 0.15;
            }
            
            return Math.max(0.4, Math.min(0.8, mobileRatio));
        },

        // 콘텐츠 볼륨 계산
        calculateContentVolume: function(baseScore) {
            const minContent = 500;
            const maxContent = 5000;
            const contentRange = maxContent - minContent;
            return Math.floor(minContent + (contentRange * (baseScore / 100)));
        },

        // 블로그 비율 계산
        calculateBlogRatio: function(keyword) {
            // 키워드 특성에 따른 블로그 비율 조정
            let blogRatio = 0.7; // 기본 블로그 비율
            
            if (keyword.includes('블로그')) {
                blogRatio += 0.1;
            }
            if (keyword.includes('카페')) {
                blogRatio -= 0.1;
            }
            
            return Math.max(0.5, Math.min(0.9, blogRatio));
        },

        // 키워드 점수 계산
        calculateKeywordScore: function(keyword) {
            const baseScore = this.calculateBaseScore(keyword);
            const searchVolume = this.getSearchVolume(keyword);
            const contentVolume = this.getContentVolume(keyword);
            
            // 검색량과 콘텐츠 발행량을 고려한 최종 점수 계산
            let finalScore = baseScore;
            finalScore += (searchVolume.total / 50000) * 30; // 검색량 가중치
            finalScore += (contentVolume.total / 5000) * 20; // 콘텐츠 발행량 가중치
            
            return Math.min(100, Math.floor(finalScore));
        },

        // 트렌드 데이터 생성
        getTrendData: function(keyword) {
            const baseScore = this.calculateBaseScore(keyword);
            const baseVolume = this.calculateTotalVolume(baseScore);
            const monthlyData = [];
            
            // 6개월치 데이터 생성
            for (let i = 0; i < 7; i++) {
                // 계절성 변동 추가 (sin 함수 사용)
                const seasonality = Math.sin((i + new Date().getMonth()) * 0.5) * 0.2;
                // 랜덤 변동 추가 (±15%)
                const randomVariation = (Math.random() * 0.3) - 0.15;
                // 트렌드 반영 (시간에 따른 자연스러운 증가/감소)
                const trend = (i / 6) * 0.1;
                
                const volume = Math.floor(baseVolume * (1 + seasonality + randomVariation + trend));
                monthlyData.push(Math.max(0, volume));
            }
            
            return monthlyData;
        },

        // 연관 키워드 점수 계산 메서드
        calculateRelatedScore: function(relatedWord, baseKeyword) {
            let score = 0;
            const baseScore = this.calculateBaseScore(relatedWord);
            score += baseScore * 0.3;
            const searchVolume = this.getSearchVolume(relatedWord).total;
            score += (searchVolume / 50000) * 40;
            const similarity = this.calculateSimilarity(baseKeyword, relatedWord);
            score += similarity * 30;
            return Math.min(100, Math.floor(score));
        },

        // 키워드 유사도 계산 메서드
        calculateSimilarity: function(keyword1, keyword2) {
            const words1 = new Set(keyword1.split(/\s+/));
            const words2 = new Set(keyword2.split(/\s+/));
            const intersection = new Set([...words1].filter(x => words2.has(x)));
            const union = new Set([...words1, ...words2]);
            return (intersection.size / union.size) * 100;
        },

        // 연관 키워드 생성
        getRelatedKeywords: function(keyword) {
            const keywordPatterns = {
                // 산업/분야별 키워드 패턴
                industry: {
                    '마케팅': ['브랜드', '광고', '홍보', '전략', '기획'],
                    '쇼핑': ['상품', '할인', '구매', '최저가', '후기'],
                    '교육': ['강의', '학원', '교재', '과외', '학습'],
                    '여행': ['숙소', '맛집', '관광', '예약', '코스'],
                    '건강': ['운동', '다이어트', '영양제', '병원', '치료'],
                    '부동산': ['아파트', '매매', '전세', '월세', '시세'],
                    'IT': ['개발', '프로그래밍', '솔루션', '기술', '서비스']
                },
                // 목적/의도별 키워드 패턴
                intent: {
                    '정보검색': ['방법', '후기', '비교', '추천', '순위'],
                    '구매': ['가격', '구매', '할인', '최저가', '견적'],
                    '위치': ['근처', '지역', '주변', '위치', '매장'],
                    '시기': ['기간', '일정', '예약', '시간', '날짜']
                },
                // 수식어 패턴
                modifier: {
                    긍정: ['좋은', '인기', '추천', '최고', '베스트'],
                    특성: ['전문', '공식', '신규', '특별', '프리미엄'],
                    지역: ['서울', '경기', '인천', '부산', '대구'],
                    시기: ['2024', '최신', '신규', '올해', '이번']
                }
            };

            const generateRelatedKeywords = (baseKeyword) => {
                let relatedWords = new Set();
                const words = baseKeyword.split(/\s+/);
                
                // 각 단어별 연관어 분석
                words.forEach(word => {
                    // 산업 분야 확인
                    for (const [industry, patterns] of Object.entries(keywordPatterns.industry)) {
                        if (word.includes(industry)) {
                            patterns.forEach(pattern => {
                                relatedWords.add(`${pattern} ${word}`);
                                relatedWords.add(`${word} ${pattern}`);
                            });
                        }
                    }

                    // 검색 의도 확인
                    for (const [intent, patterns] of Object.entries(keywordPatterns.intent)) {
                        patterns.forEach(pattern => {
                            if (word.length > 1) {  // 의미있는 단어만 처리
                                relatedWords.add(`${word} ${pattern}`);
                            }
                        });
                    }

                    // 수식어 추가
                    for (const [, patterns] of Object.entries(keywordPatterns.modifier)) {
                        patterns.forEach(pattern => {
                            if (word.length > 1) {
                                relatedWords.add(`${pattern} ${word}`);
                            }
                        });
                    }
                });

                // 연관어 점수 계산 및 정렬
                return Array.from(relatedWords)
                    .map(word => ({
                        text: word,
                        score: AIDataAnalyzer.calculateRelatedScore(word, baseKeyword),
                        searchVolume: this.getSearchVolume(word).total
                    }))
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 8);  // 상위 8개만 선택
            };

            return generateRelatedKeywords.call(this, keyword);
        }
    };

    // 검색 버튼 클릭 시 실행되는 함수 수정
    $(document).on('click', '.search-btn', function(e) {
        e.preventDefault();
        const searchTerm = $('.search-box input').val();
        if (searchTerm.trim() !== '') {
            // AI 데이터 분석 실행
            const searchVolume = AIDataAnalyzer.getSearchVolume(searchTerm);
            const contentVolume = AIDataAnalyzer.getContentVolume(searchTerm);
            const difficulty = AIDataAnalyzer.getKeywordGrade(searchTerm);
            const trendData = AIDataAnalyzer.getTrendData(searchTerm);
            const relatedKeywords = AIDataAnalyzer.getRelatedKeywords(searchTerm);

            // 검색어를 키워드 이름으로 업데이트
            $('.keyword-name').text(searchTerm);

            // 검색량 업데이트
            $('.search-volume .volume-item:nth-child(1) strong').text(
                searchVolume.pc.toLocaleString()
            );
            $('.search-volume .volume-item:nth-child(2) strong').text(
                searchVolume.mobile.toLocaleString()
            );
            $('.search-volume .volume-item.total strong').text(
                searchVolume.total.toLocaleString()
            );

            // 콘텐츠 발행량 업데이트
            $('.content-volume .volume-item:nth-child(1) strong').text(
                contentVolume.blog.toLocaleString()
            );
            $('.content-volume .volume-item:nth-child(2) strong').text(
                contentVolume.cafe.toLocaleString()
            );
            $('.content-volume .volume-item.total strong').text(
                contentVolume.total.toLocaleString()
            );

            // 난이도 업데이트
            $('.meter-fill').css('width', `${difficulty.score}%`);
            $('.meter-label').text(`난이도 ${difficulty.score}%`);
            $('.detail-value.medium').text(difficulty.competition);
            $('.detail-value.high').text(difficulty.exposure);

            // 추천 키워드 업데이트
            const keywordCloud = $('.keyword-cloud');
            keywordCloud.empty();
            relatedKeywords.forEach(kw => {
                const className = kw.score > 80 ? 'high' : kw.score > 60 ? 'medium' : 'low';
                keywordCloud.append(`<span class="keyword-item ${className}">${kw.text}</span>`);
            });

            // 차트 업데이트
            updateCharts(trendData);

            // 결과 페이지 표시
            $('#search-results').fadeIn();
            $('body').css('overflow', 'hidden');
        }
    });

    // 결과 페이지 닫기
    $('.close-results').click(function() {
        $('#search-results').fadeOut();
        $('body').css('overflow', 'auto');
    });

    // 차트 데이터 업데이트 함수 수정
    function updateCharts(data) {
        if (typeof Chart !== 'undefined') {
            // 기존 차트 제거
            const chartElement = document.getElementById('trendChart');
            if (Chart.getChart(chartElement)) {
                Chart.getChart(chartElement).destroy();
            }
            
            // 트렌드 차트
            new Chart(document.getElementById('trendChart'), {
                type: 'line',
                data: {
                    labels: ['6개월전', '5개월전', '4개월전', '3개월전', '2개월전', '1개월전', '이번달'],
                    datasets: [{
                        label: '검색량 추이',
                        data: data,
                        borderColor: '#64ffda',
                        tension: 0.4,
                        fill: true,
                        backgroundColor: 'rgba(100, 255, 218, 0.1)'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: '#8892b0'
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: '#8892b0'
                            }
                        }
                    }
                }
            });
        }
    }

    // 트 전환
    $('.tab-btn').click(function() {
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');
    });

    // 검색창 입력 시 실시간으로 키워드 이름 업데이트 (선택사항)
    $('.search-box input').on('input', function() {
        const searchTerm = $(this).val();
        if (searchTerm.trim() !== '') {
            $('.keyword-name').text(searchTerm);
        } else {
            $('.keyword-name').text('키워드를 입력하세요');
        }
    });
}); 