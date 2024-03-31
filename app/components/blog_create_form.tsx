import MyDropzone from "~/components/dragNdrop.client";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ClientOnly } from "remix-utils/client-only";

import EditorBlockNote from "~/components/blockNote.client";

import { DropdownMenuCheckboxesCategory } from "~/components/categoryCheckbox";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

type BlogFormData = {
  blogData: {
    title: string;
    subtitle: string;
    keywords: string;
    readtime: string;
  };
  setBlogData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      subtitle: string;
      keywords: string;
      readtime: string;
    }>
  >;
  category: {
    c1: string;
    c2: string;
    c3: string;
  };
  setCategory: React.Dispatch<
    React.SetStateAction<{
      c1: string;
      c2: string;
      c3: string;
    }>
  >;
  thumbImg: string;
  setThumbImg: React.Dispatch<React.SetStateAction<string>>;
  data: string | undefined;
  setData: React.Dispatch<React.SetStateAction<string | undefined>>;
  html?: string | undefined;
  setHTML?: React.Dispatch<React.SetStateAction<string | undefined>>;
  fetcher?: any;
  method: string | undefined;
  resetData: () => void;
};

export default function Blog_Form_box({
  blogData,
  category,
  data,
  setBlogData,
  setCategory,
  setData,
  setThumbImg,
  thumbImg,
  method,
  fetcher,
  resetData,
  html,
  setHTML,
}: BlogFormData) {
  return (
    <div className="h-auto w-full space-y-7 rounded-md p-8 text-black [&_input]:ring-offset-black [&_input]:focus-within:ring-0 [&_input]:focus-within:ring-black [&_input]:focus-visible:ring-0 [&_label]:font-mono [&_textarea]:max-w-full  [&_textarea]:rounded-sm   [&_textarea]:bg-white/80 [&_textarea]:font-mono [&_textarea]:font-bold [&_textarea]:placeholder:font-semibold">
      <div className="space-y-3">
        <Label htmlFor="title_blog" className="text-lg font-bold capitalize  ">
          Title for your blog <em>(required)</em>
        </Label>
        <Textarea
          placeholder="Enter a Title for your blog"
          id="title_blog"
          title="Title"
          className="p-6  text-lg "
          value={blogData.title}
          onChange={(x) =>
            setBlogData({ ...blogData, title: x.currentTarget.value })
          }
          required
        ></Textarea>
      </div>
      <div className="space-y-3">
        <Label htmlFor="subtitle_blog" className="text-lg font-bold capitalize">
          Sub Title for your blog (optional)
        </Label>
        <Textarea
          id="subtitle_blog"
          title="subtitle"
          className="p-6 text-lg "
          placeholder="Enter a subtitle for your blog"
          value={blogData.subtitle}
          onChange={(x) =>
            setBlogData({ ...blogData, subtitle: x.currentTarget.value })
          }
        ></Textarea>
      </div>
      <div className="space-y-3">
        <Label htmlFor="keywords_blog" className="text-lg font-bold capitalize">
          Key Words <em>(required)</em>
        </Label>
        <Textarea
          id="keywords_blog"
          title="keywords"
          className="p-6 text-lg "
          placeholder="Enter some key words, separated by comma"
          value={blogData.keywords}
          onChange={(x) =>
            setBlogData({ ...blogData, keywords: x.currentTarget.value })
          }
        ></Textarea>
      </div>
      <div className="flex items-center justify-start gap-5">
        <div className="flex items-center justify-start gap-5">
          <Label className="text-lg font-bold capitalize">
            Category <em>(required)</em>
          </Label>
          <DropdownMenuCheckboxesCategory
            values={category}
            setValues={setCategory}
          ></DropdownMenuCheckboxesCategory>
        </div>
        <div className="flex items-center justify-start gap-5">
          <Label
            htmlFor="readtime_blog"
            className="text-nowrap text-lg font-bold capitalize"
          >
            read time <em>(required)</em>
          </Label>
          <Input
            id="readtime_blog"
            title="readTime"
            className="p-6 text-lg"
            placeholder="e.g. 2 mintues 34 seconds"
            value={blogData.readtime}
            onChange={(x) =>
              setBlogData({ ...blogData, readtime: x.currentTarget.value })
            }
          ></Input>
        </div>
      </div>
      <div className="space-y-3">
        <h5 className="font-mono text-lg font-bold">
          Add a thumbnail <em>(required)</em>
        </h5>
        <ClientOnly fallback={<div>Loading....</div>}>
          {() => <MyDropzone setThumbImg={setThumbImg}></MyDropzone>}
        </ClientOnly>
        {thumbImg === undefined ? (
          <p className="font-bold italic">No Image found</p>
        ) : null}
        {thumbImg && (
          <div className="relative">
            <Button
              variant={"ghost"}
              className="absolute  left-5 top-5 rounded border  border-white bg-transparent font-extrabold text-white"
              onClick={() => setThumbImg("")}
            >
              X
            </Button>

            <img src={thumbImg} className="mt-3 size-7/12 rounded"></img>
          </div>
        )}
      </div>
      <div className="space-y-3">
        <h5 className="font-mono text-lg font-bold">
          Add Blog Content <em>(required)</em>
        </h5>
        <ClientOnly fallback={<p>Loading....</p>}>
          {() => (
            <EditorBlockNote
              data={data}
              setData={setData}
              setHTML={setHTML!}
              html={html!}
            ></EditorBlockNote>
          )}
        </ClientOnly>
      </div>
      <hr />
      <div className="flex items-start justify-end gap-5">
        <Button
          disabled={data && blogData && category && thumbImg ? false : true}
          className="bg-green-700"
          onClick={() =>
            fetcher.submit(
              {
                category: category,
                blogData,
                thumbImg,
                data,
                published: true,
              },
              {
                method: "POST",
                encType: "application/json",
              },
            )
          }
        >
          {method === "POST" ? "Submit & Publish" : "UPDATE & PUBLISH"}
        </Button>

        <Button
          disabled={data && blogData && category && thumbImg ? false : true}
          value={"UPDATE"}
          className="bg-blue-700"
          onClick={() =>
            fetcher.submit(
              {
                category: category,
                blogData,
                thumbImg,
                data,
                published: false,
              },
              {
                method: "POST",
                encType: "application/json",
              },
            )
          }
        >
          {method === "POST" ? "Submit as Draft" : "Update Draft "}
        </Button>

        <Button
          className={`${method === "PATCH" ? "hidden" : "bg-red-500"}`}
          onClick={resetData}
          type="reset"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
