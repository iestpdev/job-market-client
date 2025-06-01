import { FaBold, FaItalic, FaListUl, FaListOl, FaHeading } from "react-icons/fa";
import "./Toolbar.css";

const Toolbar = ({ editor }) => {
    if (!editor) return null;

    const handleCommand = (command, value = null) => {
        if (value !== null) {
            editor.chain().focus()[command](value).run();
        } else {
            editor.chain().focus()[command]().run();
        }
    };

    return (
        <div className="toolbar">
            {/* Botón Negrita */}
            <button
                onClick={() => handleCommand("toggleBold")}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={editor.isActive("bold") ? "is-active" : ""}
                title="Negrita"
            >
                <FaBold />
            </button>

            {/* Botón Cursiva */}
            <button
                onClick={() => handleCommand("toggleItalic")}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? "is-active" : ""}
                title="Cursiva"
            >
                <FaItalic />
            </button>

            {/* Botón Lista Desordenada */}
            <button
                onClick={() => handleCommand("toggleBulletList")}
                className={editor.isActive("bulletList") ? "is-active" : ""}
                title="Lista Desordenada"
            >
                <FaListUl />
            </button>

            {/* Botón Lista Ordenada */}
            <button
                onClick={() => handleCommand("toggleOrderedList")}
                className={editor.isActive("orderedList") ? "is-active" : ""}
                title="Lista Ordenada"
            >
                <FaListOl />
            </button>

            {/* Botón Encabezado 1 */}
            <button
                onClick={() => handleCommand("setHeading", { level: 1 })}
                className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
                title="Encabezado 1"
            >
                <FaHeading />
            </button>
        </div>
    );
};

export default Toolbar;