import DragandDropContainer from "@/comp/DragandDropContainer";
import { Upload } from "lucide-react";
import React, { useState } from "react";

const AddRoom = () => {
  const [previewImages, setPreviewImages] = useState([]);

  // const handleHotelImages = (e) =>{
  //   const images = e.target.files;

  //   // only 4 images will be uploaded
  //   for (let i=0; i < 4; i++){
  //     const fileReader = new FileReader;
  //     fileReader.onloadend = () =>{
  //       setPreviewImages((prev)=>{
  //         return [...prev, {fileImage: fileReader.result}]
  //       })
  //     }
  //     fileReader.readAsDataURL(images[i])
  //   }
  // }

  return (
    <div className="ml-[265px]">
      <form action="" encType="multipart/form-data">
        <h1 className="font-semibold text-2xl mb-2">Add Room</h1>
        <p className="mb-2">
          Fill the details accurately and enhance the user experience.
        </p>

        <p className="mb-2 text-gray-500">Upload room imgaes upto 4</p>
        <DragandDropContainer setPreviewImages={setPreviewImages} />
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 border-red-500 bg-gray-100 mt-5">
        {previewImages.map((elm) => {
          return (
            <div className="bg-gray-50 border border-gray-300 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 rounded-sm">
              <img src={elm.fileImage} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddRoom;
