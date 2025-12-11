import { useCallback, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadImage } from "../../lib/blogApi";

export default function RichTextEditor({ value, onChange, placeholder, adminToken }) {
  const quillRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const insertImage = useCallback((url) => {
    const editor = quillRef.current?.getEditor();
    if (!editor || !url) return;
    const range = editor.getSelection(true);
    const index = range ? range.index : editor.getLength();
    editor.insertEmbed(index, "image", url, "user");
    editor.setSelection(index + 1);
  }, []);

  const handleImage = useCallback(() => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      // If no admin token, fallback to URL prompt
      if (!adminToken) {
        const url = window.prompt("Enter image URL");
        insertImage(url);
        return;
      }

      try {
        setUploading(true);
        const res = await uploadImage(file, adminToken);
        insertImage(res.url || res.path);
      } catch (err) {
        const message = err?.message || "Image upload failed";
        window.alert(message);
      } finally {
        setUploading(false);
      }
    };
    input.click();
  }, [adminToken, insertImage]);

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
      {uploading && (
        <div className="px-4 py-2 text-xs text-sub-para bg-main-mint/30 border-t border-light-gray">
          Uploading image...
        </div>
      )}
    </div>
  );
}
