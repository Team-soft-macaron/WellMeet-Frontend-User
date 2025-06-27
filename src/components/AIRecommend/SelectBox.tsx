import React, { useState } from 'react';
import { theme } from '../../styles/theme';
import type { AtmosphereType } from '../../types';

interface SelectBoxProps {
  label: string;
  value: AtmosphereType | '';
  onChange: (value: AtmosphereType | '') => void;
  options: AtmosphereType[];
  placeholder?: string;
}

export const SelectBox: React.FC<SelectBoxProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = '선택하세요'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSelect = (option: AtmosphereType) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.label}>{label}</h2>
      <div style={styles.selectWrapper}>
        <div
          style={styles.selectBox(isFocused || isOpen)}
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsFocused(true)}
          onMouseLeave={() => setIsFocused(false)}
        >
          <span style={styles.selectedValue(!!value)}>
            {value || placeholder}
          </span>
          <span style={styles.arrow(isOpen)}>▼</span>
        </div>
        
        {isOpen && (
          <div style={styles.optionsList}>
            {options.map((option) => (
              <div
                key={option}
                style={styles.option(value === option)}
                onClick={() => handleSelect(option)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.colors.activeBackground;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 
                    value === option ? theme.colors.activeBackground : theme.colors.background;
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: theme.spacing.xxl,
    position: 'relative' as const,
  },
  
  label: {
    marginBottom: theme.spacing.lg,
    fontSize: theme.typography.fontSize.xlarge,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
  },
  
  selectWrapper: {
    position: 'relative' as const,
  },
  
  selectBox: (isFocused: boolean) => ({
    width: '100%',
    padding: theme.spacing.lg,
    fontSize: theme.typography.fontSize.regular,
    borderRadius: theme.borderRadius.medium,
    border: `1px solid ${isFocused ? theme.colors.primary : theme.colors.borderLight}`,
    backgroundColor: theme.colors.backgroundSecondary,
    boxSizing: 'border-box' as const,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: theme.transition.default,
  }),
  
  selectedValue: (hasValue: boolean) => ({
    color: hasValue ? theme.colors.text : theme.colors.textSecondary,
  }),
  
  arrow: (isOpen: boolean) => ({
    fontSize: '12px',
    color: theme.colors.textSecondary,
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: theme.transition.default,
  }),
  
  optionsList: {
    position: 'absolute' as const,
    top: '100%',
    left: 0,
    right: 0,
    marginTop: '4px',
    backgroundColor: theme.colors.background,
    border: `1px solid ${theme.colors.borderLight}`,
    borderRadius: theme.borderRadius.medium,
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    zIndex: 10,
    maxHeight: '240px',
    overflow: 'auto',
  },
  
  option: (isSelected: boolean) => ({
    padding: theme.spacing.lg,
    fontSize: theme.typography.fontSize.regular,
    color: theme.colors.text,
    backgroundColor: isSelected ? theme.colors.activeBackground : theme.colors.background,
    cursor: 'pointer',
    transition: theme.transition.default,
  }),
};