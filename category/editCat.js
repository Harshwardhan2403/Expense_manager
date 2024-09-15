vimport { Row } from "@nextui-org/react"
import { useState } from "react"
import "react-datepicker/dist/react-datepicker.css";
import styles from "./addNewCategory.module.css";
import { Input } from "@nextui-org/react";
import { Button } from '@nextui-org/react';

export const EditCategory = ({key}) => {

    const [categoryName, setCategoryName] = useState("");
   
    const handleCategory = async () => {
    }

    return (
        <div className={styles.mainContainer}>
            <h1>Edit Category</h1>
            <Row justify="center" className={styles.containerRow}>
                <div className={styles.newCatContainer}>
                    <div>
                        <p>Name</p>
                        <Input 
                            // color="primary"
                            bordered
                            placeholder="Enter Name" 
                            css={inputStyle}
                            onChange={(event) => {
                                setCategoryName(event.target.value);
                            }}
                            value={categoryName}
                        />
                    </div>
                    
                    <div className={styles.addButtonDiv}>
                        <Button 
                            color="success" 
                            auto 
                            onPress={handleCategory}
                            css={addButtonStyle}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </Row>
        </div>
    )
}
