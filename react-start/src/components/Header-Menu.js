const HeaderMenu = ({ onMenuType }) => {
  return (
    <header
      style={{
        padding: '10px 20px',
        background: '#2c3e50',
        color: 'white',
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
      }}
    >
      <button onClick={() => onMenuType('Monitoring')} style={{ cursor: 'pointer' }}>
        Device Solution Monitoring 조회 시스템
      </button>
      <button onClick={() => onMenuType('Map')} style={{ cursor: 'pointer' }}>
        Device Solution Map 조회 시스템
      </button>
      <button onClick={() => onMenuType('Analysis')} style={{ cursor: 'pointer' }}>
        Device Solution Analysis 조회 시스템
      </button>
    </header>
  );
};

export default HeaderMenu;
