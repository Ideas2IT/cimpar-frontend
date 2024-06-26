import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { IInsurance } from "../../interfaces/User";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import useToast from "../useToast/UseToast";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import { selectedRole } from "../../store/slices/commonSlice";
import { RESPONSE, ROLE } from "../../utils/AppConstants";
import {
  getInsuranceTypeLabel,
  getRowClasses,
} from "../../services/commonFunctions";
import { AppDispatch } from "../../store/store";
import {
  deleteInsuranceByIdThunk,
  getPatientInsuranceThunk,
  selectSelectedPatient,
} from "../../store/slices/PatientSlice";
import { deleteInsurancePayload } from "../../interfaces/insurance";

const InsuranceDetails = () => {
  const [selectedPolicy] = useState({} as IInsurance);
  const dispatch = useDispatch<AppDispatch>();
  const selectedPatient = useSelector(selectSelectedPatient);

  const columns = [
    {
      field: "insuranceName",
      header: "INSURANCE COMPANY",
      body: (rowData: IInsurance) => (
        <PolicyColumn value={rowData.insuranceCompany} />
      ),
    },
    {
      field: "policyNumber",
      header: "POLICY NUMBER",
      body: (rowData: IInsurance) => (
        <PolicyColumn value={rowData.policyNumber} />
      ),
    },
    {
      field: "groupNumber",
      header: "GROUP NUMBER",
      body: (rowData: IInsurance) => (
        <PolicyColumn value={rowData.groupNumber} />
      ),
    },
    {
      field: "insuranceType",
      header: "TYPE",
      body: (rowData: IInsurance) => (
        <PolicyColumn value={getInsuranceTypeLabel(rowData.insuranceType)} />
      ),
    },
    {
      field: "",
      header: "",
      body: (rowData: IInsurance) => (
        <PolicyHandler
          data={rowData}
          patinetId={selectedPatient?.basicDetails?.id}
        />
      ),
    },
  ];
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    selectedPatient?.basicDetails?.id &&
      dispatch(getPatientInsuranceThunk(selectedPatient.basicDetails.id));
  }, [selectedPatient?.basicDetails?.id]);

  return (
    <DataTable
      selection={selectedPolicy}
      value={selectedPatient.InsuranceDetails}
      selectionMode="single"
      dataKey="id"
      emptyMessage={
        <div className="flex justify-center">
          It looks like you don't have any insurance records at the moment.
        </div>
      }
      tableStyle={{ minWidth: "50rem" }}
      className="mt-2 max-h-[50%] rowHoverable"
      rowClassName={() => getRowClasses("h-10 border-b")}
      scrollHeight="30rem"
    >
      {columns.map((column, index) => {
        return (
          <Column
            key={index}
            field={column.field}
            bodyClassName="py-4"
            header={column.header}
            headerClassName="text-sm font-secondary py-1 border-b bg-white"
            body={column.body}
          />
        );
      })}
    </DataTable>
  );
};

const PolicyColumn = ({ value }: { value: string }) => {
  return <div className="font-tertiary">{value ? value : "-"}</div>;
};

const PolicyHandler = ({
  data,
  patinetId,
}: {
  data: IInsurance;
  patinetId: string;
}) => {
  const role = useSelector(selectedRole);
  const { toast, successToast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const handleDeleteInsurance = () => {
    if (patinetId && data) {
      const payload: deleteInsurancePayload = {
        patinetId: patinetId,
        insuranceId: data.id,
      };
      dispatch(deleteInsuranceByIdThunk(payload)).then(({ meta }) => {
        if (meta.requestStatus === RESPONSE.FULFILLED) {
          successToast(
            "Insurance deleted",
            "Insurance has been deleted successfully"
          );
          dispatch(getPatientInsuranceThunk(patinetId));
        }
      });
    }
  };
  return (
    <div className="flex flex-row max-w-[4rem] items-center justify-between">
      <NavLink to={`/edit-insurance/${data.id}`}>
        <button
          disabled={role === ROLE.ADMIN}
          className={`${role === ROLE.ADMIN && "cursor-not-allowed"}`}
        >
          <i className="pi pi-pen-to-square text-purple-800" />
        </button>
      </NavLink>
      <button
        disabled={role === ROLE.ADMIN}
        className={`${role === ROLE.ADMIN && "cursor-not-allowed"}`}
      >
        <i
          className="pi pi-trash  mx-2 text-red-500"
          onClick={handleDeleteInsurance}
        />
      </button>
      <Toast ref={toast} />
    </div>
  );
};
export default InsuranceDetails;
