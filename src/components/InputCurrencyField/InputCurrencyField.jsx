import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

//import { IconButton } from '@mui/material';
//import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import './InputCurrencyField.css';

export default function InputCurrencyField(props) {
    const { MaxAmount, MinAmount,
        
        DefaultValue, 
        AllowPoint, NumLength, DecLength,
        OnTextChanged, OnBlur, OnFocus, AllowPaste, DisplayPoint, Disable } = props;

    const inputBoxRef = useRef();

    const FormatNumber = (value) => {
        if (value === null || value === "") return "";

        let _displayPoint = DisplayPoint !== undefined && DisplayPoint !== null ? DisplayPoint : true;
        let _minDigit = _displayPoint === true ? 2 : 0;

        if (AllowPoint) {
            const currentValue = parseFloat(RemoveFormat(value));
            const str = currentValue.toLocaleString(undefined, { minimumFractionDigits: _minDigit });

            if (str !== '0' && str !== 'NaN') {
                return str;
            }

            return '';
        }
        else {
            const currentValue = parseInt(RemoveFormat(value));
            const str = currentValue.toLocaleString(undefined, { maximumFractionDigits: _minDigit });

            if (str !== '0' && str !== 'NaN') {
                return str + (_displayPoint === true ? '.00' : '');
            }

            return '';
        }
    };

    const RemoveFormat = (value) => {
        if (AllowPoint === true) {
            if (value !== '' && value !== null && value !== undefined) {
                let str_without_point = value.split('.');
                if (str_without_point.length > 1) {
                    let numStr = '';
                    const num = str_without_point[0].replace(/\D/g, '');
                    numStr = String(parseInt(num));
                    if (numStr === 'NaN') numStr = '0';

                    let decStr = '';
                    const dec = str_without_point[1].replace(/\D/g, '');
                    decStr = String(parseInt(dec));
                    if (decStr === 'NaN' || decStr === '0') {
                        if (numStr === '0') {
                            return '';
                        }
                        else {
                            return numStr;
                        }
                    }

                    return numStr + (decStr !== '' ? '.' + dec : '');

                }
                else {
                    let str_without_format = str_without_point[0].replace(/\D/g, '');
                    if (str_without_format === '0') return '';

                    let str = String(parseInt(str_without_format));

                    return str;
                }
            }
            else {
                return '';
            }
        }
        else {
            if (value !== '' && value !== null && value !== undefined) {
                let str_without_point = value.split('.');
                if (str_without_point[0] !== '') {
                    let str_without_format = str_without_point[0].replace(/\D/g, '');
                    if (str_without_format === '0') return '';

                    let str = String(parseInt(str_without_format));

                    return str;
                }
                else {
                    return '';
                }

            }
            else {
                return '';
            }
        }

    }

    const [ValueForDisplay, setValueForDisplay] = useState(FormatNumber(String(DefaultValue)));
    //const [IconDeleteShow, setIconDeleteShow] = useState(false);

    const [IsFocus, setFocus] = useState(false);



    useEffect(() => {
        if (IsFocus !== true) {
            if (DefaultValue === "") {
                setValueForDisplay('');
                return;
            }

            let _displayPoint = DisplayPoint !== undefined && DisplayPoint !== null ? DisplayPoint : true;
            let _minDigit = _displayPoint === true ? 2 : 0;

            if (DefaultValue !== null && DefaultValue !== undefined && DefaultValue !== "") {
                if (AllowPoint) {
                    const currentValue = parseFloat(DefaultValue);
                    const str = currentValue.toLocaleString(undefined, { minimumFractionDigits: _minDigit });
                    if (str !== '0' && str !== 'NaN') {
                        setValueForDisplay(str);
                    }
                    else {
                        setValueForDisplay('');
                    }
                }
                else {
                    const currentValue = parseInt(DefaultValue);
                    const str = currentValue.toLocaleString(undefined, { maximumFractionDigits: _minDigit });

                    if (str !== '0' && str !== 'NaN') {
                        setValueForDisplay(str + (_displayPoint === true ? '.00' : ''));
                    }
                    else {
                        setValueForDisplay('');
                    }
                }
            }
        }

    }, [DefaultValue, AllowPoint, IsFocus, DisplayPoint]);


    const handleChange = (e) => {
        let _val = e.target.value;
        if (AllowPoint === true) {
            _val = e.target.value.replace(/[^0-9.]/g, '');
        }
        else {
            _val = e.target.value.replace(/\D/g, '');
        }

        if (AllowPoint === true) {
            if (_val.indexOf('.') > -1) {
                const _arrVal = _val.split('.');
                let _num = _arrVal[0];
                let _dec = _arrVal[1];

                if (_num.length > NumLength) {
                    _num = _num.slice(0, NumLength);
                }

                if (_dec.length > DecLength) {
                    _dec = _dec.slice(0, DecLength);
                }

                _val = _num + '.' + _dec;
            }
            else {
                if (_val.length > NumLength) {
                    _val = _val.slice(0, NumLength);
                }
            }
        } else {
            if (_val.length > NumLength) {
                _val = _val.slice(0, NumLength);
            }
        }

        setValueForDisplay(_val);

        //if(_val !== ''){
        //    setIconDeleteShow(true);
        //}
        //else{
        //    setIconDeleteShow(false);
        //}

        OnTextChanged(_val);
    }

    const onFocus = (e) => {
        setFocus(true);
        if (e.target.value !== '') {
            setValueForDisplay(RemoveFormat(ValueForDisplay));
            //setIconDeleteShow(true);
        }
        else {
            //setIconDeleteShow(false);
        }

        if (OnFocus !== undefined && OnFocus !== null) {
            OnFocus();
        }
    };

    const onInputBlur = (e) => {
        setFocus(false);
        //setTimeout(() => {
        //    setIconDeleteShow(false);
        //}, 50)

        if (e.target.value !== '') {
            setValueForDisplay(FormatNumber(ValueForDisplay));
        }

        if (OnBlur !== undefined && OnBlur !== null) {
            if (AllowPoint === true) {
                OnBlur(e.target.value.replace(/[^0-9.]/g, ''));
            }
            else {
                OnBlur(e.target.value.replace(/\D/g, ''));
            }
        }
    };

    const CheckAlphanumeric = (e) => {
        if (AllowPoint === true) {
            const currentValue = RemoveFormat(ValueForDisplay);
            let pos = e.target.selectionStart;
            if ((ValueForDisplay === '0' && e.key !== '.' && e.keyCode !== 8) ||
                (pos === 0 && ((e.key === '0' && currentValue.length > 0) ||
                    (e.key === '.')))) {
                e.preventDefault();
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
            }
            else if (e.key === '.') {
                if (ValueForDisplay.indexOf('.') > -1) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                }
                else {
                    if ((currentValue.length - pos) > DecLength) {
                        e.preventDefault();
                        e.stopPropagation();
                        e.nativeEvent.stopImmediatePropagation();
                    }
                }
            }
            else {
                if (currentValue !== '') {
                    const _arrVal = currentValue.split('.');
                    if (_arrVal.length > 1) {
                        let _num = _arrVal[0];
                        let _dec = _arrVal[1];
                        if (pos <= _num.length) {
                            if (_num.length < NumLength) {
                                const re = /[0-9]+/g;
                                if (e.keyCode !== 8 && e.keyCode !== 46 && e.keyCode !== 13) {
                                    if (!re.test(e.key)) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        e.nativeEvent.stopImmediatePropagation();
                                    }
                                }
                            }
                            else {
                                if (e.keyCode !== 8 && e.keyCode !== 46 && e.keyCode !== 13) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    e.nativeEvent.stopImmediatePropagation();
                                }
                            }
                        }
                        else {
                            if (_dec.length < DecLength) {
                                const re = /[0-9]+/g;
                                if (e.keyCode !== 8 && e.keyCode !== 46 && e.keyCode !== 13) {
                                    if (!re.test(e.key)) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        e.nativeEvent.stopImmediatePropagation();
                                    }
                                }
                            }
                            else {
                                if (e.keyCode !== 8 && e.keyCode !== 46 && e.keyCode !== 13) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    e.nativeEvent.stopImmediatePropagation();
                                }
                            }
                        }
                    }
                    else {
                        if (pos > currentValue.length) {
                            const re = /[0-9.]+/g;
                            if (e.keyCode !== 8 && e.keyCode !== 46 && e.keyCode !== 13) {
                                if (!re.test(e.key)) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    e.nativeEvent.stopImmediatePropagation();
                                }
                            }
                        }
                        else if (currentValue.length < NumLength) {
                            const re = /[0-9.]+/g;
                            if (e.keyCode !== 8 && e.keyCode !== 46 && e.keyCode !== 13) {
                                if (!re.test(e.key)) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    e.nativeEvent.stopImmediatePropagation();
                                }
                            }
                        }
                        else {
                            if (e.keyCode !== 8 && e.keyCode !== 46 && e.keyCode !== 13) {
                                e.preventDefault();
                                e.stopPropagation();
                                e.nativeEvent.stopImmediatePropagation();
                            }
                        }
                    }
                }
            }
        }
        else {
            if ((ValueForDisplay.length === 0) && (e.key === '0')) {
                e.preventDefault();
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
            }
            else {
                const currentValue = RemoveFormat(ValueForDisplay);
                if (currentValue.length < NumLength) {
                    const re = /[0-9]+/g;
                    if (e.keyCode !== 8 && e.keyCode !== 46 && e.keyCode !== 13) {
                        if (!re.test(e.key)) {
                            e.preventDefault();
                            e.stopPropagation();
                            e.nativeEvent.stopImmediatePropagation();
                        }
                    }
                }
                else {
                    if (e.keyCode !== 8 && e.keyCode !== 46 && e.keyCode !== 13) {
                        e.preventDefault();
                        e.stopPropagation();
                        e.nativeEvent.stopImmediatePropagation();
                    }
                }
            }
        }

        if (e.keyCode === 13) {
            inputBoxRef.current.blur();
            setFocus(false);

            if (e.target.value !== '') {
                setValueForDisplay(FormatNumber(ValueForDisplay));
            }

            if (OnBlur !== null && OnBlur !== undefined) {
                OnBlur(e.target.value.replace(/\D/g, ''));
            }
        }
    }

    const CheckAlphanumericOnPaste = (e) => {
        if (AllowPaste === true) {
            const v = e.clipboardData.getData('Text');
            if (v !== null) {
                if (AllowPoint) {
                    let vNotFormat = RemoveFormat(v);
                    if (vNotFormat !== "") {
                        if (vNotFormat.indexOf('.') > -1) {
                            const _arr = vNotFormat.split('.');
                            let _num = _arr[0];
                            let _dec = _arr[1];
                            if (_num.length > NumLength) {
                                _num = _num.slice(0, NumLength);
                            }

                            if (_dec.length > DecLength) {
                                _dec = _dec.slice(0, DecLength);
                            }

                            vNotFormat = _num + '.' + _dec;
                        }
                        else {
                            if (vNotFormat.length > NumLength) {
                                vNotFormat = vNotFormat.slice(0, NumLength);
                            }
                        }

                        //if(vNotFormat !== '')
                        //{
                        //    setIconDeleteShow(true);
                        //}
                        //else{
                        //    setIconDeleteShow(false);
                        //}

                        setValueForDisplay(vNotFormat);
                        OnTextChanged(vNotFormat);
                    }
                }
                else {
                    let vNotFormat = RemoveFormat(v);
                    if (vNotFormat !== "") {
                        if (vNotFormat.length > NumLength) {
                            vNotFormat = vNotFormat.slice(0, NumLength);
                        }

                        //if(vNotFormat !== '')
                        //{
                        //    setIconDeleteShow(true);
                        //}
                        //else{
                        //    setIconDeleteShow(false);
                        //}

                        setValueForDisplay(vNotFormat);
                        OnTextChanged(vNotFormat);
                    }
                }
            }
        }

        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    let _class_cell_valid = 'currency-cells';
    

    

    let _inputMode = 'numeric';
    if (AllowPoint === true) {
        _inputMode = 'decimal';
    }

    return (
        <div className='currency-container'>
            <div className={_class_cell_valid}>
                <div className='currency-div-textdisplay'>
                    <input
                        ref={inputBoxRef}
                        type='text' pattern="[0-9.]*" inputMode={_inputMode}
                        className='currency-textdisplay'
                        min={MinAmount}
                        max={MaxAmount}
                        value={ValueForDisplay}
                        onChange={(e) => handleChange(e)}
                        onFocus={(e) => onFocus(e)}
                        onBlur={(e) => onInputBlur(e)}
                        onKeyDown={(e) => CheckAlphanumeric(e)}
                        autoComplete='off'
                        autoCapitalize="off"
                        spellCheck={false}
                        autoCorrect="off"
                        onPaste={(e) => { CheckAlphanumericOnPaste(e) }}
                        disabled={Disable}
                    />
                        
                    
                </div>
            </div>


        </div>
    );
}

InputCurrencyField.propTypes = {
    Label: PropTypes.string,
    MaxAmount: PropTypes.number,
    MinAmount: PropTypes.number,
    MaxLengthDescription: PropTypes.string,
    DefaultValue: PropTypes.string,
    AllowPoint: PropTypes.bool,
    NumLength: PropTypes.number,
    DecLength: PropTypes.number,
    IsValid: PropTypes.bool,
    ErrorMessage: PropTypes.string,
    OnTextChanged: PropTypes.func,
    OnBlur: PropTypes.func
}
