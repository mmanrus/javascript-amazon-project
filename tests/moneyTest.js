import { formatCurrency } from "../scripts/utils/money";

if(formatCurrency(2095) === '20.95') {
    console.log('Passed');
} else {
    console.log('Failed');
}