import React, { useEffect, useState } from "react";
import MembershipAddModal from "./MembershipAddModal";
import axiosInstance from "../../../api/axios";
import { MembershipPlanType } from "../../../types/admin";
import AddBenefitsModal from "./AddBenefitsModal";

interface  MembershipCardsProps {
  mount:boolean
}
const MembershipCards: React.FC<MembershipCardsProps> = ({mount}) => {
  const [memberships, setMemberships] = useState<MembershipPlanType[]>([]);
  useEffect(() => {
    axiosInstance
      .get("/admin/get-memberships")
      .then(({ data }) => {
        setMemberships(data.memberships);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  }, [mount]);
  const onCouponAdded = () => {};
  return (
    <>
      {memberships && memberships.length > 0 &&
        memberships.map((membership) => (
          <div className="w-full max-w-sm p-4border  rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-8"
          key={membership._id}>
            <h5 className="mb-2 text-2xl text-white font-bold ">{membership.planName}</h5>
            <div className="flex items-baseline text-gray-900 dark:text-white">
              <span className="text-xl font-semibold">$</span>
              <span className="text-3xl font-extrabold tracking-tight">{membership.cost}</span>
              <span className="ml-1 text-base font-normal text-gray-500 dark:text-gray-400">
                /{membership.type}
              </span>
            </div>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <svg
                  className="w-3 h-3 mr-2 text-blue-700 dark:text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  2 team members
                </span>
              </li>
             
            </ul>
          </div>
        ))}
    </>
  );
};

export default MembershipCards;
