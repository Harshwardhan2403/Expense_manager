import TransactionComp from "../../components/transactions/index";
import { GetTransactions, GetCategories } from "../../components/constants/urls";

const TransactionPage = (props) => {
    return(
        <div>
            <TransactionComp 
                transData={props.transData.data} 
                catData={props.transData.categories}  
            />
        </div>
    )
}

export async function getServerSideProps() {
    let transData = {}
    var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
    let catResponse = await fetch(
      `${GetCategories}`,
      requestOptions
    );
    let catdata = await catResponse.json();
    transData.categories = catdata;

    let response = await fetch(
      `${GetTransactions}`,
      requestOptions
    );
    let resData = await response.json();
    transData.data = resData;
    // console.log(transData);
    return {
        props: {
            transData,
        },
    };
} 

export default TransactionPage;