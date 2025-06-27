import React, { useState } from 'react';
import type { RecommendFormData, AtmosphereType } from '../../types';
import { FormInput } from './FormInput';
import { SelectBox } from './SelectBox';
import { theme } from '../../styles/theme';

interface RecommendFormProps {
  onSubmit: (data: RecommendFormData) => void;
}

const atmosphereOptions: AtmosphereType[] = [
  '고급스러운',
  '조용한',
  '활기찬',
  '클래식한',
  '모던한',
  '깔끔한',
  '로맨틱한'
];

export const RecommendForm: React.FC<RecommendFormProps> = ({ onSubmit }) => {
  const [withWhom, setWithWhom] = useState('');
  const [meetingType, setMeetingType] = useState('');
  const [atmosphere, setAtmosphere] = useState<AtmosphereType | ''>('');
  const [isPressed, setIsPressed] = useState(false);

  const handleSubmit = () => {
    onSubmit({ withWhom, meetingType, atmosphere });
  };

  return (
    <div style={styles.container}>
      <FormInput
        label="누구와 함께 할 건가요?"
        value={withWhom}
        onChange={setWithWhom}
        placeholder="예: 친구, 가족, 동료..."
      />
      
      <FormInput
        label="어떠한 만남인가요?"
        value={meetingType}
        onChange={setMeetingType}
        placeholder="예: 점심, 회의, 데이트..."
      />
      
      <SelectBox
        label="어떤 분위기를 원하시나요?"
        value={atmosphere}
        onChange={setAtmosphere}
        options={atmosphereOptions}
        placeholder="분위기를 선택하세요"
      />
      
      <button
        onClick={handleSubmit}
        style={styles.button(isPressed)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
      >
        추천받기
      </button>
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: theme.spacing.xl,
    overflow: 'auto',
    boxSizing: 'border-box' as const,
    width: '100%',
  },
  
  button: (isPressed: boolean) => ({
    width: '100%',
    padding: '18px',
    fontSize: theme.typography.fontSize.large,
    borderRadius: theme.borderRadius.large,
    background: theme.colors.primary,
    color: theme.colors.background,
    border: 'none',
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: 'pointer',
    transition: theme.transition.default,
    transform: isPressed ? 'scale(0.98)' : 'scale(1)',
    marginTop: theme.spacing.xl,
  }),
};