export function Input({ name, value, placeholder, onChange }) {
  return (
    <input
      className="peer py-3 px-4 rounded-[10px] placeholder:text-tertiary text-medium w-full"
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default function FormInput({
  name,
  content,
  value,
  onChange,
  onBlur,
  placeholder,
}) {
  return (
    <label>
      <p className="mt-4 mb-1 text-sm font-bold">{content}</p>
      <Input
        name={name}
        value={value}
        showContent={content}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
}
