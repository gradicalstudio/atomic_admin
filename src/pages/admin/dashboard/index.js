import React, { useState, useEffect } from "react";
import TabHeader from "../../../components/TabHeader";
import { format } from "date-fns";
import { db } from "../../../firebase";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import EnquiryCard from "../../../components/EnquiryCard";

import EnquiryDetailModal from "../../../components/EnquiryDetailModal";

export default function Dashboard() {
  const [enquiries, setEnquiries] = useState(null);

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // console.log(todayEnquiries);

  if (!loading && enquiries) {
    return (
      <div className="w-full flex flex-col gap-14">
        <TabHeader
          title="Dashboard"
          subTitle="An overview on atomic's growth"
        />

        <div className="grid grid-cols-4 gap-10">
          <div className="px-8 flex flex-col gap-2 py-4 bg-white">
            <p className="text-sm font-medium">ENQUIRY TODAY</p>
            <p className="text-4xl font-bold">
              {enquiries.reduce((prev, curr) => {
                if (curr.createdAt === format(new Date(), "PPP")) {
                  return prev + 1;
                }
                return prev;
              }, 0)}
            </p>
          </div>
          <div className="px-8 flex flex-col gap-2 py-4 bg-white">
            <p className="text-sm font-medium">TOTAL CLOSED ENQUIRY</p>
            <p className="text-4xl font-bold">
              {enquiries.reduce((prev, curr) => {
                if (!curr.status) {
                  return prev + 1;
                }
                return prev;
              }, 0)}
            </p>
          </div>
          <div className="px-8 flex flex-col gap-2 py-4 bg-white">
            <p className="text-sm font-medium">OVERALL ENQUIRY</p>
            <p className="text-4xl font-bold">{enquiries.length}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-4xl font-medium">Enquiry Today</p>
          <p>Enquiries for the {format(new Date(), "PPP")}</p>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {enquiries &&
          enquiries.filter((el) => el.createdAt === format(new Date(), "PPP"))
            .length > 0 ? (
            enquiries
              .filter((el) => el.createdAt === format(new Date(), "PPP"))
              .map((el, index) => {
                return (
                  <EnquiryCard
                    data={el}
                    index={index + 1}
                    setIsModalOpen={setIsModalOpen}
                  />
                );
              })
          ) : (
            <p>No enquiries for today...</p>
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
