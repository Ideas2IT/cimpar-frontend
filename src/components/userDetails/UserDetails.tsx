import { IUser } from "../../interfaces/User";

const UserDetails = ({ patient }: { patient: IUser }) => {
  const patientDetails = [
    {
      label: "NAME",
      value:
        patient.firstName + " " + patient.middleName + " " + patient.lastName,
    },
    { label: "DOB", value: patient.dob },
    { label: "GENDER", value: patient.gender },
    { label: "RACE", value: patient.race },
    { label: "HEIGHT", value: patient.height },
    { label: "WEIGHT", value: patient.weight },
    { label: "ETHINICITY", value: patient.ethinicity },
  ];

  const contactDetails = [
    { label: "PHONE NUMBER", value: patient.phoneNumber },
    {
      label: "ALTERNATIVE NUMBER",
      value: patient.alternativeNumber,
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

const PatientDetails = ({
  label,
  value,
}: {
  value: string | number;
  label: string;
}) => {
  return (
    <div className="border-b border-gray-100">
      <div className="font-secondary text-sm text-gray-500 py-2">
        {label ? label : "-"}
      </div>
      <div
        title={value.toString()}
        className="font-primary pb-2 text-[#283956] text-clip"
      >
        {value ? value : "-"}
      </div>
    </div>
  );
};

export default UserDetails;
