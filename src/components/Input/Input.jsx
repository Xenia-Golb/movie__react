/* eslint-disable react/prop-types */
import { Input } from 'antd';
function MyInput({ value, onChange, placeholder, onKeyDown }) {
  return (
    <Input
      className="custom-input"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
      allowClear
    />
  );
}

export default MyInput;
