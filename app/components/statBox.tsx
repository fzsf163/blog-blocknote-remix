type props = {
  title_text: string;
  count: number | string;
  emoji: string;
};

export default function Stat_Box({ count, emoji, title_text }: props) {
  return (
    <div className="relative w-fit min-w-[200px] rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white shadow-lg">
      <span className="absolute -left-2 -top-3 text-4xl">
        {emoji ? emoji : "💖"}{" "}
      </span>
      <h2 className="mb-2 text-xl font-semibold ml-2">
        {title_text ?? "Title Here"}
      </h2>
      {/* <h3 className="mb-2 text-lg font-semibold">Total</h3> */}
      <p className="font-mono text-4xl font-bold text-gray-200 ml-2">
        {count ?? "2000"}
      </p>
    </div>
  );
}
