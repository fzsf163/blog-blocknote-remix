type props = {
  title_text: string;
  count: number | string;
  bgImage: string;
};
export default function Stat_Box({ count, bgImage, title_text }: props) {
  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className={`relative h-[250px]   min-w-0 rounded bg-cover bg-scroll bg-center bg-no-repeat p-3 shadow-lg w-[100%]  sm:w-[30%]  md:lg:w-[30%]`}
    >
      <h2 className="mb-2 mt-10 rounded bg-white/30 p-4 text-center text-xs font-bold text-white  backdrop-blur-md  sm:text-lg md:text-xl lg:text-2xl">
        {title_text ?? "Title Here"}
      </h2>
      {/* <h3 className="mb-2 text-lg font-semibold">Total</h3> */}
      <p className=" mx-auto w-fit rounded-full  bg-white/90 px-4  py-2 text-center text-xs  font-bold text-gray-500 backdrop-blur-md sm:text-lg md:text-xl lg:text-2xl">
        {count ?? "2000"}
      </p>
    </div>
  );
}
