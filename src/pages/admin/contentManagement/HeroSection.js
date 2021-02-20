import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { Field, Formik, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import Loading from "../../../components/Loading";
import { db, storageRef } from "../../../firebase";
import { toast } from "react-toastify";
import { BiImageAdd } from "react-icons/bi";
import { FaHourglassHalf } from "react-icons/fa";

const schema = Yup.object().shape({
  subHeading: Yup.string().nullable().required("Required"),
});

export default function HeroSection({ data, loading }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [imageUploadInProgress, setImageUploadInProgress] = useState(false);

  const uploadimage = async (image) => {
    var d = new Date();
    var n = d.getTime();
    const fileRef = storageRef.ref("heroSection/images/").child(image.name + n);
    await fileRef.put(image).catch((error) => {
      toast.error("Failed to upload picture!...");
      setImageUploadInProgress(false);
      console.log("Firebase image upload failure", error);
      return false;
    });
    let url = await fileRef.getDownloadURL();
    //console.log(url);
    return url ? url : false;
  };

  const uploadCompanyImages = async (companyImages) => {
    setImageUploadInProgress(true);
    let noOfImages = Object.keys(companyImages).length;
    let imagesURLStatus = [];

    for (let i = 0; i < noOfImages; i++) {
      const image = companyImages[i];
      let url = await uploadimage(image);
      if (url) {
        db.collection("atomicLandingPage")
          .doc("Aw6fT3wFRWFsGqqnjJlt")
          .update({
            heroSection: {
              heroSubTitle: data.heroSection.heroSubTitle,
              images: [...data.heroSection.images, url],
            },
          })
          .then(() => {
            imagesURLStatus.push(url);
          })
          .catch((error) => {
            toast.error("Failed to upload image...");
            console.log(error);
          });
      } else {
        toast.error("Image URL not returned");
      }
    }
    if (imagesURLStatus.length + 1 === noOfImages) {
      setImageUploadInProgress(false);
      toast.success("Images uploaded successfully!...");
    } else {
      toast.error("Checking error!");
      setImageUploadInProgress(false);
    }
  };

  const deleteImage = (url) => {
    data.heroSection.images = data.heroSection.images.filter(
      (el) => el !== url
    );
    console.log("Images", data.heroSection.images);
  };

  if (!loading && data) {
    return (
      <Formik
        initialValues={{
          subHeading:
            data && data.heroSection.heroSubTitle
              ? data.heroSection.heroSubTitle
              : "",
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          if (data.heroSection.images.length > 1) {
            setIsUpdating(true);
            db.collection("atomicLandingPage")
              .doc("Aw6fT3wFRWFsGqqnjJlt")
              .update({
                heroSection: {
                  heroSubTitle: values.subHeading,
                  images: data.heroSection.images,
                },
              })
              .then(() => {
                setIsUpdating(false);
                toast.success("Changes saved successfully...");
              });
          } else {
            toast.error("Atleast one photo is required...");
          }
        }}
      >
        {({ values, errors }) => {
          console.log(errors);
          return (
            <Form>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-7">
                  <p className="text-xl font-bold">HERO SECTION</p>
                  <p className="text-gray-400">
                    Edit contents, add images to the Hero section here.
                  </p>
                </div>
                <div className="flex flex-col gap-5">
                  <p className="text-md text-blue-500 font-medium">
                    SUB-HEADING
                  </p>
                  <Field
                    as="textarea"
                    rows={4}
                    name="subHeading"
                    className="px-3 py-2 bg-gray-100  border-2 border-gray-400 rounded-lg font-medium w-2/3 focus:border-blue-400 outline-none"
                  />
                  <ErrorMessage
                    name="subHeading"
                    render={(msg) => (
                      <div className="text-red-600 text-sm">{msg}</div>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <p className="text-md text-blue-500 font-medium">IMAGES</p>
                  <div className="grid grid-cols-4 gap-5">
                    {data && data.heroSection
                      ? data.heroSection.images.map((image) => {
                          return (
                            <div>
                              <div className=" h-40 w-40 overflow-auto">
                                <img src={image} alt="" />
                              </div>
                              <div className="flex justify-end w-40 px-3 py-2 bg-gray-100">
                                <button
                                  onClick={() => {
                                    if (data.heroSection.images.length > 1) {
                                      deleteImage(image);
                                    } else {
                                      toast.error(
                                        "Atleast one photo is required..."
                                      );
                                    }
                                  }}
                                  className="focus:outline-none"
                                >
                                  <BsTrash className="text-red-500 text-xl" />
                                </button>
                              </div>
                            </div>
                          );
                        })
                      : null}
                  </div>

                  <div className="flex justify-center">
                    <input
                      type="file"
                      multiple
                      onChange={(e) => {
                        if (e.target && e.target.files) {
                          uploadCompanyImages(e.target.files);
                        }
                      }}
                      accept="image/x-png,image/image/jpeg/png"
                      id="actual-btn"
                      hidden
                    />

                    <label htmlFor="actual-btn">
                      <BiImageAdd className="text-9xl cursor-pointer hover:shadow-md bg-gray-200 hover:text-white hover:bg-black focus:outline-none rounded-full p-3" />
                    </label>
                  </div>

                  {imageUploadInProgress ? (
                    <div className="flex lg:justify-end justify-center mt-5">
                      <div className="bg-gray-400 px-3 py-2 text-white flex rounded-lg text-xs lg:text-sm items-center gap-2">
                        <FaHourglassHalf className="animate-spin" />
                        <p>Uploading</p>
                      </div>
                    </div>
                  ) : null}
                  {/* <div>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => {
                        if (e.target && e.target.files) {
                                                      uploadCompanyImages(
                                                        e.target.files
                                                      );

                        }
                      }}
                      accept="image/x-png,image/image/jpeg/png"
                      id="actual-btn"
                      hidden
                    />
                    <button className="text-sm font-medium focus:outline-none">
                      + ADD IMAGE
                    </button>
                  </div> */}

                  <div>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-10 py-2 font-medium focus:outline-none"
                    >
                      {isUpdating ? "Please wait..." : "Confirm"}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  }

  return <Loading />;
}
