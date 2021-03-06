import * as React from 'react';
import * as uuid from 'node-uuid';

import Notes from './notes/notes.tsx';
import {log} from './../decorators/log.ts';


export default class App extends React.Component<any, any> {    
    constructor(props) {
        super(props);
        this.state = {
            notes: [{
                id: uuid.v4(),
                task: 'Learn Webpack'
            }, {
                    id: uuid.v4(),
                    task: 'Learn React'
                },
                {
                    id: uuid.v4(),
                    task: 'Finish Learning'
                }]
        }
    };
    @log
    public addNote = () => {
        this.setState({
            notes: this.state.notes.concat([{
                id: uuid.v4(),
                task: 'New Task'
            }])
        }, () => {
            console.log('I HAVE SET A STATE!')
        })
    }

    editNote = (id, task: string) => {
        if (!task.trim()) {
            return;
        }
        const notes = this.state.notes.map(note => {
            if (note.id === id && task) {
                note.task = task;
            }

            return note;
        });
        this.setState({ notes });
    }
    render() {
        const notes = this.state.notes;

        return (
            <div>
                <button onClick={this.addNote}>+</button>
                <Notes notes={notes} onEdit={this.editNote} />
            </div>
        )

    }
}