import React, { useState, useEffect } from "react";
import { db, storageRef } from "../../../firebase";
import Loading from "../../../components/Loading";
import { BsTrash } from "react-icons/bs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaHourglassHalf } from "react-icons/fa";
import { toast } from "react-toastify";
import ImageDeleteLoading from "../../../components/ImageDeleteLoading";

const schema = Yup.object().shape({
  heading: Yup.string().nullable().required("Required"),
  subHeading: Yup.string().nullable().required("Required"),
});

export default function PrivateOffice() {
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState(null);
  const [imageUploadInProgress, setImageUploadInProgress] = useState(false);
  const [image, setImage] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isImageDeleting, setIsImageDeleting] = useState(false);

  const fetchAtomicPageDetails = async () => {
    setLoading(true);
    let res = await db
      .collection("atomicLandingPage")
      .doc("Aw6fT3wFRWFsGqqnjJlt")
      .get()
      .catch((error) => {
        toast.error("Failed to fetch data");
        console.log(error);
      });
    console.log("Data", res.data());
    setLoading(false);
    setPageData(res.data());
    setImage(res.data().spaceOverviewSection.privateDesk.image);
  };

  useEffect(() => {
    fetchAtomicPageDetails();
  }, []);

  const getImageURL = async (image) => {
    var d = new Date();
    var n = d.getTime();
    const fileRef = storageRef.ref("privateDesk/images/").child(image.name + n);
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

  const uploadImages = async (companyImages) => {
    setImageUploadInProgress(true);
    let noOfImages = Object.keys(companyImages).length;
    let imagesURLStatus = [];

    for (let i = 0; i < noOfImages; i++) {
      const image = companyImages[i];
      let url = await getImageURL(image);
      if (url) {
        db.collection("atomicLandingPage")
          .doc("Aw6fT3wFRWFsGqqnjJlt")
          .update({
            spaceOverviewSection: {
              dedicatedDesk: pageData.spaceOverviewSection.dedicatedDesk,
              hotDesk: pageData.spaceOverviewSection.hotDesk,
              privateDesk: {
                heading: pageData.spaceOverviewSection.privateDesk.heading,
                image: url,
                paragraph: pageData.spaceOverviewSection.privateDesk.paragraph,
              },
            },
          })
          .then(() => {
            imagesURLStatus.push(url);
            setImage(url);
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

  const deleteImage = () => {
    if (window.confirm("Are you sure to delete this image?")) {
      setIsImageDeleting(true);
      db.collection("atomicLandingPage")
        .doc("Aw6fT3wFRWFsGqqnjJlt")
        .update({
          spaceOverviewSection: {
            dedicatedDesk: pageData.spaceOverviewSection.dedicatedDesk,
            hotDesk: pageData.spaceOverviewSection.hotDesk,
            privateDesk: {
              heading: pageData.spaceOverviewSection.privateDesk.heading,
              image: "",
              paragraph: pageData.spaceOverviewSection.privateDesk.paragraph,
            },
          },
        })
        .then(() => {
          setIsImageDeleting(false);

          setImage(null);
          toast.success("Image deleted successfully");
        })
        .catch((error) => {
          setIsImageDeleting(false);

          console.log(error);
          toast.error("Failed to delete image...");
        });
    }
  };

  if (!loading && pageData) {
    return (
      <Formik
        initialValues={{
          heading:
            pageData && pageData.spaceOverviewSection.privateDesk.heading
              ? pageData.spaceOverviewSection.privateDesk.heading
              : "",
          subHeading:
            pageData && pageData.spaceOverviewSection.privateDesk.paragraph
              ? pageData.spaceOverviewSection.privateDesk.paragraph
              : "",
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          console.log(values);
          if (image) {
            setIsUpdating(true);
            db.collection("atomicLandingPage")
              .doc("Aw6fT3wFRWFsGqqnjJlt")
              .update({
                spaceOverviewSection: {
                  dedicatedDesk: pageData.spaceOverviewSection.dedicatedDesk,
                  hotDesk: pageData.spaceOverviewSection.hotDesk,
                  privateDesk: {
                    heading: values.heading,
                    image: image,
                    paragraph: values.subHeading,
                  },
                },
              })
              .then(() => {
                setIsUpdating(false);
                toast.success("Changes saved successfully...");
              });
          } else {
            toast.error("Image is required...");
          }
        }}
      >
        {({ errors }) => {
          console.log(errors);
          return (
            <Form>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-7">
                  <p className="text-xl font-bold">PRIVATE DESK</p>
                  <p className="text-gray-400">
                    Edit contents, add images to the Private office section
                    here.
                  </p>
                </div>
                <div className="flex flex-col gap-5">
                  <p className="text-md text-blue-500 font-medium">TITLE</p>
                  <Field
                    name="heading"
                    className="px-3 py-2 bg-gray-100  border-2 border-gray-400 rounded-lg font-medium w-2/3 focus:border-blue-400 outline-none"
                  />
                  <ErrorMessage
                    name="heading"
                    render={(msg) => (
                      <div className="text-red-600 text-sm">{msg}</div>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <p className="text-md text-blue-500 font-medium">
                    SUB-HEADING
                  </p>
                  <Field
                    as="textarea"
                    name="subHeading"
                    rows={4}
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
                  {!image ? (
                    <div className="flex justify-start">
                      <input
                        type="file"
                        onChange={(e) => {
                          if (e.target && e.target.files) {
                            uploadImages(e.target.files);
                          }
                        }}
                        accept="image/*"
                        id="actual-btn"
                        hidden
                      />

                      <label htmlFor="actual-btn">
                        <p className="text-sm px-3 py-2 font-medium focus:outline-none cursor-pointer hover:bg-gray-200">
                          + Add Image
                        </p>
                      </label>
                    </div>
                  ) : (
                    <div>
                      <div className=" h-40 w-40 overflow-auto">
                        <img src={image} alt="" />
                      </div>
                      <div className="flex justify-end w-40 px-3 py-2 bg-gray-100">
                        <button
                          type="button"
                          onClick={() => deleteImage()}
                          className="focus:outline-none"
                        >
                          {!isImageDeleting ? (
                            <BsTrash className="text-red-500 text-xl" />
                          ) : (
                            <ImageDeleteLoading />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {imageUploadInProgress ? (
                    <div className="flex lg:justify-end justify-center mt-5">
                      <div className="bg-gray-400 px-3 py-2 text-white flex rounded-lg text-xs lg:text-sm items-center gap-2">
                        <FaHourglassHalf className="animate-spin" />
                        <p>Uploading</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-10 py-2 font-medium focus:outline-none"
                      >
                        {isUpdating ? "Please wait..." : "Confirm"}
                      </button>
                    </div>
                  )}
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
