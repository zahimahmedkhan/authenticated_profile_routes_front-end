"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Form } from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MailIcon } from "lucide-react";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    axios
      .get([
        "https://profile-routes-backend.vercel.app/profile/userProfile",
      ], {
        withCredentials: true,
      })
      .then((res) => {
        const data = res.data;
        if (typeof data === "object") {
          setUser(data);
        } else {
          const matched = data.match(/user profile\s*:\s*(.*)/);
          if (matched) {
            setUser(JSON.parse(matched[1]));
          }
        }
      })
      .catch((err) => {
        toast.error(err.response || "Error fetching profile");
        router.push("/auth/login");
      });
  }, [router]);

  const form = useForm();

  const { register, handleSubmit, reset } = form;

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        role: user.role || "",
        bio: user.bio || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      await axios.patch(
       [
        "https://profile-routes-backend.vercel.app/profile/updateUserProfile",
      ],
        data,
        {
          withCredentials: true,
        }
      );
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        [
        "https://profile-routes-backend.vercel.app/auth/logout",
      ],
        {},
        {
          withCredentials: true,
        }
      );
    } catch {
      toast.error("Failed to logout");
    }
    router.push("/auth/login");
  };

  if (!user){
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-700"></div>
      </div>
    )}
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar || ""} alt={user.firstName} />
                    <AvatarFallback>
                      {user.firstName
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-xl font-semibold">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-gray-600">{user.role}</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Follow
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full bg-gray-700 text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>

                <Separator className="my-4" />

                <div className="flex items-center gap-2 text-sm">
                  <MailIcon className="h-4 w-4 text-gray-500" />
                  <a
                    href={`mailto:${user.email}`}
                    className="hover:underline text-blue-600"
                  >
                    {user.email}
                  </a>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="font-semibold">{user.stats?.projects || 0}</p>
                    <p className="text-sm text-gray-500">Projects</p>
                  </div>
                  <div>
                    <p className="font-semibold">
                      {user.stats?.followers || 0}
                    </p>
                    <p className="text-sm text-gray-500">Followers</p>
                  </div>
                  <div>
                    <p className="font-semibold">
                      {user.stats?.following || 0}
                    </p>
                    <p className="text-sm text-gray-500">Following</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.skills?.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="w-full md:w-2/3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" {...register("firstName")} />
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" {...register("lastName")} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={user.email}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" {...register("role")} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        rows={4}
                        className="w-full rounded-md border px-3 py-2 text-sm"
                        {...register("bio")}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
