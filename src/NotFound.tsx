import underConstruction from './assets/under-construction.jpg';

const NotFound = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      paddingBlockStart: 60,
    }}
  >
    <img style={{ width: '40%' }} src={underConstruction} alt='under construction' />
    <h1 style={{ fontSize: 32, color: '#2d65e4' }}>Page under construction!</h1>
  </div>
);

export default NotFound;
