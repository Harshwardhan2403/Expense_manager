import { Row } from "@nextui-org/react"
import { useState, useEffect } from "react"
import "react-datepicker/dist/react-datepicker.css";
import styles from "./addNewCategory.module.css";
import { Input, Text } from "@nextui-org/react";
import { Button } from '@nextui-org/react';
import { GetCategories } from "../constants/urls";

export const AddNewCategory = (props) => {
    console.log(props);
    const [categoryName, setCategoryName] = useState("");
    const [category, setCategory] = useState("");
    const [categoryIndex, setCategoryIndex] = useState(0);

    useEffect (() => {
        let catName, catIndex;
        for (let i=0; i<props.catData.length; i++) {
            if (props.catData[i]['id'] == props.editId) {
                catName = props.catData[i]['name']
                catIndex = i;
            }
        }
        setCategory(catName);
        setCategoryIndex(catIndex);
    }, [])

    const inputStyle = {
        // color: '#$pink100',
        backgroundColor: 'white',
        width: '100%',
    }


    const addButtonStyle = {
        width: '50%',
    }

    const getCategoryIdFromCategory = () => {
        console.log(props.catData.length);
        return (props.catData.length+1)

    }

    const handleUpdate = (index, value) => {
        const newTodos = [...props.catData];
        newTodos[index]['name'] = value;
        props.setCategoryData(newTodos);
      }

    const handleCategory = async () => {
        const categoryId = getCategoryIdFromCategory();
        handleUpdate(categoryIndex, `${categoryName}`)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "ARRAffinity=ab52746cee3d2041a0a4d964700673b28428853c105b7c164f6460eb8129960d; ARRAffinitySameSite=ab52746cee3d2041a0a4d964700673b28428853c105b7c164f6460eb8129960d");

        var raw = JSON.stringify({
            "id": props.editId,
            "name": `${categoryName}`
        });

        console.log(raw);
        
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let response = await fetch(
            `${GetCategories}/${props.editId}`,
            requestOptions
        )

        props.setShowCat(true);
        // let responseData = await response.json();
        // console.log(responseData);
    }

    return (
        <div className={styles.mainContainer}>
            <Text h1 className={styles.headingCont}>Edit&nbsp;<Text className={styles.categoryText}>{category} </Text>&nbsp;Category</Text>
            <Row justify="center" className={styles.containerRow}>
                <div className={styles.newCatContainer}>
                    <div>
                        <p className={styles.catTitle}>Category Name</p>
                        <Input 
                            // color="primary"
                            bordered
                            placeholder="Enter Category" 
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
                            Edit Category
                        </Button>
                    </div>
                </div>
            </Row>
        </div>
    )
}
