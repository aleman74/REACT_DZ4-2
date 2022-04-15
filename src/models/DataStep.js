import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';


class DataStep
{
    constructor(date, len)
    {
        this.id = nanoid();
        this.date = date;
        this.len = len;

//        this.key = month.toString() + '_' + num.toString()
    }
}

DataStep.prototypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    len: PropTypes.number.isRequired
}

export default DataStep;
