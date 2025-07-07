import React from 'react';
import { theme } from '../../styles/theme';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = '찾고 싶은 맛집이나 장소를 입력하세요',
  onSearch 
}) => {
  return (
    <div style={styles.searchBar} onClick={onSearch}>
      <span style={styles.searchIcon}>🔍</span>
      <input 
        type="text" 
        placeholder={placeholder}
        style={styles.input}
        readOnly
      />
    </div>
  );
};

const styles = {
  searchBar: {
    width: '100%',
    height: 50,
    backgroundColor: theme.colors.inputBackground,
    borderRadius: 25,
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  },
  searchIcon: {
    fontSize: 20,
    marginRight: theme.spacing.md,
  },
  input: {
    flex: 1,
    border: 'none',
    background: 'none',
    outline: 'none',
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.text,
  },
};