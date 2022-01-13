// import lib
import isEmpty from '../../lib/isEmpty';

export const validation = value => {
    let errors = {};

    if (isEmpty(value.bonusFee)) {
        errors.bonusFee = "Required"
    }

    if (isEmpty(value.bonusCurrencyId)) {
        errors.bonusCurrencyId = "Required"
    }

    return errors;
}

export default validation;