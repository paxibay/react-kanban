import React from 'react';
import uuid from 'uuid';
import Notes from './Notes.js';

export default class App extends React.Component {

  state = {
    notes: [
      {
        id: uuid.v4(),
        task: 'Learn Webpack'
      },
      {
        id: uuid.v4(),
        task: 'Learn React'
      },
      {
        id: uuid.v4(),
        task: 'Do laundry'
      }
    ]
  };


  render() {
    const notes = this.state.notes;

    return (
      <div>
        <button onClick={this.addNote}>+</button>
        <Notes notes={notes}
          onEdit={this.editNote}
          onDelete={this.deleteNote} />
      </div>
    );
  }

  deleteNote = (id, e) => {
    // Avoid bubbling to edit
    e.stopPropagation();
    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    });
  };


  // this.setState accepts a second parameter like this: 
  // this.setState({ ...}, () => console.log('set state!')).
  // This is handy to know if you want to trigger some 
  // behavior right after setState has completed
  addNote = () => {
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        task: 'New task'
      }])
    });

    // or

    //this.setState({
    //  notes: [...this.state.notes, {
    //    id: uuid.v4(),
    //    task: 'New task'
    //  }]
    //})
  };

  editNote = (id, task) => {
    // Don't modify if trying to set an empty value
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
  };

}
