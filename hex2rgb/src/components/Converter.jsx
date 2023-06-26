import { useState } from "react";

function hex2rgb(c) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
    return result ?
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
        : null;
}


export default function Converter() {
    const [color, setColor] = useState({
        rgb: '245, 227, 227',
        message: '',
    });

    const handleOnChange = ({ target }) => {
        if (target.value.length > 7) target.value = target.value.substring(0, 7);

        if (target.value.length === 7) {
            const result = hex2rgb(target.value)

            if (result === null) {
                return setColor((prevState) => ({
                    ...color,
                    rgb: '245, 227, 227',
                    message: 'Ошибка',
                }))
            } else {
                setColor((prevState) => ({
                    ...color,
                    rgb: result,
                    message: `rgb(${result})`,
                }))
            }

            return;
        }

        setColor((prevState) => ({
            ...color,
            message: '',
        }))
    }
    return (
        <div className="page" style={{backgroundColor: `rgb(${color.rgb})`}}>
            <input type="text" onInput={ handleOnChange }/>
            <div className={"message"}>{color.message}</div>
        </div>
    )
}
