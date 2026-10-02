// import { validatePromoCountry } from '../../../services/getDeviceServices';

import { apidispatcher, dateExternal } from "./general.services";


export async function handleValidatePromoCountry(value) {
    try {
        let validatePromoCountryResp = await apidispatcher(value, 'validatePromoCountry')
        if (validatePromoCountryResp.status.result) {
            return validatePromoCountryResp.countryList;
        }
        else {
            console.log("validatePromoCountryResp error: " + validatePromoCountryResp.status.message);
            return null
            // this.setState({ isLoading: false });       
        }
    }
    catch (error) {
        console.log("validatePromoCountryResp error: ", error);
        return null
        // this.setState({ isLoading: false }); 
    }
}

export async function handleSimCalculator(travelDetails, estimation, promoDetails, planInfo, variation) {

    console.log('//////////////////////  HANDLE CALCULATOR NEW  ////////////////////////');
    console.log('estimation', estimation);
    console.log('travelDetails', travelDetails);
    console.log('promoDetails', promoDetails);
    console.log('variation', variation);
    console.log('planInfo', planInfo);

    let isMulti = false, multiObj = null, rate = 0

    // if (planInfo.planType?.toUpperCase() === 'CN') {
    //     isMulti = true
    //     multiObj = calculatingRates(planInfo, travelDetails, estimation)
    //     console.log("MULTI OBJECT", multiObj);
    //     if (promoDetails && promoDetails.promoType?.toUpperCase() !== 'G') {
    //         multiObj = await calcultationOnPromoCode(planInfo, travelDetails, promoDetails, estimation, multiObj)
    //     }
    // }
    // else {

    let cost = 0, discount = 0;
    travelDetails[0].countryCode = travelDetails[0].locationCode
    travelDetails[0].countryName = travelDetails[0].travelLocation
    travelDetails[0].planType = planInfo.planType
    travelDetails[0].planDays = planInfo.days
    travelDetails[0].rate = variation.price
    travelDetails[0].days = variation.days
    // switch (planInfo.planType.toUpperCase()) {
    //     case 'D':
    //         cost = variation.price * estimation.noOfDevices
    //         break;
    //     case 'V':
    //     case 'M':
    //         if (planInfo.days >= 1 && planInfo.days < 28) {
    //             travelDetails[0].endDate = moment(travelDetails[0].startDate, "YYYY-MM-DD").add(planInfo.days, 'days').subtract(1, 'days').format("YYYY-MM-DD");
    //         }
    //         else {
    //             travelDetails[0].endDate = moment(travelDetails[0].startDate, "YYYY-MM-DD").add(monthDays, 'days').subtract(1, 'days').format("YYYY-MM-DD");
    //         }
    //         travelDetails[0].days = moment(travelDetails[0].endDate).diff(moment(travelDetails[0].startDate), 'days') + 1;
    //         cost = planInfo.rate * estimation?.noOfDevices
    //         break;
    //     case 'MS':
    //         cost = ((planInfo.rate / monthDays) * (monthDays)) * estimation.noOfDevices
    //         break;
    //     default:
    //         cost = variation.price * estimation.noOfDevices
    //         break;
    // }

    cost = variation.price * estimation.noOfDevices
    cost = Number(cost || 0)
    travelDetails[0].actualCost = parseFloat(cost?.toFixed(2))
    if (promoDetails && promoDetails.promoType?.toUpperCase() !== 'G') {
        switch (promoDetails.promoDiscountType) {
            case 'P':
                discount = (cost * promoDetails.promoDiscount) / 100;
                cost = cost - discount
                break;
            case 'F':
                cost = cost - promoDetails.promoDiscount
                break;
        }
        travelDetails[0].discount = discount
    }
    // rate = planInfo.minCharges > cost ? planInfo.minCharges : cost
    // rate = variation.minimumCharges > cost ? (variation.minimumCharges * estimation.noOfDevices) : cost
    rate = planInfo.minCharges > cost ? (planInfo.minCharges * estimation.noOfDevices) : cost
    rate = parseFloat(rate?.toFixed(2))
    travelDetails[0].cost = rate
    // }
    if (isMulti) {
        console.log("INSIDE FINAL MULTI");
        multiObj.isMulti = true
        return multiObj
    }
    else {
        return {
            isMulti: false,
            estimatedCost: rate,
            countriesWithDaysAndRate: travelDetails,
            costToDisplayInSummary: rate / estimation?.noOfDevices,
            minCharges: planInfo.minCharges
        }
    }
}

