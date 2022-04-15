import React from 'react'
import PropTypes from 'prop-types'
import DataStep from "../models/DataStep";

function StepData(props) {

    let edit_id = 0;
    if (props.edit_item != null)
        edit_id = props.edit_item.id;

    // Дата в формате DD.MM.YYYY
    function DateToStr(date)
    {
        console.log('StepData::DateToStr', date);

        let day   = date.getDate();
        let month = date.getMonth() + 1; //Month from 0 to 11
        let year  = date.getFullYear();

        let result = '' + (day <= 9 ? '0' + day : day) + '.' + (month <= 9 ? '0' + month : month) + '.' + year;
        console.log('StepData::DateToStr result = ', result);

        return result;
    }

    const funDelete = (evt, item) => {
        console.log('StepData::funDelete', evt, item);
        props.onItemDelete(item);
    };

    const funChange = (evt, item) => {
        console.log('StepData::funChange', evt, item);
        props.onItemChange(item);
    };


    return (
        <>
            <div className="row_label2">
                <label>Дата (ДД.ММ.ГГ)</label>
                <label>Пройдено км</label>
                <label id="lbl_action">Действия</label>
            </div>

            <div id="result">
                {
                    props.data.map(o =>

                        <div key={o.id} className="row_result">
                            <span className={o.id == edit_id && 'red_text'}>{DateToStr(o.date)}</span>
                            <span className={o.id == edit_id && 'red_text'}>{o.len}</span>
                            <span className={(o.id == edit_id) ? 'material-icons red_text' : 'material-icons'} onClick={evt => funChange(evt, o)}>edit</span>
                            <span className={(o.id == edit_id) ? 'material-icons red_text' : 'material-icons'} onClick={evt => funDelete(evt, o)}>close</span>
                        </div>
                    )
                }
            </div>
        </>
    );
}

StepData.propTypes = {
    data: PropTypes.array.isRequired,
    onItemDelete: PropTypes.func.isRequired,
    onItemChange: PropTypes.func.isRequired,
    edit_item: PropTypes.object                // Of(DataStep)
}

export default StepData;
