import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const CourseListRow = ({course}) => {
    return (
        <tr>
            <td></td>
            <td>{course.title}</td>
            <td>{course.authorId}</td>
            <td>{course.category}</td>
            <td></td>
        </tr>
    )
};

export default CourseListRow;
