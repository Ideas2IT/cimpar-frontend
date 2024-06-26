import { useState } from "react";
import { LabTestResult } from "../LabTestResults";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Eye from "../../assets/icons/eye.svg?react";
import Download from "../../assets/icons/download.svg?react";
import CustomPaginator from "../customPagenator/CustomPaginator";
import { Sidebar } from "primereact/sidebar";
import { getRowClasses, getStatusColors } from "../../services/commonFunctions";
import { Button } from "primereact/button";
import { PaginatorPageChangeEvent } from "primereact/paginator";

const TestResult = ({ results }: { results: LabTestResult[] }) => {
  const [selectedTest, setSelectedTest] = useState({} as LabTestResult);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const columnHeaderStyle = "text-sm font-secondary py-1 border-b bg-white";

  const handlePageChange = (event: PaginatorPageChangeEvent) => {
    //TODO: Write logic to call api
    console.log(event);
  };

  //TODO: Need to handle the logic
  const handleReports = (action: string, row: LabTestResult) => {
    setSelectedTest(row);
    action === "view" && setIsOpenSidebar(true);
  };

  const SidebarHeader = () => {
    return (
      <div className="flex items-center justify-between w-full">
        <div>
          <span className="pe-3">Lab Result</span>
          <span
            className={`${getStatusColors(selectedTest.status)} py-1 px-3 rounded-full text-sm font-tertiary`}
          >
            {selectedTest.status ? selectedTest.status : "-"}
          </span>
        </div>
        {selectedTest.status === "Available" && (
          <Button
            title="Download test report"
            label="Download"
            className="text-purple-900 bg-purple-100 rounded-full py-1 px-3 border border-purple-900 me-3 text-sm"
            icon="pi pi-download"
          />
        )}
      </div>
    );
  };

  const resultColumns = [
    {
      field: "testName",
      header: "TEST NAME",
      body: (rowData: LabTestResult) => <TestName name={rowData.testName} />,
    },
    {
      field: "orderId",
      header: "ORDER ID",
      body: (rowData: LabTestResult) => <TestDetails value={rowData.orderId} />,
    },
    {
      field: "testedAt",
      header: "TESTED AT",
      body: (rowData: LabTestResult) => (
        <TestDetails value={rowData.testedAt} />
      ),
    },
    {
      field: "dateOfTest",
      header: "DATE OF TEST",
      body: (rowData: LabTestResult) => (
        <TestDetails value={rowData.dateOfTest} />
      ),
    },
    {
      field: "status",
      header: "STATUS",
      body: (rowData: LabTestResult) => <TestStatus status={rowData.status} />,
    },
    {
      field: "",
      header: "",
      body: (rowData: LabTestResult) => (
        <ReportColumn data={rowData} handleReports={handleReports} />
      ),
    },
  ];

  return (
    <>
      <DataTable
        selection={selectedTest}
        value={results}
        selectionMode="single"
        dataKey="orderId"
        tableStyle={{ minWidth: "50rem" }}
        className="mt-2 max-h-[90%] rowHoverable"
        rowClassName={() => getRowClasses("h-10 border-b")}
        scrollHeight="40rem"
      >
        {resultColumns.map((column, index) => {
          return (
            <Column
              key={index}
              headerClassName={columnHeaderStyle}
              bodyClassName="py-4"
              field={column.field}
              header={column.header}
              body={column.body}
            />
          );
        })}
      </DataTable>
      {results.length > 10 && (
        <CustomPaginator
          rowLimit={10}
          handlePageChange={handlePageChange}
          totalRecords={results.length}
        />
      )}
      {!!Object.keys(selectedTest).length && (
        <Sidebar
          className="detailed-view w-[30rem]"
          header={<SidebarHeader />}
          visible={!!Object.keys(selectedTest).length && isOpenSidebar}
          position="right"
          onHide={() => {
            setSelectedTest({} as LabTestResult);
            setIsOpenSidebar(false);
          }}
        >
          <TestDetailedView test={selectedTest} />
        </Sidebar>
      )}
    </>
  );
};

const TestName = ({ name }: { name: string }) => {
  return (
    <div className="text-purple-800 font-tertiary">{name ? name : "-"}</div>
  );
};

