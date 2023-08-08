export default function MainBtn({ value, content, onClick }) {
  return (
    <button
      value={value}
      className="block mx-auto mt-6 px-12 py-3 text-white bg-secondary rounded-[10px] font-bold"
      onClick={onClick}
    >
      {content}
    </button>
  );
}
