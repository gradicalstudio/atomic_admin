import React from "react";
import { BsTrash } from "react-icons/bs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  heading: Yup.string().nullable().required("Required"),
  subHeading: Yup.string().nullable().required("Required"),
});

export default function HotDesk({ data }) {
  return (
    <Formik
      initialValues={{
        heading:
          data && data.spaceOverviewSection.dedicatedDesk.heading
            ? data.spaceOverviewSection.dedicatedDesk.heading
            : "",
        subHeading:
          data && data.spaceOverviewSection.dedicatedDesk.paragraph
            ? data.spaceOverviewSection.dedicatedDesk.paragraph
            : "",
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors }) => {
        console.log(errors);
        return (
          <Form>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-7">
                <p className="text-xl font-bold">DEDICATED-DESK</p>
                <p className="text-gray-400">
                  Edit contents, add images to the Dedicated desk section here.
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
                <p className="text-md text-blue-500 font-medium">SUB-HEADING</p>
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
                <div>
                  <div className=" h-40 w-40 overflow-auto">
                    <img
                      src={data.spaceOverviewSection.dedicatedDesk.image}
                      alt=""
                    />
                  </div>
                  <div className="flex justify-end w-40 px-3 py-2 bg-gray-100">
                    <button className="focus:outline-none">
                      <BsTrash className="text-red-500 text-xl" />
                    </button>
                  </div>
                </div>
                <div>
                  <button className="text-sm font-medium focus:outline-none">
                    + ADD IMAGE
                  </button>
                </div>

                <div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-10 py-2 font-medium"
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
