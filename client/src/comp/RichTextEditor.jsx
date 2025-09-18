import JoditEditor, { Jodit } from "jodit-react";
import { useMemo, useRef } from "react";

const RichTextEditor = ({ updateHotelInfo, setUpdateHotelInfo }) => {
  const editor = useRef(null);

  const handlelEditorChange = (content) => {
    setUpdateHotelInfo((prev) => {
      return { ...prev, description: content };
    });
  };

  // TODO
  const config = {
    readonly: false,
    placeholder: "add a desc...",
    height: 320,
    width: 900,
  };

  return (
    <>
      <JoditEditor
        id="editor"
        ref={editor}
        value={updateHotelInfo.description}
        config={config}
        tabIndex={1}
        onChange={handlelEditorChange}
      />
    </>
  );
};

export default RichTextEditor;
