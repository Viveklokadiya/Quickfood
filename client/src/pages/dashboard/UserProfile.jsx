import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UserProfile = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { updateUserProfile } = useContext(AuthContext);
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const name = data.name;
    // const photoURL = data.photoURL;

    const imageFile = { image: data.image[0] };
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    // console.log(hostingImg.data)
    if (hostingImg.data.success) {
      updateUserProfile(name, hostingImg.data.data.display_url)
        .then(() => {
          // Profile updated!
          alert("Profile updated successfully");
        })
        .catch((error) => {
          // An error occurred
          // ...
          console.log("error: " + error);
        });
    }
  };
  return (
    <div className="h-screen max-w-md mx-auto flex items-center justify-center ">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Your name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload Photo</span>
            </label>
            <input
              type="file"
              {...register("image")}
              className="file-input w-full mt-1"
            />
            {/* <input type="text" {...register("photoURL")} placeholder="photo url" className="input input-bordered" required /> */}
          </div>
          <div className="form-control mt-6">
            <input
              type="submit"
              value={"Update"}
              className="btn bg-orangee text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;