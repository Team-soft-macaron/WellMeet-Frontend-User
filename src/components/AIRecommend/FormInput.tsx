import React, { useState } from 'react';
import { theme } from '../../styles/theme';

interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  value, 
  onChange, 
  placeholder 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={styles.container}>
      <h2 style={styles.label}>{label}</h2>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={styles.input(isFocused)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

const styles = {
  container: {
    marginBottom: theme.spacing.xxl,
  },
  
  label: {
    marginBottom: theme.spacing.lg,
    fontSize: theme.typography.fontSize.xlarge,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text,
  },
  
  input: (isFocused: boolean) => ({
    width: '100%',
    padding: theme.spacing.lg,
    fontSize: theme.typography.fontSize.regular,
    borderRadius: theme.borderRadius.medium,
    border: `1px solid ${isFocused ? theme.colors.primary : theme.colors.borderLight}`,
    backgroundColor: isFocused ? theme.colors.background : theme.colors.backgroundSecondary,
    boxSizing: 'border-box' as const,
    outline: 'none',
    transition: theme.transition.default,
  }),
};