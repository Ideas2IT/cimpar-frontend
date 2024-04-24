import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import "./Immunization.css";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import CustomPaginator from "../customPagenator/CustomPaginator";
interface RowData {
  id: number;
  vaccineName: string;
  adminDate: string;
  doseNumber: string;
  administrator: string;
  site: string;
  view: string;
  dosageForm: string;
  lotNumber: string;
  route: string;
  administeredCode: string;
}
const TestResult = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPatient, setSelectedpatient] = useState({} as RowData);
  const values: RowData[] = [
    {
      id: 1,
      vaccineName: "Covix",
      adminDate: "12 May,2006",
      doseNumber: "1st dose",
      administrator: "Nithin",
      site: "Upper Left arm ",
      dosageForm: "3.0 ML",
      view: "",
      lotNumber: "EH9899",
      route: "Intramuscular injection",
      administeredCode: "JO7BN01",
    },
    {
      id: 2,
      vaccineName: "Cholera(Liquid)",
      adminDate: "12 May,2006",
      doseNumber: "2nd dose",
      administrator: "Nithin",
      site: "Upper Left arm ",
      view: "",
      dosageForm: "3.0 ML",
      lotNumber: "EH9899",
      route: "Intramuscular injection",
      administeredCode: "JO7BN01",
    },
    {
      id: 3,
      vaccineName: "Cholera(Liquid)",
      adminDate: "12 May,2006",
      doseNumber: "2nd dose",
      administrator: "Nithin",
      site: "Upper Left arm ",
      view: "",
      dosageForm: "3.0 ML",
      lotNumber: "EH9899",
      route: "Intramuscular injection",
      administeredCode: "JO7BN01",
    },
    {
      id: 4,
      vaccineName: "Cholera(Liquid)",
      adminDate: "12 May,2006",
      doseNumber: "2nd dose",
      administrator: "Nithin",
      site: "Upper Left arm ",
      view: "",
      dosageForm: "3.0 ML",
      lotNumber: "EH9899",
      route: "Intramuscular injection",
      administeredCode: "JO7BN01",
    },
    {
      id: 5,
      vaccineName: "Cholera(Liquid)",
      adminDate: "12 May,2006",
      doseNumber: "2nd dose",
      administrator: "Nithin",
      site: "Right Shoulder Muscle",
      view: "",
      dosageForm: "3.0 ML",
      lotNumber: "EH9899",
      route: "Intramuscular injection",
      administeredCode: "JO7BN01",
    },
  ];

  const tableProps = {
    value: values,
    selectionMode: "single" as const,
    dataKey: "id",
    tableStyle: { minWidth: "50rem" },
    className: "mt-2 max-h-[50%] rowHoverable",
    rowClassName: "h-10 border",
    scrollHeight: "30rem",
  };

  const columnsConfig = [
    {
      field: "vaccineName",
      header: "VACCINE NAME",
    },
    {
      field: "adminDate",
      header: "ADMINISTRATION DATE",
    },
    {
      field: "doseNumber",
      header: "DOSE NUMBER",
    },
    {
      field: "administrator",
      header: "ADMINISTRATOR",
    },
    {
      field: "site",
      header: "SITE",
    },
  ];

  const handleViewRecord = (data: RowData) => {
    setSelectedpatient(data);
    setIsSidebarOpen(true);
  };

  const handlePageChange = (event: any) => {
    console.log("page changed", event);
  };

  return (
    <>
      <DataTable {...tableProps}>
        {!!columnsConfig.length &&
          columnsConfig.map((column) => {
            return (
              <Column
                key={column.header}
                field={column.field}
                header={column.header}
                headerClassName="text-sm font-secondary py-1"
                bodyClassName="py-0"
                body={(rowData) => (
                  <ColumnData content={rowData[column.field]} />
                )}
              />
            );
          })}
        <Column
          field="view"
          header=""
          headerClassName="text-sm font-secondary py-1"
          bodyClassName="py-0"
          body={(rowData) => (
            <ViewColumn
              data={rowData}
              handleViewRecord={() => handleViewRecord(rowData)}
            />
          )}
        />
      </DataTable>
      {
        //TODO: show the pagenator only if total records are more than page limit
        values.length > 20 && (
          <CustomPaginator
            handlePageChange={handlePageChange}
            totalRecords={values.length}
            rowLimit={20}
          />
        )
      }
      <Sidebar
        className="w-[28rem]"
        header="immunization details"
        visible={isSidebarOpen}
        position="right"
        onHide={() => setIsSidebarOpen(false)}
      >
        <ImmunizationDetailView data={selectedPatient} />
      </Sidebar>
    </>
  );
};

const ImmunizationDetailView = ({ data }: { data: RowData }) => {
  const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div className="border-b">
      <div className="input-label text-gray-900 font-secondary pt-4">
        {label}
      </div>
      <label className="font-primary">{value}</label>
    </div>
  );

  const columnKeys = [
    "ADMINISTRATION DATE",
    "ADMINISTRATOR",
    "DOSE NUMBER",
    "DOSAGE FORM",
    "ADMINISTERED CODE",
    "LOT NUMBER",
    "ROUTE",
    "SITE",
  ];
  
  const getValue = (title: string) => {
    switch (title) {
      case "ADMINISTRATOR":
        return data["administrator"];
      case "ADMINISTRATION DATE":
        return data["adminDate"];
      case "DOSE NUMBER":
        return data["doseNumber"];
      case "DOSAGE FORM":
        return data["dosageForm"];
      case "ADMINISTERED CODE":
        return data["administeredCode"];
      case "LOT NUMBER":
        return data["lotNumber"];
      case "ROUTE":
        return data["route"];
      case "SITE":
        return data["site"];
      default:
        return "";
    }
  };

  return (
    <div className="pt-6">
      <label className="font-primary text-sm">Vaccine details</label>
      <div className="border-b">
        <DetailRow label="VACCINE NAME" value={data.vaccineName} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Boolean(columnKeys.length) &&
          columnKeys.map((column) => {
            return <DetailRow label={column} value={getValue(column)} />;
          })}
      </div>
      <div className="font-primary text-primary pt-4">Manufacturer details</div>
      <div className="grid grid-cols-2 gap-4">
        <div className="border-b">
          <div className="input-label font-secondary pt-4">
            VMANUFACTURER NAME
          </div>
          <label className="font-primary">{data.vaccineName}</label>
        </div>
        <div className="border-b mt-1">
          <div className="input-label font-secondary pt-4 pb-1">
            EXPIRATION DATE
          </div>
          <label className="font-primary">{data.vaccineName}</label>
        </div>
      </div>
    </div>
  );
};

const ViewColumn = ({
  data,
  handleViewRecord,
}: {
  data: RowData;
  handleViewRecord: (value: RowData) => void;
}) => {
  const handleView = (data: RowData) => {
    handleViewRecord(data);
  };

  const handleShare = (data: RowData) => {
    console.log("share", data);
  };

  return (
    <div className="flex flex-row gap-2 text-purple-800">
      <i className="pi pi-eye" onClick={() => handleView(data)} />
      <i className="pi pi-share-alt" onClick={() => handleShare(data)} />
    </div>
  );
};
const ColumnData = ({ content }: { content: string }) => {
  return <div className="text-sm">{content}</div>;
};
export default TestResult;
