import React from 'react';
import './App.css';
import { retailData } from './retailData'
import {Pie} from 'react-chartjs-2'

class App extends React.Component {

  render () {
    const _retailData = [...retailData]
    const zeroStockedProducts = _retailData.filter((zeroStockProduct)=>{
      return zeroStockProduct['Store Stock Quantity'] === 0
    })

    const _zeroStockedProducts = [...zeroStockedProducts]

    const warehouseBased_ZeroStockProducts = _zeroStockedProducts.filter((e)=>{
      return e['Warehouse Stock Quantity'] === 0
    })

    const planningBased_ZeroStockProducts = _zeroStockedProducts.filter((e)=>{
      return e['Warehouse Stock Quantity'] !== 0
    })

    // lost sales is the sum of all zero stocked products' daily average sales quantity

    const daily_Average_Sales = _zeroStockedProducts.map((e)=>{
      return e["Daily Avg Sales Quantity"]
    })

    const lostSales = daily_Average_Sales.reduce((total,num)=>{
      return total+num
    },0)

    console.log("lostSales",lostSales)

    const products_ZeroSalesQuantity = _zeroStockedProducts.filter((e)=>{
      return e['Sales Quantity'] === 0
    })

    const warehouseBased_LostSales = warehouseBased_ZeroStockProducts.map((e)=>{
      return e["Daily Avg Sales Quantity"]
    })
    const warehouseBased_LostSalesPercentage =warehouseBased_LostSales.reduce((total,num)=>{
      return total+num
    },0)


    const planningBased_LostSales = planningBased_ZeroStockProducts.map((e)=>{
      return e["Daily Avg Sales Quantity"]
    })
    const planningBased_LostSalesPercentage = planningBased_LostSales.reduce((total,num)=>{
      return total+num
    },0)


    const pieChartData = {
      labels: [
        'warehouse based',
        'planning based'
      ],
      datasets: [{
        data: [warehouseBased_LostSalesPercentage, planningBased_LostSalesPercentage],
        backgroundColor: [
        '#FF6384',
        '#36A2EB'
        ]
      }]
    }

    return (
        <div>
          <div className='side-information'>
            <h2>Lost Sales</h2>
            <div>
              <div>Lost Sales due to the stock-out in warehouses= {warehouseBased_LostSalesPercentage}</div>
              <div>Lost Sales due to the replenishment planning= {planningBased_LostSalesPercentage}</div>
            </div>
          </div>
          <Pie 
            data={pieChartData}   
            width={100}
            height={50} />
        </div>
    )
  }
}

export default App;
