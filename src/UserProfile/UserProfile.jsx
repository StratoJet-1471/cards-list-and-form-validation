import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import PropTypes from 'prop-types';

import Btn from '../Btn/Btn';

import '../auxiliary-css/cross-modules-selectors.css';
import './UserProfile.css';

function useInputValueValidation(value, validations) {
    const [minLengthError, setMinLengthError] = useState(false);
    const [maxLengthError, setMaxLengthError] = useState(false);
    const [patternError, setPatternError] = useState(false);
    const [invalidCharsError, setInvalidCharsError] = useState();

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.trim().length < validations['minLength'] ? setMinLengthError(true) : setMinLengthError(false);
                    break;
                case 'maxLength':
                    value.trim().length > validations['maxLength'] ? setMaxLengthError(true) : setMaxLengthError(false);
                    break;
                case 'pattern':
                    value.trim().toLowerCase().match(validations['pattern']) ? setPatternError(false) : setPatternError(true);
                    break;
                case 'invalidChars':
                    value.trim().toLowerCase().match(validations['invalidChars']) ? setInvalidCharsError(true) : setInvalidCharsError(false);
                    break;
                default:
                    break;                    
            }
        }
    }, [value]);

    return {
        minLengthError,
        maxLengthError,
        patternError,
        invalidCharsError
    };
}

function useInputState(initialValue, validations) {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setIsDirty] = useState(false); //Устанавливался ли уже фокус на этом инпуте, или ещё нет
    const errors = useInputValueValidation(value, validations);

    const onChange = (e) => { setValue(e.target.value); };
    const onBlur = (e) => { setIsDirty(true); };

    return {value, onChange, onBlur, errors};
}

