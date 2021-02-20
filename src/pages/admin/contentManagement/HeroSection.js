import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { Field, Formik, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import Loading from "../../../components/Loading";

const schema = Yup.object().shape({
  subHeading: Yup.string().nullable().required("Required"),
});

export default function HeroSection({ data, loading }) {
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
          console.log("Values", values);
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
                                <button className="focus:outline-none">
                                  <BsTrash className="text-red-500 text-xl" />
                                </button>
                              </div>
                            </div>
                          );
                        })
                      : null}
                  </div>
                  <div>
                    <button className="text-sm font-medium focus:outline-none">
                      + ADD IMAGE
                    </button>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-10 py-2 font-medium focus:outline-none"
                    >
                      Confirm
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
