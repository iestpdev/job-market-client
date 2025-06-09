import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const useTiptapEditor = (initialContent = "") => {
    return useEditor({
        extensions: [StarterKit],
        content: initialContent,
        editorProps: {
            attributes: {
                class: "tiptap-editor",
            },
        },
    });
};