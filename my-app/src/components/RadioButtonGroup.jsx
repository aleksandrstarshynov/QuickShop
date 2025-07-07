
import '../styles/RadioGroup.css';

const RadioGroup = ({ options, value, onChange, name, disabled = false }) => (
  <div className="radio-group">
    {options.map(opt => {
      const isChecked = value === opt.value;
      return (
        <label
          key={opt.value}
          className={`radio-option${disabled ? ' disabled' : ''}`}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={isChecked}
            onChange={() => onChange(opt.value)}
            disabled={disabled}
          />
          <span className="radio-label">{opt.label}</span>
        </label>
      );
    })}
  </div>
);

export default RadioGroup;
