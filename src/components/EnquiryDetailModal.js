import React from "react";
import Modal from "react-modal";
import { MdClose } from "react-icons/md";

export default function EnquiryDetailModal({
  data,
  isModalOpen,
  setIsModalOpen,
}) {
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          console.log(isModalOpen);
          setIsModalOpen(false);
        }}
        className="inset-x-auto rounded-md overflow-auto focus:outline-none absolute top-0 mt-20 lg:w-1/2 w-full px-2 flex flex-col"
        overlayClassName="transition-all ease-in-out duration-300 flex justify-center items-center bg-opacity-75 bg-black inset-0 fixed p-8 z-50"
      >
        <header className="rounded-t-md bg-black w-full py-5 px-12 text-white flex items-center justify-between">
          <div className="text-white">Enquiry Details</div>
          <button
            onClick={() => {
              console.log(isModalOpen);
              setIsModalOpen(!isModalOpen);
            }}
          >
            <MdClose className="w-6 h-6 text-white" />
          </button>
        </header>

        <div className="bg-white p-5 flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-medium text-blue-500">
              Personal Details
            </p>
            <div className="grid grid-cols-2 gap-5 border rounded-md p-5">
              <div>
                <p className="text-xl font-medium">Full Name</p>
                <p className="text-blue-500 text-lg font-medium">
                  {data.fullName}
                </p>
              </div>
              <div>
                <p className="text-xl font-medium">Company Name</p>
                <p className="text-blue-500 text-lg font-medium">
                  {data.companyName}
                </p>
              </div>
              <div>
                <p className="text-xl font-medium">Email</p>
                <p className="text-blue-500 text-lg font-medium">
                  {data.email}
                </p>
              </div>
              <div>
                <p className="text-xl font-medium">Phone Number</p>
                <p className="text-blue-500 text-lg font-medium">
                  {data.phoneNumber}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-lg font-medium text-blue-500">
              Requirement Details
            </p>
            <div className="border rounded-none p-5">
              <div className="grid grid-cols-2 gap-5 ">
                <div>
                  <p className="text-xl font-medium">Number of Seats</p>
                  <p className="text-blue-500 text-lg font-medium">
                    {data.noOfSeats}
                  </p>
                </div>

                <div>
                  <p className="text-xl font-medium">Requirement</p>
                  <p className="text-blue-500 text-lg font-medium">
                    {data.requirement}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xl font-medium">Additional Notes</p>
                <p className="text-blue-500 text-lg font-medium">
                  {data.additionalNotes ? data.additionalNotes : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