export async function handleCalculator(travelDetails, estimation, promoDetails, planInfo, variation) {

    console.log('//////////////////////  HANDLE CALCULATOR NEW  ////////////////////////');
    console.log('estimation', estimation);
    console.log('travelDetails', travelDetails);
    console.log('promoDetails', promoDetails);
    console.log('variation', variation);
    console.log('planInfo', { ...planInfo, description: '', planTerms: '', nameAttributes: '' });

    let isMulti = false, multiObj = null, rate = 0

    if (planInfo.planType?.toUpperCase() === 'CN') {
        isMulti = true
        multiObj = calculatingRates(planInfo, travelDetails, estimation, variation)
        console.log("MULTI OBJECT", multiObj);
        if (promoDetails && promoDetails.promoType?.toUpperCase() !== 'G') {
            multiObj = await calcultationOnPromoCode(planInfo, travelDetails, promoDetails, estimation, multiObj, variation)
        }
    }
    else {


        let cost = 0, discount = 0;
        let start = new Date(travelDetails[0].startDate)
        let date = new Date(travelDetails[0].startDate)
        let monthDays = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
        if (travelDetails[0].endDate === null || travelDetails[0].endDate === '') {
            date.setDate(start.getDate() + monthDays);
            travelDetails[0].endDate = dateExternal(date)
        }
        let end = new Date(travelDetails[0].endDate)
        let days = ((end - start) / (1000 * 60 * 60 * 24) + 1)
        travelDetails[0].countryCode = travelDetails[0].locationCode
        travelDetails[0].countryName = travelDetails[0].travelLocation
        travelDetails[0].planType = planInfo.planType
        travelDetails[0].planDays = planInfo.days
        travelDetails[0].rate = planInfo.rate
        travelDetails[0].variationRate = variation.price
        travelDetails[0].days = days
        // console.log("BEFORE SWITCH", planInfo.planType.toUpperCase());
        let rateWithvariation = variation.price
        switch (planInfo.planType.toUpperCase()) {
            case 'D':
                cost = (rateWithvariation * days) * estimation.noOfDevices
                break;
            case 'Y':    
            case 'V':
            case 'M':
            case 'W':
                if (planInfo.days >= 1 && planInfo.days < 28) {
                    // Case 1: Use planInfo.days directly for < 28
                    travelDetails[0].endDate = dateExternal(start, planInfo.days - 1);
                }
                else if (planInfo.days >= 365) {
                    // Case 2: Special handling for yearly plan
                    travelDetails[0].endDate = dateExternal(start, 365 - 1);
                }
                else {
                    // Case 3: Use monthDays (28, 29, 30, 31)
                    console.log('date, monthDays', date, monthDays);
                    travelDetails[0].endDate = dateExternal(start, monthDays - 1);
                    console.log('endddddd', travelDetails[0].endDate);
                }

                // Days difference (inclusive)
                travelDetails[0].days = (
                    (new Date(travelDetails[0].endDate) - new Date(travelDetails[0].startDate)) /
                    (1000 * 60 * 60 * 24)
                ) + 1;

                // Cost calculation
                cost = rateWithvariation * estimation?.noOfDevices;
                break;
            case 'MS':
                cost = ((rateWithvariation / monthDays) * (monthDays)) * estimation.noOfDevices
                break;
            default:
                cost = rateWithvariation * estimation.noOfDevices
                break;
        }
        cost = Number(cost || 0)
        travelDetails[0].actualCost = parseFloat(cost?.toFixed(2))
        if (promoDetails && promoDetails.promoType?.toUpperCase() !== 'G') {
            switch (promoDetails.promoDiscountType) {
                case 'P':
                    discount = (cost * promoDetails.promoDiscount) / 100;
                    cost = cost - discount
                    break;
                case 'F':
                    cost = cost - promoDetails.promoDiscount
                    break;
            }
            travelDetails[0].discount = discount
        }
        rate = planInfo.minCharges > cost ? (planInfo.minCharges * estimation.noOfDevices) : cost
        rate = parseFloat(rate?.toFixed(2))
        travelDetails[0].cost = rate
    }
    if (isMulti) {
        console.log("INSIDE FINAL MULTI");
        multiObj.isMulti = true
        return multiObj
    }
    else {
        return {
            isMulti: false,
            estimatedCost: rate,
            countriesWithDaysAndRate: travelDetails,
            costToDisplayInSummary: rate / estimation?.noOfDevices,
            minCharges: planInfo.minCharges
        }
    }
}

