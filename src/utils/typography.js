import Typography from 'typography';
import theme from 'typography-theme-github';

theme.overrideThemeStyles = () => ({
  code: {
    padding: '0.2em 0.4em',
    margin: 0,
    fontSize: '85%',
    backgroundColor: 'rgba(27, 31, 35, 0.05)',
    borderRadius: '3px',
  },
});

const typography = new Typography(theme);

export default typography;
