import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from '@/features/api/authApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const {data, isLoading, isSuccess, isError, refetch} = useGetUserProfileQuery();

  const [updateUserProfile, {data:updateData, isLoading:updateIsLoading, isError:updateIsError, isSuccess: updateIsSuccess, error: updateError}] = useUpdateUserProfileMutation();

  // console.log(data);

  const {user} = data || {};
  // console.log(user);


  const getFileInfo = (e)=>{
    const userImg = e.target.files[0];
    if(userImg) setImage(userImg);
  }

  const updateProfile = async ()=>{
    const formData = new FormData();
    formData.append("name", name);
    formData.append("imageFile", image);
    await updateUserProfile(formData);
   }

   useEffect(()=>{  
    if(updateData && updateIsSuccess){
        toast.success(updateData.message || "User Updated");
        setIsOpen(false);
        refetch();
    }
    if(updateIsError){
        toast.error(updateError.message || "Failed to update");
    }
   }, [updateData, updateIsSuccess, updateError, updateIsError])

  return (
    <div className='max-w-4xl mx-auto px-4 my-24 mt-28'>
            <h1 className='font-bold text-2xl text-center md:text-left'>MY PROFILE</h1>
            <div className='flex flex-col md:flex-row items-center md:items-start gap-7 my-5'>
                <div className='flex flex-col items-center'>
                    <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
                        <AvatarImage src={user?.profileImg || "https://github.com/shadcn.png"} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <div className='mb-2'>
                        <h1 className='font-semibold text-gray-900 dark:text-gray-100'>Name: <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user?.name}</span></h1>
                    </div>
                    <div className='mb-2'>
                        <h1 className='font-semibold text-gray-900 dark:text-gray-100'>Email: <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user?.email}</span></h1>
                    </div>
                    <div className='mb-2'>
                        <h1 className='font-semibold text-gray-900 dark:text-gray-100'>Role: <span className='font-normal text-gray-700 dark:text-gray-300 ml-2'>{user?.role}</span></h1>
                    </div>

                    {/* For the pop-up */}
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button size="sm" className="mt-2" onClick={() => setIsOpen(true)}>Edit Profile</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className='grid gap-4 py-4'>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label>Name</Label>
                                    <Input type="text" placeholder="Name" className="col-span-3" name="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                                </div>

                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label>Profile Photo</Label>
                                    <Input type="file" accept="image/*" className="col-span-3" onChange={getFileInfo} name="file"/>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={updateProfile}>
                                    {
                                        updateIsLoading ? <>
                                            <Loader2 className='mr-2 w-4 h-4 animate-spin' />Please Wait
                                        </> : "Save Changes"
                                    }
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* <div>
                <h1 className='font-medium text-lg'>Courses you are enrolled in</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 my-5'>
                    {
                        user.enrolledCourses.length === 0 ? <p>You have not enrolled in any course yet</p> : user.enrolledCourses.map((course) => {
                            return <Course course={course} key={course._id} courseCreatorName={courseCreatorName} />
                        })
                    }
                </div>
            </div> */}
        </div>
  )
}

export default UserProfile
