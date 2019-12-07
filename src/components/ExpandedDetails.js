import React, { useState } from 'react';

const ExpandedDetails = ({ tags, grades, addTag }) => {
    const [addTagValue, setAddTagValue] = useState("");

    const onAddTagSubmit = (e) => {
        e.preventDefault();
        addTag(e, addTagValue)
        setAddTagValue("")
    }

    return <div className="details">
        <div className="grades">
            {grades.map((grade, index) => <p key={index}>Test {index}: {grade}%</p>)}
        </div>
        <div className="tags">
            <div className="tagList">
                {tags ? tags.map((tag, i) => <span className="tag" key={i}>{tag}</span>) : <></>}
            </div>

            <form onSubmit={onAddTagSubmit}>
                <input type="text" placeholder="Add a tag" id="add-tag-input"
                    value={addTagValue} onChange={(e) => setAddTagValue(e.target.value)} />
            </form>

        </div>
    </div>

}

export default ExpandedDetails