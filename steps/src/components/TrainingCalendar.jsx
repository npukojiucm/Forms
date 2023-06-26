import React, {useState} from "react";
import ListItem from "./ListItem.jsx";

export default function TrainingCalendar() {
    const [notes, setNotes] = useState([]);

    const updateNotes = (date, distance) => {
        const index = notes.findIndex(note => note.date === date);

        if (index === -1) {
            return [
                ...notes,
                {
                    date,
                    distance,
                }
                ].sort((a, b) => b.date > a.date ? 1 : -1);
        }

        notes[index].distance = notes[index].distance + distance;

        return [
            ...notes
        ].sort((a, b) => b.date > a.date ? 1 : -1);
    }

    const handlerSubmitForm = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const date = formData.get("date");
        const distance = formData.get("distance");

        e.target[0].value = '';
        e.target[1].value = '';

        setNotes([
            ...updateNotes(new Date(date).getTime(), +distance)
        ]);
    }

    const handlerDeleteNote = ({ target }) => {
        const listItem = target.closest('.list-item');
        const { date } = listItem.dataset;

        return setNotes([
            ...notes.filter(note => note.date !== +date)
        ]);
    };

    return (
        <div className="widget">
            <form action="#" onSubmit={handlerSubmitForm}>
                <div className="container-title">
                    <div className="title-date">Дата</div>
                    <div className="title-distance">Пройдено км</div>
                    <div className="title-action"></div>
                </div>

                <div className="form-action">
                    <input type="date" className="date" name="date" required/>
                    <input type="number" className="distance" name="distance" required/>
                    <button type="submit" className="confirm">Ok</button>
                </div>
            </form>

            <div className="organizer">
                <div className="organizer-title">
                    <div className="title-date">Дата (ДД.ММ.ГГ)</div>
                    <div className="title-distance">Пройдено км</div>
                    <div className="title-action">Действия</div>
                </div>

                <div className="organizer-list">
                    {<ListItem notes={notes} onDelete={handlerDeleteNote} />}
                </div>

            </div>
        </div>
    )
}
