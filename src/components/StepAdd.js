import React from 'react'
import PropTypes from 'prop-types'
import DataStep from "../models/DataStep";

function StepAdd(props) {

    console.log('StepAdd  props.edit_item = ', props.edit_item);

    const[data, setData] = React.useState({
            date: '',
            len: ''
    });


    let is_red_class = (props.edit_item != null);

    let is_edit = (props.edit_item != null) && (data.date == '') && (data.len == '');
    console.log('StepAdd  is_edit = ' + is_edit);

    const funChangeDate = (evt) => {
        setData(prev => ({...prev, date: evt.target.value}));

        if ((props.edit_item != null) && (data.len == ''))
            setData(prev => ({...prev, len: props.edit_item.len}));
    };

    const funChangeLen = (evt) => {
        setData(prev => ({...prev, len: evt.target.value}));

        if ((props.edit_item != null) && (data.date == ''))
            setData(prev => ({...prev, date: DateToStr2(props.edit_item.date)}));
    };

    const btnClick = (evt) => {
        evt.preventDefault();      // Отключаем перезагрузку страницы

        console.log('StepAdd::btnClick', data.date, data.len);

        let date1 = data.date;
        let len1 = data.len;

        if ((props.edit_item != null) && (date1 == ''))
            date1 = DateToStr2(props.edit_item.date);

        if ((props.edit_item != null) && (len1 == ''))
            len1 = props.edit_item.len;


        const item = new DataStep(new Date(date1), parseFloat(len1));
//        console.log(item);

        props.onAdd(item);       // Добавляем элемент

//        console.log('StepAdd::btnClick after onAdd');
        setData(prev => ({...prev, date: '', len: ''}));    // Очистить поля
//        console.log('StepAdd::btnClick after onAdd2');
    };

    // Дата в формате YYYY-MM-DD
    function DateToStr2(date)
    {
        console.log('StepData::DateToStr', date);

        let day   = date.getDate();
        let month = date.getMonth() + 1; //Month from 0 to 11
        let year  = date.getFullYear();

//        let result = '' + (day <= 9 ? '0' + day : day) + '.' + (month <= 9 ? '0' + month : month) + '.' + year;    // DD.MM.YYYY
        let result = '' + year + '-' + (month <= 9 ? '0' + month : month) + '-' + (day <= 9 ? '0' + day : day);    // YYYY-MM-DD
        console.log('StepData::DateToStr2 result = ', result);

        return result;
    }

    return (
            <>
                <div className="row_label">
                    <label htmlFor="date_info">Дата (ДД.ММ.ГГ)</label>
                    <label htmlFor="len_info">Пройдено км</label>
                </div>
                <div className="row_input">
                    <input id="date_info" name="date_info" type="date" className={is_red_class && 'red_text'}
                           value={is_edit ? DateToStr2(props.edit_item.date) : data.date} onChange={funChangeDate}/>
                    <input id="len_info" name="len_info" type="number" className={is_red_class && 'red_text'}
                           value={is_edit ? props.edit_item.len : data.len} onChange={funChangeLen}/>
                    <button className={is_red_class ? 'button1 red_text' : 'button1'} onClick={btnClick}>OK</button>
                </div>
            </>
    );
}

StepAdd.propTypes = {
    onAdd: PropTypes.func.isRequired,
    edit_item: PropTypes.object             // Of(DataStep) - если указать тип, то возникает предупреждение
}

export default StepAdd;
