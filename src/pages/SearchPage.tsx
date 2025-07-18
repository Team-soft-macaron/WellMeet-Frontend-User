import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '../styles/theme';
import { RestaurantCard } from '../components/Home/RestaurantCard';

const recentSearches = ['스시', '강남 한식', '프라이빗 룸'];
const popularSearches = [
  '비즈니스 미팅 맛집',
  '성수동 카페',
  '오마카세',
  '데이트 코스',
  '가족 모임'
];

interface SearchResult {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  thumbnail: string;
}

export const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (searchText.trim()) {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/restaurants/search?query=${encodeURIComponent(searchText)}`);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
          setShowResults(true);
        } else {
          console.error('Search failed');
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleRecentSearch = (keyword: string) => {
    setSearchText(keyword);
    handleSearchWithKeyword(keyword);
  };

  const handlePopularSearch = (keyword: string) => {
    setSearchText(keyword);
    handleSearchWithKeyword(keyword);
  };

  const handleSearchWithKeyword = async (keyword: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/restaurants/search?query=${encodeURIComponent(keyword)}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        setShowResults(true);
      } else {
        console.error('Search failed');
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={() => navigate(-1)}>←</button>
        <h1 style={styles.headerTitle}>검색</h1>
        <div style={styles.headerSpacer} />
      </div>

      <div style={styles.content}>
        <div style={styles.searchBarContainer}>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="검색어를 입력하세요"
            style={styles.searchInput}
          />
          <button style={styles.searchButton} onClick={handleSearch}>
            🔍
          </button>
        </div>

        {showResults ? (
          <div>
            <h4 style={styles.resultTitle}>검색 결과</h4>
            {loading ? (
              <div style={styles.loading}>Loading...</div>
            ) : (
              <div>
                {searchResults.length > 0 ? (
                  searchResults.map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      {...restaurant}
                      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                    />
                  ))
                ) : (
                  <div style={styles.noResults}>검색 결과가 없습니다.</div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>최근 검색어</h4>
              <div style={styles.tagContainer}>
                {recentSearches.map((keyword, index) => (
                  <button
                    key={index}
                    style={styles.tag}
                    onClick={() => handleRecentSearch(keyword)}
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>

            <div style={styles.section}>
              <h4 style={styles.sectionTitle}>인기 검색어</h4>
              <div style={styles.popularList}>
                {popularSearches.map((keyword, index) => (
                  <button
                    key={index}
                    style={styles.popularItem}
                    onClick={() => handlePopularSearch(keyword)}
                  >
                    <span style={styles.popularRank}>{index + 1}</span>
                    <span>{keyword}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    backgroundColor: theme.colors.background,
  },
  header: {
    height: 60,
    backgroundColor: 'white',
    borderBottom: `1px solid ${theme.colors.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${theme.spacing.xl}px`,
  },
  backButton: {
    background: 'none',
    border: 'none',
    fontSize: 24,
    cursor: 'pointer',
    padding: theme.spacing.sm,
    marginLeft: `-${theme.spacing.sm}px`,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    overflowY: 'auto' as const,
    overflowX: 'hidden' as const,
    padding: theme.spacing.xl,
    height: '100%',
  },
  searchBarContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    border: `2px solid ${theme.colors.primary}`,
    borderRadius: 25,
    padding: '5px 5px 5px 20px',
    backgroundColor: 'white',
  },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: theme.typography.fontSize.medium,
    padding: '10px 0',
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: theme.colors.primary,
    color: 'white',
    border: 'none',
    fontSize: 20,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultTitle: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xxl,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.semibold,
    marginBottom: theme.spacing.lg,
  },
  tagContainer: {
    display: 'flex',
    gap: theme.spacing.md,
    flexWrap: 'wrap' as const,
  },
  tag: {
    padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
    backgroundColor: theme.colors.inputBackground,
    borderRadius: 20,
    fontSize: theme.typography.fontSize.medium,
    border: 'none',
    cursor: 'pointer',
  },
  popularList: {
    display: 'grid',
    gap: theme.spacing.md,
  },
  popularItem: {
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing.md}px 0`,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.medium,
    textAlign: 'left' as const,
    width: '100%',
  },
  popularRank: {
    fontWeight: theme.typography.fontWeight.bold,
    color: '#FF3B30',
    marginRight: theme.spacing.lg,
    width: 20,
  },
  loading: {
    padding: theme.spacing.xl,
    textAlign: 'center' as const,
    color: theme.colors.textSecondary,
  },
  noResults: {
    padding: theme.spacing.xl,
    textAlign: 'center' as const,
    color: theme.colors.textSecondary,
  },
};