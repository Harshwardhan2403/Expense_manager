import { Row } from "@nextui-org/react";
import { useState, useMemo } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./addNewTransaction.module.css";
import { Input, Dropdown } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { GetTransactions } from "../constants/urls";

export const AddNewTransaction = (props) => {
  const [selectedCat, setSelectedCat] = useState(
    new Set(["Choose a category"])
  );
  const [transactionName, setTransactionName] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionDescription, setTransactionDescription] = useState("");
  const [addIncome, setAddIncome] = useState(false);
  const selectedValue = useMemo(
    () => Array.from(selectedCat).join(", ").replaceAll("_", " "),
    [selectedCat]
  );

  const dropdownStyle = {
    backgroundColor: "#2B2F31",
  };

  const inputStyle = {
    // color: '#$pink100',
    backgroundColor: "white",
    width: "100%",
  };

  const textAreaStyle = {
    width: "100%",
  };

  const addButtonStyle = {
    width: "50%",
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;
    let currentDay = currentDate.getDate();
    if (currentMonth < 10) {
      currentMonth = "0" + String(currentMonth);
    }
    if (currentDay < 10) {
      currentDay = "0" + String(currentDay);
    }
    let formattedDate = `${currentYear}-${currentMonth}-${currentDay}`;
    console.log(formattedDate);
    return formattedDate;
  };

  const getCategoryIdFromCategory = (category) => {
    let categoryName = Array.from(category)[0];
    console.log(categoryName);
    for (let i = 0; i < props.catData.length; i++) {
      if (categoryName === props.catData[i]["name"]) {
        return props.catData[i]["id"];
      }
    }
  };

  const handleTransaction = async () => {
    const transactionDate = getCurrentDate();
    const categoryId = getCategoryIdFromCategory(selectedCat);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "ARRAffinity=ab52746cee3d2041a0a4d964700673b28428853c105b7c164f6460eb8129960d; ARRAffinitySameSite=ab52746cee3d2041a0a4d964700673b28428853c105b7c164f6460eb8129960d"
    );

    var raw = JSON.stringify({
      name: `${transactionName}`,
      description: `${transactionDescription}`,
      amount: Number(transactionAmount),
      date: `${transactionDate}`,
      transactionTypeId: addIncome ? 2 : 1,
      categoryId: addIncome ? 7 : categoryId,
    });

    console.log(raw);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    console.log(props.transactionData);

    let response = await fetch(`${GetTransactions}`, requestOptions);

    let responseData = await response.json();

    const addedData = {
        "amount": Number(transactionAmount),
        "categoryId": addIncome ? 7 : categoryId,
        "date": `${transactionDate}`,
        "description": `${transactionDescription}`,
        "id": responseData['id'],
        "name": `${transactionName}`,
        "transactionTypeId": addIncome ? 2 : 1,
    }

    props.setTransactionData([...props.transactionData, addedData])

    console.log(responseData);
    props.setShowTrans(true);
    console.log(props.showTrans);
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.heading}>Create a new Transaction</h1>
      <Button.Group>
        <Button
          color="#2B2F31"
          auto
          ghost
          onPress={() => {
            setAddIncome(false);
          }}
        >
          Expense
        </Button>
        <Button
          color="#2B2F31"
          auto
          ghost
          css={{
            "& : hover": {
              background: "$gray100",
              color: "$gray800",
            },
          }}
          onPress={() => {
            setAddIncome(true);
          }}
        >
          Income
        </Button>
      </Button.Group>
      <Row justify="center" className={styles.containerRow}>
        <div className={styles.newTranContainer}>
          {/* <div>
                        <p>Date</p>
                        <DatePicker className={styles.inputDate} selected={transDate} onChange={(date) => setTransDate(date)} />
                    </div> */}
          <div>
            <p>Name</p>
            <Input
              // color="primary"
              bordered
              placeholder="Enter Name"
              css={inputStyle}
              onChange={(event) => {
                setTransactionName(event.target.value);
              }}
              value={transactionName}
            />
          </div>
          {!addIncome && (
            <div className={styles.dropdownDiv}>
              <p>Category</p>
              <Dropdown>
                <Dropdown.Button solid color="primary">
                  {selectedCat}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Static Actions"
                  color="primary"
                  css={dropdownStyle}
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedCat}
                  onSelectionChange={setSelectedCat}
                >
                  {props.catData.map((cat) => {
                    if (cat['id'] !== 7) {
                    return (
                      <Dropdown.Item color="primary" key={cat["name"]}>
                        {cat["name"]}
                      </Dropdown.Item>
                    );
                    }
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}

          <div>
            <p>Amount</p>
            <Input
              // color="primary"
              bordered
              placeholder="Enter amount"
              css={inputStyle}
              onChange={(event) => {
                setTransactionAmount(event.target.value);
              }}
            />
          </div>

          <div>
            <p>Description (Optional)</p>
            <Textarea
              placeholder="Enter Description"
              css={textAreaStyle}
              onChange={(event) => {
                setTransactionDescription(event.target.value);
              }}
            />
          </div>
          <div className={styles.addButtonDiv}>
            <Button
              color="success"
              auto
              onPress={handleTransaction}
              css={addButtonStyle}
            >
              Add Transaction
            </Button>
          </div>
        </div>
      </Row>
    </div>
  );
};