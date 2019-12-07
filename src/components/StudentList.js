import React, { useState, useEffect } from 'react'
import ExpandedDetails from './ExpandedDetails'


const StudentList = ({ students, tags, onTagAdd }) => {

    const [expanded, setExpanded] = useState({});

    useEffect(() => {
        let initExpanded = {};
        students.forEach((student) => {
            initExpanded[student.id] = false
        })
        setExpanded(initExpanded)
    }, [students])

    const expandDetails = (event) => {
        setExpanded({ ...expanded, [event.target.id]: true })
    }
    const collapseDetails = () => {
        setExpanded({ ...expanded, [event.target.id]: false })
    }
    return (
        <>
            {students.map((student) => {
                return <div className="student" key={student.id}>
                    <img className="avatar" src={student.pic} />
                    <div className="profile">
                        <h3>{student.firstName} {student.lastName}</h3>
                        <div className="indented">
                            <p>Email: {student.email}</p>
                            <p>Company: {student.company}</p>
                            <p>Skill: {student.skill}</p>
                            <p>Average: {Math.round(student.grades.reduce(
                                (a, b) => Number(a) + Number(b), 0)
                                / student.grades.length)}%</p>
                            {expanded[student.id] ?
                                <ExpandedDetails tags={tags[student.id]} grades={student.grades}
                                    addTag={(e, tag) => onTagAdd(e, tag, student.id)} />
                                : <></>}
                        </div>
                    </div>
                    {expanded[student.id] ?
                        <div className="expand-btn" onClick={collapseDetails} id={student.id}>-</div> :
                        <div className="expand-btn" onClick={expandDetails} id={student.id}>+</div>}

                </div>
            })}
        </>
    )
}

export default StudentList;