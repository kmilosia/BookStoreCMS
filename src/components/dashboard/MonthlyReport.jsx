import React, { useEffect, useState } from 'react'
import { getMonthlyRaport } from '../../api/cmsAPI'
import { Chart } from "react-google-charts";

function MonthlyReport() {
    const currentdate = new Date()
    const currentmonth = currentdate.getMonth() + 1
    const currentyear = currentdate.getFullYear()
    const [data, setData] = useState(null)
    const [categoryChartData, setCategoryChartData] = useState([])
    const [bookItemChartData, setBookItemChartData] = useState([])
    const [month, setMonth] = useState(Number(currentmonth))
    const [year, setYear] = useState(Number(currentyear))
    useEffect(() => {
        getMonthlyRaport(month, year, setData)
    },[month,year])
    useEffect(() => {
        console.log(data);
    },[data])
    const handleMonthChange = (e) => {
        setMonth(e.target.value)
    }
    const handleYearChange = (e) => {
        setYear(e.target.value)
    }
    useEffect(() => {
        if (data && data.categories) {
            const newChartData = [
                ["Kategoria", "Procent sprzedanych"],
                ...data.categories.map(category => [category.categoryName, category.percentOfTotalAppearances])
            ]
            setCategoryChartData(newChartData)
        }
        if (data && data.bookItems) {
            const newChartData = [
                ["Książka", "Procent sprzedanych", "Procent"],
                ...data.bookItems.map(book => [book.bookTitle + " (" + book.formTitle + ")", book.percentOfTotalSoldPrice, book.percentOfTotalSoldUnits])
            ]
            setBookItemChartData(newChartData)
        }
    }, [data])   
    const categoriesOptions = {
        title: "Procentowy wykres sprzedaży według kategorii książek na dany miesiąc",
        pieSliceText: "label",
        legend: 'none',
        pieHole: 0.4,
        is3D: false,
    }
    const bookItemsOptions = {
        title: "Wykres sprzedaży poszczególnych książek na dany miesiąc",
        chartArea: { width: "50%" },
        hAxis: {
          title: "Procent sprzedaży",
          minValue: 0,
        },
        vAxis: {
          title: "Książka",
        },
        // legend: 'none',
    }
  return (
    data &&
    <div className='flex flex-col'>
    <h3 className='home-element-header'>Raport miesięczny</h3>
    <div className='flex items-center'>
        <select name="month" onChange={handleMonthChange} value={month} className='dark:border-dracula-600 w-[200px] mr-2 border-2 text-black dark:text-white rounded-md dark:bg-dracula-700 p-2'>
            <option value={1}>Styczeń</option>
            <option value={2}>Luty</option>
            <option value={3}>Marzec</option>
            <option value={4}>Kwiecień</option>
            <option value={5}>Maj</option>
            <option value={6}>Czerwiec</option>
            <option value={7}>Lipiec</option>
            <option value={8}>Sierpień</option>
            <option value={9}>Wrzesień</option>
            <option value={10}>Październik</option>
            <option value={11}>Listopad</option>
            <option value={12}>Grudzień</option>              
        </select>
        <select name="year" onChange={handleYearChange} value={year} className='dark:border-dracula-600 w-[200px] mr-2 border-2 text-black dark:text-white rounded-md dark:bg-dracula-700 p-2'>
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
        </select>
    </div>
    <div className='grid grid-cols-3 gap-3 my-2'>
            <div className='rounded-md flex flex-col w-full bg-white dark:bg-dracula-700 px-5 py-5 shadow-md cursor-default'>
                <h4 className='font-medium font-lg'>Gross expenses</h4>
                <p className='text-3xl font-medium mt-2'>{data.grossExpenses} PLN</p>
            </div>
            <div className='rounded-md flex flex-col w-full bg-white dark:bg-dracula-700 px-5 py-5 shadow-md cursor-default'>
                <h4 className='font-medium font-lg'>Gross revenue</h4>
                <p className='text-3xl font-medium mt-2'>{data.grossRevenue} PLN</p>
            </div>
            <div className='rounded-md flex flex-col w-full bg-white dark:bg-dracula-700 px-5 py-5 shadow-md cursor-default'>
                <h4 className='font-medium font-lg'>Total income</h4>
                <p className='text-3xl font-medium mt-2'>{data.totalIncome} PLN</p>
            </div>
            <div className='rounded-md flex flex-col w-full bg-white dark:bg-dracula-700 px-5 py-5 shadow-md cursor-default'>
                <h4 className='font-medium font-lg'>Sold quantity</h4>
                <p className='text-3xl font-medium mt-2'>{data.soldQuantity}</p>
            </div>
            <div className='rounded-md flex flex-col w-full bg-white dark:bg-dracula-700 px-5 py-5 shadow-md cursor-default'>
                <h4 className='font-medium font-lg'>Total discounts</h4>
                <p className='text-3xl font-medium mt-2'>{data.totalDiscounts} PLN</p>
            </div>
    </div>
    {categoryChartData.length > 0 &&
    <Chart chartType="PieChart" data={categoryChartData} options={categoriesOptions} width={"100%"} height={"400px"} />}
    {bookItemChartData.length > 0 &&
    <Chart chartType="BarChart" data={bookItemChartData} options={bookItemsOptions} width={"100%"} height={"400px"} />}

    </div>
  )
}

export default MonthlyReport
