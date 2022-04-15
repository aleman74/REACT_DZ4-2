import React from 'react'
import PropTypes from 'prop-types'
import './Step.css';
import DataStep from "../models/DataStep";
import StepAdd from "./StepAdd";
import StepData from "./StepData";


function Step(props) {
    const[data, setData] = React.useState([]);
    const[edit_item, setEdit] = React.useState(null);


    function IsDateEqual(date1, date2)
    {
        let result = (
            (date1.getDate() == date2.getDate()) &&
            (date1.getMonth() == date2.getMonth()) &&
            (date1.getFullYear() == date2.getFullYear())
        );

        return result;
    }

    // item - DataStep
    const funDataAdd = (item) => {
        console.log('Step::funDataAdd', item);

//        setData(prev => [...prev, item]);

        setData(prev => {
            let arr = [...prev];

            // Если в режиме редактирования элемента, то удаляем текущий элемент из массива
            if (edit_item != null)
                arr = arr.filter(o => o.id != edit_item.id);

            let is_ok = false;
            for(let i = 0; i < arr.length; i++)
            {
                if (IsDateEqual(arr[i].date, item.date))
                {
                    arr[i].len += item.len;

                    is_ok = true;
                    break;
                }
            }

            if (!is_ok)
                arr.push(item);

            arr.sort((a, b) => a.date > b.date ? 1 : -1);

            return arr;
        });

        setEdit(prev => null);
    }

    const funItemDelete = (item) => {
        console.log('Step::funItemDelete', item);

        const arr = data.filter(o => o.id != item.id);
        setData(prev => arr);
    };

    const funItemChange = (item) => {
        console.log('Step::funItemChange', item);
        setEdit(prev => item)
    };

    if (data.length > 0)

        return (

            <form id="train">
                <div id="container">
                    <StepAdd onAdd={funDataAdd} edit_item={edit_item} />
                    <StepData data={data} edit_item={edit_item} onItemDelete={funItemDelete} onItemChange={funItemChange}/>
                </div>
            </form>
        );
    else
        return (

            <form id="train">
                <div id="container">
                    <StepAdd onAdd={funDataAdd} />
                </div>
            </form>
        );

}

Step.propTypes = {
    data: PropTypes.arrayOf(DataStep)
}

export default Step;
