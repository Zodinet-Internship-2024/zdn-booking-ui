import React from 'react';

const SportFieldRuleCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-primary-100 p-6 overflow-y-auto w-[360px] h-[360px] rounded-4xl hover:bg-primary-200">
      {children}
    </div>
  );
};

export default SportFieldRuleCard;
