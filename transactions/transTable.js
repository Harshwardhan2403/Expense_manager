import { Table, Row, Col, Tooltip } from "@nextui-org/react";
import { DeleteIcon } from "./DeleteIcon";
import { IconButton } from "./IconButton";
import styles from "./transactions.module.css";
import { GetTransactions } from "../constants/urls";

export const TransTable = (props) => {
  const headerStyle = {
    backgroundColor: "#2B2F31",
    color: "#9BA1A6",
  };
  const rowStyle = {
    color: "white",
  };

  const deleteById = id => {
    props.setTransactionData(oldValues => {
      return oldValues.filter(fruit => fruit['id'] !== id)
    })
  }

  const deleteTransaction = async (key) => {
    console.log(key);
    deleteById(key);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "ARRAffinity=ab52746cee3d2041a0a4d964700673b28428853c105b7c164f6460eb8129960d; ARRAffinitySameSite=ab52746cee3d2041a0a4d964700673b28428853c105b7c164f6460eb8129960d"
    );

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    for (let i=0; i<props.transData; i++) {
      if (props.transData[i]['id'] == key) {
        delete props.transData[i];
      }
    }

    let response = await fetch(`${GetTransactions}/${key}`, requestOptions);
  };

  return (
    <div>
      {/* <h1>Hello</h1> */}
      <Row justify="center">
        <Table
          aria-label="Example table with static content"
          css={{
            height: "auto",
            th: headerStyle,
            tr: rowStyle,
          }}
        >
          <Table.Header>
            <Table.Column>NAME</Table.Column>
            <Table.Column>AMOUNT</Table.Column>
            <Table.Column>CATEGORY</Table.Column>
            <Table.Column>DATE</Table.Column>
            <Table.Column>DESCRIPTION</Table.Column>
            <Table.Column>ACTIONS</Table.Column>
          </Table.Header>
          <Table.Body>
            {props.transData.map((data) => {
              return (
                <Table.Row key={data.id}>
                  <Table.Cell>{data.name}</Table.Cell>
                  <Table.Cell>{data.amount}</Table.Cell>
                  <Table.Cell>
                    {props.catData[data.categoryId - 1]["name"]}
                  </Table.Cell>

                  <Table.Cell>{data.date}</Table.Cell>
                  {data.description ? (
                    <Table.Cell>{data.description}</Table.Cell>
                  ) : (
                    <Table.Cell>NA</Table.Cell>
                  )}
                  <Table.Cell>
                    <Col className={styles.toolTip}>
                      <Tooltip
                        content="Delete Transaction"
                        color="error"
                        onClick={() => deleteTransaction(data.id)}
                      >
                        <IconButton>
                          <DeleteIcon size={20} fill="#FF0080" />
                        </IconButton>
                      </Tooltip>
                    </Col>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Row>
    </div>
  );
};