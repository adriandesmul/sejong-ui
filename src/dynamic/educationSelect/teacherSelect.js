import React from 'react';
import SelectionTable from '../common/selectionTable';
import API from '../api/api';

class TeacherSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teachers: null,
      teachersTable: null
    }

    this.selectTeacher = this.selectTeacher.bind(this);
    this.createTeacher = this.createTeacher.bind(this);
  }

  componentDidMount() {
    API.get('/school/find/school_id/' + this.props.school_id, (error, data) => {
      const teachers = data.map(item => {
        return {
          id: item.teacher_id,
          data: [item.teacher_name, item.teacher_email]
        }
      })
      this.setState({ teachers: data, teachersTable: teachers })
    })
  }

  selectTeacher(teacher_id) {
    const teacher = this.state.teachers.find(item => item.teacher_id === teacher_id)
    if (teacher) { this.props.onUpdate(teacher) }
  }

  createTeacher(data) {
    console.log(data)
    API.post('/school/createTeacher', {
      school_id: this.props.school_id,
      teacher_name: data.Teacher,
      teacher_email: data.Email
    }, (status, data) => {
      if (status === 200) { this.props.onUpdate(JSON.parse(data)) }
    })
  }

  render() {
    return (
      <div>
        <div className="scs-module-element">
          <h2>Select your teacher</h2>
        </div>
        { this.state.teachers &&
          <SelectionTable options={this.state.teachersTable}
                          labels={['Teacher', 'Email']}
                          onUpdate={this.selectTeacher}
                          onCreate={this.createTeacher} />
        }
      </div>
    )
  }
}

export default TeacherSelect;
