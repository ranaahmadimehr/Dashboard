var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    header: {'Content-Encoding': 'gzip'}
};
var coin = 'bitcoin'
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
async function fetchExam(coin) {
    try {
        const response = await fetch(`https://api.coincap.io/v2/assets/${coin}`,requestOptions)
        const exam = await response.json();
        document.getElementById("coinName").innerHTML = `${exam.data.name}`;
        document.getElementById("coinPriceUSD").innerHTML = `${formatter.format(parseFloat(exam.data.priceUsd).toFixed(2))}`;
        document.getElementById("changePercent").innerHTML = ` ${parseFloat(exam.data.changePercent24Hr).toFixed(2)}%`;
        let priceChange = document.getElementById("changePercent").textContent;
        if(parseFloat(priceChange) > 0)
            document.getElementById("changePercent").style.color = "green"
        else 
            document.getElementById("changePercent").style.color = "red"

        return exam;
    } catch (error) {
        console.error(error);
    }
}


setInterval(fetchExam(coin), 600000);



