const apiPrefix = 'https://api.twelvedata.com'
const apiKey = '7075d3c4b9264de1af1dd9316f5a3d48'
const symbol = 'GME,MSFT,DIS,BNTX'
const interval = '1min'
const outputSize = 4
const endpoint = '/time_series'

const apiURL = `${apiPrefix}/${endpoint}?apikey=${apiKey}&symbol=${symbol}&interval=${interval}&outputSize=${outputSize}`

function getColor(stock) {
    if (stock === "GME") {
        return 'rgba(61, 161, 61, 0.7)'
    }
    if (stock === "MSFT") {
        return 'rgba(209, 4, 25, 0.7)'
    }
    if (stock === "DIS") {
        return 'rgba(18, 4, 209, 0.7)'
    }
    if (stock === "BNTX") {
        return 'rgba(166, 43, 158, 0.7)'
    }
}
// apiKey = ${ apiKey }&
async function main() {


    let response = await fetch(apiURL)
    let result = await response.json()
    console.log(result)
    // using mockData since my api keeps hitting the limit
    const { GME, MSFT, DIS, BNTX } = mockData
    const stocks = [GME, MSFT, DIS, BNTX]

    // Stock Price Over Time
    const timeChartCanvas = document.getElementById('time-chart')

    stocks.forEach(stock => stock.values.reverse())

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });

    // Highest Stock Price
    const highestPriceChartCanvas = document.getElementById('highest-price-chart')

    stocks.forEach(stock => stock.values.reverse())

    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks.symbol,
            datasets: [0, 50, 100, 150, 200, 250, 300, 350],
                label: stock.symbol,
                data: [0,50,100,150,200,250,300,350],
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
        }
            
    })

}

main()

