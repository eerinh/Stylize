import React from 'react'; //import react library
import styles from './InputControl.module.css'; //import CSS module for styling

function InputControl(props){
    return(
        <div className={styles.container}> {/*create container div with a class name from the CSS module*/}
            {props.label && <label>{props.label}</label>} {/*If a label prop is provided, render label element */}
            <input type="text"{...props}/> {/*Render an input element with type 'text' and spread the props*/}
        </div>
    );
}

export default InputControl; //export input control component so that we can use this in then rest of the component.