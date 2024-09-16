import HomeComp from "../components/home/index";
import { GetTransactions, GetCategories } from "../components/constants/urls";

export default function Home(props) {
  return (
      <HomeComp 
        transData={props.transData.data} 
        catData={props.transData.categories} 
      />
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