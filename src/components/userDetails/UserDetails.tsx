import { useEffect } from "react";
import { IUser } from "../../interfaces/User";
import { getFullPhoneNUmber } from "../../services/commonFunctions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getPatinetDetailsThunk } from "../../store/slices/PatientSlice";
import { format } from "date-fns";

const UserDetails = ({ patient }: { patient: IUser }) => {
  const patientDetails = [
    {
      label: "NAME",
      value:
        patient.firstName + " " + patient.middleName ||
        "" + " " + patient.lastName ||
        "",
    },
    { label: "DOB", value: format(new Date(patient.dob), "dd MMM, yyyy") },
    { label: "GENDER", value: patient.gender },
    { label: "RACE", value: patient.race },
    {
      label: "HEIGHT",
      value:
        patient.height.feet +
        " feet, " +
        patient.height.inches.toString().padStart(2, "0") +
        " inches ",
    },
    { label: "WEIGHT", value: patient.weight + " Pounds" },
    { label: "ETHNICITY", value: patient.ethnicity },
  ];

  const contactDetails = [
    {
      label: "PHONE NUMBER",
      value: getFullPhoneNUmber(
        patient.countryCode,
        String(patient.phoneNumber)
      ),
    },
    {
      label: "ALTERNATIVE NUMBER",
      value: patient.alternativeNumber ? patient.alternativeNumber : "None",
    },
    {
      label: "FULL ADDRESS",
      value: patient.fullAddress,
    },
    { label: "ZIP CODE", value: patient.zipCode },
    { label: "CITY", value: patient.city },
    { label: "STATE", value: patient.state },
    { label: "COUNTRY", value: patient.country },
  ];
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPatinetDetailsThunk(1));
  }, []);

  return (
    <div className="p-3">
      <div className="font-primary text-xl">Basic Details</div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        {patientDetails.map((detail) => {
          return (
            <PatientDetails
              key={detail.label}
              label={detail.label}
              value={detail.value}
            />
          );
        })}
      </div>
      <div className="font-primary text-xl pt-6 pb-3">Contact Details</div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {contactDetails.map((detail) => {
          return (
            <div
              key={detail.label}
              className={`${detail.label === "FULL ADDRESS" && "md:col-span-2"}`}
            >
              <PatientDetails label={detail.label} value={detail.value} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const PatientDetails = ({
  label,
  value,
}: {
  value: string | number;
  label: string;
}) => {
  return (
    <div className="border-b border-gray-100">
      <div className="font-secondary text-sm text-gray-500 py-2 max-w-[100%] text-ellipsis overflow-hidden">
        {label ? label : "-"}
      </div>
      <div
        title={value.toString()}
        className="font-primary pb-2 text-[#283956] capitalize text-clip"
      >
        {value ? value : "-"}
      </div>
    </div>
  );
};

export default UserDetails;
