import React from 'react';
import * as Icons from 'lucide-react';

const SafeIcon = ({ name, size = 24, className = '', color }) => {
  const IconComponent = Icons[name] || Icons.HelpCircle;
  
  return (
    <IconComponent 
      size={size} 
      className={className} 
      color={color}
    />
  );
};

export default SafeIcon;