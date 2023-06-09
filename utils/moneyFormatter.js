function moneyFormatter(valueInt, choosenCurrency = "USD", numFor = "en-US") {
  const formatter = new Intl.NumberFormat(numFor, {
    style: "currency",
    currency: choosenCurrency,

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  //   console.log(formatter.format(2500));
  return formatter.format(valueInt);
}
export default moneyFormatter;
