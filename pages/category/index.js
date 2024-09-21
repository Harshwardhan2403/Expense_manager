import CategoryComp from "../../components/category/index";
import { GetCategories } from "../../components/constants/urls";

const CategoryPage = (props) => {
    return(
        <div>
            <CategoryComp 
                catData={props.catData}  
            />
        </div>
    )
}

export async function getServerSideProps() {
    var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
    let catResponse = await fetch(
      `${GetCategories}`,
      requestOptions
    );
    let catData = await catResponse.json();

    console.log(catData);

    return {
        props: {
            catData,
        },
    };
} 

export default CategoryPage;