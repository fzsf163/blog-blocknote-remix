type props = {
  title_text: string;
  count: number | string;
  bgImage: string;
};
export default function Stat_Box({ count, bgImage, title_text }: props) {
  const img = "/assests/d-5.jpg";
  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className={`relative h-[250px]  w-[30%] min-w-0 rounded bg-cover bg-center bg-no-repeat bg-scroll shadow-lg p-3`}
    >
      <h2 className="mb-2 mt-10 bg-white/30 text-center text-2xl font-bold  text-white  backdrop-blur-md p-4 rounded">
        {title_text ?? "Title Here"}
      </h2>
      {/* <h3 className="mb-2 text-lg font-semibold">Total</h3> */}
      <p className=" bg-white/90 text-center  text-4xl font-bold  text-gray-500 backdrop-blur-md w-fit mx-auto px-4 py-2 rounded-full">
        {count ?? "2000"}
      </p>
    </div>
  );
}
