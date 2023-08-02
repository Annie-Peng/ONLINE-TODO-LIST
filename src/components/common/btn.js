export default function MainBtn({ value, onClick }) {
  return (
    <button
      className="block mx-auto mt-6 px-12 py-3 text-white bg-secondary rounded-[10px] font-bold"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

{
  /* <p className="hidden peer-invalid:block mt-1 text-warning text-sm font-bold">
        此欄位不可為空
      </p> */
}
