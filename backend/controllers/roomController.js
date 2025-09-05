import { Room } from "../models/room.models.js";
import { uploadMedia, uploadMultipleImages } from "../Utils/cloudinary.js";

export const addRoom = async (req, res) => {
  try {
    const roomImages = req.files; // this will be an array
    console.log("roomimages are", roomImages);

    const { roomCategory, pricePerNight, amenities } = req.body;
    // console.log(roomCategory, pricePerNight, amenities);

    const roomImageURLs = [];
    for (let img of roomImages) {
      const cloudResponse = await uploadMedia(img.path);
      roomImageURLs.push(cloudResponse.secure_url);
    }

    // console.log("roomimageurls are ", roomImageURLs);
    // roomimageurls are  [
    //   'https://res.cloudinary.com/dof9jeosb/image/upload/v1757100921/enqlxsfqbhjpzwyommrm.png',
    //   'https://res.cloudinary.com/dof9jeosb/image/upload/v1757100922/yn0i4kfrxoi6gagid32q.png',
    //   'https://res.cloudinary.com/dof9jeosb/image/upload/v1757100924/bdnrokhsnj3yrthgg4ju.jpg',
    //   'https://res.cloudinary.com/dof9jeosb/image/upload/v1757100925/hzuqk6nx6fdrndre3zna.jpg'
    // ]

    const addRoom = await Room.create({
      roomImages: roomImageURLs,
      roomCategory: roomCategory,
      amenities: amenities,
      pricePerNight: pricePerNight,
    });

    return res.status(200).json({
      success: true,
      addRoom,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "some error occured while ceating a room",
    });
  }
};
