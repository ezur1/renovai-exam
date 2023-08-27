interface Option {
  value: string;
  label: string;
  hidden?: boolean;
}

interface SelectProps {
  options: Option[];
  defaultValue: string;
  value: string | undefined;
  onChange: (value: string) => void;
}

export default function Select({
  options,
  value,
  defaultValue,
  onChange,
}: SelectProps) {
  const selectValue = value ? value : defaultValue;
  return (
    <div className="relative">
      <select
        value={selectValue}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-2 leading-tight border border-gray-400 rounded shadow appearance-none ${
          selectValue !== defaultValue ? "has-value" : ""
        }`}
      >
        <option disabled value={defaultValue}>
          {defaultValue}
        </option>
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            className={`${
              option.hidden && option.value !== selectValue ? "hidden" : ""
            }`}
          >
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-800">
        <svg
          className="fill-white"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
        </svg>
      </div>
    </div>
  );
}
