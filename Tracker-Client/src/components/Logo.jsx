const Logo = ({ size = 40, showText = true, className = '', variant = 'default' }) => {
  const iconSize = size;
  const textSize = size * 0.35;

  return (
    <div 
      className={`logo-wrapper ${variant === 'navbar' ? 'logo-navbar' : 'logo-vertical'} ${className}`}
      style={{ 
        display: 'flex',
        flexDirection: variant === 'navbar' ? 'row' : 'column',
        alignItems: 'center',
        gap: variant === 'navbar' ? '0.75rem' : '0.75rem'
      }}
    >
      {/* Logo Icon - Human Figure with Money Bills */}
      <div className="logo-icon-container">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="expense-logo"
        >
          <defs>
            <linearGradient id="moneyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
            <filter id="shadow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
            </filter>
          </defs>

          {/* Money Bills - Green with gradient */}
          <g filter="url(#shadow)">
            {/* Back Bill */}
            <rect 
              x="15" 
              y="25" 
              width="35" 
              height="50" 
              rx="3" 
              fill="url(#moneyGradient)" 
              stroke="#15803d" 
              strokeWidth="1.5" 
              opacity="0.85" 
              transform="rotate(-15 32.5 50)" 
            />
            
            {/* Middle Bill */}
            <rect 
              x="20" 
              y="20" 
              width="35" 
              height="50" 
              rx="3" 
              fill="url(#moneyGradient)" 
              stroke="#15803d" 
              strokeWidth="1.5" 
              opacity="0.9" 
              transform="rotate(-8 37.5 45)" 
            />
            
            {/* Front Bill with Dollar Sign */}
            <rect 
              x="25" 
              y="15" 
              width="35" 
              height="50" 
              rx="3" 
              fill="url(#moneyGradient)" 
              stroke="#15803d" 
              strokeWidth="1.5"
            />
            <circle cx="42.5" cy="40" r="9" fill="#15803d" />
            <text 
              x="42.5" 
              y="46" 
              fontSize="14" 
              fill="white" 
              textAnchor="middle" 
              fontWeight="700" 
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              $
            </text>
          </g>

          {/* Human Figure - Black Silhouette with better proportions */}
          <g filter="url(#shadow)">
            {/* Head */}
            <circle cx="85" cy="25" r="9" fill="#1e293b" />
            
            {/* Body - Curved upward reaching pose */}
            <path
              d="M 85 34 Q 75 48 70 65 Q 68 75 70 85 L 76 90 L 82 85 Q 84 75 82 65 Q 87 48 97 34 Z"
              fill="#1e293b"
            />
            
            {/* Left Arm - Reaching up */}
            <ellipse 
              cx="73" 
              cy="42" 
              rx="5" 
              ry="14" 
              fill="#1e293b" 
              transform="rotate(-35 73 42)" 
            />
            
            {/* Right Arm - Reaching up */}
            <ellipse 
              cx="97" 
              cy="42" 
              rx="5" 
              ry="14" 
              fill="#1e293b" 
              transform="rotate(35 97 42)" 
            />
            
            {/* Legs */}
            <ellipse 
              cx="76" 
              cy="90" 
              rx="6" 
              ry="18" 
              fill="#1e293b" 
              transform="rotate(-12 76 90)" 
            />
            <ellipse 
              cx="86" 
              cy="90" 
              rx="6" 
              ry="18" 
              fill="#1e293b" 
              transform="rotate(12 86 90)" 
            />
          </g>
        </svg>
      </div>

      {/* Text - Expense TRACKER */}
      {showText && (
        <div className="logo-text-container">
          <div
            className="logo-text-expense"
            style={{
              fontWeight: '700',
              fontSize: variant === 'navbar' ? '1.1rem' : `${textSize * 1.3}px`,
              color: variant === 'navbar' ? '#ffffff' : '#1e293b',
              lineHeight: '1.1',
              marginBottom: '3px',
              fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
              letterSpacing: '-0.5px',
            }}
          >
            Expense
          </div>
          <div
            className="logo-text-tracker"
            style={{
              fontWeight: '600',
              fontSize: variant === 'navbar' ? '0.75rem' : `${textSize}px`,
              color: variant === 'navbar' ? 'rgba(255, 255, 255, 0.95)' : '#16a34a',
              letterSpacing: variant === 'navbar' ? '1.5px' : '2px',
              lineHeight: '1',
              fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
              textTransform: 'uppercase',
            }}
          >
            TRACKER
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo;
