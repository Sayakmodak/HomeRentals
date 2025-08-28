import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { HomeIcon, Loader2, ReceiptRussianRuble} from 'lucide-react'
import { useLoginUserMutation, useRegisterUserMutation } from '@/features/api/authApi.js'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom'


const Signup = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    role: '',
    password: ''
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [register, {data: registerInput, isLoading: registerIsLoading, isSuccess: registerIsSuccess, isError: registerIsError, error: registerError}] = useRegisterUserMutation();
  // console.log(registerInput);

  const [login, {data: loginInput, isLoading: loginIsLoading, isSuccess: loginIsSuccess, isError: loginIsError, error: loginError}] = useLoginUserMutation();

const handleOnValueChange = (e, type) => {
    if (type === "login") {
      const { name, value } = e.target;
      setLoginData((prev) => ({ ...prev, [name]: value }));
    }
    else {
      const { name, value } = e.target;
      setSignUpData((prev) => ({ ...prev, [name]: value }));
    }
  }

const handleOnSubmit = async (type) => {
    if (type === "login") {
      // console.log(loginData);
      await login(loginData);
    }
    else {
      // console.log(signUpData);
      await register(signUpData);
    }
  }

  useEffect(()=>{
    if(registerInput && registerIsSuccess){
      toast.success(registerInput.message || "User registered", {
        className: "toast-message",
      });
    }
    if(registerIsError){
      toast.error(registerError.message || "Signup failed");
    }
    if(loginInput && loginIsSuccess){
      navigate("/");
      toast.success(loginInput.message || `Login successfull ${loginInput.user.name}`, {
        className: "toast-message"
      });
    }
    if(loginIsError){
      toast.error(loginError.message || "Login failed");
    }
  }, [registerInput, registerError, registerIsSuccess, loginInput, loginError]);


  return (
    <>
      <LoginNavbar />
      <div className='flex justify-center'>
        <div className="flex w-full max-w-sm flex-col gap-2 border-yellow-400">
          <Tabs defaultValue="login">
            <TabsList>
              <TabsTrigger value="signup">SignUp</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>
            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>SignUp</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when you&apos;re
                    done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" type="text" name="name" value={signUpData.name} onChange={(e) => handleOnValueChange(e, "signup")} />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" name="email" value={signUpData.email} onChange={(e) => handleOnValueChange(e, "signup")} />
                  </div>

                  <div className="flex gap-2 items-center justify-between">
                    <div className='flex'>
                      <Label htmlFor="tabs-demo-username">Are you a: </Label>
                      <div className='flex ml-3 gap-2'>
                        <div className='flex gap-1'>
                          <input id="customer" type="radio" name='role' checked={signUpData.role == "customer"} value="customer" onChange={(e) => handleOnValueChange(e, "signup")} />
                          <Label htmlFor="customer">Customer</Label>
                        </div>

                        <div className='flex gap-1'>
                          <input id="seller" type="radio" name='role' checked={signUpData.role == "seller"} value="seller" onChange={(e) => handleOnValueChange(e, "signup")} />
                          <Label htmlFor="seller">Seller</Label>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" name="password" value={signUpData.password} onChange={(e) => handleOnValueChange(e, "signup")} />
                  </div>

                </CardContent>
                <CardFooter>
                  { 
                    <Button onClick={() => handleOnSubmit("signup")} type="submit" className={`${registerIsLoading ? "bg-[#979a9b] hover:bg-[#979a9b]" : ""}`}>
                    {
                      registerIsLoading ? (<>
                      <Loader2 className='h-4 w-4 mr-2 animate-spin'/> Please wait 
                    </> ) : "Signup"
                    }</Button>
                  }
                </CardFooter>
              </Card>
            </TabsContent>


            {/* Login form starts here */}
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>SignIn</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you&apos;ll be logged
                    out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-current">Email</Label>
                    <Input id="tabs-demo-current" type="email" name="email" value={loginData.email} onChange={(e) => handleOnValueChange(e, "login")} />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="tabs-demo-new">Password</Label>
                    <Input id="tabs-demo-new" type="password" name="password" value={loginData.password} onChange={(e) => handleOnValueChange(e, "login")} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" onClick={() => { handleOnSubmit("login") }}>
                    {
                      loginIsLoading ? (<><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</>) : "SignIn" 
                    }</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default Signup


// separate navbar for only auth page
const LoginNavbar = () => {
  return (
    <Link to={"/"}>
    <nav className='flex items-center p-6 shadow-[0_4px_12px_0_rgba(0,0,0,0.15)] mb-4'>
      <HomeIcon />
      <h2>HomeRentals</h2>
    </nav>
    </Link>
  )
}