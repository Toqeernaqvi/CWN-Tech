import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

function Toolbar({ editor }) {
  if (!editor) return null;

  const promptForLink = () => {
    const prev = editor.getAttributes("link").href || "";
    const url = window.prompt("Paste link URL", prev);
    if (url === null) return;
    if (!url) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    try {
      const href = new URL(url).toString();
      editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    } catch (err) {
      window.alert("Please enter a valid URL (https://...)");
    }
  };

  const promptForImage = () => {
    const url = window.prompt("Paste an image URL");
    if (!url) return;
    try {
      const src = new URL(url).toString();
      editor.chain().focus().setImage({ src, alt: "Article image" }).run();
    } catch (err) {
      window.alert("Please enter a valid image URL (https://...)");
    }
  };

  const buttonClasses = (active) =>
    [
      "px-3 py-2 rounded-lg border text-sm font-semibold transition",
      active
        ? "border-main bg-main/10 text-heading"
        : "border-light-gray text-heading hover:border-main",
    ].join(" ");

  return (
    <div className="rte-toolbar">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={buttonClasses(editor.isActive("heading", { level: 2 }))}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={buttonClasses(editor.isActive("heading", { level: 3 }))}
      >
        H3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonClasses(editor.isActive("bold"))}
      >
        Bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonClasses(editor.isActive("italic"))}
      >
        Italic
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={buttonClasses(editor.isActive("underline"))}
      >
        Underline
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={buttonClasses(editor.isActive("bulletList"))}
      >
        Bullets
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={buttonClasses(editor.isActive("orderedList"))}
      >
        Numbered
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={buttonClasses(editor.isActive("blockquote"))}
      >
        Quote
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={buttonClasses(editor.isActive("codeBlock"))}
      >
        Code
      </button>
      <button type="button" onClick={promptForLink} className={buttonClasses(editor.isActive("link"))}>
        Link
      </button>
      <button type="button" onClick={promptForImage} className={buttonClasses(false)}>
        Image
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={buttonClasses(editor.isActive({ textAlign: "left" }))}
      >
        Left
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={buttonClasses(editor.isActive({ textAlign: "center" }))}
      >
        Center
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={buttonClasses(editor.isActive({ textAlign: "right" }))}
      >
        Right
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
        className="px-3 py-2 rounded-lg border border-light-gray text-sm font-semibold text-heading hover:border-main transition"
      >
        Clear
      </button>
    </div>
  );
}

export default function RichTextEditor({ value, onChange, placeholder }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: placeholder || "Write something...",
      }),
    ],
    content: value || "",
    onUpdate: ({ editor: instance }) => {
      const html = instance.getHTML();
      onChange?.(html);
    },
  });

  // Keep editor in sync if parent replaces value (e.g., load post)
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if ((value || "") !== current) {
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  return (
    <div className="border border-light-gray rounded-2xl bg-white shadow-sm overflow-hidden">
      <Toolbar editor={editor} />
      <div className="rte-editor">
        <EditorContent editor={editor} className="tiptap" />
      </div>
    </div>
  );
}
