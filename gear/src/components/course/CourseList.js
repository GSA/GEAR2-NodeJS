import React, {PropTypes} from 'react';
import CourseListRow from './CourseListRow';

const CourseList = ({courses}) => {
    return (
        <table>
            <thead>
                <tr>&nbsp;</tr>
                <tr>Title</tr>
                <tr>Author</tr>
                <tr>Category</tr>
                <tr>Length</tr>
            </thead>
            <tbody>
            {courses.map( course =>
                <CourseListRow key={course.id} course={course}/>
            )}
            </tbody>
        </table>
    )
};

export default CourseList;