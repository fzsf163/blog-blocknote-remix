import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";

type Data = {
  data?: string;
  setData: (x: string) => void;
  html: string;
  setHTML: (x: string) => void;
};
export default function EditorBlockNote({
  setData,
  data,
  setHTML,
  html,
}: Data) {
  // const [html, setHTML] = useState<string>("");
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
    return url.file.url;
  };
  let intContent: any;
  if (data) {
    intContent = JSON.parse(data);
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
        const html2: string = await editor.blocksToHTMLLossy(
          editor.topLevelBlocks,
        );
        setHTML(html2);
      };
      saveBlocksAsHTML();
    },
    domAttributes: {
      editor: {
        class: "p-10 bg-black",
      },
    },
    uploadFile: handleImageUplaod,
    // editable: false,
  });

  // let replacHTML = html?.replace("class", "className");
  // console.log("🚀 ~ EditorBlockNote ~ replacHTML:", replacHTML);
  // Renders the editor instance using a React component.
  return (
    <div>
      <BlockNoteView editor={editor}></BlockNoteView>
      {/* <pre className="w-[800px] overflow-scroll break-words">{html}</pre> */}

      {/* <div
        id="blog-post-html"
        className="prose  w-full border"
        dangerouslySetInnerHTML={{ __html: html! }}
      /> */}
    </div>
  );
}
