import styles from "./transactions.module.css";
import { TransTable } from "./transTable";
import { AddNewTransaction } from "./addNewTransaction";
import { Container, Button, Row } from "@nextui-org/react";
import { useState } from "react";
import { GetReport } from "./getReport";
import NavBar from "../navbar";

const TransactionComp = (props) => {
  console.log(props);
  const [showTrans, setShowTrans] = useState(true);
  const [transactionData, setTransactionData] = useState(props.transData);
  const [showReportSection, setReportSection] = useState(true);

  return (
    <>
    <NavBar 
        page={1}
      />
    <Container>
      <div className={styles.headerDiv}>
        <h1 className={styles.transHeader}>Transactions</h1>
        <Button
          color="success"
          auto
          onClick={() => {
            setShowTrans(!showTrans);
          }}
        >
        {showTrans ? 
          "+ New Transaction"
          :
          "Back"
        }
        </Button>
      </div>
      {showTrans ? (
        <div>
          <TransTable
            transData={transactionData}
            catData={props.catData}
            setTransactionData={setTransactionData}
          />
          {showReportSection ? (
              <Row justify="center">
                <Button
                  className={styles.getReportButton}
                  color="success"
                  auto
                  onPress={() => {
                    setReportSection(!showReportSection);
                  }}
                >
                  Get Report
                </Button>
              </Row>
            ) : (
              <Row justify="center">
                <GetReport />
              </Row>
          )}
          
        </div>
      ) : (
        <AddNewTransaction
          catData={props.catData}
          transactionData={transactionData}
          setTransactionData={setTransactionData}
          showTrans={showTrans}
          setShowTrans={setShowTrans}
        />
      )}
    </Container>
    </>
  );
};

export default TransactionComp;