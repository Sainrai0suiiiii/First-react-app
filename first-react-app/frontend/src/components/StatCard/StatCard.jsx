import React from 'react';
import './StatCard.css';

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendValue, 
  color = 'blue',
  loading = false 
}) => {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-header">
        <div className="stat-icon">
          {Icon && <Icon />}
        </div>
        {trend && (
          <div className={`stat-trend ${trend}`}>
            {trend === 'up' ? '↗' : '↘'} {trendValue}
          </div>
        )}
      </div>
      
      <div className="stat-content">
        <h3 className="stat-title">{title}</h3>
        <div className="stat-value">
          {loading ? (
            <div className="stat-loading"></div>
          ) : (
            value
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard; 