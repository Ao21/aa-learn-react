import * as React from 'react';
import Note from './note';

export default ({notes, onEdit}) => {
    return (
        <ul>{notes.map(note =>
            <li key={note.id}>
                <Note task={note.task} onEdit={onEdit.bind(null, note.id)} />
            </li>
        ) }</ul>
    )
}