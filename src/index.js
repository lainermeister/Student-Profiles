import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import StudentList from './components/StudentList.js'
import Search from './components/Search.js'

const App = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [query, setQuery] = useState({ name: "", tags: "" });
    const [tags, setTags] = useState({});

    const addTag = (event, tag, id) => {
        event.preventDefault()
        setTags({ ...tags, [id]: [...tags[id], tag] })
    }

    useEffect(() => {
        axios.get('http://localhost:3000/students')
            .then(({ data }) => {
                setStudents(data)
                setFilteredStudents(data)
                let initTags = {}
                data.forEach((student) => {
                    initTags[student.id] = []
                })
                setTags(initTags)
            })
    }, [])

    useEffect(() => {
        setFilteredStudents(students.filter(
            ({ firstName, lastName, id }) => {
                const nameMatch = `${firstName} ${lastName}`.toLowerCase().includes(query.name.toLowerCase());
                const tagMatch = tags[id].some((tag) => tag.toLowerCase().includes(query.tags.toLowerCase()));
                if (query.tags === "") {
                    return nameMatch;
                } else if (query.name === "") {
                    return tagMatch;
                } else {
                    return nameMatch && tagMatch;
                }
            }
        ))
    }, [query])

    return (
        <div className="content">
            <h1>Students Database</h1>
            <div className="container">
                <Search onChange={(name, tags) => setQuery({ name, tags })} />
                <StudentList students={filteredStudents} tags={tags} onTagAdd={addTag} />
            </div>
        </div>
    )
}
ReactDOM.render(
    <App />, document.getElementById('app')
)
