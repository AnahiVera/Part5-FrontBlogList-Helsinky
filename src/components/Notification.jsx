
const Notification = ({ message, type = 'info' }) => {
  if (!message) {
    return null;
  }

  const styles = {
    success: {
      color: '#0f5132',
      backgroundColor: '#d1e7dd',
      borderColor: '#17a464ff'
    },
    error: {
      color: '#721c24',
      backgroundColor: '#f8d7da',
      borderColor: '#8b4149ff'
    },
    info: {
      color: '#055160',
      backgroundColor: '#cff4fc',
      borderColor: '#317e8eff'
    }
  };

  const baseStyle = {
    padding: '12px 16px',
    margin: '16px 0',
    border: '2px solid',
    borderRadius: '4px',
    fontWeight: '500',
    textAlign: 'center'
  };

  return (
    <div style={{ ...baseStyle, ...styles[type] }}>
      {message}
    </div>
  );
};

export default Notification;