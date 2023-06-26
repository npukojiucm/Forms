import Pencil from "../../public/pencil.png";
import Delete from "../../public/delete.png";
import React from "react";

export default function ListItem({ onDelete, notes }) {
    const formatter = new Intl.DateTimeFormat('ru', {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
    });

    return notes.map(value => {
        return <div className="list-item" key={value.date} data-date={value.date}>
            <div className="item-date">{formatter.format(value.date)}</div>
            <div className="item-distance">{value.distance}</div>
            <div className="item-action">
                <img src={Pencil} alt="Редактировать"/>
                <img src={Delete} alt="Удалить" onClick={onDelete}/>
            </div>
        </div>
    })
}