//Источник инфы про получение параметра из url: https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md#reading-url-params
function UserProfile({users, setCurrentSection}) {
    const urlParams = useParams();   
    const [readonly, setReadonly] = useState(true); 

    const fullUserData = users[urlParams.userId-1];    

    const verifyInputValue = (inputValueErrorsObject) => {
        let isValid = true;
        for (const error in inputValueErrorsObject) {
            if(inputValueErrorsObject[error]) { 
                isValid = false;
                break;
            }
        }
        return isValid;        
    };

    const setVerifiableTextInputClass = (inputValueErrorsObject) => {
        const baseClass = "user-profile__input user-profile__input_text-input";
        const isValid = verifyInputValue(inputValueErrorsObject);

        return isValid ? baseClass : (baseClass + " user-profile__input_incorrect-value");
    };

    const setVerifiableTextAreaClass = (inputValueErrorsObject) => {
        const baseClass = "user-profile__input user-profile__input_textarea";
        const isValid = verifyInputValue(inputValueErrorsObject);

        return isValid ? baseClass : (baseClass + " user-profile__input_incorrect-value");
    };


    const verifyAllInputValues = (inputStates) => {
        let allAreValid = true;
        for (let inputState in inputStates) {
            if(!verifyInputValue(inputStates[inputState].errors)) {
                allAreValid = false;
                break;
            }
        }
        return allAreValid;
    };

    const inputStates = {
        nameInputState: useInputState(fullUserData ? fullUserData.name : '', {minLength: 2, maxLength: 40, invalidChars: /[^A-Za-z \.-]/g}),

        usernameInputState: useInputState(fullUserData ? fullUserData.username : '', {minLength: 2, maxLength: 40, invalidChars: /[^A-Za-z0-9 _\.-]/g}),

        emailInputState: useInputState(fullUserData ? fullUserData.email : '', {pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, maxLength: 40}),

        streetInputState: useInputState(fullUserData ? fullUserData.address.street : '', {minLength: 2, maxLength: 40, invalidChars: /[^A-Za-z0-9 \.-]/g}),

        cityInputState: useInputState(fullUserData ? fullUserData.address.city : '', {minLength: 2, maxLength: 40, invalidChars: /[^A-Za-z0-9 \.-]/g}),

        zipcodeInputState: useInputState(fullUserData ? fullUserData.address.zipcode : '', {minLength: 2, maxLength: 40, invalidChars: /[^0-9-]/g}),

        phoneInputState: useInputState(fullUserData ? fullUserData.phone : '', {minLength: 2, maxLength: 40, invalidChars: /[^0-9() x\.-]/g}),

        websiteInputState: useInputState(fullUserData ? fullUserData.website : '', {minLength: 4, maxLength: 40, pattern:/^([\da-z0-9_\.-]+)\.([a-z]{2,6})$/}),

        commentInputState: useInputState('', {maxLength: 40})
    };

    const formSubmit = (e) => {
        e.preventDefault();
        if(verifyAllInputValues(inputStates)) {
            const result = {
                name: inputStates.nameInputState.value.trim(),
                username: inputStates.usernameInputState.value.trim(),
                email: inputStates.emailInputState.value.trim(),
                street: inputStates.streetInputState.value.trim(),
                city: inputStates.cityInputState.value.trim(),
                zipcode: inputStates.zipcodeInputState.value.trim(),
                phone: inputStates.phoneInputState.value.trim(),
                website: inputStates.websiteInputState.value.trim(),
                comment: inputStates.commentInputState.value.trim(),
            }
            console.log(JSON.stringify(result));
        }
    };

    useEffect(() => { 
        setCurrentSection("userProfile"); 
    }, []);

    if(!fullUserData) return (
        <div className='user-profile'>
            <span className='user-profile__title'>Данные не получены</span>
            <div style={{marginTop: '10px'}}>
                <Link className="uni-link" to={"/"}>К списку пользователей</Link>
            </div>
        </div>
    );

    const textInputBlocksCreatorSources = [
        ["Name", inputStates.nameInputState],
        ["User name", inputStates.usernameInputState],
        ["E-mail", inputStates.emailInputState],
        ["Street", inputStates.streetInputState],
        ["City", inputStates.cityInputState],
        ["Zip code", inputStates.zipcodeInputState],
        ["Phone", inputStates.phoneInputState],
        ["Website", inputStates.websiteInputState]
    ];

    const textInputBlocks = textInputBlocksCreatorSources.map((source) => {
        const inputBlockTitle = source[0];
        const inputState = source[1];
        return (
            <div key={inputBlockTitle} className="uni-flex-column-block">
                <span className='user-profile__input-description'>{inputBlockTitle}</span>
                <input type="text" className={setVerifiableTextInputClass(inputState.errors)} value={inputState.value} disabled={readonly} onBlur={inputState.onBlur} onChange={inputState.onChange}/>
            </div>            
        );
    })

    //Про то, как сделать textarea управляемой - https://ru.reactjs.org/docs/forms.html#the-textarea-tag
    return (
        <div className='user-profile'>
            <div className='uni-flex-row-block' style={{justifyContent:'space-between', alignItems:'center', width:'100%'}}>
                <span className='user-profile__title'>Профиль пользователя</span>                
                <Btn onClick={() => setReadonly(false)}>Редактировать</Btn>
            </div>            
            <form className='uni-flex-column-block' onSubmit={(e) => formSubmit(e)}>
                <div className='user-profile__inputs-block'>
                    {textInputBlocks}

                    <div className="uni-flex-column-block">
                        <span className='user-profile__input-description'>Comment</span>
                        <textarea name="comment" className={setVerifiableTextAreaClass(inputStates.commentInputState.errors)} value={inputStates.commentInputState.value} disabled={readonly} onBlur={inputStates.commentInputState.onBlur} onChange={inputStates.commentInputState.onChange}/>
                    </div>
                </div>
                <div className='uni-flex-row-block' style={{justifyContent:'space-between', alignItems:'center', width:'100%'}}>
                    <Link className="uni-link" to={"/"}>К списку пользователей</Link>                    
                    <Btn disabled={readonly} color="secondary" type="submit">Отправить</Btn>
                </div>
                
            </form>
        </div>
    );
}

UserProfile.propTypes = {
    users: PropTypes.array.isRequired,
    setCurrentSection: PropTypes.func.isRequired,
}

export default UserProfile;