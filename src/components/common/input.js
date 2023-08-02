function Input({ name, value, showContent, onChange }) {
  return (
    <input
      className="peer mt-1 py-3 px-4 rounded-[10px] placeholder:text-tertiary text-medium w-full"
      name={name}
      value={value}
      placeholder={`請輸入${showContent}`}
      onChange={onChange}
    />
  );
}

export default function FormInput({ name, content, value, onChange }) {
  return (
    <label>
      <p className="mt-4 text-sm font-bold">{content}</p>
      <Input
        name={name}
        value={value}
        showContent={content}
        onChange={onChange}
      />
    </label>
  );
}