export function calculatingRates(planInfo, travelDetails, estimation, variation) {
    console.log("INSIDE CALCULATING RATES");
    let cost = 0, rates = travelDetails;
    // if (planInfo?.rates == undefined || planInfo?.rates?.length == 0 || planInfo?.rates == null) {
    //     return {
    //         estimatedCost: -1,
    //         countriesWithDaysAndRate: [],
    //         costToDisplayInSummary: 0,
    //         minCharges: 0
    //     }
    // }
    // else {
    // travelDetails.forEach((e1) => planInfo.rates.forEach((e2) => {
    //     if (e1.locationCode == e2.countryCode) {
    //         rates.push({
    //             locationCode: e2.countryCode,
    //             countryCode: e2.countryCode,
    //             countryName: e1.travelLocation,
    //             startDate: e1.startDate,
    //             endDate: e1.endDate,
    //             rate: e2.rate,
    //         })
    //     }
    // }));


    if (rates.length === 1) {
        let days = ((new Date(rates[0].endDate) - new Date(rates[0].startDate)) / (1000 * 60 * 60 * 24) + 1)
        rates[0].days = days
    }
    else {
        for (let index = 0; index < rates.length - 1; index++) {
            var days = 0
            console.log("days", days);
            if (rates[index + 1]) {
                if (rates[index].rate > rates[index + 1].rate) {
                    days = ((new Date(rates[index].endDate) - new Date(rates[index].startDate)) / (1000 * 60 * 60 * 24) + 1)
                    rates[index].days = days

                    days = ((new Date(rates[index + 1].endDate) - new Date(rates[index + 1].startDate)) / (1000 * 60 * 60 * 24) + 1)
                    rates[index + 1].days = rates[index + 1].days ? rates[index + 1].days - 1 : days - 1
                }
                else {
                    days = ((new Date(rates[index].endDate) - new Date(rates[index].startDate)) / (1000 * 60 * 60 * 24) + 1)
                    rates[index].days = rates[index].days ? rates[index].days - 1 : days - 1

                    days = ((new Date(rates[index + 1].endDate) - new Date(rates[index + 1].startDate)) / (1000 * 60 * 60 * 24) + 1)
                    rates[index + 1].days = days
                }
            }
        }
    }
    for (var ind = 0; ind < rates.length; ind++) {
        // let costDR = (rates[ind].rate + variation.price) * rates[ind].days
        let costDR = rates[ind].rate * rates[ind].days
        rates[ind].actualCost = parseFloat(costDR?.toFixed(2))
        rates[ind].cost = parseFloat(costDR?.toFixed(2))
        cost = cost + costDR
    }
    cost = cost * estimation.noOfDevices
    // cost = planInfo.minCharges > cost ? planInfo.minCharges : cost
    cost = planInfo.minCharges > cost ? (planInfo.minCharges * estimation.noOfDevices) : cost
    cost = parseFloat(parseFloat(cost)?.toFixed(2))
    console.log('rats', rates);
    return {
        estimatedCost: cost,
        countriesWithDaysAndRate: rates,
        costToDisplayInSummary: cost / estimation?.noOfDevices,
        minCharges: planInfo.minCharges
    }
    // }
}

export async function calcultationOnPromoCode(planInfo, travelDetails, promoDetails, estimation, multiObj, variation) {

    let cost = 0
    let countriesWithDR = multiObj.countriesWithDaysAndRate, promoCountries = []
    var validatePromoCountry = await handleValidatePromoCountry({ countryList: countriesWithDR, promoCode: estimation.promoCode?.trim() })
    if (validatePromoCountry) {
        console.log("validatePromoCountry", validatePromoCountry);
        for (let index = 0; index < countriesWithDR.length; index++) {
            let obj = validatePromoCountry.find(country => country.countryCode.toUpperCase() === countriesWithDR[index].countryCode.toUpperCase())
            if (obj && obj.promo?.toUpperCase() === 'TRUE') {
                countriesWithDR[index].promo = obj.promo
                promoCountries.push({
                    countryName: countriesWithDR[index].countryName,
                    locationCode: countriesWithDR[index].countryCode,
                    promo: countriesWithDR[index].promo,
                    rate: countriesWithDR[index].rate
                })
                let discount = 0, cos = 0
                cos = countriesWithDR[index].cost
                if (promoDetails.promoDiscountType?.toUpperCase() === 'P') {
                    discount = (cos * promoDetails.promoDiscount) / 100;
                    cos = cos - discount
                    countriesWithDR[index].cost = parseFloat(cos?.toFixed(2))
                }
            }
        }
    }
    for (var ind = 0; ind < countriesWithDR.length; ind++) {
        cost = cost + countriesWithDR[ind].cost
    }
    cost = cost * estimation.noOfDevices
    if (promoDetails.promoDiscountType?.toUpperCase() === 'F') {
        cost = cost - promoDetails.promoDiscount
    }
    cost = planInfo.minCharges > cost ? planInfo.minCharges : cost
    cost = Number(cost || 0)
    cost = parseFloat(cost?.toFixed(2))

    return {
        estimatedCost: cost,
        countriesWithDaysAndRate: countriesWithDR,
        costToDisplayInSummary: cost / estimation?.noOfDevices,
        minCharges: planInfo.minCharges,
        promoCountries: promoCountries
    }
}


export function countriesWithDaysAndRate(finalCountries) {
    var countriesWithDaysAndRate = []
    var country = null;
    var countryCode = null;
    var rate = null;
    var count = 0;
    for (var i = 0; i < finalCountries.length; i++) {
        if (finalCountries[i].country != country) {
            if (count > 0) {
                countriesWithDaysAndRate.push({ locationCode: countryCode, countryName: country, days: count, rate: rate })
            }
            country = finalCountries[i].country;
            countryCode = finalCountries[i].countryCode;
            rate = finalCountries[i].rate
            count = 1;
        } else {
            count++;
        }
    }
    if (count > 0) {
        countriesWithDaysAndRate.push({ locationCode: countryCode, countryName: country, days: count, rate: rate })
    }
    return countriesWithDaysAndRate
    // this.setState({
    //     countriesWithDaysAndRate: countriesWithDaysAndRate
    // })
}
