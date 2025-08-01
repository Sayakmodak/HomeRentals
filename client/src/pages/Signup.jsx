import React from 'react'
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
import { HomeIcon } from 'lucide-react'


const Signup = () => {
  return (<>
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
                  <Label htmlFor="tabs-demo-name">Name</Label>
                  <Input id="tabs-demo-name" type="text" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-username">Email</Label>
                  <Input id="tabs-demo-username" type="email" />
                </div>

                <div className="flex gap-2 items-center justify-between">
                  <div className='flex'>
                    <Label htmlFor="tabs-demo-username">Are you a: </Label>
                    {/* <Input id="tabs-demo-username" type="radio" name="role" size="5"/> */}
                    <div className='flex ml-3 gap-2'>
                      <div className='flex gap-1'>
                        <input type="radio" />
                        <Label>Customer</Label>
                      </div>
                      {/* <Input id="tabs-demo-username" type="radio" name="role"/> */}
                      <div className='flex gap-1'>
                        <input type="radio" />
                        <Label>Seller</Label>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-username">Password</Label>
                  <Input id="tabs-demo-username" type="password" />
                </div>

              </CardContent>
              <CardFooter>
                <Button>Signup</Button>
              </CardFooter>
            </Card>
          </TabsContent>

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
                  <Input id="tabs-demo-current" type="email" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-new">Password</Label>
                  <Input id="tabs-demo-new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>SignIn</Button>
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



const LoginNavbar = () => {
  return (
    <nav className='flex items-center p-6 shadow-[0_4px_12px_0_rgba(0,0,0,0.15)] mb-4'>
      <HomeIcon />
      <h2>HomeRentals</h2>
    </nav>
  )
}