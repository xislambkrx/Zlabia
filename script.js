let pricePerKg = 350;
let profitPerKg = 110;
let pricePerGram = pricePerKg / 1000;
let profitPerGram = profitPerKg / 1000;
let totalProfit = localStorage.getItem("totalProfit") ? parseFloat(localStorage.getItem("totalProfit")) : 0;
let profitHistory = JSON.parse(localStorage.getItem("profitHistory")) || [];

// تحديث واجهة الأرباح عند فتح الصفحة
document.getElementById('profitResult').innerText = totalProfit.toFixed(2);



function updateFromAmount() {
    let amount = parseFloat(document.getElementById('amountInput').value) || 0;
    let weight = (amount / pricePerGram).toFixed(0);
    document.getElementById('weightInput').value = weight;
}

function updateFromWeight() {
    let weight = parseFloat(document.getElementById('weightInput').value) || 0;
    let amount = (weight * pricePerGram).toFixed(2);
    document.getElementById('amountInput').value = amount;
}

function clearInput(id) {
    document.getElementById(id).value = "";
}

function calculateChange() {
    let amount = parseFloat(document.getElementById('amountInput').value) || 0;
    let paid = parseFloat(document.getElementById('paidInput').value) || 0;
    let change = paid - amount;
    document.getElementById('changeResult').innerText = change.toFixed(2);
}

function calculateProfitAndReset() {
    let weight = parseFloat(document.getElementById('weightInput').value) || 0;
    let profit = (weight * profitPerGram).toFixed(2);

    if (profit > 0) {
        profitHistory.push(parseFloat(profit)); // إضافة الربح إلى المصفوفة
        localStorage.setItem("profitHistory", JSON.stringify(profitHistory)); // حفظ البيانات
    }

    totalProfit += parseFloat(profit);
    document.getElementById('profitResult').innerText = totalProfit.toFixed(2);

    // تصفير الحقول
    document.getElementById('amountInput').value = "";
    document.getElementById('weightInput').value = "";
    document.getElementById('paidInput').value = "";
    document.getElementById('changeResult').innerText = "0";
}

function undoLastProfit() {
    if (profitHistory.length > 0) {
        let lastProfit = profitHistory.pop(); // حذف آخر عنصر
        totalProfit -= lastProfit; // طرحه من المجموع
        localStorage.setItem("profitHistory", JSON.stringify(profitHistory)); // تحديث التخزين

        document.getElementById('profitResult').innerText = totalProfit.toFixed(2);
    }
}

