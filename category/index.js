import { CatTable } from "./catTable";
import styles from "./categories.module.css";
import { AddNewCategory } from "./addNewCategory";
import { Container, Button } from "@nextui-org/react";
import { useState } from "react";
import NavBar from "../navbar";

const CategoryComp = (props) => {
  console.log(props);
  const [showCat, setShowCat] = useState(true);
  const [editId, setEditId] = useState(0);
  const [categoryData, setCategoryData] = useState(props.catData);

  
  return (
    <>
      <NavBar 
        page={2}
      />
      <Container>
        <div className={styles.headerDiv}>
          <h1 className={styles.catHeading}>Categories</h1>
          {!showCat &&
          <Button color="success" auto onClick={() => {setShowCat(!showCat)}}>
            Back
          </Button>
          }
        </div>
        {showCat ? (
          <CatTable 
            catData={categoryData} 
            showCat={showCat}
            setShowCat={setShowCat}
            editId={editId}
            setEditId={setEditId}
          />
        ) : (
          <AddNewCategory
            catData={props.catData} 
            editId={editId}
            setShowCat={setShowCat}
            setCategoryData={setCategoryData}
          />
        )}
      </Container>
    </>
  );
};

export default CategoryComp;