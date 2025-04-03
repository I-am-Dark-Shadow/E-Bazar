export const DisplayPriceIndianRuppe = (price) => {
    return new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
        style: 'currency',
        currency: 'INR'
    }).format(price)
}