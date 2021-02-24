import React, { useState, useEffect } from "react";
import { BsTrash } from "react-icons/bs";
import { Field, Formik, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import Loading from "../../../components/Loading";
import { db, storageRef } from "../../../firebase";
import { toast } from "react-toastify";
import { FaHourglassHalf } from "react-icons/fa";
import ImageDeleteLoading from "../../../components/ImageDeleteLoading";

const schema = Yup.object().shape({
  header: Yup.string().nullable().required("Required"),
  paragraph1: Yup.string().nullable().required("Required"),

  paragraph2: Yup.string().nullable().required("Required"),
});

const Images = ({ image, pageData, images, setImages }) => {
  const [isImageDeleting, setIsImageDeleting] = useState(false);

  const deleteImage = (url) => {
    if (window.confirm("Are you sure to delete this image? ")) {
      setIsImageDeleting(true);

      db.collection("atomicLandingPage")
        .doc("Aw6fT3wFRWFsGqqnjJlt")
        .update({
          aboutSection: {
            header: pageData.aboutSection.header,
            images: images.filter((el) => el !== url),
            paragraphs: pageData.aboutSection.paragraphs,
          },
        })
        .then(() => {
          setIsImageDeleting(false);
          setImages(images.filter((el) => el !== url));
          toast.success("Image deleted successfully");
        })
        .catch((error) => {
          console.log(error);
          setIsImageDeleting(false);

          toast.error("Failed to delete image...");
        });
    }
  };
  return (
    <div>
      <div className=" h-40 w-40 overflow-auto">
        <img src={image} alt="" />
      </div>
      <div className="flex justify-end w-40 px-3 py-2 bg-gray-100">
        <button
          type="button"
          onClick={() => {
            if (images.length > 1) {
              deleteImage(image);
            } else {
              toast.error("At least one image is required...");
            }
          }}
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
  );
};

export default function AboutSection() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [imageUploadInProgress, setImageUploadInProgress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState(null);
  const [images, setImages] = useState(null);

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
    setImages(res.data().aboutSection.images);
  };

  useEffect(() => {
    fetchAtomicPageDetails();
  }, []);

  const getImageURL = async (image) => {
    var d = new Date();
    var n = d.getTime();
    const fileRef = storageRef
      .ref("aboutSection/images/")
      .child(image.name + n);
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
            aboutSection: {
              header: pageData.aboutSection.header,
              images: [...images, url],
              paragraphs: pageData.aboutSection.paragraphs,
            },
          })
          .then(() => {
            imagesURLStatus.push(url);
            setImages([...images, url]);
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

  if (!loading && pageData) {
    return (
      <Formik
        initialValues={{
          header:
            pageData && pageData.aboutSection.header
              ? pageData.aboutSection.header
              : "",
          paragraph1:
            pageData && pageData.aboutSection.paragraphs[0]
              ? pageData.aboutSection.paragraphs[0]
              : "",
          paragraph2:
            pageData && pageData.aboutSection.paragraphs[1]
              ? pageData.aboutSection.paragraphs[1]
              : "",
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          if (images.length >= 1) {
            setIsUpdating(true);
            db.collection("atomicLandingPage")
              .doc("Aw6fT3wFRWFsGqqnjJlt")
              .update({
                aboutSection: {
                  header: values.header,
                  images: images,
                  paragraphs: [values.paragraph1, values.paragraph2],
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
                  <p className="text-xl font-bold">ABOUT SECTION</p>
                  <p className="text-gray-400">
                    Edit contents, add images to the About section here.
                  </p>
                </div>
                <div className="flex flex-col gap-5">
                  <p className="text-md text-blue-500 font-medium">TITLE</p>
                  <Field
                    name="header"
                    className="px-3 py-2 bg-gray-100  border-2 border-gray-400 rounded-lg font-medium w-2/3 focus:border-blue-400 outline-none"
                  />
                  <ErrorMessage
                    name="header"
                    render={(msg) => (
                      <div className="text-red-600 text-sm">{msg}</div>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <p className="text-md text-blue-500 font-medium">
                    PARAGRAPH - 1
                  </p>
                  <Field
                    as="textarea"
                    name="paragraph1"
                    rows={4}
                    className="px-3 py-2 bg-gray-100  border-2 border-gray-400 rounded-lg font-medium w-2/3 focus:border-blue-400 outline-none"
                  />
                  <ErrorMessage
                    name="paragraph1"
                    render={(msg) => (
                      <div className="text-red-600 text-sm">{msg}</div>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <p className="text-md text-blue-500 font-medium">
                    PARAGRAPH - 2
                  </p>
                  <Field
                    as="textarea"
                    name="paragraph2"
                    rows={4}
                    className="px-3 py-2 bg-gray-100  border-2 border-gray-400 rounded-lg font-medium w-2/3 focus:border-blue-400 outline-none"
                  />
                  <ErrorMessage
                    name="paragraph2"
                    render={(msg) => (
                      <div className="text-red-600 text-sm">{msg}</div>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <p className="text-md text-blue-500 font-medium">IMAGES</p>
                  <div className="grid grid-cols-4 gap-5">
                    {images
                      ? images.map((image) => {
                          return (
                            <Images
                              image={image}
                              pageData={pageData}
                              images={images}
                              setImages={setImages}
                            />
                          );
                        })
                      : null}
                  </div>

                  {images && images.length !== 3 ? (
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
                  ) : null}

                  {imageUploadInProgress ? (
                    <div className="flex lg:justify-end justify-center mt-5">
                      <div className="bg-gray-400 px-3 py-2 text-white flex rounded-lg text-xs lg:text-sm items-center gap-2">
                        <FaHourglassHalf className="animate-spin" />
                        <p>Uploading</p>
                      </div>
                    </div>
                  ) : null}

                  <div>
                    {!imageUploadInProgress ? (
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-10 py-2 font-medium focus:outline-none"
                      >
                        {isUpdating ? "Please wait..." : "Confirm"}
                      </button>
                    ) : null}
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
