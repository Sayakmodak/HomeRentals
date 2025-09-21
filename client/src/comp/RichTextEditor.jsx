import JoditEditor, { Jodit } from "jodit-react";
import { useMemo, useRef } from "react";

const RichTextEditor = ({
  updateHotelInfo,
  setUpdateHotelInfo,
  addRoomData,
  setAddRoomData,
  type,
}) => {
  const editor = useRef(null);

  const handlelEditorChange = (content) => {
    if (type === "editHotel") {
      setUpdateHotelInfo((prev) => {
        return { ...prev, description: content };
      });
    }
    else{
      setAddRoomData((prev)=>{
        return { ...prev, description : content};
      })
    }
  };

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: "add a desc...",
      height: 320,
      width: 900,
    }),
    []
  );

  return (
    <>
          <JoditEditor
            id="editor"
            ref={editor}
            value={ type === "editHotel" ? updateHotelInfo.description : addRoomData.description }
            config={config}
            tabIndex={1}
            onChange={handlelEditorChange}
          />
    </>
  );
};

export default RichTextEditor;
