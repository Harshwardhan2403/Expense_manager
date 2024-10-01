import { Card, Text, Grid, Container } from "@nextui-org/react";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import NavBar from "../navbar";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,

    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    } from 'chart.js';
import { Bar, Line, Doughnut } from "react-chartjs-2";

const HomeComp = (props) => {
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [incomeAmount, setIncomeAmount] = useState(0);
    const [categoryWiseData, setcategoryWiseData] = useState([]);
    const [catNames, setCatNames] = useState([]);
    console.log(props);
    ChartJS.register(
        ArcElement,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
        );

    const data = {
        labels: props.transData.map((data) => {
            return (data['date'])
        }),
        datasets: [
          {
            label: 'Expense',
            fill: false,
            lineTension: 0.1,
            backgroundColor: '#F31260',
            borderColor: '#F31260',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#F31260',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#F31260',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: props.transData.map((data) =>{
                if (data['categoryId'] !== 7) {
                    return (
                        data['amount']
                    );
                } else {
                    return (0);
                }
            })
          },
          {
            label: 'Income',
            fill: false,
            lineTension: 0.1,
            backgroundColor: '#17C964',
            borderColor: '#17C964',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#17C964',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#17C964',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: props.transData.map((data) =>{
                if (data['categoryId'] === 7) {
                    return (
                        data['amount']
                    );
                } else {
                    return (0);
                }
            })
          }
        ]
      };

    useEffect (() => {
        let newExpenseAmount = 0, newIncomeAmount = 0;
        for (let i=0; i<props.transData.length; i++) {
            if (props.transData[i]['transactionTypeId'] == 1) {
                newExpenseAmount = newExpenseAmount + props.transData[i]['amount']
            }
            else if (props.transData[i]['transactionTypeId'] == 2) {
                newIncomeAmount = newIncomeAmount + props.transData[i]['amount']
            }
        }
        setExpenseAmount(newExpenseAmount)
        setIncomeAmount(newIncomeAmount)
        let totalCategoryData = [0, 0, 0, 0, 0, 0];
        props.transData.map((data) => {
            if (data['categoryId'] == 1) {
                totalCategoryData[0] = totalCategoryData[0] + data['amount']
            } else if (data['categoryId'] == 2) {
                totalCategoryData[1] = totalCategoryData[1] + data['amount']
            } else if (data['categoryId'] == 3) {
                totalCategoryData[2] = totalCategoryData[2] + data['amount']
            } else if (data['categoryId'] == 4) {
                totalCategoryData[3] = totalCategoryData[3] + data['amount']
            } else if (data['categoryId'] == 5) {
                totalCategoryData[4] = totalCategoryData[4] + data['amount']
            } else if (data['categoryId'] == 6) {
                totalCategoryData[5] = totalCategoryData[5] + data['amount']
            }
        });
        setcategoryWiseData(totalCategoryData);
        console.log("TCD", categoryWiseData);

        let allCategories = []
        props.catData.map((cat) => {
            if (cat['id'] !== 7) {
                allCategories.push(cat['name'])
            }
        })
        console.log(allCategories);
        setCatNames(allCategories);
    }, []);

    const categorydata = {
        labels: catNames,
        datasets: [{
          data: categoryWiseData,
          backgroundColor: [
          '#0072F5',
          '#7828C8',
          '#F5A524',
          '#910838',
          '#33D9FA',
          '#FF4ECD'
          ],
          hoverBackgroundColor: [
          '#0072F5',
          '#7828C8',
          '#F5A524',
          '#910838',
          '#33D9FA',
          '#FF4ECD'
          ],
          borderWidth: 0,
        }]
    };

    return (
        <>
        <NavBar 
                page={0}
            />
        <Container>
            <Grid.Container gap={2}>
                <Grid xs={4}>
                    <Card className={styles.amountCard} variant="flat">
                      <Card.Body className={styles.amountText}>
                        <Text>Total Expense</Text>
                        <Text h1>₹&nbsp;{expenseAmount}</Text>
                      </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={4}>
                    <Card className={styles.amountCardIncome} variant="flat">
                      <Card.Body className={styles.amountText}>
                        <Text>Total Income</Text>
                        <Text h1>₹&nbsp;{incomeAmount}</Text>
                      </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
            <Grid.Container gap={2}>
                <Grid xs={4}>
                    <Card className={styles.categoryCard} variant="flat">
                        <Card.Header className={styles.expenseHeader}>
                            <Text>Expense By Category</Text>
                        </Card.Header>
                        <Card.Divider className={styles.divider} />
                        <Card.Body className={styles.categoryName}>
                            {/* {props.catData.map((cat) => {
                                return (
                                    <Button size="sm" key={cat['id']} light className={styles.categoryText}>
                                        {cat['name']}
                                    </Button>
                                );
                            })}  */}
                            <Doughnut
                               data={categorydata}
                               width={200}
                               height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={8}>
                    <Card className={styles.amountCard} variant="flat">
                      <Card.Body>
                        <Line
                          data={data}
                          width={400}
                          height={200}
                        />
                      </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Container>
        </>
    );
}

export default HomeComp;