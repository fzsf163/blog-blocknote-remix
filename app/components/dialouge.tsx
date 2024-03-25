import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import SearchBOX from "./searchbox";
import { Link, useFetcher } from "@remix-run/react";

export default function Dialuge() {
  const fetcher = useFetcher();
  const data = fetcher.data;
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          {" "}
          <div className="mx-auto min-w-[500px] max-w-[800px]">
            <div className="relative flex h-12 w-full items-center overflow-hidden rounded-lg bg-white focus-within:shadow-lg">
              <div className="grid h-full w-12 place-items-center text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <input
                className="peer pointer-events-none h-full w-full bg-black/10 p-2 text-sm font-bold text-gray-600 outline-none"
                type="text"
                id="search"
                name="sq"
                placeholder="Search something.."
              />
            </div>
            {/* {data &&
                // @ts-ignore
                data.map((x) => {
                  return (
                    <p className="absolute" key={x.createdAt}>
                    {x.title}
                    </p>
                    );
                  })} */}
          </div>
        </DialogTrigger>
        <DialogContent className="max-h-[600px] min-w-[800px] overflow-x-hidden overflow-y-scroll">
          <DialogHeader>
            <DialogTitle className="font-mono text-black/40">
              Looking for something?
            </DialogTitle>
            <fetcher.Form action="/search" method="get">
              <SearchBOX fetcher={fetcher}></SearchBOX>
            </fetcher.Form>
          </DialogHeader>
          {
            //@ts-ignore
            data?.p &&
              //@ts-ignore
              data?.p?.map((x) => {
                return (
                  <div key={x.createdAt}>
                    <Link to={`/admin/posts/show/${x.id}`}>
                      <p className="text-lg font-bold">
                        {x.title === "" || x.title === undefined
                          ? null
                          : x.title}
                      </p>
                    </Link>
                    <p className="font-semibold">
                      {x.title === "" || x.title === undefined
                        ? null
                        : x.subTitle}
                    </p>
                    <p className="italic">
                      {x.title === "" || x.title === undefined
                        ? null
                        : x.createdAt}
                    </p>
                  </div>
                );
              })
          }
        </DialogContent>
      </Dialog>
    </div>
  );
}
