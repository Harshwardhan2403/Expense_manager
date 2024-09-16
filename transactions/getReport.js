import { Dropdown, Row, Button } from "@nextui-org/react";
import styles from "./getReport.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const GetReport = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Set(["Select Month"]));
  const [selectedYear, setSelectedYear] = useState(new Set(["Select Year"]));
  const [monthArr, setMonthArr] = useState("");
  const [yearArr, setYearArr] = useState("");
  const router = useRouter();

  useEffect(() => {
    setMonthArr(Array.from(selectedMonth)[0]);
    setYearArr(Array.from(selectedYear)[0]);
  }, [selectedMonth, selectedYear]);
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const generateReport = async (month, year) => {
    `https://expensemanager20230425005316.azurewebsites.net/api/Transactions/generatepdf?i_month=${month}&i_year=${year}`;
  };

  const yearList = [];
  const currentDate = new Date();
  let currentYear = currentDate.getFullYear();

  for (let i = 2015; i <= currentYear; i++) {
    yearList.push(i);
  }

  const dropdownStyle = {
    backgroundColor: "#2B2F31",
  };

  return (
    <Row justify="center" className={styles.mainContainer}>
      <h1 className={styles.getReportHeading}>Generate Report</h1>
      <div className={styles.dropdownDiv}>
        <Dropdown>
          <Dropdown.Button solid color="primary">
            {selectedMonth}
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="Static Actions"
            color="primary"
            css={dropdownStyle}
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedMonth}
            onSelectionChange={setSelectedMonth}
          >
            {monthList.map((month) => {
              return (
                <Dropdown.Item color="primary" key={month}>
                  {month}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Button solid color="primary">
            {selectedYear}
          </Dropdown.Button>
          <Dropdown.Menu
            aria-label="Static Actions"
            color="primary"
            css={dropdownStyle}
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedYear}
            onSelectionChange={setSelectedYear}
          >
            {yearList.map((year) => {
              return (
                <Dropdown.Item color="primary" key={year}>
                  {year}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Button
        className={styles.submitButton}
        color="success"
        auto
        onClick={() => {
          router.push({
            pathname:
              "https://expensemanager20230425005316.azurewebsites.net/api/Transactions/generatepdf",
            query: {
              i_month: monthArr,
              i_year: yearArr,
            },
          });
        }}
      >
        Download
      </Button>
    </Row>
  );
};