const TestDetails = ({ value }: { value: string }) => {
  return <div className="font-tertiary">{value ? value : "-"}</div>;
};
const TestStatus = ({ status }: { status: string }) => {
  return (
    <div>
      <span
        className={`${getStatusColors(status)} rounded-full py-[.4rem] px-4 text-sm text-center`}
      >
        {status ? status : "-"}
      </span>
    </div>
  );
};

const ReportColumn = ({
  data,
  handleReports,
}: {
  data: LabTestResult;
  handleReports: (action: string, data: LabTestResult) => void;
}) => {
  return (
    <div className="flex flex-row items-center stroke-purple-800 items-center justify-start">
      <Eye className="me-2" onClick={() => handleReports("view", data)} />
      {(data.status.toLowerCase() === "under porcesses" ||
        data.status.toLowerCase() === "available") && (
        <Download onClick={() => handleReports("download", data)} />
      )}
    </div>
  );
};

const TestDetailedView = ({ test }: { test: LabTestResult }) => {
  const TableCell = ({
    label,
    value,
    highlight,
  }: {
    label: string | undefined;
    value: string | undefined;
    highlight?: boolean;
  }) => (
    <div className="border-b pb-1">
      <div className="text-gray-500 font-secondary text-sm pt-4">
        {label ? label : "-"}
      </div>
      <label className={`${highlight && "text-red-600"} font-primary`}>
        {value ? value : "-"}
      </label>
    </div>
  );

  const Result = () => {
    const columnFields = [
      {
        label: "RESULT",
        value: "16",
        highlight: true,
      },
      { label: "REFERENCE RANGE", value: "10-13", highlight: false },
      { label: "UNITS", value: "G/dL", heightlight: false },
      { label: "FALG", value: "HIGH", highlight: true },
    ];
    return (
      <div className="flex grid lg:grid-cols-2 gap-3">
        {columnFields.map((column) => {
          return (
            <TableCell
              label={column.label}
              value={column.value}
              highlight={column.highlight}
            />
          );
        })}
      </div>
    );
  };

  const columnKeys =
    test.status.toLowerCase() !== "upcoming appointment"
      ? [
          "ORDER ID",
          "DATE OF TEST",
          "SPECIMEN USED",
          "TESTED AT",
          "DATE/TIME COLLECTED",
          "DATE/TIME REPORTED",
        ]
      : ["ORDER ID", "DATE OF TEST"];

  const getValue = (title: string | undefined) => {
    if (title) {
      switch (title) {
        case "ORDER ID":
          return test["orderId"];
        case "DATE OF TEST":
          return test["dateOfTest"];
        case "SPECIMEN USED":
          return test.data["specimenUsed"];
        case "TESTED AT":
          return test["testedAt"];
        case "DATE/TIME COLLECTED":
          return test.data["dateTimeCollected"];
        case "PHYSICAN PHONE":
          return test.data["physicianPhone"];
        case "PHYSICIAN NAME":
          return test.data["physicianName"];
        case "DATE/TIME REPORTED":
          return test.data["dateTimeReported"];
        default:
          return "";
      }
    } else return "";
  };

  return (
    <div className="pt-6">
      <label className="font-primary text-sm">Test details</label>
      <div>
        <TableCell label="TEST NAME" value={test.testName} />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {Boolean(columnKeys.length) &&
          columnKeys.map((column) => {
            return <TableCell label={column} value={getValue(column)} />;
          })}
      </div>
      {test.status.toLowerCase() !== "upcoming appointment" && (
        <>
          <div className="font-primary text-primary flex justify-between py-6 mt-6 text-xl">
            Test Results
            {test.status === "Available" && (
              <div
                className="flex flex-row items-center justify-center text-purple-800 cursor-pointer"
                onClick={() => {}}
              >
                <Eye className="stroke-purple-800 me-2" /> Preview
              </div>
            )}
          </div>
          {test.status.toLowerCase() === "available" ? (
            <Result />
          ) : (
            <label className="text:sm py-6">
              Results will be displayed here once physician uploaded it.
            </label>
          )}
          <div className="font-primary text-primary py-6 text-xl">
            Ordering Physician details
          </div>
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-3">
            <TableCell
              label="PHYSICIAN NAME"
              value={getValue("PHYSICIAN NAME")}
            />
            <TableCell
              label="CONTACT INFO"
              value={getValue("PHYSICAN PHONE")}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default TestResult;
