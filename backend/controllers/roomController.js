import { Hotels } from "../models/hotels.model.js";
import { Room } from "../models/room.models.js";
import { uploadMedia } from "../Utils/cloudinary.js";

export const addRoom = async (req, res) => {
  try {
    const roomImages = req.files; // this will be an array
    const { hotelId } = req.params; // is an object always

    const {
      roomName,
      roomCategory,
      description,
      pricePerNight,
      capacity,
      amenities,
    } = req.body;
    // console.log(roomCategory, pricePerNight, amenities);

    const hotel = await Hotels.findOne({ _id: hotelId });
    if (!hotel) {
      return res.status(404).json({
        success: true,
        message: "Could not find the hotel",
      });
    }

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
      roomName: roomName,
      roomCategory: roomCategory,
      roomDesc: description,
      capacity: +capacity,
      amenities: amenities,
      pricePerNight: pricePerNight,
    });

    hotel.rooms.push(addRoom._id);
    await hotel.save();

    // console.log(hotel, hotel.rooms);

    return res.status(201).json({
      success: true,
      message: `Room ${roomName} has been created successfully`,
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

export const fetchSpecificRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    // console.log(roomId); // 68bf2b72cce908ea7bfb52d2
    if (!roomId) {
      return res.status(404).json({
        success: false,
        message: "could not find room id",
      });
    }

    const room = await Room.findOne({ _id: roomId });
    // const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Could not find the room",
      });
    }
    return res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "some error occured while fetching the room",
    });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const files = req.files;
    console.log("File Length is ", files.length);
    const {
      roomName,
      description,
      roomCategory,
      pricePerNight,
      capacity,
      amenities,
    } = req.body;
    console.log(roomName, roomCategory, pricePerNight, amenities);

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "could not find room id",
      });
    }

    // this function always sends the images to the new Images array and this array goes to the roomImages array, so when I do not upload any image to the array during update, it gets null or epmty. To get rid off this bug I have to put a validation to this function.

    // push the files to the newImages array
    let newImages = [];
    if (files && files.length > 0) {
      for (let file of files) {
        const uploadImage = await uploadMedia(file.path);
        newImages.push(uploadImage.secure_url);
      }
    } else {
      // if the files are not present, keep the existing images
      newImages = room.roomImages;
    }

    //  push only unique elements to the amenity array
    // const updatedAmenity = room.amenities.filter(
    //   (elm) => !amenities.includes(elm)
    // );

    // console.log(updatedAmenity);

    const updatedData = {
      roomName,
      roomDesc: description,
      roomCategory,
      pricePerNight,
      capacity: +capacity,
      amenities,
      roomImages: newImages,
    };

    const updateRoom = await Room.findByIdAndUpdate(roomId, updatedData, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "Your room has been updated",
      updateRoom,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "failed to update the room",
    });
  }
};
