import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useFetcher } from "@remix-run/react";
import { useState } from "react";

type Data = {
  data?: string;
  setData: (x: string) => void;
};
export default function EditorBlockNote({ setData, data }: Data) {
  const [html, setHTML] = useState<string>("");
  const theObj = { __html: html };
  const fetcher = useFetcher();
  // handle images
  const handleImageUplaod = async (img: any) => {
    let url;
    if (img.size > 5_000_000) {
      console.log("error");
    }
    const formData = new FormData();
    formData.append("image", img);
    const f = fetch("/api/image", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("File upload failed");
        }
      })
      .then((data) => {
        return data;
      })
      .catch((e) => console.error(e));
    url = await f.then((data) => {
      return data;
    });
    console.log("🚀 ~ handleImageUplaod ~ url:", url.file.url);
    return url.file.url;
  };
  let intContent;
  if (data) {
    intContent = JSON.parse(data);
    console.log("🚀 ~ EditorBlockNote ~ intContent:", intContent);
  }
  // Creates a new editor instance.
  const editor: BlockNoteEditor = useBlockNote({
    initialContent: intContent || undefined,
    onEditorContentChange: (editor) => {
      // Log the document to console on every update
      let ctx = editor.topLevelBlocks;
      setData(JSON.stringify(ctx));
      // console.log(JSON.stringify(ctx));
      const saveBlocksAsHTML = async () => {
        const html: string = await editor.blocksToHTMLLossy(
          editor.topLevelBlocks,
        );
        setHTML(html);
      };
      saveBlocksAsHTML();
    },
    domAttributes: {
      editor: {
        class: "p-10",
      },
    },
    uploadFile: handleImageUplaod,
  });

  // Renders the editor instance using a React component.
  return (
    <div>
      <BlockNoteView editor={editor}></BlockNoteView>
      {/* <pre>{html}</pre> */}
      {/* <div className="prose lg:prose-xl" dangerouslySetInnerHTML={theObj} /> */}
    </div>
  );
}
