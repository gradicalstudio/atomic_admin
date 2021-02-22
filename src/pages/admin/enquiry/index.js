import React, { useState, useEffect } from "react";
import TabHeader from "../../../components/TabHeader";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { db } from "../../../firebase";
import EnquiryCard from "../../../components/EnquiryCard";
import Loading from "../../../components/Loading";
import EnquiryDetailModal from "../../../components/EnquiryDetailModal";

export default function Enquiry() {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enquiries, setEnquiries] = useState(null);

  const fetchEnquiryDetails = async () => {
    setLoading(true);
    let res = await db
      .collection("enquiries")
      .get()
      .catch((error) => {
        toast.error("Failed to fetch data");
        console.log(error);
      });

    setLoading(false);

    setEnquiries(
      res.docs.map((el) => ({
        ...el.data(),
        id: el.id,
      }))
    );
  };

  useEffect(() => {
    fetchEnquiryDetails();
  }, []);

  if (!loading && enquiries) {
    return (
      <div className="w-full flex flex-col gap-14">
        <TabHeader title="Enquiry" subTitle="All your enquiries come here." />

        <div className="flex flex-col gap-2">
          <p className="text-4xl font-medium">{format(new Date(), "PPP")}</p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {enquiries && enquiries.length > 0 ? (
            enquiries.map((el, index) => {
              return (
                <EnquiryCard
                  data={el}
                  index={index + 1}
                  setIsModalOpen={setIsModalOpen}
                />
              );
            })
          ) : (
            <p>No enquiries for available...</p>
          )}
        </div>

        {isModalOpen ? (
          <EnquiryDetailModal
            data={enquiries[isModalOpen - 1]}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center max-h-screen h-screen w-full">
      <Loading />
    </div>
  );
}
