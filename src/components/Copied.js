import { getContrastYIQ } from '../helpers';

const Copied = ({ color }) => {
  return (
    <div
      className="copied"
      style={{
        '--bgColor': `#${color}`,
        '--textColor': `${getContrastYIQ(color)}`,
      }}
    >
      <p>Copied to #{color} Clipboard</p>
    </div>
  );
};
export default Copied;
