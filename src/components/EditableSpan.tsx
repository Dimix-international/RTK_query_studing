import React, {ChangeEvent, useState} from "react";
import {useClickOutside} from "../helper/clickOutside";

type EditableSpanType = {
    text: string
    isUpdatingComment: boolean
    callback: (text: string) => void
}

export const EditableSpan: React.FC<EditableSpanType> = React.memo(({
                                                                        text,
                                                                        callback,
                                                                        isUpdatingComment
                                                                    }) => {

    const [tempText, setTempText] = useState(text);
    const [isEdit, setIsEdit] = useState(false);


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTempText(e.currentTarget.value)
    }
    const turnOnEditMode = () => {
        setIsEdit(true);
    }

    const setUpdateData = () => {
        setIsEdit(false);
        callback(tempText);
    }

    const inputNodeRef = useClickOutside(() => {
        //закрываем меню при клике снаружи
        setIsEdit(false);
        setTempText(text);
    })
    return (
        <div>
            {
                isEdit
                    ? <div>
                        <input
                            ref={inputNodeRef}
                            type={'text'}
                            value={tempText}
                            autoFocus
                            onChange={onChangeHandler}
                            // onBlur={turnOffEditMode}
                        >
                        </input>
                        <button onClick={setUpdateData}>изменить</button>
                    </div>
                    :
                    isUpdatingComment
                        ? <h3>update....</h3>
                        : <h3 onDoubleClick={turnOnEditMode}>{text}</h3>

            }
        </div>
    )
})