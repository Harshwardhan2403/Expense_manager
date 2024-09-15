import { Table, Row, Col, Tooltip } from "@nextui-org/react";
import { EditIcon } from "../transactions/EditIcon";
import { IconButton } from "../transactions/IconButton";
import styles from "./categories.module.css";
import { GetCategories } from "../constants/urls";

export const CatTable = (props) => {
    const headerStyle = {
        backgroundColor: '#2B2F31',
        color: '#9BA1A6',
    };
    const rowStyle = {
        color: 'white',
    };

    return (
        <div>
            <Row justify='center'>
                <Table
                    aria-label="Example table with static content"
                    css={{
                        height: "auto",
                        th: headerStyle,
                        tr: rowStyle,
                    }}
                >
                    <Table.Header>
                        <Table.Column>CATEGORY</Table.Column>
                        {/* <Table.Column>TYPE</Table.Column> */}
                        <Table.Column>ACTION</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {props.catData.map((data) => {
                            return (
                                <Table.Row key={data.id}>
                                    <Table.Cell>{props.catData[data.id - 1]['name']}</Table.Cell>
                                    <Table.Cell>
                                        <Col className={styles.toolTip}>
                                            <Tooltip content="Edit Category" color="warning" >
                                                <IconButton
                                                    onClick={()=> {
                                                        props.setEditId(data.id);
                                                        props.setShowCat(false);
                                                    }}
                                                >
                                                    <EditIcon size={20} fill="#F5A524" />
                                                </IconButton>
                                            </Tooltip>
            
                                        </Col>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </Row>
        </div>
    )
}