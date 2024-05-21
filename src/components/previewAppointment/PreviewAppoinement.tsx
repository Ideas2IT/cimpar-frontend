import { Button } from "primereact/button";
import { ITest } from "../../assets/MockData";
import { IFormData, IItem } from "../appointmentForm/AppointmentForm";
import { PatientDetails } from "../userDetails/UserDetails";
import moment from "moment";

const PreviewAppointment = ({
  details,
  handleResponse,
}: {
  details: IFormData;
  handleResponse: (response: boolean) => void;
}) => {
  const getStringFromObjects = (values: ITest[] | IItem[]) => {
    const testString = values
      .map((value: any) => {
        return value.name;
      })
      .join(", ");
    return testString;
  };

  const fields = [
    {
      header: "TEST NAME",
      value: getStringFromObjects(details.testToTake),
      full: true,
    },
    {
      header: "DATE OF TEST",
      value: moment(details.dateOfAppointment).format("DD MMM, YYYY"),
    },
    {
      header: "TIME OF TEST",
      value: moment(details.scheduledTime, "HH:mm").format("h:mm A"),
    },
    {
      header: "REASON FOR TEST",
      value: details?.testReason.name || "-",
      full: true,
    },
    {
      header: "MEDICAL CONDITIONSS",
      value: details?.medicalConditions?.length
        ? getStringFromObjects(details?.medicalConditions)
        : "",
      full: true,
    },
  ];
  return (
    <div className="h-full relative">
      <label className="font-primary text-lg py-5 block">Test Details</label>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {fields.map((field) => {
          return (
            <div className={`${field?.full && "col-span-2"}`}>
              <PatientDetails label={field.header} value={field.value} />
            </div>
          );
        })}
      </div>
      <div className="text-purple-800 flex justify-between font-primary lg:pt-5 pt-2 border-t absolute bottom-2 right-0 left-0">
        <Button
          onClick={() => handleResponse(false)}
          icon="pi pi-times px-2"
          className="py-1 rounded-full border border-purple-800 w-[48%] justify-center"
        >
          No, I want to edit
        </Button>
        <Button
          onClick={() => handleResponse(true)}
          icon="pi pi-check px-2"
          className="py-1 rounded-full border border-purple-800 bg-purple-100 w-[48%] justify-center"
        >
          Yes, Confirm my Appointment
        </Button>
      </div>
    </div>
  );
};
export default PreviewAppointment;
