import { useCallback, useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function RichTextEditor({ value, onChange, placeholder }) {
  const quillRef = useRef(null);

  const insertImage = useCallback((url) => {
    const editor = quillRef.current?.getEditor();
    if (!editor || !url) return;
    const range = editor.getSelection(true);
    const index = range ? range.index : editor.getLength();
    editor.insertEmbed(index, "image", url, "user");
    editor.setSelection(index + 1);
  }, []);

  const handleImage = useCallback(() => {
    const url = window.prompt("Paste an image URL");
    if (!url) return;

    try {
      // Basic validation to avoid inserting invalid strings
      const parsed = new URL(url);
      insertImage(parsed.toString());
    } catch (err) {
      window.alert("Please enter a valid image URL (https://...)");
    }
  }, [insertImage]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, false] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block"],
          ["link", "image"],
          [{ align: [] }],
          ["clean"],
        ],
        handlers: {
          image: handleImage,
        },
      },
    }),
    [handleImage]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "link",
    "image",
    "align",
  ];

  return (
    <div className="border border-light-gray rounded-2xl bg-white shadow-sm overflow-hidden">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value || ""}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder || "Write something..."}
        className="quill-container"
      />
    </div>
  );
}
